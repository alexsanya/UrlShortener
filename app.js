const restify = require('restify');
const urlencode = require('urlencode');
const config = require('./config');
const Memcached = require('memcached');
 
const server = restify.createServer({
  name: 'Url Shortener',
  version: '1.0.0'
});

async function app(console) {
  'use strict';
   
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  function connectToMemcache() {
    const memcachedHost = process.env.MEMCACHED_HOST || 'localhost:11211';
    const memcached = new Memcached(memcachedHost);

    return new Promise((resolve, reject) => {
      memcached.connect(memcachedHost, ( err, conn ) => {
        if( err ) {
           console.error('Cannot establish connection with memcached', conn.server);
           reject();
        } 
        console.info('Connection with memcached established');
        resolve(memcached);
      })
    });
  }

  function setupListener() {
    return new Promise((resolve, reject) => {
      server.listen(config.apiPort, () => {
        resolve();
      })
    });
  }
   
  await setupListener();
  const memcacheConnection = await connectToMemcache();
  const validator = require('./Validator').create();
  const linksMap = require('./LinksMap').create(memcacheConnection);
  const encryptor = require('./Encryptor').create();
  const apiController = require('./ApiController').create();
  console.info('%s listening at %s', server.name, server.url);

  server.post('/link/create', async (req, res, next) => {
    const url = urlencode.decode(req.body.url, 'gbk');
    console.info('Start processing url: ', url);
    if (!validator.isValidUrl(url)) {
      console.error('Wrong URL format: ', url);
      apiController.reportWrongInput(res);
      return next();
    }
    const linkData = encryptor.getUniqueLink(url);
    try {
      await linksMap.storeShortUrl(linkData.url, url);
      apiController.reportCreatedLink(res, linkData);
      console.info('Short URL created: ', linkData.url);
    } catch (err) {
      apiController.reportServerFailure(err);
      return next();
    }
    return next();
  });

  server.get('/link/:linkId', async (req, res, next) => {
    const linkId = req.params.linkId;
    console.info('Mapping short link: ', linkId);

    try {
      const originalLink = await linksMap.getUrl(linkId);
      if (!originalLink) {
        console.error('Original link not found for: ', linkId);
        apiController.reportLinkNotFound(res);
        return next();
      }
      console.info('Redirect to original link: ', originalLink);
      apiController.redirectToOriginal(res, originalLink);
      return next();
    } catch (err) {
      apiController.reportServerFailure(err);
      return next();
    }
  });

  server.del('/link/:linkId', async (req, res, next) => {
    const linkId = req.params.linkId;
    const key = req.headers['x-auth-key'];
    console.info('Request to remove link ', linkId);
    try {
      const url = await linksMap.getUrl(linkId);
      if (!url) {
        console.error('Url not found for shortlink ', linkId);
        apiController.reportLinkNotFound(res);
        return next();
      }
      console.info('Key = ', key);
      if ((typeof key === 'string') && validator.isValidKey(key, linkId, url)) {
        console.info('Removing link ', linkId);
        try {
          await linksMap.removeShortLink(linkId);
          apiController.reportDeletedLink(res);
        } catch (err) {
          apiController.reportServerFailure(err);
        }
        return next();
      }
      console.error('Authentification failed for link %s key %s', linkId, key);
      apiController.reportNoCredentials(res);
      return next();
    } catch (err) {
      apiController.reportServerFailure(err);
      return next();
    }
  });


  server.get('/\/.*/', restify.plugins.serveStatic({

    directory: __dirname + "/frontend/",
    default: './index.html' 

   })
  );


  return server;
}

module.exports = app;

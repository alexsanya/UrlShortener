const restify = require('restify');
const validator = require('./Validator').create();
const linksMap = require('./LinksMap').create();
const encryptor = require('./Encryptor').create();
const apiController = require('./ApiController').create();
 
const server = restify.createServer({
  name: 'Url Shortener',
  version: '1.0.0'
});

(() => {
  'use strict';
   
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
   
  server.post('/link/create', (req, res, next) => {
    const url = req.body;
    console.info('Start processing url: ', url);
    if (!validator.isValidUrl(url)) {
      console.error('Wrong URL format: ', url);
      apiController.reportWrongInput(res);
      return next();
    }
    const linkData = encryptor.getUniqueLink();
    const link = linksMap.storeShortUrl(linkData.url, url);
    apiController.reportCreatedLink(res, linkData);
    console.info('Short URL created: ', linkData.url);
    return next();
  });

  server.get('/link/:linkId', (req, res, next) => {
    const linkId = req.params.linkId;
    console.info('Mapping short link: ', linkId);
    const originalLink = linksMap.getUrl(linkId);
    if (!originalLink) {
      console.error('Original link not found for: ', linkId);
      apiController.reportLinkNotFound(res);
      return next();
    }
    console.info('Redirect to original link: ', originalLink);
    apiController.redirectToOriginal(res, originalLink);
    return next();
  });
   
  server.listen(8080, function () {
    console.info('%s listening at %s', server.name, server.url);
  });
})()

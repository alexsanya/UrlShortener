(() => {
  'use strict';

  class LinksMap {

    constructor(mcClient) {
      this.mcClient = mcClient;
    }

    handleError(err, resolve) {
      console.error('Memcahced error');
      console.error(err);
      resolve();    
    }

    getUrl(linkId) {
      return new Promise((resolve, reject) => {
        this.mcClient.get(linkId, (err, url) => { 
          if (err) this.handleError(err, resolve);
          resolve(url);
        });
      });
    }

    storeShortUrl(linkId, url) {
      return new Promise((resolve, reject) => {
        this.mcClient.set(linkId, url, 10000, (err) => { 
          if (err) this.handleError(err, resolve)
          resolve();
        });
      });
    }

    removeShortLink(linkId) {
      return new Promise((resolve, reject) => {
        this.mcClient.del(linkId, function (err) {
          if (err) this.handleError(err, resolve)
          resolve();
        });
      });
    }
  }

  LinksMap.create = (mcClient) => new LinksMap(mcClient);

  module.exports = LinksMap;
})()

(() => {
  'use strict';

  class LinksMap {

    constructor(mcClient) {
      this.map = new Map();
      this.mcClient = mcClient;
    }

    getUrl(linkId) {
      return new Promise((resolve, reject) => {
        resolve(this.map.get(linkId));
      });
    }

    storeShortUrl(linkId, url) {
      return new Promise((resolve, reject) => {
        resolve(this.map.set(linkId, url));
      });
    }

    removeShortLink(linkId) {
      return new Promise((resolve, reject) => {
        resolve(this.map.delete(linkId));
      });
    }
  }

  LinksMap.create = () => new LinksMap();

  module.exports = LinksMap;
})()

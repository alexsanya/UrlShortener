(() => {
  'use strict';

  class LinksMap {

    constructor() {
      this.map = new Map();
    }

    getUrl(linkId) {
      return this.map.get(linkId);
    }

    storeShortUrl(linkId, url) {
      this.map.set(linkId, url);
    }

    removeShortLink(linkId) {
      this.map.delete(linkId);
    }
  }

  LinksMap.create = () => new LinksMap();

  module.exports = LinksMap;
})()

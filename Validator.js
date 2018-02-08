(() => {
  'use strict';

   const mask = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi

  class Validator {

    isValidUrl(url) {
      let regex = new RegExp(mask);
      return !!url.match(regex);
    }

  }

  Validator.create = () => new Validator();

  module.exports = Validator;
})()

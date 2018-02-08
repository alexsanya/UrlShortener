(() => {
  'use strict';

    const config = {
    	urlRegex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
    	shortLinksLength: 7,
    	authKeyLength: 10,
      memcachedConnection: '127.0.0.1:11211',
      apiPort: 8080
    }

    module.exports = config;

})()

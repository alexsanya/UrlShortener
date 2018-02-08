(() => {
  'use strict';

  class ApiController {

    reportWrongInput(res) {
      return res.send(400, 'Invalid URL format').end();
    }

    reportLinkNotFound(res) {
      return res.send(404, 'Original url cannot be found').end();
    }

    reportCreatedLink(res, linkData) {
      res.send(201, {
        shortenUrl: linkData.url,
        key: linkData.key
      }).end();
    }

    redirectToOriginal(res, url) {
      res.writeHead(301, {
        Location: url
      });
      return res.end();
    }

  }

  ApiController.create = () => new ApiController();

  module.exports = ApiController;

})()

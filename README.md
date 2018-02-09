# UrlShortener

### Build and run:

`docker-compose up`

### Access:

`http://localhost:8080`

### Security issues:
- infinit redirects loop
  * try to access link and check if it is already redirect
- oversized input data
  * setup nginx proxy layer and set a linit for requet size
- cross-site scripting
  * use special regex to detect potential attach attempt
- unauthorized attempt to remove link
  * make https authentication for users authentification instead of issuing key

### Scalability issues:
- Remove static content from Node.JS
  * In current implementation static web files hosted by Node.js, but for better performance all static data should be delegated to nginx web server.
- deploying in cluster
  * storage could be easily deployed to multiple clusters since memcache already support replication
- using in memory cache
  * memcached already have this feature


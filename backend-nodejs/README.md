# Docs

I ended up adding 6 endpoints:

* signToken: signs anything you send by body and responses with the generated token.
* verify: I used passport with jwt-strategy, so it will be specting the jwt from headers as Bearer token.
* I used MongoDB with mongoose ORM.
* For starting the client: cd /backend-nodejs && node server.js

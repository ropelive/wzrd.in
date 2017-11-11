'use strict';

const auth = require('./middlewares/auth');
const bodyParser = require('body-parser');

const cullHandler = require('./handlers/cull');
const singularHandler = require('./handlers/singular');
const multiHandlers = require('./handlers/multiple');
const statusesHandler = require('./handlers/statuses');

module.exports = function (app, bundler, config) {
  app.get('/bundle/:slug', singularHandler(bundler));
  app.get('/debug-bundle/:slug', singularHandler(bundler, { debug: true }));
  app.get('/standalone/:slug', singularHandler(bundler, { standalone: true }));
  app.get('/debug-standalone/:slug', singularHandler(bundler, { standalone: true, debug: true }));

  app.post('/multi', bodyParser.json({type:'*/*'}), multiHandlers.create(bundler));

  app.get('/multi/:bundle', multiHandlers.get(bundler));
  app.get('/status/:bundle', statusesHandler(bundler));
}

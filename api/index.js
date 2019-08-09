const dotenv = require('dotenv');

dotenv.config();
const restify = require('restify');
const plugins = restify.plugins;

const config = require('./config/settings');
const routes = require('./route/route');

// service locator via dependency injection
const serviceLocator = require('./config/di');
const logger = serviceLocator.get('logger');
const server = restify.createServer({
  name: config.appName,
  versions: ['1.0.0']
});

// set API version and allow trailing slashes
server.pre(restify.pre.sanitizePath());

// set request handling and parsing
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

// setup Routing and Error Event Handling
routes(server, serviceLocator);

const distFolder = __dirname.replace('api', 'client/dist');
server.get('/*', restify.plugins.serveStatic({
  directory: distFolder,
  default: 'index.html'
}));

server.listen(config.port, () => {
  logger.info(`${server.name} is listening on port ${config.port}`);
});

module.exports = server;

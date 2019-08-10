const dotenv = require('dotenv');
dotenv.config();

const socketIO = require('socket.io');
const restify = require('restify');
const plugins = restify.plugins;

const config = require('./config/settings');
const routes = require('./route/route');
const socketHandler = require('./route/socket');

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

const io = socketIO.listen(server.server);
io.on('connection', (socket) => {
  logger.info('a user connected');
  socketHandler(io, socket, serviceLocator);
});

server.listen(config.port, () => {
  logger.info(`${server.name} is listening on port ${config.port}`);
});
//    todo: change back to node index.js

module.exports = server;

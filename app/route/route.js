const routes = function routes(server, serviceLocator) {
  const gameController = serviceLocator.get('gameController');

  const mainPath = '/game_api';

  server.get({
    path: '/',
    name: 'home',
    version: '1.0.0'
  }, (req, res) => res.send(`Welcome to ${config.appName} API`));

  server.post({
    path: `${mainPath}/start`,
    name: 'Start a game session',
    version: '1.0.0'
  }, (req, res) => gameController.receiveFile(req, res));

  server.post({
    path: `${mainPath}/start`,
    name: 'Start a game session',
    version: '1.0.0'
  }, (req, res) => gameController.receiveFile(req, res));

  server.post({
    path: `${mainPath}/start`,
    name: 'Start a game session',
    version: '1.0.0'
  }, (req, res) => gameController.receiveFile(req, res));

  server.post({
    path: `${mainPath}/start`,
    name: 'Start a game session',
    version: '1.0.0'
  }, (req, res) => gameController.receiveFile(req, res));

};

module.exports = routes;

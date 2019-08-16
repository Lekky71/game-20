const routes = function routes(server, serviceLocator) {
  const gameController = serviceLocator.get('gameController');
  const mainPath = '/game_api';

  server.get({
    path: `${mainPath}/game/:sessionCode`,
    name: 'Get game data',
    version: '1.0.0'
  }, (req, res) => gameController.requestGameData(req, res));

};

module.exports = routes;

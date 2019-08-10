const config = require("../config/settings");

const listeners = (socket, serviceLocator) => {
  const gameController = serviceLocator.get('gameController');

  socket.on('start', (body) => gameController.startGameSession(socket, body));

  socket.on('join', (body) => gameController.joinGameSession(socket, body));

  socket.on('answer', (body) => gameController.receiveSessionAnswer(socket, body));

  socket.on('ask_question', (body) => gameController.receiveHintQuestion(socket, body));

  socket.on('answer_question', (body) => gameController.receiveHintAnswer(socket, body));


  // todo: implementing returning game data
  // socket.on('get_game_session', (body) => gameController.handleEndpoint(socket, body, [], gameController.receiveHintAnswer));




};

module.exports = listeners;

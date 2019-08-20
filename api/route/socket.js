const listeners = (io, socket, serviceLocator) => {
  // Get an instance of the controller
  const gameController = serviceLocator.get('gameController');

  // handle events using the controller handlers
  socket.on('start', (body) => gameController.startGameSession(socket, body));

  socket.on('join', (body) => gameController.joinGameSession(io, socket, body));

  socket.on('answer', (body) => gameController.receiveSessionAnswer(io, socket, body));

  socket.on('ask_question', (body) => gameController.receiveHintQuestion(io, socket, body));

  socket.on('answer_question', (body) => gameController.receiveHintAnswer(io, socket, body));

  socket.on('game_data', (body) => gameController.getGameData(io, socket, body));

};

module.exports = listeners;

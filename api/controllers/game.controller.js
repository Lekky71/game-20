const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');
const SocketEmitter = require('../lib/socket.emitter');

class GameController {
  constructor(logger, service) {
    this.logger = logger;
    this.gameService = service;
    this.createGameParams = ["name", "answer"];
    this.joinGameParams = ["name", "sessionCode"];
    this.answerQuestionParams = ["name", "sessionCode", "answer"];
  }

  validateEndpoint(socket, body, paramsToCheck) {
    this.logger.info(body);
    if (!body) {
      SocketEmitter.failure(socket, 'enter body');
      return false;
    }
    for (let i = 0; i < paramsToCheck.length; i++) {
      const param = paramsToCheck[i];
      if (!body[param]) {
        SocketEmitter.failure(socket, `${param} is required`);
        return false;
      }
    }
    return true
  };

  startGameSession(socket, body) {
    if(this.validateEndpoint(socket, body, this.createGameParams)){
      const {name, hint, answer} = body;
      this.gameService.startGame({playerOne: name, hint, answer})
        .then(session => {
          SocketEmitter.success(socket, 'started_game', session);
        })
        .catch(error => {
          SocketEmitter.failure(socket, error.toString());
        })
    }
  };

  joinGameSession(socket, body) {
    if(this.validateEndpoint(socket, body, this.joinGameParams)){
      const {name, sessionCode} = body;
      this.gameService.joinGame({name, sessionCode})
        .then(session => {
          SocketEmitter.success(socket, 'joined_game', session);
        })
        .catch(error => {
          SocketEmitter.failure(socket, error);
        })
    }
  };

  receiveSessionAnswer(socket, body) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);
  };

  receiveHintQuestion(socket, body) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);

  };

  receiveHintAnswer(socket, body) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);
  };

}

module.exports = GameController;

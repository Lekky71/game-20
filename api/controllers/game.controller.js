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
    this.hintQuestionParams = ["name", "sessionCode", "question"];
    this.hintAnswerParams = ["name", "sessionCode", "questionId", "answer"];
  }

  // a generic function to validate input for an event
  /**
   *
   * @param socket: the client's socket
   * @param body: the object send from the client
   * @param paramsToCheck: parameters to validate for
   * @return {boolean}
   */
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
    if (this.validateEndpoint(socket, body, this.createGameParams)) {
      const {name, hint, answer} = body;
      this.gameService.startGame({playerOne: name, hint, answer})
        .then(session => {
          socket.join(session.sessionCode);
          SocketEmitter.success(socket, 'started_game', session);
        })
        .catch(error => {
          SocketEmitter.failure(socket, error.toString());
        })
    }
  };

  joinGameSession(io, socket, body) {
    if (this.validateEndpoint(socket, body, this.joinGameParams)) {
      const {name, sessionCode} = body;
      this.gameService.joinGame({playerTwo: name, sessionCode})
        .then(session => {
          socket.join(sessionCode);
          SocketEmitter.roomEmit(io, sessionCode, 'joined_game', session);
        })
        .catch(error => {
          SocketEmitter.failure(socket, error);
        })
    }
  };

  receiveSessionAnswer(io, socket, body) {
    if (this.validateEndpoint(socket, body, this.answerQuestionParams)) {
      const {name, sessionCode, answer} = body;
      this.gameService.answerGame({playerTwo: name, sessionCode, answer})
        .then(session => {
          socket.join(sessionCode);
          SocketEmitter.roomEmit(io, sessionCode, 'answer_received', session);
        })
        .catch(error => {
          SocketEmitter.failure(socket, error);
        })
    }
  };

  receiveHintQuestion(io, socket, body) {
    if (this.validateEndpoint(socket, body, this.hintQuestionParams)) {
      const {name, sessionCode, question} = body;
      this.gameService.askHintQuestion({ playerTwo: name, sessionCode, question })
        .then(session => {
          socket.join(sessionCode);
          SocketEmitter.roomEmit(io, sessionCode, 'hint_question_received', session);
        })
        .catch(error => {
          SocketEmitter.failure(socket, error);
        })
    }
  };

  receiveHintAnswer(io, socket, body) {
    if (this.validateEndpoint(socket, body, this.hintAnswerParams)) {
      const {name, sessionCode, questionId, answer} = body;
      this.gameService.answerHintQuestion({ playerOne: name, sessionCode, questionId: parseInt(questionId), answer })
        .then(session => {
          socket.join(sessionCode);
          SocketEmitter.roomEmit(io, sessionCode, 'hint_answer_received', session);
        })
        .catch(error => {
          SocketEmitter.failure(socket, error);
        })
    }
  };

}

module.exports = GameController;

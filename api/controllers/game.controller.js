const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

class GameController {
  constructor(logger, service) {
    this.logger = logger;
    this.billService = service;
  }

  startGameSession(req, res) {
  //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);

  }

  joinGameSession(req, res) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);

  }

  receiveSessionAnswer(req, res) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);

  }

  receiveHintQuestion(req, res) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);

  }

  receiveHintAnswer(req, res) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);

  }

  receiveHintAnswer(req, res) {
    //  todo: handle in service
    return Response.success(res, {"hi": "bawo ni?"}, HttpStatus.ACCEPTED);
  }

}

module.exports = GameController;

const config = require("../config/settings");
const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

const routes = function routes(server, serviceLocator) {
  const gameController = serviceLocator.get('gameController');
  const mainPath = '/game_api';


  const validateEndpoint = (params) => {
    return (req, res, next) => {
      if(!req.body){
        return Response.failure(res, {message: 'enter body'}, HttpStatus.BAD_REQUEST);
      }
      for(let i = 0; i < params.length; i++){
        const param = params[i];
        if(!req.body[param]){
          return Response.failure(res, {message: `${param} is required`}, HttpStatus.BAD_REQUEST);
        }
      }
      next();
    }
  };

  const createGameParams = ["name", "hint", "answer"];
  const joinGameParams = ["name", "sessionCode"];
  const answerQuestionParams = ["name", "sessionCode", "answer"];

  server.post({
    path: `${mainPath}/start`,
    name: 'Player one starts a game session',
    version: '1.0.0'
  }, validateEndpoint(createGameParams), (req, res) => gameController.startGameSession(req, res));

  server.post({
    path: `${mainPath}/join`,
    name: 'Player two joins the game session',
    version: '1.0.0'
  }, validateEndpoint(joinGameParams), (req, res) => gameController.joinGameSession(req, res));

  server.post({
    path: `${mainPath}/answer`,
    name: 'Player two sends an answer',
    version: '1.0.0'
  }, validateEndpoint(answerQuestionParams), (req, res) => gameController.receiveFile(req, res));

  server.post({
    path: `${mainPath}/ask_question`,
    name: 'Player two sends an answer',
    version: '1.0.0'
  }, (req, res) => gameController.receiveFile(req, res));

  server.post({
    path: `${mainPath}/answer_question`,
    name: 'Player two sends an answer',
    version: '1.0.0'
  }, (req, res) => gameController.receiveFile(req, res));


};

module.exports = routes;

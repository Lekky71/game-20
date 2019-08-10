const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const config = require("../config/settings");
const Session = require('../models/session').Session;
const Question = require('../models/question').Question;
const PostgresHelper = require('../lib/postgresHelper');

class GameService {
  constructor(logger, sequelize) {
    this.logger = logger;
    this.sequelize = sequelize;
    this.sessionPostgresHelper = new PostgresHelper(Session);
    this.questionPostgresHelper = new PostgresHelper(Question);
  }

  startGame(params) {
    return new Promise((resolve, reject) => {
      params["sessionCode"] = randomstring.generate(5);
      const saltRounds = 10;
      params.answer = bcrypt.hashSync(params.answer, saltRounds);
      this.sessionPostgresHelper.create(params)
        .then(session => {
          this.logger.info("created");
          this.logger.info(session);
          return resolve(this.sessionPostgresHelper.getGameSessionByCode(session.sessionCode));
        })
        .catch(error => {
          this.logger.error(error);
          return reject(error);
        });
    });
  }

  joinGame(params) {
    return new Promise((resolve, reject) => {
      const query = {sessionCode: params.sessionCode};
      let message = 'An error occurred🤔, kindly try again later';

      this.sessionPostgresHelper.get(query)
        .then(session => {
          if (session) {
            if (session.playerOne === params.playerTwo) {
              message = 'Player names cannot be the same🙅‍♂️, use another name.'
              return reject(message);
            }
            session.update({playerTwo: params.playerTwo})
              .then(result => {
                return resolve(this.sessionPostgresHelper.getGameSessionByCode(result.sessionCode));
              })
              .catch(err => {
                return reject(message);
              })
          }
          else {
            message = `The session with code ${params.sessionCode} does not exist`;
            return reject(message)
          }
        })
        .catch(err => {
          return reject(message);
        });
    });
  }

  answerGame(params) {
    return new Promise((resolve, reject) => {
      const query = {sessionCode: params.sessionCode, playerTwo: params.playerTwo};
      let message = 'An error occurred🤔, kindly try again later';

      this.sessionPostgresHelper.get(query)
        .then(session => {
          if (session) {
            if (session.ended) {
              return resolve(this.sessionPostgresHelper.getGameSessionByCode(session.sessionCode));
            }
            else if (bcrypt.compareSync(params.answer, session.answer)) {
              session.ended = true;
              session.correct = true;
            }
            else {
              const guesses = session.guesses;
              guesses.push(params.answer);
              session.guesses = guesses;
            }

            session.save()
              .then(result => {
                return resolve(this.sessionPostgresHelper.getGameSessionByCode(result.sessionCode));
              })
              .catch(err => {
                return reject(message);
              });
          }
          else {
            message = `The session with code ${params.sessionCode} does not exist`;
            return reject(message)
          }
        })
        .catch(err => {
          return reject(message);
        });
    });
  }

  askHintQuestion(params) {
    return new Promise((resolve, reject) => {
      let message = 'An error occurred🤔, kindly try again later';

      return this.sessionPostgresHelper.getGameSessionByCode(params.sessionCode)
        .then(session => {
          const questions = session.questions;
          if (session) {
            if (session.ended) {
              return resolve(session);
            }
            else if (params.playerTwo !== session.playerTwo) {
              message = 'not authorized';
              return reject(message);
            }
            else if (questions.length === 20) {
              message = "only 20 questions allowed, that's why the game is called game-20😜.";
              return reject(message);
            }
            this.questionPostgresHelper.create({question: params.question, sessionId: session.id})
              .then(question => {
                if (questions.length === 19) {
                  session.ended = true;
                }
                session.save()
                  .then(result => {
                    return resolve(this.sessionPostgresHelper.getGameSessionByCode(params.sessionCode));
                  })
                  .catch(err => {
                    return reject(message);
                  });
              });
          }
          else {
            message = `The session with code ${params.sessionCode} does not exist`;
            return reject(message)
          }
        })
        .catch(err => {
          return reject(message);
        });
    });
  }

  answerHintQuestion(params) {
    return new Promise((resolve, reject) => {
      const query = {sessionCode: params.sessionCode};
      let message = 'An error occurred🤔, kindly try again later';

      return this.sessionPostgresHelper.get(query)
        .then(session => {
          if (session) {
            if (session.ended) {
              return resolve(session);
            }
            else if (params.playerOne !== session.playerOne) {
              message = 'not authorized';
              return reject(message);
            }

            this.questionPostgresHelper.get({id: params.questionId})
              .then(question => {
                if(question.answer !== null){
                  message = 'already answered';
                  return reject(message);
                }
                question.answer = params.answer === "yes";
                question.save()
                  .then(result => {
                    return resolve(this.sessionPostgresHelper.getGameSessionByCode(params.sessionCode));
                  })
                  .catch(err => {
                    return reject(message);
                  });
              });
          }
          else {
            message = `The session with code ${params.sessionCode} does not exist`;
            return reject(message)
          }
        })
        .catch(err => {
          return reject(message);
        });
    });
  }

}

module.exports = GameService;


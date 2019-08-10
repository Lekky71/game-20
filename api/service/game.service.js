const fs = require('fs');
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
  }

  startGame(params) {
    return new Promise((resolve, reject) => {
      params["sessionCode"] = randomstring.generate(5);
      this.sessionPostgresHelper.create(params)
        .then(session => {
          this.logger.info("created");
          this.logger.info(session);
          return resolve(session)
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
      let message = 'An error occurred, kindly try again later';

      this.sessionPostgresHelper.get(query)
        .then(session => {
          if (session) {
            session.update({playerTwo: params.name})
              .then(result => {
                return resolve(this.sessionPostgresHelper.getGameSession(result.id));
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

}

module.exports = GameService;


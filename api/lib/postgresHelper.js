const Session = require('../models/session').Session;
const Question = require('../models/question').Question;

class PostgresHelper {
  constructor(Model) {
    this.Model = Model;
  }

  create(params) {
    return new Promise((resolve, reject) => {
      return this.Model.create(params)
        .then(result => {
          return resolve(result);
        })
        .catch(err => reject(err));
    });
  }

  get(params) {
    return this.Model.findOne({where: params});
  }

  getGameSessionByID(id) {
    return this.getGameSession({ id });
  }
  getGameSessionByCode(sessionCode) {
    return this.getGameSession({ sessionCode });
  }

  getGameSession(param) {
    const options = {
      where: param, include:
        [{
          model: Question
        }]
    };
    return new Promise((resolve, reject) => {
      return Session.findOne(options).then(result => {
        return resolve(result);
      }).catch(err => reject(err));
    });
  }

  update(object, params) {
    return new Promise((resolve, reject) => {
      object.update(params)
        .then(result => {
          return this.getGameSessionByCode(result.code);
        })
        .catch(err => {
          return reject(err);
        })
    });
  }


}

module.exports = PostgresHelper;

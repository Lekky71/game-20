const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Session extends Model {}

const sessionBody = {
  playerOne: {
    type: Sequelize.STRING,
    allowNull: false
  },
  playerTwo: {
    type: Sequelize.STRING,
  },
  hint: {
    type: Sequelize.STRING,
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

module.exports = {
  Session,
  sessionBody
};

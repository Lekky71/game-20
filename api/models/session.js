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
  },
  sessionCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  guesses: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  },
  ended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
};

module.exports = {
  Session,
  sessionBody
};

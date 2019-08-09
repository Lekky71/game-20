const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Question extends Model {}

const questionBody = {
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: true
  },
  sessionCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

module.exports = {
  Question,
  questionBody
};

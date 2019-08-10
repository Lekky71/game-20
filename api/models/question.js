const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Question extends Model {}

const questionBody = {
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  answer: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
};

module.exports = {
  Question,
  questionBody
};

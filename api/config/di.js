const winston = require('winston');
const Sequelize = require('sequelize');

const config = require('./settings');
const serviceLocator = require('../lib/serviceLocator');
const GameController = require('../controllers/game.controller');
const GameService = require('../service/game.service');

const SessionModel = require('../models/session');
const Session = SessionModel.Session;
const sessionBody = SessionModel.sessionBody;

const QuestionModel = require('../models/question');
const Question = QuestionModel.Question;
const questionBody = QuestionModel.questionBody;


/**
 * Returns an instance of logger
 */
/**
 * Returns an instance of logger for the App
 */
serviceLocator.register('logger', () => {
  const consoleTransport = new (winston.transports.Console)({
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    json: false,
    colorize: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
  });
  const transports = [consoleTransport];
  return winston.createLogger({
    transports,
  });
});

/**
 * Returns a postgresql connection instance.
 */
serviceLocator.register('sequelize', () => {
  const logger = serviceLocator.get('logger');
  logger.info('About to create sequelize.');
  logger.info(process.env.ENV);

  const sequelize = new Sequelize(config.postgresql.database, config.postgresql.username, config.postgresql.password, {
    host: config.postgresql.host,
    port: config.postgresql.port,
    logging: (msg) => logger.info(msg),
    dialect: 'postgres'
  });

  logger.info('Created sequelize.');
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Connection has been established successfully.');

      Session.init(sessionBody, {
        sequelize,
        modelName: config.postgresql.sessionTable
      });

      Question.init(questionBody, {
        sequelize,
        modelName: config.postgresql.questionTable
      });

      Session.hasMany(Question);

      sequelize.sync({force: false })
        .then(() => {
          logger.info(`tables created!`)
        })

    })
    .catch(err => {
      logger.error(`could not connect to database : ${JSON.stringify(err)}`);
    });

  return sequelize;
});


// SERVICE INSTANCES

/**
 * Creates instances of services
 */
serviceLocator.register('gameService', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  const sequelize = serviceLocator.get('sequelize');
  return new GameService(logger, sequelize);
});

// CONTROLLER INSTANCES

/**
 * Creates instances of controllers
 */
serviceLocator.register('gameController', (serviceLocator) => {
  const logger = serviceLocator.get('logger');
  const service = serviceLocator.get('gameService');
  return new GameController(logger, service);
});

module.exports = serviceLocator;

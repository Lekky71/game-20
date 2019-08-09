const config = {
  appName: process.env.APP_NAME,
  port: process.env.PORT,
  postgresql: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    sessionTable: process.env.PG_TABLE_SESSION,
    questionTable: process.env.PG_TABLE_QUESTION,
  }
};

module.exports = config;

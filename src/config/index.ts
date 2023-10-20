const envConfig = Object.freeze({
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  PAGE_SIZE: process.env.PAGE_SIZE,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
});

export default envConfig;
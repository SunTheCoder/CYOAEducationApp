require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    
    dialect: 'postgres'
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL', // This will use the full DATABASE_URL connection string
    dialect: 'postgres'
  }
};

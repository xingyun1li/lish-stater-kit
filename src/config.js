if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

const config = {
  port: process.env.PORT || 3000,
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
  },
  redisConf: {
    host: 'localhost',
    port: 6379,
  },
  mysqlConf: {
    host: 'localhost',
    user: 'lish',
    password: 'xingyun1li',
    database: 'redmine',
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'Lish Starter Kit',
    },
    github: {
      id: process.env.GITHUB_CLIENT_ID || '26b07d39379cfdf7b574',
      secret: process.env.GITHUB_CLIENT_SECRET || '8a3a63f843392fceee711c0af0c457295780e56e',
    },
  },
};

export default config;

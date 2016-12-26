export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost${port}`;

export const auth = {
  jwt: {
    secret: process.env.JWT_SECRET || 'Lish Starter Kit'
  },
  github: {
    id: process.env.GITHUB_CLIENT_ID || '26b07d39379cfdf7b574',
    secret: process.env.GITHUB_CLIENT_SECRET || '8a3a63f843392fceee711c0af0c457295780e56e'
  }
};
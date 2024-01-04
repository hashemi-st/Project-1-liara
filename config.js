import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config()

const config = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET : crypto.randomBytes(32).toString('hex'),
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_FROM: process.env.MAIL_FROM,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET

};

export default config;



import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;

export interface MongoConfig {
  host: string;
  port: number;
  db: string;
  user: string;
  password: string;
  authDB: string;
}

const validationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  port: Joi.number().port().default(DEFAULT_MONGO_PORT),
  db: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authDB: Joi.string().required()
});

function validateConfig(config: MongoConfig) {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(`[MongoConfig validation error] : ${error.message}`);
  }
}

function getConfig(): MongoConfig {
  const config: MongoConfig = {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT || `${DEFAULT_MONGO_PORT}`, 10),
    db: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authDB: process.env.MONGO_AUTH_BASE
  };

  validateConfig(config);
  return config;
}

export default registerAs('mongo', getConfig);

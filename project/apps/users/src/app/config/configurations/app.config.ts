import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['production', 'development', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  port: number;
  environment: string;
}

const validationSchema = Joi.object({
  port: Joi.number().port().default(DEFAULT_PORT), // Не понятно зачем см. строку 30
  environment: Joi.string().valid(...ENVIRONMENTS).required()
});

function validateConfig(config: ApplicationConfig) {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(`[ApplicationConfig validation error] : ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment, // Не понятно зачем
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10)
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);

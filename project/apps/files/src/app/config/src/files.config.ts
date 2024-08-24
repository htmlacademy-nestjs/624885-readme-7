import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_SERVE_ROOT = '/';

type Environment = typeof ENVIRONMENTS[number];

export interface FilesConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
  serveRoot: string;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
  serveRoot: Joi.string().default(DEFAULT_SERVE_ROOT)
});

function validateConfig(config: FilesConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if(error) {
    throw new Error(`[FileVault Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): FilesConfig {
  const config: FilesConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY,
    serveRoot: process.env.SERVE_ROOT
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);

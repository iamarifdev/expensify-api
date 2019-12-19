interface IEnvConfig {
  ENV: string;
  PORT: string | number;
  URL: string;
  MONGODB_URI: string;
  CURRENT_VERSION: string;
}

export const getEnvConfig = (environment: string): IEnvConfig => {
  const envConfig = require(`../../env/${environment}.env`) as IEnvConfig;
  if (!envConfig) {
    throw new Error(`Make sure ${environment}.env file is exist and it is valid .js file.`);
  }
  return envConfig;
};

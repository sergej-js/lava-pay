import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  setupFiles: ['dotenv/config'],
};

export default config;
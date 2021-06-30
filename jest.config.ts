import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  snapshotSerializers: ['jest-snapshot-serializer-raw/always'],
};
export default config;

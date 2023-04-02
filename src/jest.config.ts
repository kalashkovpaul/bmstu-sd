import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    automock: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.(js,jsx)",
        "src/**/*.(ts,tsx)",
        "!vendor/**/*.(js,jsx)",
        "!**/node_modules/**"
    ],
    coverageProvider: "babel",
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        // '^lib/(.*)$': '<rootDir>/common/$1',
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        '^.+\\.ts?$': [
            'ts-jest',
            {
              useESM: true,
            },
        ],
    },
    modulePathIgnorePatterns: ["<rootDir>/dist/"]
}

export default config;
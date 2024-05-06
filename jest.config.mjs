import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  roots: ["<rootDir>/src/testing/jest", "<rootDir>"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/public/"],
  coveragePathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/public/"],
  collectCoverageFrom: ["./src/**/*.{ts, tsx, js, tsx}"],
  // commit the following lines if want to start enforcing codebase with strict unit / integration testing
  // coverageThreshold: {
  //   global: {
  //     lines: 80,
  //     branches: 80,
  //   },
  // },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

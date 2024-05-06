// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
import "@testing-library/jest-dom/extend-expect";

// global mocks
// NOTE: mocks here will be runned on every test case
// so only truelly global mock should be put here
import "./src/testing/jest/matchMedia.mock.ts"
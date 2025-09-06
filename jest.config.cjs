/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Setup files
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],

  // Module name mapping for path aliases (corrected!)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@gql/(.*)$": "<rootDir>/src/gql/$1",
  },

  // Test patterns
  testMatch: [
    "<rootDir>/src/__tests__/**/*.(test|spec).{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}",
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/gql/generated/**",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],

  // Transform configuration for React support
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          moduleResolution: "node",
          target: "ES2017",
          lib: ["ES2017", "DOM", "DOM.Iterable"],
          baseUrl: ".",
          paths: {
            "@/*": ["./src/*"],
            "@gql/*": ["./src/gql/*"],
          },
        },
      },
    ],
  },

  // Module file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Clear mocks between tests
  clearMocks: true,

  // Test timeout
  testTimeout: 10000,
};

module.exports = config;

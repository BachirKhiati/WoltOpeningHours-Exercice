module.exports = {
    roots: ['<rootDir>'],
    preset: 'react-native',
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest'
    // },
    // transform: {
    //     '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    //     '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    // },
    globals: {
        'ts-jest': {
            babelConfig: true
        }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    setupFiles: [
        './node_modules/react-native-gesture-handler/jestSetup.js',
        '<rootDir>/jest.config.js'
    ],
    cacheDirectory: '.jest/cache',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'app/react/**/*.{ts,tsx}',
        '!app/react/__tests__/api/api-test-helpers.ts'
    ],

    testPathIgnorePatterns: [
        '\\.snap$',
        '<rootDir>/node_modules/',
        '<rootDir>/lib/',
        '<rootDir>/__tests__/json/'
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

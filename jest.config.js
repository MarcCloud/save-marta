module.exports = {
    verbose: true,
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
module.exports = {
    globals: {
        __PATH_PREFIX__: ""
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/tests/__mocks__/file-mock.js"
    },
    setupFiles: [
        "<rootDir>/tests/loadershim.js"
    ],
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/src/**/?(*.)+(test).[jt]s?(x)"
    ],
    testPathIgnorePatterns: [
        "node_modules",
        "\\.cache",
        "<rootDir>.*/public"
    ],
    testEnvironmentOptions: {
        url: "http://localhost:8000"
    },
    transform: {
        "^.+\\.[jt]sx?$": "<rootDir>/tests/jest-preprocess.js"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(gatsby)/)"
    ]
};

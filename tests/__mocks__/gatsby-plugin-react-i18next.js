const { languages, defaultLanguage } = require("../../i18next");

module.exports = {
    Link: ({ children }) => children,
    Trans: ({ children }) => children,
    useI18next: () => {
        return {
            languages,
            language: defaultLanguage,
            changeLanguage: () => new Promise(() => {}),
        };
    },
}

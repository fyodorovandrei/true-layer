const { languages, defaultLanguage } = require("../../i18next");

module.exports = {
    Link: ({ children }) => children,
    Trans: ({ children }) => children,
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    useI18next: () => {
        return {
            languages,
            language: defaultLanguage,
            changeLanguage: () => new Promise(() => {}),
        };
    },
}

module.exports = {
    Link: ({ children }) => children,
    Trans: ({ children }) => children,
    useI18next: () => {
        return {
            languages: ["en"],
            language: "en",
            changeLanguage: () => new Promise(() => {}),
        };
    },
}

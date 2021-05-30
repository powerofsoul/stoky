export default {
    siteName: "Stocky",
    url:
        process.env.NODE_ENV == "development"
            ? "http://localhost:3000"
            : "https://stoky.io",
};

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "StayZen",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  // test: { ... },
  // production: { ... },
};

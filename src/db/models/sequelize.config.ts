import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.database || "StayZen",
  username: process.env.username || "root",
  password: process.env.password || "root",
  host: process.env.host?.replace("http://", "").split(":")[0] || "127.0.0.1",
  port: parseInt(process.env.host?.split(":")[1] || "3306"),
  dialect: "mysql",
});

export default sequelize;
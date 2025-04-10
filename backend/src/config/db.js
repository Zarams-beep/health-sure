import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres", 
    logging: false, 
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1); // Stop server if DB connection fails
    }
};

export { sequelize, connectDB };

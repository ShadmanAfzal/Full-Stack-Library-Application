import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: process.env.PORT || 8080,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
}
import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: process.env.PORT || 8080,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SESSION_KEY: process.env.SESSION_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    Client_ID: process.env.Client_ID,
    Client_Secret: process.env.Client_Secret,
    CALLBACK_URL: process.env.CALLBACK_URL,
}
import dotenv from 'dotenv'
dotenv.config()

export const config = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    VERIFY_TOKEN: process.env.VERIFY_TOKEN,
    PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN
}
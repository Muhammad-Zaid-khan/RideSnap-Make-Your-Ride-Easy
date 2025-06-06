import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });
console.log(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD);


const sequelize = new Sequelize(
    process.env.DB_NAME! ,
    process.env.DB_USERNAME! ,
    process.env.DB_PASSWORD ,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
    } 
);


export default sequelize;
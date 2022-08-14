// import pg from "pg";
// import dotenv from "dotenv";
// dotenv.config();

// const { Pool } = pg;
// const configDatabase = {
//   connectionString: process.env.DATABASE_URL
// };

// if(process.env.MODE === "PROD") {
//   configDatabase.ssl = {
//     rejectUnauthorized: false
//   }
// }

// const db = new Pool(configDatabase);
// export default db;


import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const db = new Pool({

host : "localhost",
port : 5432 ,
user :"postgres",
password : "admin",
database : "newlinker"
});


export default db;

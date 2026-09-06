import mysql from 'mysql2'
import 'dotenv/config'; 

const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
})

conn.connect((err) => {
    if(err){
        console.log("connection was failed")
        return;
    }
    console.log("connection was sucussesful")
})
export default conn;
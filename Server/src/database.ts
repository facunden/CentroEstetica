import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createConnection(keys.database);

pool.connect((err)=>{
    if(!err){
        console.log("DB is connected");
    }
    else{
        console.log("DB not connected");
    }
    }
)

export default pool;

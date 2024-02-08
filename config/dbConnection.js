const mongoose = require('mongoose');
const username = encodeURIComponent("Md7861942");
const password = encodeURIComponent("Md7861942@k");
const uri = `mongodb+srv://${username}:${password}@crud.xpqm72v.mongodb.net/crud?retryWrites=true&w=majority`;
require('dotenv').config();
const connDb = async () =>{
    try {

const connect = await mongoose.connect(uri);
   console.log("Database connected => ",
                 connect.connection.host,
                 connect.connection.name
    );

    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
connDb()
module.exports = connDb;
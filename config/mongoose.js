const mongoose = require("mongoose")
require('dotenv').config()
 //connected().catch(Error).console.log("mon erreur niveau bd", Error)
async function connected(){
    await mongoose.connect(process.env.Mongo_URL)
    console.log('connection a la base de donner reuissit');
    
}
module.exports ={
    connected
}
require("dotenv").config();

const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("DATABASE CONNECTED");

    process.exit();

})

.catch((error)=>{

    console.log(
        "DATABASE ERROR:",
        error.message
    );

});
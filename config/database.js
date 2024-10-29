const mongoose = require('mongoose');

module.exports.connect = async() => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to database');
    }catch(err){
        console.log(err);
    }
}

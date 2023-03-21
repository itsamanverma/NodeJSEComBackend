const { default: mongoose} = require('mongoose');

const dbConnect = () => {
   try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoose database connected successfully");
   } catch (error) {
     throw error;
   }
}

module.exports = dbConnect;
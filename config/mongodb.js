const mongoose = require('mongoose');



const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    try {
        console.log(`db connected successfully`);
    } catch (error) {
        console.log(`connection error`, error)
    }
}

module.exports = connectDB;
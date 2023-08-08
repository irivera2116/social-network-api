const mongoose =require('mongoose');

mongoose.set('strictQuery', true);

// Used to connect to local connection of MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
const mongoose =require('mongoose');

mongoose.set('strictQuery', true);

// Used to connect to local connection of MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;

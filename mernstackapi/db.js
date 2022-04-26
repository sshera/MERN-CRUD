const mongoose = require('mongoose');

mongoose.connect('mongodb://rootuser:rootpass@localhost:27017/', err => {
    if(!err) {
        console.log('MongoDB connection succeeded');
    } else {
        console.log('Error while connecting to MongoDB: ' + JSON.stringify(err, undefined, 2));
    }
});

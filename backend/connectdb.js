const mongoose = require('mongoose');

function connect() {
    const uri = 'mongodb+srv://mail4shavi:oZIBh7PlnSnY6OZ7@cluster0.6ccx5.mongodb.net/SIH?retryWrites=true&w=majority';

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
    });
}

module.exports = connect;

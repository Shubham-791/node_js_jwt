const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
// Route Middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/user/posts', postsRoute);
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('Connnected To DB');
    } else {
        console.log('Error in Connection');
    }
});
app.listen(3000, () => console.log('App is listening on port 3000'));
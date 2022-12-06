const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const AuthMiddleware = require('./middleware/AuthMiddleware');
const app = express();
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializing CORS
app.use(cors());

//Defining route
const api = require('./routes/api');
app.use('/api', api);

app.use(process.env.SERVER_BASEPATH + '/auth', AuthMiddleware.checkAuth, AuthMiddleware.checkRole(['manager', 'employee']), require('./routes/api'));

app.get('/', function (req, res) {
    res.send({ message :"App containing various API endpoints" });
});

//If trying to access unknow route or if facing server error
app.use(function (req, res, next) {
    let err = new Error();
    err.status = 404;
    // next(err);
    if (err.status === 404)
        res.send({ message: "Page not found" });
    else if(err.status === 500)
        res.send({ message: "Server error! :{" });
    else
        res.send({ message: "Something's not right! :{" });
        
});

// Initializing the Server
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOSTNAME, () => {
    console.log(`Server running at http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/`);
});
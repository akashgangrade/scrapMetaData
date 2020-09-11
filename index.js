const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const scrapMetaData =  require('./handler/scrapMetaData');

app.disable('x-powered-by');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// APIs
app.post('/scrapMetaData', scrapMetaData);

// Api to be used for health check.
app.get('/', async (req, res) => {
    res.status(200).send(`Server is up...`);
});

// Service not found in case of wrong API call
app.get('*', async (req, res) => {
    res.status(404).send(apiResponse.error('Service not found.'));
});

// Server connection
const PORT= process.env.PORT || 5001;
app.listen( PORT, () => { 
    console.log( `Server started at port ${PORT}` );
});
module.exports = app;

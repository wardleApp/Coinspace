const express = require('express');
const bodyParser = require('body-parser');
const cryptoAPI = require('../BitFinexAPI/BitFinexAPI.js');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

cryptoAPI.BitfinexAPI()
.then((data) => {
	console.log('This is the data', data);
})


const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
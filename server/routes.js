var db = require('../database/index.js');
var router = require('express').Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/up', (req, res) => {
	res.send(200);
});

router.post('/up', (req, res) => {
	bcrypt.hash(req.body.password, saltRounds)
	.then(function(hash) {
		db.insertNewUser(req.body.email, hash)
		.then(() => {
			res.sendStatus(201);
		})
    })
    .catch((error) => {
    	console.log('There is an error in routes.js sign up', error);
	})
});

router.get('/in', (req, res) => {
	res.send(200);
});

router.post('/in', (req, res) => {
	db.findExistingUser()
	.then((data) => {
		return data.filter((entry) => {
			return (entry.email === req.body.email);
		})
	})
	.then((results) => {
		bcrypt.compare(req.body.password, results[0].password)
		.then(function(res) {
			if(res) {
				res.status(201).send(true);
			} else {
				res.status(201).send(false);
			}
		})
	})
	.catch((error) => {
    	console.log('There is an error in routes.js sign in', error);
	})
});

module.exports = router;
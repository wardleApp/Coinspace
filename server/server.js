const express = require('express');
const bodyParser = require('body-parser');
const cryptoAPI = require('../BitFinexAPI/BitFinexAPI.js');
const CronJob = require('cron').CronJob;
const moment = require('moment-timezone');
const db = require('../database/index.js');
const favicon = require('express-favicon');
const socket = require('socket.io');
const router = require('./routes.js');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

//passport + facebook
passport.use(new FacebookStrategy({
    clientID: '142468679794360',
    clientSecret: 'dc9b545b3bf20babe315f1757594edf0',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//rest of the app

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/../client/dist/img/favicon.ico'));

app.use(express.static(__dirname + '../../client/dist'));

// Dillon Experimental Route for SignUp UserPassword
app.use('/sign', router);

new CronJob('*/30 * * * *', () => {
// API call
  cryptoAPI.BitfinexAPI()
    .then((data) => {
      let now = moment(new Date()).tz('America/Los_Angeles').format(`MM/DD/YYYY HH`);
      Promise.all(data.map((coin, index) => {
        // then write to dB
        return db.client.query(`insert into price_history (coin_id, time_stamp, price) values (${index + 1}, '${now}', ${coin[1]})`);
      })).then(result => {
        console.log('insert sucess', result);
      }).catch(err => {
        console.log('insert err', err);
      });
    }).catch(err => {
      console.log('api err', err);
    });
// sample result [[ 'tBTCUSD', // SYMBOL
//                 14721, // BID
//                 192.76423686, // BID_SIZE
//                 14722, // ASK
//                 51.69043092, // ASK_SIZE
//                 -348.49653855, // DAILY_CHANGE
//                 -0.0231, // DAILY_CHANGE_PERC
//                 14719.50346145, // LAST_PRICE
//                 45888.69199867, // VOLUME
//                 15355, // HIGH
//                 14122 // LOW]]
}, null, true, 'America/Los_Angeles');

app.get('/update', (req, res) => {
  // front end has cronJob to ask for new update every half hour
  // Read from db and then respond with latest prices
  db.client.query(`select *, to_timestamp(time_stamp, 'MM/DD/YY HH24') as date from price_history order by date desc limit 4`)
    .then(results => {
      res.json(results);
    }).catch(err => {
      console.log('get current price err', err);
    });
});

app.get('/init', (req, res) => {
  // load historical data into client
  Promise.all([db.getYearData(), db.getMonthData(), db.getWeeklyData()])
    .then(results => {
      res.json(results);
    }).catch(err => {
      console.log('init err', err);
    });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`server, listening on port ${port}`);
});

const io = socket(server);

io.on('connection', socket => {
  io.emit('new message', 'A new user joined the chat');
  socket.on('message', data => {
    io.emit('new message', data);
  });
  socket.on('disconnect', () => {
    io.emit('new message', 'A user disconnected');
  });
});

module.exports = app;

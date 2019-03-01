const express = require('express');
const morgan = require('morgan');
const path = require('path');
const request = require('request');
const cors = require('cors');
const app = express();
const port = process.env.port || 3005;

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const infoServer = 'http://ec2-52-53-177-126.us-west-1.compute.amazonaws.com';
const menuServer = 'http://ec2-18-212-129-29.compute-1.amazonaws.com';
const reviewServer = 'http://ec2-18-219-151-31.us-east-2.compute.amazonaws.com';
const reservationServer = 'http://ec2-54-153-45-179.us-west-1.compute.amazonaws.com';

app.get('/restaurant/profile/:restaurant_id', (req, res) => {
  request(`${infoServer}${req.originalUrl}`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      res.send(body);
    }
  });
});

app.get('/restaurants/:restaurant_id/menu', (req, res) => {
  request(`${menuServer}${req.originalUrl}`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      res.send(body);
    }
  });
});

app.get('/reservations/timesBookedToday/:restaurant_id', (req, res) => {
  request(`${reservationServer}${req.originalUrl}`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      console.log('timesbooked', body)
      res.send(body);
    }
  });
});

app.get('/reservations/inventory', (req, res) => {
  request(`${reservationServer}${req.originalUrl}`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      console.log('inventory', body)
      res.send(body);
    }
  })
});

app.get('/restaurant/:restaurant_id/reviews', (req, res) => {
  request(`${reviewServer}${req.originalUrl}`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      console.log('reviews', body)
      res.send(body);
    }
  });
});


app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
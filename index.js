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
const infoServer = 'http://localhost:3001';
const menuServer = 'http://localhost:3000';
const reviewServer = 'http://localhost:8080';
const reservationServer = 'http://localhost:3002';

app.get('/restaurant/profile/:restaurant_id', (req, res) => {
  request(`${infoServer}/restaurant/profile/${req.params.restaurant_id}`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      res.send(body);
    }
  });
});

app.get('/restaurants/:restaurant_id/menu', (req, res) => {
  request(`${menuServer}/restaurants/${req.params.restaurant_id}/menu`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      res.send(body);
    }
  });
});

app.get('/restaurant/:restaurant_id/reviews', (req, res) => {
  request(`${reviewServer}/restaurant/${req.params.restaurant_id}/reviews`, (err, response, body) => {
    if (err) {
      throw err;
    } else {
      console.log('reviews', body)
      res.send(body);
    }
  });
});

app.get('/reservations/timesBookedToday/:restaurant_id', (req, res) => {
  request(`${reservationServer}/reservations/timesBookedToday/${req.params.restaurant_id}`, (err, response, body) => {
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

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
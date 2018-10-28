const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

// setovanje sesije za cookies
app.use(
  cookieSession({
    // koliko dugo ostaje u browseru
    // 30 dana, 24h, 60min, 60sec i 1000 mili sekundi
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

/**
 * Production version verification. It needs to build for React client.
 */
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file or main.css file!
  // this guarantees that expressjs will look
  // for specific files in specific directories
  app.use(express.static('../client/build')); // if get request comes in from some route or some file or for anything for my application and we do not understant, then look in some file from this directory to see if some file that matches up the request

  // Express will serve up the index.html file
  // if it doesn't recognize the route.
  // If something arrives from a route that we do not understand,
  // look at the index.htm file in the client directory
  const path = require('path');
  app.get('*', (req, res) => {
    console.log ("NEXUS-__dirname: " + __dirname);
    console.log ("NEXUS-res:" + res);
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// load npm packages
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
require("dotenv").config();

// load files
const User = require("./models/User");

// mongoose configuration
const mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

// connect to database
mongoose
  .connect(process.env.MONGO_URI, mongooseConfig)
  .then(() => console.log("DB Connected"))
  .catch(error => console.log(`DB connection error: ${error.message}`));

// timestamp configuration
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const timeConfig = { second, minute, hour, day, week };

// session configuration
const sessionConfig = {
  name: "user-auth.sid",
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 2 * timeConfig.week
  }),
  resave: false,
  saveUnitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 2 * timeConfig.week
  }
};

// passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set initial variables
const app = express();
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT;
const root = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL;
const server = next({ dev });
const handle = server.getRequestHandler();

// create next server
server.prepare().then(() => {
  // let next handle all next-related files & events
  app.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  app.get("/static/*", (req, res) => {
    handle(req, res);
  });

  app.get("*", (req, res) => {
    handle(req, res);
  });

  // setup middleware
  app.use(express.json());
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  // custom middleware
  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

  // set port to listen to
  app.listen(port, (req, res) => {
    console.log(`Listening on port ${root}`);
  });
});

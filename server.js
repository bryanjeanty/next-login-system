// load npm packages
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const validator = require("express-validator");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();

// load files
const User = require("./server/models/User");
const userRouter = require("./server/routes/User");
const sessionRouter = require("./server/routes/Session");

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
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 2 * timeConfig.week
  }
};

// passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// cors configuration
const corsOptions = {
  origin: "http://localhost:3000"
};

// set initial variables
const app = express();
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT;
const root = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL;
const server = next({ dev });
const handle = server.getRequestHandler();

// create next server
server.prepare().then(() => {
  // setup middleware
  app.use(express.json());
  app.use(validator());
  app.use(morgan("dev", { skip: request => request.url.includes("_next") }));
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors(corsOptions));

  // custom middleware
  app.use((request, response, next) => {
    response.locals.user = request.user || null;
    next();
  });

  // use routers
  app.use("/api/users", userRouter);
  app.use("/api/session", sessionRouter);

  // custom routes
  app.get("/lyrics/track/:id", (request, response) => {
    return server.render(request, response, "/lyrics", {
      id: request.params.id
    });
  });

  // let next handle all next-related files & events
  app.get("/_next/*", (request, response) => {
    handle(request, response);
  });

  app.get("/static/*", (request, response) => {
    handle(request, response);
  });

  app.get("*", (request, response) => {
    handle(request, response);
  });

  // setup production conditions
  if (!dev) {
    app.use(helmet());
    app.use(compression());
    app.set("trust proxy", 1);
    sessionConfig.cookie.secure = true;
  }

  // error handline
  app.use((error, request, response, next) => {
    const { status = 500, message } = error;
    response.status(status).json(message);
  });

  // set port to listen to
  app.listen(port, (request, response) => {
    console.log(`Listening on port ${root}`);
  });
});

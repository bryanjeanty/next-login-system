// load npm packages
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
require("dotenv").config();

// connect to database
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log("DB Connected"))
  .catch(error => console.log(`DB connection error: ${error.message}`));

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

  // set port to listen to
  app.listen(port, (req, res) => {
    console.log(`Listening on port ${root}`);
  });
});

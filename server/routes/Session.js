// load express router
const { Router } = require("express");

// load controllers
const { startSession, endSession } = require("../controllers/Session");

// load route error catcher
const catchErrors = require("./catchErrors");

// make express router instance
const router = new Router();

// setup routes
// endpoint: '/api/session'
router.post("/signin", startSession);
router.delete("/signout", catchErrors(endSession));

module.exports = router;

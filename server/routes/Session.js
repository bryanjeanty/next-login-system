// load express router
const { Router } = require("express");

// load controllers
const { startSession, endSession } = require("../controllers/Session");

// make express router instance
const router = new Router();

// setup routes
// endpoint: '/api/session'
router.post("/signin", startSession);
router.get("/signout", endSession);

module.exports = router;

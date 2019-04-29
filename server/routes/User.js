// load express router
const { Router } = require("express");

// load controllers
const { checkSession } = require("../controllers/Session");
const {
  getUsers,
  getUser,
  getUserFeed,
  validateNewUser,
  signupNewUser,
  updateUser,
  deleteUser
} = require("../controllers/User");

// load route error catcher function
const catchErrors = require("./catchErrors");

// create router instance
router = new Router();

// setup routes
// endpoint: '/api/users' ['/api/user/signup']
router.get("/", getUsers);
router.post("/signup", validateNewUser, catchErrors(signupNewUser));

// endpoint: '/api/users/:id' ['/api/users/:id/feed']
router
  .route("/:id")
  .get(checkSession, catchErrors(getUser))
  .put(checkSession, catchErrors(updateUser))
  .delete(checkSession, catchErrors(deleteUser));
router.get("/:id/feed", checkSession, catchErrors(getUserFeed));

module.exports = router;

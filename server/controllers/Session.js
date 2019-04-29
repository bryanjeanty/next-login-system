const passport = require("passport");

const startSession = (request, response, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return response.status(500).json(error.message);
    }
    if (!user) {
      return response.status(400).json(info.message);
    }

    request.logIn(user, error => {
      if (error) {
        return response.status(500).json(error.message);
      }

      const userData = { email: user.email, message: "Session started!" };

      response.json(userData);
    });
  })(request, response, next);
};

const checkSession = (request, response, next) => {
  if (request.isAuthenticated()) {
    next();
  }

  response.redirect("/signin");
};

const endSession = (request, response) => {
  response.clearCookie("user-auth.sid");
  request.logout();
  response.json({ message: "You are now signed out!" });
};

module.exports = { startSession, checkSession, endSession };

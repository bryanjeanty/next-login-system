const User = require("../models/User");

// user model crud operations
// get functions
const getUsers = async (request, response) => {
  const users = await User.find().select("_id email createdAt updatedAt");

  response.json(users);
};

const getUser = () => {};

const getUserFeed = () => {};

// post functions
const validateNewUser = (request, response, next) => {
  request.sanitizeBody("email");
  request.sanitizeBody("password");

  request
    .checkBody("email", "Enter a valid email")
    .notEmpty()
    .isEmail()
    .normalizeEmail();
  request.checkBody("password", "Enter a password").notEmpty();
  request
    .checkBody("password", "Password must be between 4 and 10 characters long")
    .isLength({ min: 4, max: 10 });

  const errors = request.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return response.status(400).send(firstError);
  }

  next();
};

const signupNewUser = async (request, response) => {
  const { email, password } = request.body;

  const user = await new User({ email, password });
  await User.register(user, password, (error, user) => {
    if (error) {
      return response.status(500).send(error.message);
    }

    const newUser = { email: user.email, password: user.password };

    response.json(newUser);
  });
};

// update function
const updateUser = () => {};

// delete function
const deleteUser = () => {};

module.exports = {
  getUsers,
  getUser,
  getUserFeed,
  validateNewUser,
  signupNewUser,
  updateUser,
  deleteUser
};

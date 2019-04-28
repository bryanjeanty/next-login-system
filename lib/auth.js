const USER_SCRIPT_VAR = "__USER__";

const getSessionFromServer = req => {
  if (req.user) {
    return { user: req.user };
  }
  return {};
};

const getUserScript = user => {
  return `${USER_SCRIPT_VAR} = ${JSON.stringify(user)}`;
};

export { getSessionFromServer, getUserScript };

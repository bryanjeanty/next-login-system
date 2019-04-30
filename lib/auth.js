export const WINDOW_USER_VAR = "__USER__";

const getSessionFromServer = req => {
  if (req.user) {
    return { user: req.user };
  }
  return {};
};

const getUserScript = user => {
  return `${WINDOW_USER_VAR} = ${JSON.stringify(user)}`;
};

export { getSessionFromServer, getUserScript };

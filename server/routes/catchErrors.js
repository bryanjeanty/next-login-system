module.exports = func => {
  return (request, response, next) => {
    return func(request, response, next).catch(next);
  };
};

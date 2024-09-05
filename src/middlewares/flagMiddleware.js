const flagMiddleware = (req, res, next) => {
  if (req.body.amount > 1000) {
    req.body.flagged = true;
  }
  next();
};

module.exports = { flagMiddleware };

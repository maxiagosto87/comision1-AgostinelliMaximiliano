const authenticateToken = require("./authenticateToken");

function authMiddleware(req, res, next) {
  authenticateToken(req, res, next);
}

module.exports = {
    authenticateToken: authenticateToken,
  };
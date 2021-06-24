const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  if (!req.headers.access_token) {
    res.status(401).json({ message: "tidak ada access token" });
  } else {
    try {
      const decodedToken = jwt.verify(req.headers.access_token, "ABCD");
      req.userId = decodedToken.id;
      next();
    } catch {
      res.status(401).json({ message: "access token tidak valid" });
    }
  }
};

module.exports = authenticate;

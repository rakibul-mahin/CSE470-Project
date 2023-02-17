const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(400).json({ msg: "Access Denied" });
  }
};

module.exports = { verifyToken };

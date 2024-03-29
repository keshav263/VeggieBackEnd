const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ Invalid: "No token provided" });
  }
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    console.log(decode);
    next();
  } catch (err) {
    return res.status(400).send({ Invalid: "Invalid token.Access denied!" });
  }
}

module.exports = auth;

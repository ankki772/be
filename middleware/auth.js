const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1]
  console.log(token);

  if (token == null) return res.sendStatus(401)

  jwt.verify(String(token), "ankit", (err, user) => {

    if (err) return res.status(400).send({ msg: "invalid Token" })
    next();
  })
};

module.exports = authenticateToken;
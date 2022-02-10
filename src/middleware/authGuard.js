const { validateToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  // req.headers.authorization
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res.sendStatus(401);
  }
  //Bearer xxxxxxx
  const tokenArray = authorizationHeader.split(" ");
  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    return res.sendStatus(401);
  }

  const decodedPayload = validateToken(tokenArray[1]);
  if (!decodedPayload) {
    return res.sendStatus(401);
  }
  // role
  // req.user = decodedPayload;
  return next();
};

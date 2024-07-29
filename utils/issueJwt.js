const jwt = require("jsonwebtoken");

function issueJwt(user) {
  const _id = user._id;
  const expiresIn = "7d";
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, "thisIsAgreatProjectKey", {
    expiresIn: expiresIn,
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

module.exports.issueJwt = issueJwt;

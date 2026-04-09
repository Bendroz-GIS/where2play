const jwt = require("jsonwebtoken");

function jwtTokens({user_id, user_name, user_email}) {
  const user = {user_id, user_name, user_email};
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"20s"}); // 15min
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"5m"}); // 2 weeks
  return ({accessToken, refreshToken});
}

module.exports = {jwtTokens};
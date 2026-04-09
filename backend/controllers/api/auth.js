const sql = require("../../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../../utils/jwtHelpers");
const dotenv = require("dotenv");

dotenv.config();

const login = async (req,res) => {
  console.log(req.body)
  const { email, password } = req.body;
  
  try {
    const users = await sql`
      SELECT *
      FROM w2p.users
      WHERE user_email = ${email}
    `;

    if (users.length === 0) return res.status(401).json({error: "Email is invalid"});

    const validPassword = await bcrypt.compare(password, users[0].user_password);

    if (!validPassword) return res.status(401).json({error: "Wrong password"});

    let tokens = jwtTokens(users[0]);
    res.cookie("refresh_token", tokens.refreshToken, {httpOnly:true});
    res.json(tokens);

  } catch (error) {
    res.status(500).json({error:error.message});
  }
}

const getRefreshToken = async (req,res) => {
  try {   
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) return res.status(401).json({error:"Null refresh token"});
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error,user) => {
      if (error) return res.status(403).json({error:error.message})
      let tokens = jwtTokens(user);
      res.cookie("refresh_token", tokens.refreshToken, {httpOnly:true, sameSite: "none", secure: true});
      res.json(tokens);
    })
  } catch (error) {
    res.status(401).json({error:error.message});
  }
}

const logout = async (req,res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({message: "logout"})
  } catch (error) {
    res.status(401).json({error:error.message});
  }
}

module.exports = { login, getRefreshToken, logout }
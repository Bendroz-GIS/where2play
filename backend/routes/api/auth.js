const express = require("express")
const { login, getRefreshToken, logout } = require("../../controllers/api/auth");

const router = express.Router();

router.post("/login", login);
router.post("/refresh_token", getRefreshToken)
router.delete("/refhresh_token", logout)

module.exports = router
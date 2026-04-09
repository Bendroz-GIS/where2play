const express = require("express");
const { getPersonalInfo , postUser } = require("../../controllers/api/user");
const { authenticateToken } = require("../../middleware/authorization");

const router = express.Router();

router.get("/me", authenticateToken, getPersonalInfo);
router.post("/", postUser);

module.exports = router
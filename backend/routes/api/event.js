const express = require("express");
const router = express.Router();

const { getEvent, postEvent } = require("../../controllers/api/event");
const { authenticateToken } = require("../../middleware/authorization");

router.get("/", getEvent);
router.post("/create", authenticateToken, postEvent);

module.exports = router;
const express = require("express");

const sport = require("./sport");
const auth = require("./auth");
const user = require("./user");
const domain = require("./domain");
const event = require("./event");

const router = express.Router();


router.use("/sport", sport);
router.use("/domain", domain);
router.use("/auth", auth);
router.use("/user", user);
router.use("/event", event);

module.exports = router;
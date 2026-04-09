const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../../middleware/authorization");
const { getSport, putSport, postSport, deleteSport } = require("../../controllers/api/sport");

router.get("/", getSport);
router.post("/create", authenticateToken, postSport);
router.put("/modify/:id", authenticateToken, putSport);
router.delete("/delete/:id", authenticateToken, deleteSport);

module.exports = router;
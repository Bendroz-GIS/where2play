const express = require("express");
const router = express.Router();

const { getSport, getEstPublique, getEtat, getRevetement } = require("../../controllers/api/domain");

router.get("/sport", getSport);
router.get("/est_publique", getEstPublique);
router.get("/etat", getEtat);
router.get("/revetement", getRevetement);

module.exports = router;
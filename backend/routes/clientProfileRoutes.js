const express = require("express");
const router = express.Router();
const clientProfileController = require("../controllers/clientProfileController");

router.post("/create", clientProfileController.createClientProfile);

router.get("/", clientProfileController.getAllClientProfiles);

router.delete("/:id", clientProfileController.deleteClientProfile);

module.exports = router;

const { Router } = require("express");
router = Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getAllContacts);

module.exports = router;

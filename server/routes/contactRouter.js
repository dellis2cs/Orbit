const { Router } = require("express");
router = Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getAllContacts);
router.get("/count", contactController.getTotalContacts);
module.exports = router;

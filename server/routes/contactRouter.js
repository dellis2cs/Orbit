const { Router } = require("express");
router = Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getAllContacts);
router.get("/count", contactController.getTotalContacts);
router.get("/:id", contactController.getContact);
router.put("/:id", contactController.updateContact);
module.exports = router;

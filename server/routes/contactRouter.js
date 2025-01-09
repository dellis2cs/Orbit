const { Router } = require("express");
const router = Router();
const contactController = require("../controllers/contactController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, contactController.getAllContacts);
router.post("/count", authenticateToken, contactController.getTotalContacts);
router.get("/:id", authenticateToken, contactController.getContact);
router.put("/:id", authenticateToken, contactController.updateContact);
router.post("/new", authenticateToken, contactController.createContact);
router.delete("/:id", authenticateToken, contactController.deleteContact);
module.exports = router;

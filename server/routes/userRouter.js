const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
module.exports = router;

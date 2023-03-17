const router = require("express").Router();
const userController = require("../controllers/UserController");

router.post("/create/user", userController.register);
router.post("/login", userController.login);
router.get("/get/user-details/:id", userController.getUserDetail);
router.get("/notifications/:id", userController.getUserNotification);

module.exports = router;

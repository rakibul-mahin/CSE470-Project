const router = require("express").Router();
const userController = require("../controllers/UserController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/create/user", userController.register);
router.post("/login", userController.login);
router.get("/get/user-details/:id", userController.getUserDetail);
router.get("/notifications/:id", userController.getUserNotification);
router.put("/update/profile/:id", verifyToken, userController.editProfile);

module.exports = router;

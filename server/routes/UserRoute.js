const router = require("express").Router();
const userController = require("../controllers/UserController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/create/user", userController.register);
router.post("/login", userController.login);
router.get("/get/user-details/:id", userController.getUserDetail);
router.get("/notifications/:id", userController.getUserNotification);
router.delete(
  "/delete/notifications/:id/:nid",
  userController.deleteUserNotification
);
router.put("/update/profile/:id", verifyToken, userController.editProfile);
router.put(
  "/update/profile/pic/:id",
  verifyToken,
  userController.updateProfilePic
);
router.put("/update/cover/pic/:id", verifyToken, userController.updateCoverPic);
router.get("/search/users", verifyToken, userController.searchUser);

module.exports = router;

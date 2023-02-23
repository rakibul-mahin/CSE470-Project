const router = require("express").Router();
const followController = require("../controllers/FollowerController");
const { verifyToken } = require("../middlewares/verifyToken");

router.put("/follow/:id", verifyToken, followController.follow);
router.get("/followers-post/:id", verifyToken, followController.followerPost);
router.get("/suggest/user", verifyToken, followController.suggestFollower);

module.exports = router;

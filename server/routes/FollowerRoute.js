const router = require("express").Router();
const followController = require("../controllers/FollowerController");
const { verifyToken } = require("../middlewares/verifyToken");

router.put("/follow/:id", verifyToken, followController.follow);
router.get("/followers-post/:id", verifyToken, followController.followerPost);
router.get(
  "/all/followers-post/:id",
  verifyToken,
  followController.allFollowerPost
);
router.get("/suggest/user", verifyToken, followController.suggestFollower);
router.get("/all/following/:id", followController.allFollowing);
router.get("/all/follower/:id", followController.allFollower);

module.exports = router;

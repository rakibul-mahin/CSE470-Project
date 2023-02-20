const router = require("express").Router();
postController = require("../controllers/PostController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/get/post", verifyToken, postController.getPost);
router.post("/create/post", verifyToken, postController.createPost);
router.put("/update/post/:id", verifyToken, postController.updatePost);
router.get("/get/all-post", verifyToken, postController.getAllPost);
router.put("/like/:id", verifyToken, postController.likePost);
router.put("/dislike/:id", verifyToken, postController.dislikePost);
router.put("/post/comment", verifyToken, postController.writeComment);

module.exports = router;

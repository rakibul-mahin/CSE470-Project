const router = require("express").Router();
postController = require("../controllers/PostController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/get/post/:id", postController.getPost);
router.get("/get/post/byid/:id", postController.getPostById);
router.post("/create/post", verifyToken, postController.createPost);
router.put("/update/post/:id", verifyToken, postController.updatePost);
router.get("/get/all-post", verifyToken, postController.getAllPost);
router.put("/like/:id", verifyToken, postController.likePost);
router.put("/dislike/:id", verifyToken, postController.dislikePost);
router.put("/post/comment", verifyToken, postController.writeComment);
router.delete("/delete/post/:id", verifyToken, postController.deletePost);

module.exports = router;

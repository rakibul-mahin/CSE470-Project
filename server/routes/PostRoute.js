const router = require("express").Router();
postController = require("../controllers/PostController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/get/post", verifyToken, postController.getPost);
router.post("/create/post", verifyToken, postController.createPost);
router.put("/update/post/:id", verifyToken, postController.updatePost);
router.get("/get/all-post", verifyToken, postController.getAllPost);

module.exports = router;

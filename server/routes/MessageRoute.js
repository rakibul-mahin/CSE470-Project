const router = require("express").Router();
const messageController = require("../controllers/MessageController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/msg", verifyToken, messageController.createMessage);
router.get("/get/msg/:u1id/:u2id", verifyToken, messageController.getMessage); //u1id sender u2id receiver

module.exports = router;

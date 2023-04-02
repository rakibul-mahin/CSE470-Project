const Message = require("../models/Message");

module.exports = {
  createMessage: async (req, res) => {
    try {
      const { from, to, message } = req.body;
      const newMessage = await Message.create({
        message: message,
        Chatusers: [from, to],
        Sender: from,
      });

      return res.status(200).json(newMessage);
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },
  getMessage: async (req, res) => {
    try {
      const from = req.params.u1id;
      const to = req.params.u2id;

      const newmessage = await Message.find({
        Chatusers: { $all: [from, to] },
      }).sort({ updatedAt: 1 });

      const allmessage = newmessage.map((msg) => {
        return {
          myself: msg.Sender.toString() === from,
          message: msg.message,
        };
      });

      return res.status(200).json(allmessage);
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  },
};

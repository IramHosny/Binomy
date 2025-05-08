const router = require("express").Router();
const Conversation = require("../models/Conversation");

// ➕ Créer une nouvelle conversation
router.post("/add", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Vérifier si une conversation existe déjà entre les deux utilisateurs
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 📥 Récupérer toutes les conversations d’un utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../firebase");

// Criar utilizador
router.post("/", async (req, res) => {
  try {
    const user = req.body;

    const docRef = await db.collection("users").add(user);

    res.status(201).json({
      id: docRef.id,
      ...user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar utilizadores
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();

    const users = [];

    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar utilizador
router.put("/:id", async (req, res) => {
  try {
    await db.collection("users")
      .doc(req.params.id)
      .update(req.body);

    res.json({
      message: "Utilizador atualizado"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar utilizador
router.delete("/:id", async (req, res) => {
  try {
    await db.collection("users")
      .doc(req.params.id)
      .delete();

    res.json({
      message: "Utilizador removido"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
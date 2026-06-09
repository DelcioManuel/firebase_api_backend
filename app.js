const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Firebase API funcionando"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
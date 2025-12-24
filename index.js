import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const WEBHOOK = process.env.DISCORD_WEBHOOK;

app.get("/mensagem", async (req, res) => {
  const { jogador, mensagem } = req.body;

  if (typeof jogador !== "string" || typeof mensagem !== "string") {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    await axios.post(WEBHOOK, {
      content: `Mensagem enviada por ${jogador}: ${mensagem}`,
    });

    res.json({ status: "Mensagem enviada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar a mensagem" });
  }
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});

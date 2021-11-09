//construir com temas de  cerveja / time / livre...
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Escolha entre /paises, /estados, /cidades." });
});

const cervejaRouter = require("./model/paises");
app.use("/paises", cervejaRouter);

const timeRouter = require("./model/estados");
app.use("/estados", timeRouter);

const musicaRouter = require("./model/cidades");
app.use("/cidades", musicaRouter);

app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}`);
});

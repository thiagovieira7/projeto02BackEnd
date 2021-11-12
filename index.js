const express = require("express");
const app = express();

app.use(express.json());
const Conn = require("./model/conn/index");

Conn();

const port = 3001;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Escolha entre /paises, /estados, /cidades." });
});

const paisesRouter = require("./routers/paises.routes");
app.use("/paises", paisesRouter);

const estadosRouter = require("./routers/estados.routes");
app.use("/estados", estadosRouter);

const cidadesRouter = require("./routers/cidades.routes");
app.use("/cidades", cidadesRouter);

app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}`);
});

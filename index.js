const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Escolha entre /paises, /estados, /cidades." });
});

const paisesRouter = require("./paises");
app.use("/paises", paisesRouter);

// const estadosRouter = require("./estados");
// app.use("/estados", estadosRouter);

// const cidadesRouter = require("./cidades");
// app.use("/cidades", cidadesRouter);

app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}`);
});

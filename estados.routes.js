const express = require("express");
const router = express.Router();
const estadosController = require("./../controller/estados.controller");

router.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Rota por Estado ok. Escolha entre as opções: ( /listall) ( /listname ) ( add ) ( update ) ( delete )",
  });
});

router.get("/lista", (req, res) => {
  res.json(listas);
});

router.get("/lista/:id", (req, res) => {
  const id = req.params.id - 1;
  res.json(listas[id]);
});

router.get("/lista/:nome", (req, res) => {
  res.status(200).json(listas);
});

router.get("/:nome", (req, res) => {
  const nome = req.params.nome;
  const estado = listas.find((item) => item.nome === nome);
  res.status(200).json(estado);
});

router.get("/nome", (req, res) => {
  const nome = req.params.nome;
  const index = listas.findIndex((item) => item.nome === nome);
  if (index == -1) {
    res.status(204);
    return;
  }
  res.status(200).json({ index: index });
});

router.post("/lista", (req, res) => {
  const estado = req.body;
  if (!estado.nome) {
    res.status(400).send({
      message:
        "NOME DA ESTADO inválida. Certifique-se de que o body da requisição possui a infomação correta no campo (nome).",
    });
    return;
  } else if (!estado.regiao) {
    res.status(400).send({
      message:
        "REGIAO inválida. Certifique-se de que o body da requisição possui a informação correta no campo (regiao).",
    });
    return;
  } else if (!estado.populacao) {
    res.status(400).send({
      message:
        "POPULAÇÃO inválida. Certifique-se de que o body da requisição possui a informação correta no campo (populacao).",
    });
    return;
  } else if (!estado.vlSalarioMin) {
    res.status(400).send({
      message:
        "VALOR DO SALARIO MINIMO inválido. Certifique-se de que o body da requisição possui a informação correta no campo (vlSalarioMin).",
    });
    return;
  }

  listas.push(estado);
  res.status(201).json({ message: "Estado cadastrada com sucesso..." });
});

router.put("/lista/:id", (req, res) => {
  const estado = req.body;
  const id = req.params.id - 1;
  listas[id] = estado;
  res
    .status(200)
    .json({ message: `Dados do Estado alterados com sucesso: ${listas[id]}` });
});

router.delete("/lista/:id", (req, res) => {
  const id = req.params.id - 1;
  delete listas[id];
  console.log(listas[id]);
  res.status(200).json(listas);
});

module.exports = router;

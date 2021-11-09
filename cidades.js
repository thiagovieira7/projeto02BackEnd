const express = require("express");
const router = express.Router();

let lista = [
  {
    nome: "Cascavel",
    qtdBairros: 30,
    populacao: 336073,
    dtAniversario: 14 / 11 / 1951,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({ message: "Dados por cidade" });
});

router.get("/lista", (req, res) => {
  res.json(lista);
});

router.get("/lista/:id", (req, res) => {
  const id = req.params.id - 1;
  res.json(lista[id]);
});

router.get("/lista/:nome", (req, res) => {
  res.status(200).json(lista);
});

router.get("/:nome", (req, res) => {
  const nome = req.params.nome;
  const cidade = lista.find((item) => item.nome === nome);
  res.status(200).json(cidade);
});

router.get("/nome", (req, res) => {
  const nomeCidade = req.params.nome;
  const index = lista.findIndex((item) => item.nomeCidade === nome);
  if (index == -1) {
    res.status(204);
    return;
  }
  res.status(200).json({ index: index });
});

router.post("/lista", (req, res) => {
  const cidade = req.body;
  if (!cidade.nome) {
    res.status(400).send({
      message:
        "NOME inválido. Certifique-se de que o body da requisição possui o nome da cidade certa no campo (nome).",
    });
    return;
  } else if (!cidade.qtdBairros) {
    res.status(400).send({
      message:
        "QUANTIDADE DE BAIRROS inválido. Certifique-se de que o body da requisição possui a quantidade de bairros certo no campo (qtdBairros).",
    });
    return;
  } else if (!estado.populacao) {
    res.status(400).send({
      message:
        "POPULAÇÃO inválida. Certifique-se de que o body da requisição possui a a quantidade total exata de habitantes no campo (populacao).",
    });
    return;
  } else if (!estado.dtAniversario) {
    res.status(400).send({
      message:
        "DATA DE ANIVERSARIO DA CIDADE inválida. Certifique-se de que o body da requisição possui a data exata do aniversario da cidade no campo (dtAniverdario).",
    });
    return;
  }

  lista.push(cidade);
  res.status(201).json({ message: "Cidade cadastrada com sucesso..." });
});

router.put("/lista/:id", (req, res) => {
  const cidade = req.body;
  const id = req.params.id - 1;
  lista[id] = cidade;
  res
    .status(200)
    .json({ message: `Dados da Cidade alterados com sucesso: ${lista[id]}` });
});

router.delete("/lista/:id", (req, res) => {
  const id = req.params.id - 1;
  delete lista[id];
  console.log(lista[id]);
  res.status(200).json(lista);
});

module.exports = router;

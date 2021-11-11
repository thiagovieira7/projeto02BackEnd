const express = require("express");
const router = express.Router();

const paises = require("./../model/paises");

let lista = [
  {
    nome: "Brasil",
    populacao: 213300000,
    linguaMae: "Português Brasileiro",
    pib: 7400000
  },
];

router.get("/", (req, res) => {
  res.status(200).json({ message: "Dados por país. Escolha entre as opções: ( /listall) ( /listname ) ( add ) ( update ) ( delete )", });
});

router.get("/listall", (req, res) => {
  res.status(200).json(lista);
});

router.get("/listall/:id", (req, res) => {
  const id = req.params.id - 1;
  res.status(200).json(lista[id]);
});

router.get("/listname/:nome", (req, res) => {
  const nome = req.params.nome;
  const index = lista.findIndex((item) => item.nome === nome);
  if (index == -1) {
    res.status(204);
    return;
  }
  res.status(200).json({ index: index });
});

router.post("/add", (req, res) => {
  const pais = req.body;

  if (!pais.nome) {
    res.status(400).json({ message: "NOME DO PAÍS inválido. Certifique-se que o body da requisição possui o NOME correto do (pais)." });
    return;
  } else if (!pais.populacao) {
    res.status(400).json({ message: "POPULAÇÃO inválida. Certifique-se de que o body da requisição possui o numero total de habitantes no campo (populacao)." });
    return;
  } else if (!pais.linguaMae) {
    res.status(400).json({ message: "IDIOMA NATIVO inválida. Certifique-se de que o body da requisição possui a informação da lingua nativa corretamente no campo (linguaMae)." });
    return;
  } else if (!pais.pib) {
    res.status(400).json({ message: "PIB inválido. Certifique-se de que o body da requisição possui a informação do produto interno bruto no campo (pib)." });
    return;
  }

  lista.push(pais);
  res.status(201).json({ message: "País cadastrado com sucesso..." });
});

router.put("/update/:id", (req, res) => {
  const pais = req.body;
  const id = req.params.id - 1;
  lista[id] = pais;
  if (!pais.nome | !pais.populacao | !pais.linguaMae | !pais.pib) {
    res.status(400).json({ message: "Informação para alteração não inserida faltante. Por favor verifique o campo Body da requisição." });

    return;
  }

  res.status(200).json({ message: `Dados do país alterados com sucesso: ${lista[id]}` });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id - 1;
  delete lista[id];
  console.log(lista[id]);
  res.status(200).json(lista);
});

module.exports = router;

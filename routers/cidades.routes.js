const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  testando;
  res.status(200).json({
    message:
      "Dados por cidade.  Escolha entre as opções: ( /listall) ( /listname ) ( add ) ( update ) ( delete )",
  });
});

router.get("/listall", (req, res) => {
  res.json(lista);
});

router.get("/listall/:id", (req, res) => {
  const id = req.params.id - 1;
  res.json(lista[id]);
});

router.get("/:listname", (req, res) => {
  const nome = req.params.nome;
  const cidade = lista.find((item) => item.nome === nome);
  res.status(200).json(cidade);
});

router.get("/listname", (req, res) => {
  const nomeCidade = req.params.nome;
  const index = lista.findIndex((item) => item.nomeCidade === nome);
  if (index == -1) {
    res.status(204);
    return;
  }
  res.status(200).json({ index: index });
});

router.post("/add", (req, res) => {
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

router.put("/update/:id", (req, res) => {
  const cidade = req.body;
  const id = req.params.id - 1;
  lista[id] = cidade;
  if (
    !cidades.nome |
    !cidades.qtdBairros |
    !cidades.populacao |
    !cidades.deAniversario
  ) {
    res.status(400).send({
      message:
        "Informação para alteração não inserida/faltante. Por favor verifique o campo Body da requisição.",
    });

    return;
  }

  res
    .status(200)
    .json({ message: `Dados da Cidade alterados com sucesso: ${lista[id]}` });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id - 1;
  delete lista[id];
  console.log(lista[id]);
  res.status(200).json(lista);
});

module.exports = router;

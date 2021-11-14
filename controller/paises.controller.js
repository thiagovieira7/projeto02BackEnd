const paises = require("../model/paises");

exports.getAll = async (req, res) => {
  await paises
    .find({})
    .then((paises) => {
      res.status(200).json(paises);
    })
    .catch((err) => {
      res.status(404).json({ message: "Informação não encontrada" });
      console.error(err);
    });
};

exports.getName = async (req, res) => {
  await paises
    .findById(req.params.id)
    .then((paises) => {
      console.log(paises.name);

      if (paises == null) {
        res.status(404).json({ message: "Não localizado" });
      } else {
        res.status(200).json(paises);
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "Nenhum resultado encontrado" });
      console.error(err);
    });
};

exports.postAdd = async (req, res) => {
  if (!req.body.nome) {
    res.status(400).json({
      message: "NOME inválido. Verifique as informações da requisição no body.",
    });
    return;
  } else if (!req.body.populacao) {
    res.status(400).json({
      message:
        "POPULAÇÃO inválida. Verifique as informações da requisição no body",
    });
    return;
  } else if (!req.body.linguaMae) {
    res.status(400).json({
      message:
        "LINGUAMAE inválida. Verifique as informações da requisição no body.",
    });
    return;
  } else if (!req.body.pib) {
    res.status(400).json({
      message: "PIB inválido. Verifique as informações da requisição no body.",
    });
    return;
  }

  await paises
    .create(req.body)
    .then(() => {
      res.status(200).json({ message: "País cadastrado com sucesso." });
    })
    .catch((err) => {
      res.status(400).json({ message: "Erro ao cadastrar" });
      console.error(err);
    });
};

exports.putUpdate = async (req, res) => {
  if (!id) {
    res.status(400).json({ message: "Faltando inserir o id na URL" });
    return;
  } else if (
    !req.body.nome ||
    !req.body.populacao ||
    !req.body.linguaMae ||
    !req.body.pib
  ) {
    res.status(400).json({
      message:
        "Informação para alteração não inserida/faltante. Por favor verifique o campo Body da requisição.",
    });

    return;
  }

  await paises
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: `Dados do país alterados com sucesso` });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Erro ao atualizar" });
    });
};

exports.deleteDell = async (req, res) => {
  if (!req.params.id.length !== 24) {
    res.status(400).json({ message: "id precisa ter 24 caracteres" });
    return;
  }

  await paises
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Deletado com sucesso" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Erro ao deletar" });
    });
};

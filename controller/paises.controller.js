const paises = require("../model/paises");

function validarAddUpdt(reqisicao) {
  if (!reqisicao.nome) {
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
}

function validaId(id) {
  if (id.length !== 24) {
    res.status(400).json({ message: "id precisa ter 24 caracteres" });
    return;
  }
}

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
  validaId(req.params.id);
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
  validarAddUpdt(req, body);
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
  validaId(req.params.id);
  validarAddUpdt(req, body);
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
  validaId(req.params.id);
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

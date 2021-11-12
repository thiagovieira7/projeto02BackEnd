const express = require("express");
const router = express.Router();
const paises = require("./../model/paises");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota país ok. Escolha entre as opções: ( /listall) ( /listname ) ( add ) ( update ) ( delete )", });
});

router.get("/listall", async (req, res) => {
  await paises.find({}).then((paises) => {
    res.status(200).json(paises);
  }).catch((err) => {
    res.status(204).json({ message: "Informação não encontrado" });
    console.error(err);
  })
});

router.get("/listall/:id", async (req, res) => {
  const id = req.params.id - 1;
  await paises.find({}).then((paises) => {
    res.status(200).json(paises[id]);

  }).catch((err) => {
    console.error(err);
  })
}); //verificar se esta correto

router.get("/listname/:nome", async (req, res) => {
  const nome = req.params.nome;
  await paises.findOne({ name: nome }).then((paises) => {//verofocar p name:nome
    console.log(paises);
    if (paises == null) {
      res.status(404).json({ message: "Não localizado" });
    } else {
      res.status(200).json(paises);
    }
    
  }).catch((err) => {
    res.status(404).json({ message: "Nenhum resultado encontrado" });
    console.error(err);
  });
});

router.post("/add", async (req, res) => {
  
  if (!paises.nome) {
    res.status(400).json({ message: "NOME DO PAÍS inválido. Certifique-se que o body da requisição possui o NOME correto do (pais)." });
    return;
  } else if (!paises.populacao) {
    res.status(400).json({ message: "POPULAÇÃO inválida. Certifique-se de que o body da requisição possui o numero total de habitantes no campo (populacao)." });
    return;
  } else if (!paises.linguaMae) {
    res.status(400).json({ message: "IDIOMA NATIVO inválida. Certifique-se de que o body da requisição possui a informação da lingua nativa corretamente no campo (linguaMae)." });
    return;
  } else if (!paises.pib) {
    res.status(400).json({ message: "PIB inválido. Certifique-se de que o body da requisição possui a informação do produto interno bruto no campo (pib)." });
    return;
  }

  await paises.create(req.body).then(() => {
    res.status(200).json({ message: "País cadastrado com sucesso..." })
  }).catch((err) => {
    res.status(400).json({ message: "Erro ao cadastrar" });
    console.error(err);
  })
  
    
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id - 1;
  if (!paises.nome | !paises.populacao | !paises.linguaMae | !paises.pib) {
    res.status(400).json({ message: "Informação para alteração não inserida faltante. Por favor verifique o campo Body da requisição." });

    return;
  } else if (!id) {
    res.status(400).json({ message: "Faltando inserir o id na URL" });
    return;
  };

  await paises.updateOne({ __id:id}, req.body).then(() => {
    res.status(200).json({ message: `Dados do país alterados com sucesso});
  }).catch((er) => {
    console.error(err);
    res.status(400).json({ message: "Erro ao atualizar" });
  });

});

router.delete("/delete/:id", async (req, res) => {
  if (req.params.id.lenght == 24) {
    await paises.deleteOne({ __id: req.params.id }).then(() => {
      res.status(200).json({ message: "Deletado com sucesso" });
    }).catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Erro ao deletar" });
    });

  } else {
    res.status(400).json({ message: "id precisa ter 24 caracteres" });
  }
  
});

module.exports = router;

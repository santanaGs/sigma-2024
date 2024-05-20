const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { eAdmin } = require("./middlewares/auth");
const User = require("./models/user");

// USE LOCAL HOST
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", eAdmin, async (req, res) => {
  await User.findAll({
    attributes: ["id", "name", "crm"],
    order: [["id", "DESC"]],
  })
    .then((users) => {
      return res.json({
        erro: false,
        mensagem: users,
        id_usuario_logado: req.userId,
      });
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Nehum usuário encontrado!!",
      });
    });
});
// CADASTRO DE USUARIO
app.post("/cadastrar", async (req, res) => {
  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);

  try {
    await User.create(dados);
    return res.json({
      erro: false,
      mensagem: "Usuário cadastrado com sucesso!!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error ao cadastrar o usuário!!",
    });
  }
});
// LOGIN DE USUARIO
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    attributes: ["id", "name", "email", "password", "crm", "endereco"],
    where: {
      email: req.body.email,
    },
  });
  if (user === null) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  var token = jwt.sign(
    { id: user.id },
    "4F8U4O6JH18O74DG3A1FH8J7DV21MN1D4FD69Y97QW1ASD4F6GJ8HU9",
    {
      expiresIn: "7d",
    }
  );

  return res.json({
    erro: false,
    mensagem: "Login realizado com sucesso!!",
    token,
  });
});

app.listen(8080, () => {
  //console.log("Servidor Iniciado: Servidor Inicido : http://localhost:8080")
});

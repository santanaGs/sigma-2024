const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { eAdmin } = require("./middlewares/auth");
const Doctor = require("./models/user");
const Specialty = require("./models/specialty");

// USE LOCAL HOST
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", eAdmin, async (req, res) => {
  await Doctor.findAll({
    attributes: ["id", "name", "crm"],
    order: [["id", "DESC"]],
  })
    .then((doctors) => {
      return res.json({
        erro: false,
        mensagem: doctors,
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
    await Doctor.create(dados);
    return res.json({
      erro: false,
      mensagem: "Usuário cadastrado com sucesso!!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error ao cadastrar o usuário!!" + error,
    });
  }
});
// LOGIN DE USUARIO
app.post("/login", async (req, res) => {
  const doctor = await Doctor.findOne({
    attributes: ["id", "name", "email", "password", "crm", "endereco"],
    where: {
      email: req.body.email,
    },
  });
  if (doctor === null) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  if (!(await bcrypt.compare(req.body.password, doctor.password))) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  var token = jwt.sign(
    { id: doctor.id },
    "4F8U4O6JH18O74DG3A1FH8J7DV21MN1D4FD69Y97QW1ASD4F6GJ8HU9",
    {
      expiresIn: "7d",
    }
  );

  return res.json({
    erro: false,
    mensagem: "Login realizado com sucesso!!",
    token,
    user,
  });
});

// GET ALL DOCTORS
app.get("/medicos", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Specialty,
          as: 'specialty',
          attributes: ['name']
        }
      ]
    });

    return res.json({
      erro: false,
      mensagem: doctors.map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        crm: doctor.crm,
        endereco: doctor.endereco,
        especialidade: doctor.specialty ? doctor.specialty.name : null
      })),
      id_usuario_logado: req.userId,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(400).json({
      erro: true,
      mensagem: "Nenhum usuário encontrado!!",
    });
  }
});

app.listen(8080, () => {
  console.log("Servidor Iniciado: Servidor Inicido : http://localhost:8080")
});

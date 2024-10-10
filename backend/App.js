const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const { eAdmin } = require("./middlewares/auth");

const Doctor = require("./models/user");
const Specialty = require("./models/specialty");
const Patient = require("./models/patient");
const Enquiry = require("./models/enquiry");
const Contact = require("./models/contact")

// USE LOCAL HOST
const cors = require("cors");
const { Op } = require("sequelize");

app.use(express.json());
app.use(cors());

app.get("/backend", async (req, res) => {
  await Doctor.findAll({
    attributes: ["id", "name", "crm"],
    order: [["id", "DESC"]],
  })
    .then((doctors) => {
      return res.json({
        erro: false,
        mensagem: {
          doctors,
          servidor: `Servidor rodando em: http://${req.hostname}:${process.env.PORT || 8072}/backend`
        },
        id_usuario_logado: req.userId,
      });
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Nenhum usuário encontrado!!",
      });
    });
});
// CADASTRO DE USUARIO
app.post("/backend/cadastrar", async (req, res) => {

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
// LOGIN DE MEDICO
app.post("/backend/login", async (req, res) => {
  const doctor = await Doctor.findOne({
    attributes: ["id", "name", "email", "password"],
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
    doctor,
  });
});
// GET ALL DOCTORS
app.get("/backend/medicos", async (req, res) => {
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
    console.error(error);
    return res.status(400).json({
      erro: true,
      mensagem: "Nenhum usuário encontrado!!",
    });
  }
});
// CADASTRO DE PACIENTE
app.post("/backend/cadastrar/paciente", async (req, res) => {
  console.log(req.body);

  const { email, cpf, cid_card } = req.body;

  // Check if email, CPF, or CID card already exist
  const existingPatient = await Patient.findOne({
    where: {
      [Op.or]: [
        { email },
        { cpf },
        { cid_card },
      ],
    },
  });

  if (existingPatient) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Este e-mail, CPF ou CID card já está cadastrado!",
    });
  }

  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);

  try {
    await Patient.create(dados);
    return res.json({
      erro: false,
      mensagem: "Paciente cadastrado com sucesso!!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error ao cadastrar o usuário: " + error.message,
    });
  }
});

app.get("/backend/especialidades", async (req, res) => {
  await Specialty.findAll({
    attributes: ["id", "name"],
    order: [["id", "ASC"]],
  })
    .then((specialties) => {
      return res.json({
        erro: false,
        mensagem: {
          specialties,
        },
        id_usuario_logado: req.userId,
      });
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Nenhum usuário encontrado!!",
      });
    });
});

// LOGIN PACIENTE
app.post("/backend/login/paciente", async (req, res) => {
  const patient = await Patient.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (patient === null) {
    return res.status(400).json({
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  if (!(await bcrypt.compare(req.body.password, patient.password))) {
    return res.status(400).json({
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  var token = jwt.sign(
    { id: patient.id },
    "4F8U4O6JH18O74DG3A1FH8J7DV21MN1D4FD69Y97QW1ASD4F6GJ8HU9",
    {
      expiresIn: "7d",
    }
  );

  return res.json({
    mensagem: "Login realizado com sucesso!!",
    token,
    patient,
    statusCode: 200
  });
});
// AGENDAR CONSULTA
app.post("/backend/consulta", eAdmin, async (req, res) => {
  const dados = req.body;

  try {
    const medico = await Doctor.findOne({ where: { especialidade: dados.modalidade } });

    if (!medico) {
      return res.status(404).json({
        erro: true,
        mensagem: "Médico com a especialidade especificada não encontrado.",
      });
    }

    dados.medico = medico.id;

    await Enquiry.create(dados);

    return res.json({
      erro: false,
      mensagem: "Consulta cadastrada com sucesso!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao fazer consulta: " + error.message,
    });
  }
});

// PEGAR CONSULTA
app.get("/backend/consultas/:id", eAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const consultas = await Enquiry.findAll({
      where: { medico: id },
      include: [
        {
          model: Patient,
          // Inclua todos os atributos do modelo Patient
          attributes: { exclude: [] }, // Aqui excluímos nenhum atributo, ou seja, incluímos todos
        },
        {
          model: Doctor,
          attributes: ['id', 'name', 'especialidade'],
        },
      ],
    });

    if (consultas.length === 0) {
      return res.status(404).json({
        erro: true,
        mensagem: "Nenhuma consulta encontrada para o médico fornecido",
      });
    }

    return res.json({
      erro: false,
      dados: consultas,
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao buscar consultas: " + error.message,
    });
  }
});

// CADASTRO DE CONTATO
app.post("/backend/contato", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      erro: true,
      mensagem: "Todos os campos (nome, email, mensagem) são obrigatórios!",
    });
  }

  try {
    await Contact.create({ name, email, message });
    return res.json({
      erro: false,
      mensagem: "Contato enviado com sucesso!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao enviar contato: " + error.message,
    });
  }
});

const gerarSenhaAleatoria = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// REDEFINIR SENHA
app.post("/backend/redefinir-senha", async (req, res) => {
  const { email } = req.body;

  const user = await Doctor.findOne({ where: { email } });
  const patient = await Patient.findOne({ where: { email } });

  if (!user && !patient) {
    return res.status(400).json({
      erro: true,
      mensagem: "Email não encontrado!",
    });
  }

  const novaSenha = gerarSenhaAleatoria();
  const senhaCriptografada = await bcrypt.hash(novaSenha, 8);

  if (user) {
    await Doctor.update({ password: senhaCriptografada }, { where: { email } });
  } else if (patient) {
    await Patient.update({ password: senhaCriptografada }, { where: { email } });
  }

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ffafef615d8ee5",
      pass: "99b1928c36d028"
    }
  });

  const mailOptions = {
    from: "no-reply@sigma.com.br",
    to: email,
    subject: "Redefinição de Senha",
    text: `
      Olá,
  
      Recebemos um pedido para redefinir sua senha. Sua nova senha é:
  
      **${novaSenha}**
  
      Se você não solicitou a redefinição de senha, por favor, desconsidere este email.
  
      Agradecemos por utilizar nossos serviços!
  
      Atenciosamente,
      Equipe SIGMA
    `,
  };
  

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        erro: true,
        mensagem: "Erro ao enviar email: " + error.message,
      });
    }
    return res.json({
      erro: false,
      mensagem: "Nova senha enviada para seu email!",
    });
  });
});

// SERVER RODANDO
app.listen(8080, () => {
  console.log("Servidor Iniciado: Servidor Inicido : http://localhost:8080/backend")
});

module.exports = app;

// LISTAR CONSULTAS DO PACIENTE
// LISTAR CONSULTAS DO MEDICO

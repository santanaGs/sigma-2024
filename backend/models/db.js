const Sequelize = require("sequelize");

const sequelize = new Sequelize("sigma", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!!");
  })
  .catch((erro) => {
    console.log("Error: Conexão não realiaza com o banco de dados!!" + erro);
  });

module.exports = sequelize;

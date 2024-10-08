const Sequelize = require("sequelize");

const sequelize = new Sequelize('sigma2024', 'root', '123', {
  host: '34.133.196.208',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    connectTimeout: 60000 
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000, 
    idle: 10000 
  } 
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!!");
  })
  .catch((erro) => {
    console.log("Error: Conexão não realiza com o banco de dados!! " + erro);
  });

module.exports = sequelize;

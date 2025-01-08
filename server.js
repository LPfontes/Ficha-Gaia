const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./src/config/dbConfig');
const routes = require('./src/routes/routes');

// Configuração do dotenv para variáveis de ambiente
dotenv.config();
connectDB().then(() => {
    console.log('Banco de dados conectado com sucesso!');
  }).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
// Obter o equivalente de __dirname
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
routes(app)

app.listen(3000, () => {
    console.log(port, 'Servidor rodando em http://localhost:3000');
});
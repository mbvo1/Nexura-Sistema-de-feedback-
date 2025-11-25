const express = require('express');
const cors = require('cors');
const rotas = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rotas);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
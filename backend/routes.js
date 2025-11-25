const express = require('express');
const router = express.Router();

const { salvarFeedback } = require('../bd/feedbackServer');

router.post('/feedback', async (req, res) => {
    const { estrelas, emoji, comentario } = req.body;

    const resultado = await salvarFeedback(estrelas, emoji, comentario);

    if (resultado.sucesso) {
        res.status(201).json({ mensagem: "Salvo com sucesso!", id: resultado.id });
    } else {
        res.status(500).json({ mensagem: "Erro ao salvar", erro: resultado.erro });
    }
});

router.get('/teste', (req, res) => {
    res.json({ status: "Backend funcionando!" });
});

module.exports = router;
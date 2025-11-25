const { db } = require('./firebaseConfig');
const { collection, addDoc } = require('firebase/firestore');

async function salvarFeedback(estrelas, emoji, comentario) {
    try {
        const docRef = await addDoc(collection(db, "feedbacks"), {
            estrelas: estrelas || 0, 
            emoji: emoji || "Sem emoji",
            comentario: comentario || "",
            data: new Date()
        });

        console.log("✅ Feedback salvo no ID:", docRef.id);
        return { sucesso: true, id: docRef.id };

    } catch (erro) {
        console.error("❌ Erro ao salvar:", erro);
        return { sucesso: false, erro: erro.message };
    }
}

module.exports = { salvarFeedback };
let selectedStar = null;
let selectedEmoji = null;

function mostrarMensagemPorNota(nota) {
    const box = document.getElementById('feedbackMessage');
    if (!box) return;

    // sempre reseta as classes e garante que a caixa apareça
    box.className = 'feedback-message';
    box.style.display = 'block';

    const numero = Number(nota);
    let texto = '';

    if (!numero) {
        texto = 'Obrigado pelo seu feedback!';
    } else if (numero >= 4) {
        box.classList.add('feedback-message--positiva');
        texto = 'Obrigado pela ótima avaliação! Ficamos muito felizes que você teve uma boa experiência com o curso.';
    } else if (numero === 3) {
        box.classList.add('feedback-message--neutra');
        texto = 'Obrigado pelo retorno! Seu feedback nos ajuda a entender o que podemos manter e o que ainda dá para melhorar.';
    } else {
        box.classList.add('feedback-message--negativa');
        texto = 'Sentimos muito que sua experiência não foi tão boa. Seu feedback é essencial para que possamos corrigir e melhorar.';
    }

    box.textContent = texto;
}

// Verifica se é a página de feedback
if (document.getElementById("sendBtn")) {


// Seleção de estrelas
document.querySelectorAll('#stars span').forEach(star => {
star.addEventListener('click', () => {
selectedStar = star.getAttribute('data-value');
document.querySelectorAll('#stars span').forEach(s => s.classList.remove('selected'));
star.classList.add('selected');
});
});


// Seleção de emojis
document.querySelectorAll('#emojis span').forEach(emoji => {
emoji.addEventListener('click', () => {
selectedEmoji = emoji.getAttribute('data-value');
document.querySelectorAll('#emojis span').forEach(e => e.classList.remove('selected'));
emoji.classList.add('selected');
});
});


// Enviar feedback
document.getElementById('sendBtn').addEventListener('click', async () => {
    const comment = document.getElementById('comment').value;

    const payload = {
        estrelas: selectedStar,
        emoji: selectedEmoji,
        comentario: comment
    };

    try {
        await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        
        mostrarMensagemPorNota(selectedStar);

        // opcional: limpar comentário e “desselecionar” estrela/emoji
        document.getElementById('comment').value = '';
        document.querySelectorAll('#stars span, #emojis span').forEach(el => el.classList.remove('selected'));
        selectedStar = null;
        selectedEmoji = null;

    } catch (error) {
        alert('Erro ao enviar feedback.');
        console.error(error);
    }
});


}


// Verifica se é a página do admin
if (document.getElementById("feedbackTable")) {
// Exemplo de carregamento futuro (fake por enquanto)
console.log("Dashboard pronto para integração com o backend.");
}

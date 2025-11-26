let selectedStar = null;
let selectedEmoji = null;

const mockFeedbacks = [
    {
        id: 1,
        data: '2025-11-20',
        curso: 'Gestão de Projetos',
        nota: 5,
        emoji: '😄',
        comentario: 'Curso excelente, conteúdo muito claro e aplicável.'
    },
    {
        id: 2,
        data: '2025-11-18',
        curso: 'Marketing Digital',
        nota: 3,
        emoji: '😐',
        comentario: 'Achei o conteúdo bom, mas poderia ter mais exemplos práticos.'
    },
    {
        id: 3,
        data: '2025-11-15',
        curso: 'Gestão de Projetos',
        nota: 2,
        emoji: '😞',
        comentario: 'Tive dificuldades em acompanhar algumas partes mais técnicas.'
    },
    {
        id: 4,
        data: '2025-11-10',
        curso: 'Finanças Pessoais',
        nota: 4,
        emoji: '😊',
        comentario: 'Gostei bastante, principalmente da parte de investimentos.'
    }
];

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
// =========================
// Página de Histórico (HUS-007)
// =========================

const historyTableBody = document.getElementById('historyTableBody');
const historyEmptyMessage = document.getElementById('historyEmptyMessage');

if (historyTableBody) {
    const filterCurso = document.getElementById('filterCurso');
    const filterTexto = document.getElementById('filterTexto');

    // Preenche o select de cursos com base nos dados mock
    const preencherOpcoesCurso = () => {
        const cursosUnicos = Array.from(new Set(mockFeedbacks.map(fb => fb.curso)));

        cursosUnicos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso;
            option.textContent = curso;
            filterCurso.appendChild(option);
        });
    };

    // Renderiza as linhas da tabela
    const renderTabela = (lista) => {
        historyTableBody.innerHTML = '';

        if (!lista.length) {
            historyEmptyMessage.style.display = 'block';
            return;
        }

        historyEmptyMessage.style.display = 'none';

        lista.forEach(fb => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${fb.data}</td>
                <td>${fb.curso}</td>
                <td>${fb.nota}</td>
                <td>${fb.emoji}</td>
                <td>${fb.comentario}</td>
            `;

            historyTableBody.appendChild(tr);
        });
    };

    // Aplica filtros de curso e texto
    const aplicarFiltros = () => {
        const cursoSelecionado = filterCurso.value;
        const textoBusca = filterTexto.value.trim().toLowerCase();

        const filtrados = mockFeedbacks.filter(fb => {
            const confereCurso = cursoSelecionado
                ? fb.curso === cursoSelecionado
                : true;

            const confereTexto = textoBusca
                ? fb.comentario.toLowerCase().includes(textoBusca)
                : true;

            return confereCurso && confereTexto;
        });

        renderTabela(filtrados);
    };

    // Inicialização da página de histórico
    preencherOpcoesCurso();
    aplicarFiltros();

    filterCurso.addEventListener('change', aplicarFiltros);
    filterTexto.addEventListener('input', aplicarFiltros);
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

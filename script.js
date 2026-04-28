// GARANTE QUE O HTML CARREGOU
document.addEventListener("DOMContentLoaded", () => {

    // MENU MOBILE
    const btnMenu = document.querySelector('.menu-mobile');
    const menuLateral = document.querySelector('.menu-lateral');

    if (btnMenu && menuLateral) {
        btnMenu.addEventListener('click', () => {
            menuLateral.classList.toggle('ativo');
        });
    }

    // DIGITAÇÃO
    function escreverLoop() {
        const elemento = document.querySelector('.digitando');
        if (!elemento) return;

        const texto = elemento.textContent;
        let i = 0;

        function digitar() {
            if (i < texto.length) {
                elemento.textContent += texto.charAt(i);
                i++;
                setTimeout(digitar, 75);
            } else {
                setTimeout(apagar, 1500);
            }
        }

        function apagar() {
            if (i > 0) {
                elemento.textContent = texto.substring(0, i - 1);
                i--;
                setTimeout(apagar, 40);
            } else {
                setTimeout(digitar, 500);
            }
        }

        elemento.textContent = '';
        digitar();
    }

    escreverLoop();

});

// FILTRO (fica fora pra funcionar no onclick)
function filtrar(categoria) {
    const projetos = document.querySelectorAll('.img-port');

    projetos.forEach(projeto => {
        if (categoria === 'todos') {
            projeto.style.display = 'block';
        } else {
            if (projeto.classList.contains(categoria)) {
                projeto.style.display = 'block';
            } else {
                projeto.style.display = 'none';
            }
        }
    });
}

const botoes = document.querySelectorAll('.filtros button');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        botoes.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');
    });
});

// customiação do formulário de mensagens

const formContato = document.querySelector('#form-contato');
const mensagemForm = document.querySelector('#mensagem-form');
const btnForm = document.querySelector('#btn-form');

if (formContato) {
    formContato.addEventListener('submit', async function (e) {
        e.preventDefault();

        btnForm.disabled = true;
        btnForm.textContent = 'Enviando...';

        mensagemForm.textContent = '';
        mensagemForm.className = '';

        const dados = new FormData(formContato);

        try {
            const resposta = await fetch(formContato.action, {
                method: 'POST',
                body: dados,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (resposta.ok) {
                mensagemForm.textContent = 'Mensagem enviada com sucesso!';
                mensagemForm.classList.add('sucesso');
                formContato.reset();
            } else {
                mensagemForm.textContent = 'Erro ao enviar. Tente novamente.';
                mensagemForm.classList.add('erro');
            }

        } catch (erro) {
            mensagemForm.textContent = 'Erro de conexão. Tente novamente.';
            mensagemForm.classList.add('erro');
        }

        btnForm.disabled = false;
        btnForm.textContent = 'Enviar';
    });
}
function escrevendoLetra() {
    const titulo = document.querySelector('.digitando');

    if (!titulo) return;

    const texto = titulo.textContent;
    titulo.textContent = '';

    texto.split('').forEach((letra, i) => {
        setTimeout(() => {
            titulo.textContent += letra;
        }, 75 * i);
    });
}

escrevendoLetra();
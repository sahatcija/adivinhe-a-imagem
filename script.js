document.addEventListener('DOMContentLoaded', () => {

    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');

    // =================================================================
    // IMPORTANTE: EDITE A LISTA DE IMAGENS AQUI!
    // =================================================================
    // Coloque o caminho para as suas 9 imagens.
    // Se as imagens estiverem na mesma pasta que o arquivo HTML,
    // basta colocar o nome do arquivo, como 'minha-foto.jpg'.
    // Se estiverem em uma subpasta chamada "imagens", use 'imagens/minha-foto.jpg'.
    
    const images = [
        'imagens/foto1.jpg', // Exemplo 1
        'imagens/foto2.jpg', // Exemplo 2
        'imagens/foto3.jpg',  // Exemplo 3
        'imagens/foto4.jpg',  // Exemplo 4
        'imagens/foto5.jpg',  // Exemplo 5
        'imagens/foto6.jpg',  // Exemplo 6
        'imagens/foto7.jpg',  // Exemplo 7
        'imagens/foto8.jpg', // Exemplo 8
        'imagens/foto9.jpg',  // Exemplo 9
        'imagens/foto10.jpg',  // Exemplo 10
        'imagens/foto11.jpg', // Exemplo 11
        'imagens/foto12.jpg'  // Exemplo 12
    ];

    // Função para embaralhar um array (algoritmo Fisher-Yates)
    // Isso garante que a posição das cartas mude a cada jogo.
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Função para criar e iniciar o jogo
    function createGameBoard() {
        // Limpa o tabuleiro antes de criar novas cartas (útil para reiniciar)
        gameBoard.innerHTML = ''; 

        // Embaralha as imagens para que o jogo seja diferente a cada vez
        const shuffledImages = shuffle([...images]);

        shuffledImages.forEach(imageSrc => {
            // Cria os elementos da carta
            const card = document.createElement('div');
            card.classList.add('card');

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-face', 'card-front');
            // cardFront.innerHTML = '?'; // Conteúdo da frente da carta

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-face', 'card-back');
            cardBack.style.backgroundImage = `url('${imageSrc}')`; // Define a imagem no verso

            // Monta a estrutura da carta
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            // Adiciona a carta ao tabuleiro
            gameBoard.appendChild(card);

            // Adiciona o evento de clique para virar a carta
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
            });
        });
    }

    // Adiciona o evento de clique ao botão de reiniciar
    restartButton.addEventListener('click', createGameBoard);

    // Inicia o jogo pela primeira vez quando a página carrega
    createGameBoard();
});

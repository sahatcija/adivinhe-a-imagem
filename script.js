document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // IMPORTANTE: EDITE A LISTA DE IMAGENS AQUI!
    // =================================================================
    // Para 12 cartas, você precisa de 6 imagens únicas.
    // O jogo irá duplicá-las para criar os pares.
    const uniqueImages = [
        { id: 'gato', src: 'imagens/foto1.jpg' },
        { id: 'cachorro', src: 'imagens/foto2.jpg' },
        { id: 'floresta', src: 'imagens/foto3.jpg' },
        { id: 'montanha', src: 'imagens/foto4.jpg' },
        { id: 'lago', src: 'imagens/foto5.jpg' },
        { id: 'ponte', src: 'imagens/foto6.jpg' }
        // Se usar suas imagens:
        // { id: 'nome-do-par-1', src: 'imagens/foto1.jpg' },
        // { id: 'nome-do-par-2', src: 'imagens/foto2.jpg' },
    ];

    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const winMessage = document.getElementById('win-message');
    
    // Variáveis de estado do jogo
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    // Função para criar o tabuleiro
    function createGameBoard() {
        // Reseta o estado do jogo para um novo começo
        resetGame();
        
        // Duplica as imagens para criar os pares e embaralha
        const gameCards = [...uniqueImages, ...uniqueImages]
            .sort(() => 0.5 - Math.random());

        gameCards.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            // Adiciona um 'data-attribute' para identificar o par
            card.dataset.id = item.id; 

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-face card-front">?</div>
                    <div class="card-face card-back" style="background-image: url('${item.src}')"></div>
                </div>
            `;
            
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    // A função principal que é chamada ao clicar em uma carta
    function flipCard() {
        // Se o tabuleiro estiver "trancado" ou a carta já for um par, não faz nada
        if (lockBoard || this.classList.contains('is-matched')) return;
        // Se clicar na mesma carta duas vezes, não faz nada
        if (this === firstCard) return;

        this.classList.add('is-flipped');

        if (!hasFlippedCard) {
            // Primeiro clique
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // Segundo clique
        secondCard = this;
        lockBoard = true; // Tranca o tabuleiro para não virar uma terceira carta

        checkForMatch();
    }

    // Verifica se as duas cartas viradas são um par
    function checkForMatch() {
        // A verificação é feita pelo 'data-id'
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        isMatch ? disableCards() : unflipCards();
    }

    // Se for um par, desabilita as cartas
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('is-matched');
        secondCard.classList.add('is-matched');

        matchedPairs++;
        // Verifica se o jogo acabou
        if (matchedPairs === uniqueImages.length) {
            setTimeout(() => {
                winMessage.classList.remove('hidden');
            }, 500);
        }

        resetBoard();
    }

    // Se não for um par, vira as cartas de volta
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');
            resetBoard();
        }, 1200); // 1.2 segundos para o jogador memorizar
    }

    // Reseta as variáveis de jogada
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // Reseta o jogo inteiro
    function resetGame() {
        gameBoard.innerHTML = '';
        winMessage.classList.add('hidden');
        matchedPairs = 0;
        resetBoard();
    }

    // Inicia o jogo
    restartButton.addEventListener('click', createGameBoard);
    createGameBoard(); // Inicia o jogo pela primeira vez
});

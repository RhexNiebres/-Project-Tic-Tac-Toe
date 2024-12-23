
    const Gameboard = (() => {
            const board = Array(9).fill(null); 

            const resetBoard = () => {
                for (let i = 0; i < 9; i++) {
                    board[i] = null; 
                }
            };

            const placeMarker = (index, marker) => {
                if (board[index] === null) {
                    board[index] = marker; 
                    return true;
                }
                return false; 
            };
        
            const checkWin = () => {
                // Initialize possible condition 
                const winningCombination = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],  
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
                ];
                for (const combination of winningCombination) {
                    const [a, b, c] = combination;
                    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
                        return board[a]; 
                    }
                }
                return board.includes(null) ? null : 'Tie'; 
            };

            return { board, resetBoard, placeMarker, checkWin }; 
        })();
    
        const Player = (name, marker) => {
            return { name, marker }; 
        };

        const player1 = Player('Player 1', 'X'); 
        const player2 = Player('Player 2', 'O'); 
          const GameController = (() => {
            let currentPlayer = player1; // Start with Player 1
            let gameOver = false; // Game is not over at the start

            const switchPlayer = () => {
                currentPlayer = (currentPlayer === player1) ? player2 : player1; // Toggle between players
            };

            const handleTurn = (index) => {
                if (!gameOver && Gameboard.placeMarker(index, currentPlayer.marker)) {
                    const result = Gameboard.checkWin();
                    if (result) {
                        gameOver = true; // Set gameOver to true if game has ended
                        console.log(result === 'Tie' ? "It's a Tie!" : `${result} wins!`); // Log the result to console
                    } else {
                        switchPlayer(); // Switch to the other player if the game continues
                    }
                }
            };

            const resetGame = () => {
                Gameboard.resetBoard(); // Reset the gameboard
                gameOver = false; // Allow play to continue
                currentPlayer = player1; // Reset to Player 1
            };

            return { handleTurn, resetGame }; // Expose functions for handling turns and resetting the game
        })();

        const renderBoard = () => {
            const gameboardElement = document.getElementById('gameboard');
            gameboardElement.innerHTML = ''; // Clear existing contents of the gameboard

            Gameboard.board.forEach((marker, index) => {
                const cell = document.createElement('div');
                cell.textContent = marker || ''; // Display the marker or empty string
                cell.className = 'cell'; // Add class to the cell
                cell.dataset.index = index; // Use data attribute to store the index
                gameboardElement.appendChild(cell); // Add the cell to the gameboard

                cell.addEventListener('click', () => {
                    GameController.handleTurn(index); // Handle a turn when a cell is clicked
                    renderBoard(); // Re-render the board after a turn
                    checkGameEnd(); // Check if the game has ended after each turn
                });
            });
        };

        const checkGameEnd = () => {
            const result = Gameboard.checkWin(); 
            const resultElement = document.getElementById('result');
            if (result) {
                resultElement.textContent = result === 'Tie' ? "It's a Tie!" : `${result} wins!`; 
            }
        };
        document.getElementById('restart').addEventListener('click',()=>{
            GameController.resetGame();
            renderBoard();
            document.getElementById('result').textContent = '';
        });

        renderBoard();

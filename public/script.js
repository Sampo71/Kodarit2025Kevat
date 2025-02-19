document.getElementById('new-game-button').addEventListener("click", sceneSwap);
document.getElementById('game-Screen').style.display = 'none'

const board_Size = 15;
const cellSize = calculateCellSize();
let board;

function sceneSwap()
{
    document.getElementById('intro-Screen').style.display = 'none'
    document.getElementById('game-Screen').style.display = 'block'
    board = generateRandomBoard();
    drawBoard(board);
}

function generateRandomBoard()
{
    const newBoard = Array.from({length:board_Size}, ()=> Array(board_Size).fill(' '));
    for(let y = 0; y < board_Size; y++)
    {
        for(let x = 0; x < board_Size; x++)
        {
            if(x === 0 || y === 0 || x === board_Size - 1 || y === board_Size - 1)
            {
                newBoard[y][x] = 'W';
            }
        }
    }
    console.log(newBoard)
    return newBoard
}

function drawBoard(board)
{
    const gameBoard = document.getElementById('game-Board');

    gameBoard.style.gridTemplateColumns = `repeat(${board_Size},1fr)`;

    for(let y = 0; y < board_Size; y++)
    {
        for(let x = 0; x < board_Size; x++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            if(getCell(board, x, y) === 'W')
            {
                cell.classList.add('wall')
    
            }
            gameBoard.appendChild(cell);
        }
    }
}

function getCell(board, x, y){
    return board[y][x];
}

function calculateCellSize(){
    const screenSize = Math.min(window.innerWidth, window.innerHeight);
    const gameBoardSize = 0.95 * screenSize;

    return gameBoardSize / board_Size;
}
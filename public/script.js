document.getElementById('new-game-button').addEventListener("click", sceneSwap);
document.getElementById('game-Screen').style.display = 'none'

document.addEventListener('keydown', (event)=>{
    switch(event.key){
        case 'ArrowUp':
            player.move(0,-1);
        break;
        case 'ArrowRight':
            player.move(1, 0);
        break;
        case 'ArrowDown':
            player.move(0,1);
        break;
        case 'ArrowLeft':
            player.move(-1,0);
        break;
    }
    event.preventDefault();
})

const board_Size = 20;
const cellSize = calculateCellSize();
let board;
let player;
let ghosts = [];
let enemyCount = 20;

function sceneSwap()
{
    document.getElementById('intro-Screen').style.display = 'none'
    document.getElementById('game-Screen').style.display = 'block'
    player = new Player(0,0);
    board = generateRandomBoard();
    drawBoard(board);
}

function generateRandomBoard()
{
    // Makes the board
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

    generateObstacles(newBoard);

    // Makes the player
    const [playerX, playerY] = randomEmptyPosition(newBoard);
    setCell(newBoard,playerX,playerY,'P');
    player.x = playerX;
    player.y = playerY;

    // Makes enemies
    for(let i = 0; i < enemyCount; i++){
        const[ghostX, ghostY] = randomEmptyPosition(newBoard);
        setCell(newBoard, ghostX, ghostY, 'G');
        ghosts.push(new Ghost(ghostX, ghostY));
    }

    console.log(newBoard)
    return newBoard
}

function drawBoard(board)
{
    // Displays the board
    const gameBoard = document.getElementById('game-Board');

    gameBoard.style.gridTemplateColumns = `repeat(${board_Size},1fr)`;
    gameBoard.innerHTML = "";
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

            }else if(getCell(board,x,y) === 'P')
            {
                cell.classList.add('player');
            }else if(getCell(board,x,y) === 'G') 
            {
                cell.classList.add('ghosts');
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

function generateObstacles(board){
    const obstacles = [
        [[0,0],[0,1],[1,0],[1,1]],//Square
        [[0,0],[0,1],[0,2],[0,3]],//Line
        [[0,0],[1,0],[2,0],[1,1]],//T-piece
        [[0,0],[1,1],[1,2],[2,1]],//Fork
        [[0,0],[0,1],[1,0],[2,0]],//L-piece
        [[0,2],[1,0],[1,1],[1,2]],//L-piece alt
        [[0,0],[0,1],[2,0],[2,1]],//Gate
    ];

    const positions =[
        {startX: 3, startY: 4},
        {startX: 8, startY: 3},
        {startX: 11, startY: 9},
        {startX: 3, startY: 14},
        {startX: 14, startY: 14},
        {startX: 15, startY: 3},
        {startX: 5, startY: 8},
        {startX: 9, startY: 13},
    ];

    positions.forEach(pos =>{
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)]
        placeObstacles(board, randomObstacle, pos.startX, pos.startY)
    });
}

function placeObstacles(board,obstacle,startX,startY){
    for(coordinatePair of obstacle){
        [x,y] = coordinatePair;
        board[startY + y][startX + x] = 'W';
    }
}

function randomInt(min,max){
    return Math.floor(Math.random() * (max-min +1)) +min
}

function randomEmptyPosition(board){
    x = randomInt(1,board_Size -2);
    y = randomInt(1,board_Size -2);
    if(getCell(board,x,y)===' '){
        return[x,y];
    }
    else{
        return randomEmptyPosition(board);
    }
}

function setCell(board,x,y,value){
    board[y][x] = value;
}

function shootAt(x,y){
    setCell(board,x,y,'b');
    drawBoard(board);
}

class Player{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    move(deltaX,deltaY){
        const currentX = player.x;
        const currentY = player.y;

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        if(getCell(board, newX, newY) === ' ')
        {
            player.x = newX;
            player.y = newY;

            setCell(board, currentX, currentY,' ');
            setCell(board, newX, newY,'P');
            drawBoard(board);
        }
    }
}

class Ghost{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
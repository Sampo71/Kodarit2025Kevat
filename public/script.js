document.getElementById('new-game-button').addEventListener("click", sceneSwap);
document.getElementById('game-Screen').style.display = 'none'

const board_Size = 15;
let board;

function sceneSwap()
{
    document.getElementById('intro-Screen').style.display = 'none'
    document.getElementById('game-Screen').style.display = 'block'
}
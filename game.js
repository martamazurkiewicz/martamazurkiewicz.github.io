function startGame(){
    drawGame();
    chooseMark();
    setPoints();
    //define points for computer and player as 0
}
function drawGame(){
    document.getElementById("playButton").remove();
    var board = document.getElementById("boardTable");
    drawBoard(board);
    var gameDiv = document.getElementById("gameDiv");
    gameDiv.appendChild(createPlayAgainButton());
}
function drawBoard(board){
    for (var i = 0; i < 3; i++){
        var tr = document.createElement('tr');
        for (var j = 0; j < 3; j++){
            var th = document.createElement('th');
            th.appendChild(createTile(String(i)+String(j)));
            tr.appendChild(th);
        }
        board.appendChild(tr)
    }
}
function createTile(tileNumber){
    var tile = document.createElement('button');
    tile.id = 'tile'+tileNumber;
    tile.type = 'button';
    tile.innerHTML = 'PressMe!';
    tile.className = 'tile';
    tile.onClick = drawMark();
    return tile;
}
function createPlayAgainButton(){
    var button = document.createElement('button');
    button.id = 'playAgainButton';
    button.type = 'button';
    button.innerHTML = 'PLAY AGAIN >';
    button.className = 'playAgain';
    button.onClick = playAgain();
    return button;
}
function drawMark(){

}
function chooseMark(){
    //popup with cirle and cross to choose
    //validate choosing
}
function setPoints(){
    //define points for computer and player as 0
}
function clearBoard(){

}
function playAgain(){

}
function getWinner(){

}
function displayWinner(){

}
function drawCross(){

}
function drawCircle(){

}
function playerMove(){

}
function computerMove(){
    
}
playersMark = null;
function startGame(){
    //create div with choosing marks, validate it, remove it and in its place draw board
    chooseMark();
    drawGame();
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
    tile.innerHTML = ' ';
    tile.className = 'tile';
    tile.addEventListener('click', function(){
        drawMark(tile.id);
    });
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
function drawMark(tileId){
    var tile = document.getElementById(tileId);
    drawCircle(tile);
}
function chooseMark(){
    var popUp = ('<div><input type="radio">Cicle ○<br><input type="radio">Cross x</div>');
    popUp.dialog();
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
function drawCross(tile){
    tile.style.backgroundImage = 'url(cross.png)';
}
function drawCircle(tile){
    tile.style.backgroundImage = 'url(circle.png)';
}
function playerMove(){

}
function computerMove(){
    
}
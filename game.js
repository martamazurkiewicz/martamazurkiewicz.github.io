var playersMark = null;
var flagedTiles = null;
var playersMove = true;
function startGame() {
    playersMark = getPlayersMark();
    document.getElementById("markDiv").remove();
    drawGame();
    clearFlagedTiles();
}
function drawGame() {
    var board = document.getElementById("boardTable");
    var span = document.createElement('span');
    span.setAttribute('class', 'move');
    var textNode = document.createTextNode('Your move!');
    textNode.id = 'moveTextNode';
    span.appendChild(textNode);
    var gameDiv = document.getElementById("gameDiv");
    gameDiv.insertBefore(span, board);
    drawBoard(board);
    gameDiv.appendChild(createPlayAgainButton());
}
function drawBoard(board) {
    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var th = document.createElement('th');
            th.appendChild(createTile(String(i) + String(j)));
            tr.appendChild(th);
        }
        board.appendChild(tr)
    }
}
function createTile(tileNumber) {
    var tile = document.createElement('button');
    tile.id = tileNumber;
    tile.type = 'button';
    tile.innerHTML = ' ';
    tile.className = 'tile';
    tile.addEventListener('click', function () {
        drawMark(tile.id);
    });
    return tile;
}
function createPlayAgainButton() {
    var button = document.createElement('button');
    button.id = 'playAgainButton';
    button.type = 'button';
    button.innerHTML = 'PLAY AGAIN >';
    button.className = 'playAgain';
    button.onClick = playAgain();
    return button;
}
function drawMark(tileId) {
    var tile = document.getElementById(tileId);
    playerMove(tile);
    flagedTiles[tileId[0]][tileId[1]] = playersMark;
    if(!checkIfGameIsWon(tileId, playersMark) && !checkIfGameIsFinished()){
        computerMove();
    }
}
function getPlayersMark() {
    var marks = document.getElementsByName('marks');
    for (var i = 0; i < marks.length; i++) {
        if (marks[i].checked) {
            return marks[i].value;
        }
    }
}
function checkIfGameIsFinished(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(flagedTiles[i][j] == null){
                return false;
            }  
        }
    }
    return true;
}
function checkIfGameIsWon(tileId, mark) {
    for(var i = 0; i < 3; i++){
        if(flagedTiles[tileId[0]][i] != mark){
            break;
        }
        if(i == 2){
            return true;
        }
    }
    for(var i = 0; i < 3; i++){
        if(flagedTiles[i][tileId[1]] != mark){
            break;
        }
        if(i == 2){
            return true;
        }
    }
    if(flagedTiles[1][1] == mark){
        if((flagedTiles[0][0]==mark && flagedTiles[2][2]==mark) || (flagedTiles[0][2]==mark && flagedTiles[2][0]==mark)){
            return true;
        }
    }
    return false;
}
function clearFlagedTiles() {
    flagedTiles = new Array(3);
    for(var i = 0; i < 3; i++){
        flagedTiles[i] = new Array(3);
        for(var j = 0; j < 3; j++){
            flagedTiles[i][j] = null;
        }
    }
}
function clearBoard() {
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var tileId = String(i) + String(j);
            var tile = document.getElementById(tileId);
            tile.style.backgroundImage = 'url(blank.png)';
            tile.disabled = false;
        }
    }
}
function playAgain() {
    clearFlagedTiles();
    clearBoard();
    playersMove = true;
}
function getWinner() {

}
function displayWinner() {

}
function drawCross(tile) {
    tile.style.backgroundImage = 'url(cross.png)';
    tile.disabled = true;
}
function drawCircle(tile) {
    tile.style.backgroundImage = 'url(circle.png)';
    tile.disabled = true;
}
function playerMove(tile) {
    if(playersMark == "cross"){
        drawCross(tile);
    }
    else{
        drawCircle(tile);
    }
}
function computerMove() {
    var availableIndexes = new Array();
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(flagedTiles[i][j] == null)
            {
                availableIndexes.push(String(i)+String(j));
            }
        }
    }
    var tileId = availableIndexes[Math.floor(Math.random() * (availableIndexes.length+1))];
    var tile = document.getElementById(tileId);
    if(playersMark != "cross"){
        drawCross(tile);
        flagedTiles[tileId[0]][tileId[1]] = "cross";
    }
    else{
        drawCircle(tile);
        flagedTiles[tileId[0]][tileId[1]] = "circle";
    }
}
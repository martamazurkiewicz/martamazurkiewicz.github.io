var playerMark = null;
var flagedTiles = null;
var mode = null;

function startGame() {
    console.log(mode);
    console.log(playerMark);
    var gameDiv = document.getElementById('innerGameDiv');
    gameDiv.innerHTML = '';
    drawGame();
    setFlagedTiles();
}

function setMode() {
    document.getElementById('playGameButton').remove();
    var gameDiv = document.getElementById('innerGameDiv');
    var gameTextNode = document.getElementById('gameTextNode');
    gameTextNode.innerHTML = 'Select mode:'
    gameDiv.appendChild(createButton('Single Player', singlePlayerMode));
    gameDiv.appendChild(createButton('Two Players', twoPlayersMode));
}
function twoPlayersMode() {
    playerMark = 'cross';
    mode = 2;
    startGame();
}
function singlePlayerMode() {
    mode = 1;
    setMark()
}
function createButton(innerHTML, onClickFunc, args = null) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = innerHTML;
    button.addEventListener('click', function () {
        if (args == null) {
            onClickFunc();
        }
        else {
            onClickFunc(args);
        }
    });
    return button;
}

function setMark() {
    var gameDiv = document.getElementById('innerGameDiv');
    gameDiv.innerHTML = '';
    var gameTextNode = document.getElementById('gameTextNode');
    gameTextNode.innerHTML = 'Select your mark:'
    gameDiv.appendChild(createButton('Cross', setMarkOnClick, 'cross'));
    gameDiv.appendChild(createButton('Circle', setMarkOnClick, 'circle'));
}

function setMarkOnClick(value) {
    playerMark = value;
    startGame();
}


function drawGame() {
    var board = document.getElementById("boardTable");
    document.getElementById('gameTextNode').innerHTML = playerMark + ' move!'
    var gameDiv = document.getElementById("gameDiv");
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
    tile.className = 'tile';
    tile.addEventListener('click', function () {
        playerMove(tile.id);
    });
    return tile;
}
function createPlayAgainButton() {
    var button = document.createElement('button');
    button.id = 'playGameButton';
    button.type = 'button';
    button.innerHTML = 'PLAY AGAIN >';
    button.className = 'playAgain';
    button.onclick = playAgain;
    return button;
}
function playerMove(tileId) {
    var tile = document.getElementById(tileId);
    console.log(playerMark);
    drawTile(tile);
    if (isGameWon(tileId)) {
        var message = playerMark + ' won!';
        gameFinished(message);
    }
    else if (isGameFinished()) {
        var message = 'Draw!';
        gameFinished(message);
    }
    else {
        if (mode == 1) {
            computerMove();
        }
        else {
            if (playerMark == 'cross') {
                playerMark = 'circle';
            }
            else {
                playerMark = 'cross';
            }
        }
    }
}

function isGameFinished() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (flagedTiles[i][j] == null) {
                return false;
            }
        }
    }
    return true;
}
function isGameWon(tileId) {
    for (var i = 0; i < 3; i++) {
        if (flagedTiles[tileId[0]][i] != playerMark) {
            break;
        }
        if (i == 2) {
            return true;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (flagedTiles[i][tileId[1]] != playerMark) {
            break;
        }
        if (i == 2) {
            return true;
        }
    }
    if (flagedTiles[1][1] == playerMark) {
        if ((flagedTiles[0][0] == playerMark && flagedTiles[2][2] == playerMark) || (flagedTiles[0][2] == playerMark && flagedTiles[2][0] == playerMark)) {
            return true;
        }
    }
    return false;
}
function setFlagedTiles() {
    flagedTiles = new Array(3);
    for (var i = 0; i < 3; i++) {
        flagedTiles[i] = new Array(3);
        for (var j = 0; j < 3; j++) {
            flagedTiles[i][j] = null;
        }
    }
}
function playAgain() {
    document.getElementById("gameTextNode").innerHTML = "";
    document.getElementById("boardTable").innerHTML = "";
    setMode();
}
function gameFinished(message) {
    alert(message);
    disableAllTiles();
}

function disableAllTiles() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var tile = document.getElementById(String(i) + String(j))
            tile.disabled = true;
            if (flagedTiles[i][j] == null) {
                tile.style.backgroundImage = 'url(blank.png)';
            }
        }
    }
}

function changeTileBackGround(tile) {
    if (playerMark == 'cross') {
        tile.style.backgroundImage = 'url(cross.png)';
    }
    else {
        tile.style.backgroundImage = 'url(circle.png)';
    }
    tile.disabled = true;
}

function drawTile(tile) {
    changeTileBackGround(tile);
    flagedTiles[tile.id[0]][tile.id[1]] = playerMark;
}
function computerMove() {
    var availableIndexes = new Array();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (flagedTiles[i][j] == null) {
                availableIndexes.push(String(i) + String(j));
            }
        }
    }
    var tileId = availableIndexes[Math.floor(Math.random() * (availableIndexes.length + 1))];
    var tile = document.getElementById(tileId);
    if (playerMark != "cross") {
        changeTileBackGround(tile, "cross");
        flagedTiles[tileId[0]][tileId[1]] = "cross";
        if (isGameWon(tileId, "cross")) {
            gameFinished("computer");
        }
    }
    else {
        changeTileBackGround(tile, "circle");
        flagedTiles[tileId[0]][tileId[1]] = "circle";
        if (isGameWon(tileId, "circle")) {
            gameFinished("computer");
        }
    }
    if (isGameFinished()) {
        gameFinishedDraw();
    }
}
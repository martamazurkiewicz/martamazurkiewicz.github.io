var currentMark = null;
var flaggedTiles = null;
var isSinglePlayerMode = null;

function startGame() {
    document.getElementById('innerGameDiv').innerHTML = '';
    createGame();
    UnflaggedTiles();
}

function setMode() {
    document.getElementById('playGameButton').remove();
    var gameDiv = document.getElementById('innerGameDiv');
    document.getElementById('gameTextNode').innerHTML = 'Select mode:';
    gameDiv.appendChild(createButton('Single Player', singlePlayerMode));
    gameDiv.appendChild(createButton('Two Players', twoPlayersMode));
}

function twoPlayersMode() {
    currentMark = 'cross';
    isSinglePlayerMode = false;
    startGame();
}

function singlePlayerMode() {
    isSinglePlayerMode = true;
    setMark();
}

function setMark() {
    var gameDiv = document.getElementById('innerGameDiv');
    gameDiv.innerHTML = "";
    document.getElementById('gameTextNode').innerHTML = 'Select your mark:'
    gameDiv.appendChild(createButton('Cross', setCurrentMark, 'cross'));
    gameDiv.appendChild(createButton('Circle', setCurrentMark, 'circle'));
}

function setCurrentMark(value) {
    currentMark = value;
    startGame();
}

function createGame() {
    var board = document.getElementById("boardTable");
    displayWhoseMoveItIs();
    document.getElementById("gameDiv").appendChild(createPlayAgainButton());
    createBoard(board);
}

function createBoard(board) {
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
    drawMark(tile);
    if (isGameWon(tileId)) {
        var message = currentMark.charAt(0).toUpperCase() + currentMark.slice(1) + ' won!';
        gameFinished(message);
    }
    else if (isGameFinished()) {
        gameFinished('Draw!');
    }
    else {
        changeCurrentMark();
        if (isSinglePlayerMode) {
            computerMove();
        }
    }
}

function changeCurrentMark() {
    if (currentMark == 'cross') {
        currentMark = 'circle';
    }
    else {
        currentMark = 'cross';
    }
    displayWhoseMoveItIs();
}

function isGameFinished() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (flaggedTiles[i][j] == null) {
                return false;
            }
        }
    }
    return true;
}

function isGameWon(tileId) {
    for (var i = 0; i < 3; i++) {
        if (flaggedTiles[tileId[0]][i] != currentMark) {
            break;
        }
        if (i == 2) {
            return true;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (flaggedTiles[i][tileId[1]] != currentMark) {
            break;
        }
        if (i == 2) {
            return true;
        }
    }
    if (flaggedTiles[1][1] == currentMark) {
        if ((flaggedTiles[0][0] == currentMark && flaggedTiles[2][2] == currentMark) || (flaggedTiles[0][2] == currentMark && flaggedTiles[2][0] == currentMark)) {
            return true;
        }
    }
    return false;
}

function UnflaggedTiles() {
    flaggedTiles = new Array(3);
    for (var i = 0; i < 3; i++) {
        flaggedTiles[i] = new Array(3);
        for (var j = 0; j < 3; j++) {
            flaggedTiles[i][j] = null;
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
            if (flaggedTiles[i][j] == null) {
                tile.style.backgroundImage = 'url(blank.png)';
            }
        }
    }
}

function drawMark(tile) {
    tile.style.backgroundImage = 'url(' + currentMark + '.png)';
    tile.disabled = true;
    flaggedTiles[tile.id[0]][tile.id[1]] = currentMark;
}

function computerMove() {
    var tile = getRandomTile();
    drawMark(tile);
    if (isGameWon(tile.id)) {
        gameFinished('Computer won!');
    }
    else if (isGameFinished()) {
        gameFinished('Draw!');
    }
    changeCurrentMark();
}

function getRandomTile() {
    var availableIndexes = new Array();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (flaggedTiles[i][j] == null) {
                availableIndexes.push(String(i) + String(j));
            }
        }
    }
    var tileId = availableIndexes[Math.floor(Math.random() * (availableIndexes.length - 1))];
    return document.getElementById(tileId);
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

function displayWhoseMoveItIs() {
    document.getElementById('gameTextNode').innerHTML = currentMark.charAt(0).toUpperCase() + currentMark.slice(1) + ' move!';
}

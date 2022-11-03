let boardPieces = document.querySelectorAll('.board-piece');
let yellowChips = document.querySelectorAll('.yellow-chip');
let redChips = document.querySelectorAll('.red-chip');
let instructions = document.querySelectorAll('.instructions h2');
let rematch = document.querySelectorAll('.rematch');
let scores = document.querySelectorAll('.score--value');
// true = yellow
let whoseTurn = true;
let child;
let row;
let win = false;
let yellowPoints = 0;
let redPoints = 0;

let gameTable = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

rematch.forEach(button => {
    button.addEventListener('click', () => {

        win = false;

        gameTable = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        
        instructions[2].style.opacity = 0;
        instructions[3].style.opacity = 0;

        turnUpdate();

        boardUpdate();

        boardPieces.forEach(piece => {
            piece.style.cursor = 'pointer';
        });
    })
});

turnUpdate();

for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {

        boardPieces[j * 7 + i].addEventListener('mouseout', () => {
            boardUpdate();
        })

        boardPieces[j * 7 + i].addEventListener('mouseover', () => {
            if (checkColumn(i) >= 0 && !win) {
                previewChip(i);
            }
        })

        boardPieces[j * 7 + i].addEventListener('click', () => {

            if (checkColumn(i) >= 0 && !win) {

                updateTable(i);
                boardUpdate();
                checkWinning();
                if (!win) {
                    whoseTurn = !whoseTurn;
                    turnUpdate();
                    previewChip(i);
                }
            }
        })
    }
}

function previewChip(column) {

    row = checkColumn(column);

    child = row * 7 + column;

    if (whoseTurn && child >= 0) {
        document.querySelector('img:nth-child(' + (child + 43) + ')').style.opacity = 0.5;
    }

    else if (child >= 0) {
        document.querySelector('img:nth-child(' + (child + 85) + ')').style.opacity = 0.5;
    }

    for (let i = 0; i < row; i++) {

        child = i * 7 + column;
        
        if (whoseTurn) {
            document.querySelector('img:nth-child(' + (child + 43) + ')').style.opacity = 0.1;
        }
    
        else {
            document.querySelector('img:nth-child(' + (child + 85) + ')').style.opacity = 0.1;
        }
    }
}

function checkColumn(column) {

    let emptyRow = -1;

    for (let i = 0; i < 6; i++) {
        if (gameTable[i][column] == 0) {
            emptyRow = i;
        }
    }
    
    return emptyRow;
}

function updateTable(column) {

    row = checkColumn(column);

    if (whoseTurn) {
        gameTable[row][column] = 1;
    } else {
        gameTable[row][column] = 2;
    }
}

function boardUpdate() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {

            child = i * 7 + j;

            if (gameTable[i][j] == 1) {
                document.querySelector('img:nth-child(' + (child + 43) + ')').style.opacity = 1;
            }

            else if (gameTable[i][j] == 2) {
                document.querySelector('img:nth-child(' + (child + 85) + ')').style.opacity = 1;
            }

            else {
                document.querySelector('img:nth-child(' + (child + 43) + ')').style.opacity = 0;
                document.querySelector('img:nth-child(' + (child + 85) + ')').style.opacity = 0;
            }
        }
    }
}

function turnUpdate() {
    if (whoseTurn) {
        instructions[0].style.opacity = 1;
        instructions[1].style.opacity = 0;
    } else {
        instructions[1].style.opacity = 1;
        instructions[0].style.opacity = 0;
    }
}

function checkWinning() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (gameTable[i][j] === 1) {
                if (checkLine(i, j, 1) === 1) {
                    instructions[0].style.opacity = 0;
                    instructions[1].style.opacity = 0;
                    instructions[2].style.opacity = 1;
                    win = true;
                    boardPieces.forEach(piece => {
                        piece.style.cursor = 'default';
                    });
                    yellowPoints++;
                    scores[0].innerHTML = yellowPoints;
                }
            } else if (gameTable[i][j] === 2) {
                if (checkLine(i, j, 2) === 2) {
                    instructions[0].style.opacity = 0;
                    instructions[1].style.opacity = 0;
                    instructions[3].style.opacity = 1;
                    win = true;
                    boardPieces.forEach(piece => {
                        piece.style.cursor = 'default';
                    });
                    redPoints++;
                    scores[1].innerHTML = redPoints;
                }
            }
        }
    }
}

function checkLine(row, column, color) {
    if (checkVerticalLine(row, column, color) || checkHorizontalLine(row, column, color) || checkDiagonalLineRight(row, column, color) || checkDiagonalLineLeft(row, column, color)) {
        return color;
    } else {
        return 0;
    }
}

function checkVerticalLine(row, column, color) {
    if (row <= 2) {

        for (let i = 1; i < 4; i++) {

            if (gameTable[row + i][column] !== color) {
                return false;
            }
        }
    
        return true;

    } else {
        return false;
    }
}

function checkHorizontalLine(row, column, color) {
    if (column <= 3) {

        for (let i = 1; i < 4; i++) {

            if (gameTable[row][column + i] !== color) {
                return false;
            }
        }
        
        return true;

    } else {
        return false;
    }
}

function checkDiagonalLineRight(row, column, color) {
    if (row <= 2 && column <= 3) {
        
        for (let i = 0; i < 4; i++) {
            
            if (gameTable[row + i][column + i] !== color) {
                return false;
            }
        }

        return true;

    } else {
        return false;
    }
}

function checkDiagonalLineLeft(row, column, color) {
    if (row <= 2 && column >= 3) {
        
        for (let i = 0; i < 4; i++) {
            
            if (gameTable[row + i][column - i] !== color) {
                return false;
            }
        }

        return true;

    } else {
        return false;
    }
}
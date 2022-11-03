let boardPieces = document.querySelectorAll('.board-piece');
let yellowChips = document.querySelectorAll('.yellow-chip');
let redChips = document.querySelectorAll('.red-chip');
let instructions = document.querySelectorAll('.instructions h2');
// true = yellow
let whoseTurn = true;
let child;
let row;

let gameTable = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

turnUpdate();

for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {

        boardPieces[j * 7 + i].addEventListener('mouseout', () => {
            boardUpdate();
        })

        boardPieces[j * 7 + i].addEventListener('mouseover', () => {
            if (checkColumn(i) >= 0) {
                previewChip(i);
            }
        })

        boardPieces[j * 7 + i].addEventListener('click', () => {

            if (checkColumn(i) >= 0) {

                updateTable(i);
                whoseTurn = !whoseTurn;
                turnUpdate();
                boardUpdate();
                previewChip(i);
            }
        })
    }
}

function previewChip(column) {

    row = checkColumn(column);

    child = row * 7 + column;

    console.log(child);

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
        instructions[0].style.display = 'block';
        instructions[1].style.display = 'none';
    } else {
        instructions[1].style.display = 'block';
        instructions[0].style.display = 'none';
    }
}
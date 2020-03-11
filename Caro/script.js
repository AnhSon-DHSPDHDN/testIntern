let rowCol = 3;
let col = `<div class="col">`;
let row = `<div class="row"></div>`;
const container = document.querySelector('.container');
let html='';
if (rowCol / rowCol == 1) {
    for (let i = 0; i < rowCol; i++) {
        html += col;
        for (let j = 0; j < rowCol; j++) {
            html += row;
        }
        html += '</div>';
    }
    container.innerHTML = html;
}

let pointWin=3;
function getPoint(){
    let point;
    point=document.querySelector('.point-win').value;
    if(point/point==1){
        pointWin=Number(point);
    }
}

let oChoi = document.querySelectorAll('.row');
oChoi.forEach(e => {
    e.addEventListener('click', startGame);
});
let checkPlayer = false;
const winner = document.querySelector('.winner');
const playerWin = document.querySelector('.player-win');
const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
    location.reload();
});
let checkStop = false;

function getValue() {
    rowCol = document.querySelector('.row-col').value;
    html = '';
    if (rowCol / rowCol == 1) {
        for (let i = 0; i < rowCol; i++) {
            html += col;
            for (let j = 0; j < rowCol; j++) {
                html += row;
            }
            html += '</div>';
        }
        container.innerHTML = html;
    }
    oChoi = document.querySelectorAll('.row');
    oChoi.forEach(e => {
    e.addEventListener('click', startGame);
});
}


function startGame(e) {
    if (e.target.textContent == 'X' || e.target.textContent == 'O' || checkStop) {
        return;
    }
    let matranGame = [];
    checkPlayer = !checkPlayer;
    if (checkPlayer) {
        e.target.classList.remove('active');
        e.target.textContent = 'X';
    } else {
        e.target.classList.add('active');
        e.target.textContent = 'O';
    }
    let temp = 0;
    for (let i = 0; i < rowCol; i++) {
        let row = [];
        for (let j = 0; j < rowCol; j++) {
            row.push(oChoi[temp].textContent);
            temp++;
        }
        matranGame.push(row);
    }
    //console.log(matranGame);
    if (checkWin(matranGame)) {
        playerWin.textContent = `${e.target.textContent} WIN!!`;
        winner.classList.add('show');
        checkStop = true;
    }
    if (checkHoa(matranGame) && !checkWin(matranGame)) {
        playerWin.textContent = `HÒA!!`;
        winner.classList.add('show');
    }
}

function checkWin(matranGame) {
    for (let i = 0; i < rowCol; i++) {
        for (let j = 0; j < rowCol; j++) {
            //if (j == 0 && matranGame[i][j] != '' && matranGame[i][j] === matranGame[i][j + 1] && matranGame[i][j] === matranGame[i][j + 2]) {
            //    return true;
            //}
            if(j<=(rowCol-pointWin)&&matranGame[i][j]!=''){
                let temp=1;
                for(let z=1;z<pointWin;z++){
                    if(matranGame[i][j]!=matranGame[i][j+z]){
                        temp=1;
                    }else temp++;
                }
                if(temp==pointWin) return true;
            }
            //if (i == 0 && matranGame[i][j] != '' && matranGame[i][j] === matranGame[i + 1][j] && matranGame[i][j] === matranGame[i + 2][j]) {
            //    return true;
            //}
            if(i<=(rowCol-pointWin)&&matranGame[i][j]!=''){
                let temp=1;
                for(let z=1;z<pointWin;z++){
                    if(matranGame[i][j]!=matranGame[i+z][j]){
                        temp=1;
                    }else temp++;
                }
                if(temp==pointWin){
                    return true;
                }
            }
            //if (i == 0 && j == 0 && matranGame[i][j] != '' && matranGame[i][j] === matranGame[i + 1][j + 1] && matranGame[i][j] === matranGame[i + 2][j + 2]) {
            //    return true;
            //}
            if(i<=(rowCol-pointWin)&&j<=(rowCol-pointWin)&&matranGame[i][j]!=''){
                let temp=1;
                for(let z=1;z<pointWin;z++){
                    if(matranGame[i][j]!=matranGame[i+z][j+z]){
                        temp=1;
                    }else temp++;
                }
                if(temp==pointWin){
                    return true;
                }
            }
            //if (i == 0 && j == 2 && matranGame[i][j] != '' && matranGame[i][j] === matranGame[i + 1][j - 1] && matranGame[i][j] === matranGame[i + 2][j - 2]) {
            //    return true;
            //}
            if(i<=(rowCol-pointWin)&&j<=rowCol&&matranGame[i][j]!=''){
                let temp=1;
                for(let z=1;z<pointWin;z++){
                    if(matranGame[i][j]!=matranGame[i+z][j-z]){
                        temp=1;
                    }else temp++;
                }
                if(temp==pointWin){
                    return true;
                }
            }
        }
    }
    return false;
}

function checkHoa(matranGame) {
    for (let i = 0; i < rowCol; i++) {
        for (let j = 0; j < rowCol; j++) {
            if (!matranGame[i][j]) return false;
        }
    }
    return true;
}
let row = 0;
let col = 0;
let GRID=[];
let ogrid;
function getMN() {
    let checkRow;
    checkRow = document.querySelector('.nhapn').value;
    if (checkRow >= 0) {
        row = Number(checkRow);
    }
    
    let checkCol;
    checkCol = document.querySelector('.nhapm').value;
    if (checkCol >= 0) {
        col = Number(checkCol);
    }
    const container = document.querySelector('.container');
    const header=document.querySelector('.header');
    let html = '';
    let htmlstt=`<div class="col">`;
    for(let i=0;i<row;i++){
        htmlstt+=`<div class="stt" onclick="sort(${i})">${i+1}</div>`;
    }htmlstt+=`</div>`;
    header.innerHTML = htmlstt;
    for (let i = 0; i < col; i++) {
        html += `<div class="col">`;
        for (let j = 0; j < row; j++) {
            html += `<div class="row"></div>`;
        }
        html += `</div>`;
    }
    container.innerHTML = html;
    ogrid=document.querySelectorAll('.row');
    ogrid.forEach(e=>{
        e.textContent=Math.round((Math.random()*999)+0.5);
    });
    const ohead=document.querySelectorAll('.stt');
    GRID=[];
    let temp=0;
    for(let i=0;i<col;i++){
        let rowArr=[];
        for(let j=0;j<row;j++){
            rowArr.push(ogrid[temp].textContent);
            temp++;            
        }
        GRID.push(rowArr);
    }
}

function sort(index){
    GRID.sort((a,b)=>{
        return a[index]-b[index];
    });
    let temp=0;
    for(let i=0;i<col;i++){
        for(let j=0;j<row;j++){
            ogrid[temp].textContent=GRID[i][j];
            temp++;
        }
    }
}

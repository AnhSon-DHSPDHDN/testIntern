const canvas=document.querySelector('#myCanvas');
let ctx=canvas.getContext('2d');
const canvasW=canvas.width;
const canvasH=canvas.height;
let ranArr=[];
let ranLength=1;
const ranW=10;
const ranH=10;
let dichuyen='phai';
const score=document.querySelector('.score');
let sc=0;

let food={
    x:Math.round(Math.random()*19),
    y:Math.round(Math.random()*19)
}

function drawFood(x,y){
    ctx.fillStyle='yellow';
    ctx.fillRect(x*ranW,y*ranH,ranW,ranH);
    ctx.fillStyle='black';
    ctx.strokeRect(x*ranW,y*ranH,ranW,ranH);
}

document.addEventListener('keydown',(e)=>{
    if(e.keyCode===39&&dichuyen!='trai'){
        dichuyen='phai';
    }else if(e.keyCode===37&&dichuyen!='phai'){
        dichuyen='trai';
    }else if(e.keyCode===38&&dichuyen!='xuong'){
        dichuyen='len';
    }else if(e.keyCode===40&&dichuyen!='len'){
        dichuyen='xuong';
    }
});

function drawRan(x,y){
    ctx.fillStyle='white';
    ctx.fillRect(x*ranW,y*ranH,ranW,ranH);
    ctx.fillStyle='black';
    ctx.strokeRect(x*ranW,y*ranH,ranW,ranH);
}

for(let i=ranLength-1;i>=0;i--){
    ranArr.push({
        x:10,
        y:10
    });
}

function ranDie(x,y,arr){
    for(let i=0;i<arr.length;i++){
        if(x===arr[i].x&&y===arr[i].y) return true;
    }
    return false;
}

function draw(){
    ctx.clearRect(0,0,canvasW,canvasH);
    for(let i=0;i<ranArr.length;i++){
        drawRan(ranArr[i].x,ranArr[i].y);
        if(food.x==ranArr.x&&food.y==ranArr.y){
            food={
                x:Math.round(Math.random()*19),
                y:Math.round(Math.random()*19)
            }
        }
    }
    //dau
    let ranX=ranArr[0].x;
    let ranY=ranArr[0].y;
    drawFood(food.x,food.y);

    switch(dichuyen){
        case 'phai':{
            ranX++;
            break;
        }
        case 'xuong':{
            ranY++;
            break;
        }
        case 'len':{
            ranY--;
            break;
        }
        case 'trai':{
            ranX--;
            break;
        }
    }

    if(ranX<0||ranY<0||ranX>=canvasW/ranW||ranY>=canvasH/ranH||ranDie(ranX,ranY,ranArr)){
        //console.log(ranX,ranY);
        location.reload();
    }
    let newDau;
    if(ranX===food.x&&ranY===food.y){
        newDau={
            x:ranX,
            y:ranY
        };
        food={
            x:Math.round(Math.random()*19),
            y:Math.round(Math.random()*19)
        };
        sc++;
        score.textContent=`Score: ${sc}`;
    }else{
        ranArr.pop();
        newDau={
            x:ranX,
            y:ranY
        };
    }

    //ranArr.pop();
    ranArr.unshift(newDau);
}

function drawB(){
    ctx.clearRect(0,0,canvasW,canvasH);
    for(let i=0;i<ranArr.length;i++){
        drawRan(ranArr[i].x,ranArr[i].y);
        if(food.x==ranArr.x&&food.y==ranArr.y){
            food={
                x:Math.round(Math.random()*19),
                y:Math.round(Math.random()*19)
            }
        }
    }
    //dau
    let ranX=ranArr[0].x;
    let ranY=ranArr[0].y;
    drawFood(food.x,food.y);

    switch(dichuyen){
        case 'phai':{
            ranX++;
            break;
        }
        case 'xuong':{
            ranY++;
            break;
        }
        case 'len':{
            ranY--;
            break;
        }
        case 'trai':{
            ranX--;
            break;
        }
    }

    if(ranX<0){
        ranX=19;
    }
    if(ranY<0){
        ranY=19;
    }
    if(ranX>=canvasW/ranW){
        ranX=0;
    }
    if(ranY>=canvasH/ranH){
        ranY=0;
    }
    if(ranDie(ranX,ranY,ranArr)){
        location.reload()
    }
    let newDau;
    if(ranX===food.x&&ranY===food.y){
        newDau={
            x:ranX,
            y:ranY
        };
        food={
            x:Math.round(Math.random()*19),
            y:Math.round(Math.random()*19)
        };
        sc++;
        score.textContent=`Score: ${sc}`;
    }else{
        ranArr.pop();
        newDau={
            x:ranX,
            y:ranY
        };
    }

    //ranArr.pop();
    ranArr.unshift(newDau);
}

const btn=document.querySelector('.btn');
btn.addEventListener('click',pause);
let checkPause=false;
let timeID=setInterval(draw,1000);
const btnGameModA=document.querySelector('.gamemodA');
const btnGameModB=document.querySelector('.gamemodB');
btnGameModA.classList.add('active');

function gameModA(){
    btnGameModB.classList.remove('active');
    btnGameModA.classList.add('active');
    clearInterval(timeID);
    timeID=setInterval(draw,1000);
}
function gameModB(){
    btnGameModA.classList.remove('active');
    btnGameModB.classList.add('active');
    clearInterval(timeID);
    timeID=setInterval(drawB,1000);
}

function pause(){
    checkPause=!checkPause;
    if(checkPause){
        clearInterval(timeID);
        btn.textContent='Resume';
    }else{
        timeID=setInterval(draw,1000);
        btn.textContent='Pause';
    }
}
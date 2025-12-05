// i have to do start by clicking on any start button
// we have to start by clicking only

let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let highest=0;
 
let h2=document.querySelector("h2");
let button=document.querySelector(".start-btn");


button.addEventListener("click",function(){
    if(started==false){
        console.log("Game started");
        started=true;
    } 
    if(started==true){
        button.classList.add("hide");

    }
    levelUp();
});

// document.addEventListener("click",function(){
//     if(started==false){
//         console.log("Game started");
//         started=true;
//     } 
//     levelUp();
// });

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`)
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log("game sequence",gameSeq);
    
    btnFlash(randBtn);
}

function checkAnswer(idx){
    console.log(`current level ,${level}`);
    // let idx=level-1; 
    if(gameSeq[idx]==userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
            // levelUp();

        }
        // console.log("same value");
    }
    else{
        if(highest<=level-1){
            highest=level-1;
        }
        h2.innerHTML=`Game over! your score was <b> ${level-1}</b> ,
        your high score is <b> ${highest} </b> , <br> press start button to start Game`;
        // console.log("Game over",)
        document.querySelector("body").style.background="red";
        setTimeout(function(){
            document.querySelector("body").style.background="white";

        },250);
        reset();
    }
}

let userColor;
function btnPress(){
    // console.log("btn was pressed");
    // console.log(this);
    if(started==false){
        h2.innerText="start with clicking any key";
    }
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("user sequence",userSeq);
    checkAnswer(userSeq.length-1);

    
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    button.classList.remove("hide");
    level=0;
    started=false;
    gameSeq=[];
    userSeq=[];
}

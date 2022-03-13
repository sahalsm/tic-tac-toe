const boxes = Array.from(document.getElementsByClassName('box'));
const statusText = document.getElementById('statusText');
const refresh = document.getElementById('restartbutton');
const audio = new Audio('button-50.mp3');
const win = new Audio('Ta Da-SoundBible.com-1884170640.mp3');
const defeat = new Audio('game-show-wrong-answer-fail-01-sound-effect-11737061.mp3');
const spaces = [];
const o_text = "O";
const x_text = "X";
let totalMove = 0;
let currentPlayer = o_text;
let botVal = '';
let count = -1;

const drawBoard = ()=>{
    boxes.forEach((box,index)=>{
        let styleString = '';
        if(index < 3){
            styleString += 'border-bottom: 3px solid red;';
        }
        if(index > 5){
            styleString += 'border-top: 3px solid red;';
        }
        if(index % 3 === 0 ) {
            styleString += 'border-right: 3px solid red;';
        }
        if(index % 3 == 2){
            styleString += 'border-left: 3px solid red;';
        }
        box.style = styleString;
        box.addEventListener('click',boxClicked);
    });
};
const botValue = ()=>{
    var randVal = -1;
    do{
        randVal = Math.floor(Math.random()*9);
    }while(spaces[randVal] == o_text || spaces[randVal] == x_text);
        return randVal;
};
const boxClicked = (e) =>{
    audio.play();
    const id = e.target.id; 
    totalMove +=1;
    console.log(totalMove);  
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;    
        if(playerHasWon()){
            if(currentPlayer == o_text)
            {   
                win.play();
                statusText.innerText = `YOU WON!`;
                return;
            }
            else{
                defeat.play();
                statusText.innerText = `YOU LOST`;
                return;               
            }

        }
        else{
            if(totalMove >8)
            {
                statusText.innerText = `It's a DRAW!`;
                return;
            }
        }

       
        if(currentPlayer == o_text)
        {
            currentPlayer = x_text;  
            count += 1;             
            botVal = botValue();
            setTimeout(function (){
                boxes.forEach((box,index)=>{
                    if(index == botVal)
                    {
                        const bv = document.getElementById(''+botVal+'');                  
                        bv.click();
                        return;
                    }
                });
            },500);
            
        }
        else{
            currentPlayer = o_text;
        }
    }
}
const playerHasWon = ()=>{
    if(spaces[0]==currentPlayer){
        if(spaces[1]==currentPlayer && spaces[2]==currentPlayer)
        {
            console.log("win top");
            return true;
        }
        if(spaces[3]==currentPlayer && spaces[6]==currentPlayer)
        {
            console.log("win left");
            return true;
        }
        if(spaces[4]==currentPlayer && spaces[8]==currentPlayer)
        {
            console.log("win diagonal");
            return true;
        }
    }
    if(spaces[8]==currentPlayer){
        if(spaces[5]==currentPlayer && spaces[2]==currentPlayer)
        {
            console.log("win right");
            return true;
        }
        if(spaces[6]==currentPlayer && spaces[7]==currentPlayer)
        {
            console.log("win bottom");
            return true;
        }
    }
    if(spaces[4]==currentPlayer){
        if(spaces[1]==currentPlayer && spaces[7]==currentPlayer)
        {
            console.log("win middle");
            return true;
        }
        if(spaces[3]==currentPlayer && spaces[5]==currentPlayer)
        {
            console.log("win center");
            return true;
        }
        if(spaces[2]==currentPlayer && spaces[6]==currentPlayer)
        {
            console.log("win diagonal");
            return true;
        }
    }

}
refresh.addEventListener('click',() =>{
    spaces.forEach((space,index)=>{
        spaces[index] = null;
    })
    boxes.forEach(box=>{
        box.innerText = '';
    })
    statusText.innerText = `Let's Play`;
    currentPlayer = o_text;
    totalMove = 0;

})
drawBoard();
let inputDir={x:0,y:0};
let direction = { x: 0, y: 0 };
let foodSound = new Audio('./music/food.mp3');
let gameoverSound = new Audio('./music/gameover.mp3');
let moveSound = new Audio('./music/move.mp3');
let musicSound = new Audio('./music/music.mp3');
let speed = 3;
let score=0;
let lastPaintTime = 0;
let snakearr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    for (let i = 1; i< snakearr.length; i++){
        if(snake[i].x===snake[0].x &&snake[i].y===snake[0].y ){ 
            return true;
        }
    }
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){ 
            return true;
        }
1       
    }

function gameEngine() {
    //updateing the snake array & food
    if(isCollide(snakearr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any  key to play Again!");
        snakearr=[{ x: 13, y: 15 }];
        musicSound.play();
        score=0;
    }
    //if you have eaten a food icrement the score and generate the food
    if(snakearr[0].y ===food.y && snakearr[0].x === food.x) {
        foodSound.play();
        score++;
        speed++;
        scoreBox.innerHTML="Score: "+ score;
        snakearr.unshift({x:snakearr[0].x + inputDir.x,y:snakearr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+ (b-a)* Math.random()),y:Math.round(a+ (b-a)* Math.random())}
    }
    //moving game
    for (let i = snakearr.length-2; i>=0; i--){ 
        snakearr[i+1]={...snakearr[i]};

    }
    snakearr[0].x+=inputDir.x;
    snakearr[0].y +=inputDir.y;
    //display the snake
    board.innerHTML = " ";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

        //display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

    })
}










musicSound.play();

//main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
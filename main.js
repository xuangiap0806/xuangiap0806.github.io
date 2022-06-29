var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext("2d");


canvas.height = 600;
canvas.width = 1000;

const imgIdle = new Image();
const imgRun = new Image();
const imgJump = new Image();
const imgBack = new Image();
const imgUI = new Image();
const imgExplode = new Image();
const imgAvata = new Image();
const imgMode = new Image();
const imgBoardStart = new Image();
const imgBoard = new Image();
const imgLander = new Image();
const imgAttack = new Image();
const imgVirus = new Image();
const imgObstacle = new Image();
const imgDie = new Image();
const imgSlide = new Image();
const imgIcon = new Image();
const imgArrow = new Image();
const imgShield = new Image();
const img5k = new Image();


var audioJump = new Audio('Jump.mp3');
var audioHurt = new Audio('Hurt.mp3');
var audioExplode = new Audio('Explode.mp3');
var audioGameOver = new Audio('gameover.mp3');
var audioPlay = new Audio('playsong.mp3');
var audioStart = new Audio('startsong.mp3');
var audioFocus = new Audio('Focus.mp3');
var audioYeah = new Audio('Yeah.mp3');


/*meme*/
const imgMeme1 = new Image();
const imgMeme2 = new Image();
const imgMeme3 = new Image();
const imgMeme4 = new Image();
const imgMeme5 = new Image();
const imgMeme6 = new Image();



imgIcon.src = 'Icon.png';
imgMeme1.src = 'meme1.jpg'
imgMeme2.src = 'meme2.png'
imgMeme3.src = 'meme3.jpg'
imgMeme4.src = 'meme4.jpg'
imgMeme5.src = 'meme5.png'
imgMeme6.src = 'meme6.png'
imgUI.src = 'UI1.png';
imgBack.src = 'Back.png';
imgIdle.src = 'Idle.png';
imgRun.src = 'Run.png';
imgJump.src = 'Jump.png';
imgExplode.src = 'Explode.png';
imgAvata.src = 'avatagame.jpg';
imgMode.src = 'Mode.jpg';
imgBoardStart.src = 'Boardstart.png';
imgBoard.src = 'board.png';
imgLander.src = 'Lander.png';
imgAttack.src = 'attack.png';
imgVirus.src = 'Virus.png';
imgObstacle.src = 'obstacle.png';
imgDie.src = 'Die.png';
imgSlide.src = 'slide.png';
imgArrow.src = 'arrow.png';
imgShield.src = 'shield.png';
img5k.src = '5k.png';




var modeGame = 'moutain';

var frame = 0;
 
var gameStatus = 'lobby';// setmod, start, play, end

var state = 'run';

var heart = 10;
var score = 0;
var maxScore = 0;
var dubbleJump = 0;
var isShield = false;
var timeShield = 2500;

//------------------------------------------------------begin background
var arrBack = [];

class bg{
    constructor(CX, CY){
        this.CX = CX;
        this.CY = CY;
        this.CW = 1000;
        this.CH = 600;
        this.IX1 = 0;
        this.IY1 = 0;
        this.IX2 = 0;
        this.IY2 = 600;
        this.IW = 998;
        this.IH = 600;
        this.dx = 1;
    }
    
    draw(){
        ctx.beginPath();
        if (modeGame == 'moutain'){
            ctx.drawImage(imgBack, this.IX1, this.IY1, this.IW, this.IH, this.CX, this.CY, this.CW, this.CH);
        } else {
            ctx.drawImage(imgBack, this.IX2, this.IY2, this.IW, this.IH, this.CX, this.CY, this.CW, this.CH);
        }
    }
    move(){
        if (gameStatus == 'start'){
            this.dx = 0.5;
        } else{
            this.dx = 2;
        };
        this.CX -= this.dx;
        if (arrBack[0].CX <= -arrBack[0].CW){
            arrBack.splice(0,1);
            arrBack[0].CX += arrBack[0].dx
            let back = new bg(arrBack[0].CW, 0);
            arrBack.push(back);
        }
    }
};
function creatBack(){
    for (let i = 0; i<2; i++){
        let backg = new bg(998*(i)+1, 0);
        arrBack.push(backg);
    }
}
creatBack();

function moveBack(){
    arrBack.forEach(function(Item){
        Item.move();
    })
}
function drawBack(){
    arrBack.forEach(function(Item){
        Item.draw();
    })
}

//-----------------------------------------------------end background

//-----------------------------------------------------begin score
var scores = [
    {
        IX: 17,
        IY: 344,
    },
    {
        IX: 18,
        IY: 399,
    },
    {
        IX: 17,
        IY: 453,
    },
    {
        IX: 18,
        IY: 509,
    },
    {
        IX: 17,
        IY: 564,
    },
    {
        IX: 68,
        IY: 564,
    },
    {
        IX: 68,
        IY: 343,
    },
    {
        IX: 64,
        IY: 399,
    },
    {
        IX: 67,
        IY: 454,
    },
    {
        IX: 67,
        IY: 509,
    },
]
function drawScore(num, x, y, len, hei){
    ctx.beginPath();
    ctx.drawImage(imgBoard, scores[num].IX, scores[num].IY, len, hei, x, y, len, hei);
}
//-----------------------------------------------------end score


//-----------------------------------------------------begin UI settting

function drawUI(){
    if (gameStatus == 'lobby'){
        ctx.beginPath();
        ctx.drawImage(imgUI, 10, 330, 384, 497, 300, 50, 384, 500);
        ctx.drawImage(imgAvata, 0, 0, 1024, 1024, 390, 160, 200, 200);
        ctx.drawImage(imgUI, 420, 317, 53, 41, 450, 400, 79, 61);
    };
    if (gameStatus == 'setmode'){
        ctx.beginPath();
        ctx.drawImage(imgUI, 476, 52, 600, 400, 200, 30, 600, 500);
        ctx.drawImage(imgUI, 420, 463, 55, 43, 207, 40, 55, 43); /************ */

        ctx.drawImage(imgUI, 28, 58, 209, 255, 250, 105, 209, 255);
        ctx.drawImage(imgUI, 256, 58, 209, 255, 530, 102, 209, 255);
        ctx.drawImage(imgMode, 0, 400, 402, 400, 275, 200, 160, 130);
        ctx.drawImage(imgMode, 0, 0, 402, 400, 550, 200, 160, 130);
        ctx.drawImage(imgUI, 420, 317, 53, 41, 455, 350, 79, 61);
        ctx.drawImage(imgMeme1, 0, 0, 529, 442, 280, 380, 130, 100);
        ctx.drawImage(imgMeme4, 0, 0, 500, 375, 580, 380, 130, 100);
    };
    if (gameStatus == 'start'){
        ctx.drawImage(imgUI, 1012, 463, 418, 440, 290, 90, 418, 440)
        ctx.drawImage(imgUI, 420, 317, 53, 41, 530, 475, 79, 61);
        ctx.drawImage(imgUI, 421, 464, 53, 41, 390, 475, 79, 61);        
    };
    if (gameStatus == 'play'){
        ctx.beginPath();
        ctx.drawImage(imgBoard, 280, 53, 55, 52, 20, 20, 55, 52);
        ctx.drawImage(imgIcon, 0, 0, 100, 98, 850, 20, 50, 50);
        ctx.drawImage(imgIcon, 100, 0, 107, 98, 700, 20, 50, 50);
        let scoreString = score.toString();
        let heartString = heart.toString();
        for (let i = 0; i<scoreString.length; i++){
            drawScore(scoreString[i], 900+i*30, 30, 26, 31)
        };
        for (let i = 0; i<heartString.length; i++){
            drawScore(heartString[i], 750+i*30, 30, 26, 31)
        };
    };
    if (gameStatus == 'pause'){
        ctx.beginPath();
        ctx.drawImage(imgBoard, 0, 0, 279, 326, 350, 100, 279, 326);
        ctx.drawImage(imgBoard, 280, 0, 55, 53, 435, 250, 110, 106)
    };
    if (gameStatus == 'gameOver'){
        ctx.beginPath();
        ctx.drawImage(imgUI, 478, 523, 515, 313, 230, 60, 515, 313);
        let scoreString = score.toString();
        for (let i = 0; i<scoreString.length; i++){
            drawScore(scoreString[i], 400+i*30, 198, 26, 31)
        };
        if (score >= maxScore){
            drawScore('1', 300+i*30, 245, 26, 31);
        } else{
            drawScore('2', 300+i*30, 245, 26, 31);
        }
        ctx.drawImage(imgUI, 422, 464, 51, 40, 450, 300, 51+10, 40+10)
    }
};
//-----------------------------------------------------end UI setting





//-----------------------------------------------------begin Character Element

class stickMan{
    constructor(CX, CY){
        this.CX = CX;
        this.CY = CY;
        this.IW = 200;
        this.IH = 160;
        this.CW = this.IW;
        this.CH = this.IH;
        this.a = 0;
        this.a1 = 0;
        this.v = 0;
        this.i = 0;
        this.r = 0;
        this.j = 1;
        this.d = 1;
        this.s = 0;
        this.animate = {
            //many time
            stand:[
                {IX: 0, IY: 0},
                {IX: 200, IY: 0},
                {IX: 400, IY: 0},
                {IX: 600, IY: 0},
                {IX: 800, IY: 0},
                {IX: 1000, IY: 0},
                {IX: 0, IY: 160},
                {IX: 200, IY: 160},
                {IX: 400, IY: 160},
                {IX: 600, IY: 160},
                {IX: 800, IY: 160},
                {IX: 1000, IY: 160},
                {IX: 0, IY: 320},
                {IX: 200, IY: 320},
                {IX: 400, IY: 320},
                {IX: 600, IY: 320},
            ],
            // many times
            run:[
                {IX: 0, IY: 0},
                {IX: 200, IY: 0},
                {IX: 400, IY: 0},
                {IX: 600, IY: 0},
                {IX: 800, IY: 0},
                {IX: 1000, IY: 0},
                {IX: 0, IY: 160},
                {IX: 200, IY: 160},
                {IX: 400, IY: 160},
                {IX: 600, IY: 160},
                {IX: 800, IY: 160},
                {IX: 1000, IY: 160},
                {IX: 0, IY: 320},
                {IX: 200, IY: 320},
                {IX: 400, IY: 320},
                {IX: 600, IY: 320},
                {IX: 800, IY: 320},
                {IX: 1000, IY: 320},
                {IX: 0, IY: 480},
                {IX: 200, IY: 480},
                {IX: 400, IY: 480},
                {IX: 600, IY: 480},
                {IX: 800, IY: 480},
                {IX: 1000, IY: 480},
            ],
            // one time
            jump:[
                {IX: 0, IY: 0}, //jump
                {IX: 200, IY: 0},//jump attack
                {IX: 400, IY: 0}, //jump(down)
                {IX: 600, IY: 0}, //jump attack(down)
            ],
            // one time
            attack:[
                {IX: 0, IY: 0},
                {IX: 200, IY: 0},
                {IX: 400, IY: 0},
                {IX: 600, IY: 0},
                {IX: 800, IY: 0},
                {IX: 1000, IY: 0},
                {IX: 0, IY: 160},
                {IX: 200, IY: 160},
                {IX: 400, IY: 160},
                {IX: 600, IY: 160},
                {IX: 800, IY: 160},
                {IX: 1000, IY: 160},
                {IX: 0, IY: 320},
                {IX: 200, IY: 320},
                {IX: 400, IY: 320},
                {IX: 600, IY: 320},
                {IX: 800, IY: 320},
                {IX: 1000, IY: 320},
                {IX: 0, IY: 480},
                {IX: 200, IY: 480},
                {IX: 400, IY: 480},
                {IX: 600, IY: 480},
                {IX: 800, IY: 480},
                {IX: 1000, IY: 480},
            ],
            // one time
            die:[
                {IX: 0, IY: 0},
                {IX: 200, IY: 0},
                {IX: 400, IY: 0},
                {IX: 600, IY: 0},
                {IX: 800, IY: 0},
                {IX: 1000, IY: 0},
                {IX: 0, IY: 160},
                {IX: 200, IY: 160},
                {IX: 400, IY: 160},
                {IX: 600, IY: 160},
                {IX: 800, IY: 160},
                {IX: 1000, IY: 160},
                {IX: 0, IY: 320},
                {IX: 200, IY: 320},
                {IX: 400, IY: 320},
                {IX: 600, IY: 320},
                {IX: 800, IY: 320},
                {IX: 1000, IY: 320},
                {IX: 0, IY: 480},
                {IX: 200, IY: 480},
            ],
            slide:[
                {IX:0, IY:0},
                {IX:199, IY:0},
                {IX:398, IY:0},
                {IX:597, IY:0},
                {IX:796, IY:0},
                {IX:995, IY:0},
                {IX:1194, IY:0},
                {IX:0, IY:156},
                {IX:199, IY:156},
            ]
        }
        this.state = 'attack';
    };
    draw(){
        ctx.beginPath();
        if (frame % 1 == 0 && gameStatus == 'play'){
            if (gameStatus != 'pause' && gameStatus != 'gameOver'){
                this.i++;
                this.r++;
                if (this.i >15){
                    this.i = 0;
                };
                if (this.r >23){
                    this.r = 0;
                    if (this.CY == 385 && state != 'slide'){
                        state = 'run';
                    }
                    
                };
            };
        
        } else if (frame % 2 == 0 && gameStatus == 'start'){
            this.i++;
            if (this.i >15){
                this.i = 0;
            };
        } else if (frame % 2 == 0 && gameStatus == 'gameOver'){
            this.d++;
            if (this.d >= 19){
                this.d = 19;
            }
        }

        if (state == 'jump' || state == 'jattack'){
            this.v +=this.a;
            this.CY-=this.v;
            if (this.v == 5 + this.a){
                this.v = 1;
            }
            if (this.v<0){
                this.a = -1;
            }
            this.a -= 0.06;
        }

        if (state == 'slide'){
            if (frame % 5 == 1){
                this.s++;
            }
            if (this.s == 7){
                this.s = 0;
                state = 'run';
            }
        }
        if (state == 'jump' || state == 'jattack'){
            if (this.CY>=385){
                this.CY = 385;
                state = 'run';
                this.a = 0;
                this.v = 0;
            }
        }
       
        if (this.state == 'stand'){
            ctx.drawImage(imgIdle, this.animate.stand[this.i].IX, this.animate.stand[this.i].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
        } else
        if (this.state == 'run' && state == 'run'){
            ctx.drawImage(imgRun, this.animate.run[this.r].IX, this.animate.run[this.r].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
        } else 
        if (this.state == 'run' && state == 'attack'){
            ctx.drawImage(imgAttack, this.animate.run[this.r].IX, this.animate.run[this.r].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
        } else
        if (this.state == 'run' && state == 'jump'){
            if (this.v>=0){
            ctx.drawImage(imgJump, this.animate.jump[0].IX, this.animate.jump[0].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
            } else{
            ctx.drawImage(imgJump, this.animate.jump[2].IX, this.animate.jump[2].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
            }
        } else
        if (this.state == 'run' && state == 'jattack'){
            if (this.v>=0){
                ctx.drawImage(imgJump, this.animate.jump[1].IX, this.animate.jump[1].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
            } else{
                ctx.drawImage(imgJump, this.animate.jump[3].IX, this.animate.jump[3].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
            }
        } else if(this.state == 'die'){
            ctx.drawImage(imgDie, this.animate.die[this.d].IX, this.animate.die[this.d].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH)
        }else if (this.state == 'run' && state == 'slide'){
            ctx.drawImage(imgSlide, this.animate.slide[this.s].IX, this.animate.slide[this.s].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
        }
    };
    
};

var Character = new stickMan(100, 385);



//-----------------------------------------------------end Character


//-----------------------------------------------------begin boss
var arrBoss = [];
class boss{
    constructor(CX, CY){
        this.CX = CX;
        this.CY = CY;
        this.animate = [
            {IX: 0, IY: 0},
            {IX: 200, IY: 0},
            {IX: 400, IY: 0},
            {IX: 600, IY: 0},
            {IX: 800, IY: 0},
        ];
        this.IW = 200;
        this.IH = 160;
        this.i = 0;
        this.dx = -4;
    };
    draw(){
        ctx.beginPath();
        if (frame % 5 == 0){
            this.i++;
            if (this.i == 4){
                this.i = 0;
            }
        }
        ctx.drawImage(imgVirus, this.animate[this.i].IX, this.animate[this.i].IY, this.IW, this.IH, this.CX, this.CY, this.IW/2, this.IH/2);
    };
    move(){
        if (gameStatus == 'play'){
            this.CX += this.dx;
        } else{
            this.CX = 0;
        };
        if (arrBoss[0].CX<=-arrBoss[0].IW){
            arrBoss.splice(0,1);
            let randomX = arrBoss[arrBoss.length - 1].CX + arrBoss[arrBoss.length - 1].IW  + Math.random()*1001;
            let randomY = (Math.random()*251)+200;
            let bos = new boss(randomX, randomY);
            arrBoss.push(bos);
            heart--;
            audioHurt.play()
        }

    }
}

let fisrtBos = new boss(1000, 400);
arrBoss.push(fisrtBos);
function createBoss(){
    for (let i = 1; i<=3; i++){
        let rdX = arrBoss[i - 1].CX + arrBoss[i - 1].IW  + Math.random()*1001;
        let rdY = Math.random()*101+100; 
        let newbos = new boss(rdX, rdY);
        arrBoss.push(newbos);
    }
};
createBoss();

function drawBoss(){
    arrBoss.forEach(function(Item){
        Item.draw()
    })
};
function moveBoss(){
    arrBoss.forEach(function(Item){
        Item.move()
    })
};
//-----------------------------------------------------end boss

//-----------------------------------------------------begin obstacle
var arrObstacle = [];
class Obstacle{
    constructor(CX, CY, size){
        this.CX = CX;
        this.CY = CY;
        this.type = [
            {
                IX: 0,
                IY: 0,
                IW: 420,
                IH: 606,
            },
            {
                IX: 420,
                IY: 0,
                IW: 420,
                IH: 606,
            }
        ];
        this.CW = 70;
        this.CH = 101;
        this.dx = -8;
        this.size = size;
    };
    draw(){
        if (modeGame == 'desert'){
            ctx.beginPath();
            ctx.drawImage(imgObstacle, this.type[0].IX, this.type[0].IY, this.type[0].IW, this.type[0].IH, this.CX, 536 - (this.CH*this.size), this.CW * this.size, this.CH * this.size);
        } else if (modeGame == 'moutain'){
            ctx.beginPath();
            ctx.drawImage(imgObstacle, this.type[1].IX, this.type[1].IY, this.type[1].IW, this.type[1].IH, this.CX, 536 - (this.CH*this.size), this.CW * this.size, this.CH * this.size);
        }
    };
    move(){
        this.CX+=this.dx;
        if (arrObstacle[0].CX <= -arrObstacle[0].type[0].IW* arrObstacle[0].size){
            arrObstacle.splice(0,1)
            arrObstacle[0].CX += arrObstacle[0].dx
            let randomPosX = Math.random()*301+300;
            let randomSize = Math.round(Math.random()*1+1);
            let newObstacle = new Obstacle(arrObstacle[arrObstacle.length-1].CX+randomPosX, 435, randomSize);
            arrObstacle.push(newObstacle);
        }
        
    }
}
function creatObstacle(){
    for (let i = 0; i<5; i++){
        let randomSize = Math.round(Math.random()*1+1);
        if (randomSize == 2){
            randomSize -= 0.5;
        }
        let newObstacle = new Obstacle(1000*(i+1), 435, randomSize);
        arrObstacle.push(newObstacle);
    }
}
creatObstacle();
function drawObstacle(){
    arrObstacle.forEach(function(Item){
        Item.draw();
    })
};
function moveObstacle(){
    arrObstacle.forEach(function(Item){
        Item.move();
    })
};



//-----------------------------------------------------end obstacle


//-----------------------------------------------------begin Chorn
var arrChorn = [];
class Chorn{
    constructor(CX){
        this.CX = CX;
        this.CY = 460;
        this.CW = 81;
        this.CH = 264;
        this.IX = 0;
        this.IY = 625;
        this.IW = 270;
        this.IH = 880;
        this.dx = -8;
    };
    draw(){
        ctx.beginPath();
        ctx.drawImage(imgObstacle, this.IX, this.IY, this.IW, this.IH, this.CX, this.CY, this.CW, this.CH);
    }
    move(){
        this.CX += this.dx;
        if (arrChorn[0].CX < -arrChorn[0].CW){
            arrChorn.splice(0,1);
            arrChorn[0].CX += arrChorn[0].dx;
            let newChorn =new Chorn(arrChorn[arrChorn.length - 1].CX + this.CW +3000);
            arrChorn.push(newChorn);
        }
    }
}

function createFirstChorn(){
    for (let i = 0; i<3; i++){
        let newChorn = new Chorn(i*1000 + 1500);
        arrChorn.push(newChorn);
    };
};
createFirstChorn();
function drawChorn(){
    arrChorn.forEach(function(Item){
        Item.draw();
    });
};
function moveChorn(){
    arrChorn.forEach(function(Item){
        Item.move();
    });
};
function checkContact(){
    if (((Character.CX + Character.IW - 70>=arrChorn[0].CX+20 && Character.CX + 70 <= arrChorn[0].CX+arrChorn[0].CW-20)&&
        (Character.CY + Character.IH - 30>=arrChorn[0].CY+5 && Character.CY + 30 <= arrChorn[0].CY+arrChorn[0].CH) && isShield!=true) ||
        ((Character.CX + Character.IW - 70>=arrArrow[0].CX && Character.CX + 70 <= arrArrow[0].CX+arrArrow[0].CW)&&
        (Character.CY + Character.IH - 30>=arrArrow[0].CY && Character.CY + 30 <= arrArrow[0].CY+arrArrow[0].CH)&&
        state!='slide' && isShield != true)){
            heart = 0;
        };
    if ((Character.CX + Character.IW - 70>=arr5k[0].CX && Character.CX + 70 <= arr5k[0].CX+arr5k[0].CW)&&
    (Character.CY + Character.IH - 30>=arr5k[0].CY && Character.CY + 30 <= arr5k[0].CY+arr5k[0].CH)){
        isShield = true;
        arr5k.splice(0,1);
        let rdPosX = Math.round(Math.random()*7000)+500;
        let rdPosY = Math.random()*101+100; 
        let new5k = new FiveK(arr5k[arr5k.length-1].CX + rdPosX, rdPosY);
        arr5k.push(new5k);
        audioYeah.play();
    }
};

//-----------------------------------------------------end Chorn




//-----------------------------------------------------handle explode begin
var arrExplode = [];
class Explodes{
    constructor(a){
        this.CX = arrBoss[a].CX;
        this.CY = arrBoss[a].CY;
        this.IW = 130;
        this.IH = 130;
        this.animate = [
            {IX:0, IY:0},
            {IX:130, IY:0},
            {IX:260, IY:0},
            {IX:390, IY:0},
            {IX:520, IY:0},
            {IX:650, IY:0},
            {IX:780, IY:0},
        ];
        this.i = 0;
        this.dx = -4;
    }
    draw(){
        ctx.beginPath();
        if (frame%5 == 0){
            this.i++;
            if (this.i == 6){
                this.i = 0;
                arrExplode.splice(0,1);
            }
        }
        ctx.drawImage(imgExplode, this.animate[this.i].IX, this.animate[this.i].IY, this.IW, this.IH, this.CX, this.CY, this.IW+20, this.IH+20);
    };
    move(){
        this.CX += this.dx;
    }
}
var checkExplode = false;
var posExplode = 0;
function checkImpact(){
    if (
        (Character.CX + Character.IW - 70>=arrBoss[0].CX+10 && Character.CX + 70 <= arrBoss[0].CX+arrBoss[0].IW/2 - 37)&&
        (Character.CY + Character.IH - 30>=arrBoss[0].CY+10 && Character.CY + 30 <= arrBoss[0].CY+arrBoss[0].IH/2 - 12)
    ){
        if (checkExplode == false){
            if (state == 'attack' || state == 'jattack' || isShield == true){
                checkExplode = true;
                posExplode = 0;
                let newExplode = new Explodes(posExplode);
                arrExplode.push(newExplode)
                arrBoss.splice(0,1);
                let randomX = arrBoss[arrBoss.length - 1].CX + arrBoss[arrBoss.length - 1].IW  + Math.random()*1001;
                let randomY = Math.random()*251+ 200;
                let bos = new boss(randomX, randomY);
                arrBoss.push(bos);
                score++;
                audioExplode.play();
                audioExplode.volume = 1;
                if (score > maxScore){
                    maxScore = score;
                }
            } else{
                heart = 0;
            }
            
        }
    } else if(
        (Character.CX + Character.IW - 70>=arrBoss[1].CX + 47 && Character.CX + 70 <= arrBoss[1].CX+arrBoss[1].IW - 47)&&
        (Character.CY + Character.IH - 30>=arrBoss[1].CY + 22 && Character.CY + 30 <= arrBoss[1].CY+arrBoss[1].IH - 22)
    ){
        if (checkExplode == false){
            if (state == 'attack' || state == 'jattack' || isShield == true){
                checkExplode = true;
                posExplode = 1;
                let newExplode = new Explodes(posExplode);
                arrExplode.push(newExplode)
                arrBoss.splice(1,1);
                let randomX = arrBoss[arrBoss.length - 1].CX + arrBoss[arrBoss.length - 1].IW  + Math.random()*1001;
                let randomY = Math.random()*401;
                let bos = new boss(randomX, randomY);
                arrBoss.push(bos);
                score++;
                audioExplode.play();
                audioExplode.volume = 1;
                if (score > maxScore){
                    maxScore = score;
                }
            }
            
        }
    }else {
        checkExplode = false;
    }
};
function drawExplode(){
    if (arrExplode.length >=1){
        arrExplode[0].draw()
    }
};
function moveExplode(){
    if (arrExplode.length >=1){
        arrExplode[0].move()
    }
};




//-----------------------------------------------------handle explode end




//-----------------------------------------------------begin Lander
arrLander = []
class Lander{
    constructor(CX, CY){
        this.CX = CX;
        this.CY = CY;
        this.dx = -1;
        this.animate = [
            { 
                IX: 0,
                IY: 17,
            },
            {
                IX: 0,
                IY: 88,
            }
        ];
        this.IW = 1208;
        this.IH = 70;
    };
    draw(){
        ctx.beginPath();
        if (modeGame == 'moutain'){
            ctx.drawImage(imgLander, this.animate[0].IX, this.animate[0].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);
        } else{
            ctx.drawImage(imgLander, this.animate[1].IX, this.animate[1].IY, this.IW, this.IH, this.CX, this.CY, this.IW, this.IH);

        }
    };
    move(){
        if (gameStatus == 'play'){
            this.dx = -8;
        } else {
            this.dx = 0;
        }
        this.CX += this.dx;
        if (arrLander[0].CX <= -arrLander[0].IW-20){
            arrLander.splice(0,1);
            arrLander[0].CX += arrLander[0].dx;
            let landerItem = new Lander(arrLander[0].CX+arrLander[0].IW, arrLander[0].CY);
            arrLander.push(landerItem);
        }
    }
}

function createLander(){
    for (i = 0; i<=1; i++){
        let landerr = new Lander(1208 * i, 530);
        arrLander.push(landerr);
    }
}
createLander();

function moveLander(){
    arrLander.forEach(function(Item){
        Item.move();
    })
};
function drawLander(){
    arrLander.forEach(function(Item){
        Item.draw();
    })
};

//-----------------------------------------------------end Lander

//-----------------------------------------------------start arrow
var arrArrow = [];
class Arrow{
    constructor(CX){
        this.CX = CX;
        this.CY = 450;
        this.CW = 100;
        this.CH = 20;
        this.IX =0;
        this.IY = 0;
        this.IW = 399;
        this.IH = 53;
        
    };
    draw(){
        ctx.drawImage(imgArrow, this.IX, this.IY, this.IW, this.IH, this.CX, this.CY, this.CW, this.CH);
    };
    move(){
        this.CX-=15;
        if (this.CX<=-this.CW){
            arrArrow.splice(0,1);
            let randomArrow = Math.round(Math.random()*4000)+500;
            let newArrow = new Arrow(arrArrow[arrArrow.length -1].CX + arrArrow[arrArrow.length -1].CW + randomArrow);
            arrArrow.push(newArrow);
        }
    };
}
function createArrow(){
    for (let i = 0; i<=4; i++){
        let randomArrow = Math.round(Math.random()*100)+1000;
        let newArrows = new Arrow((i+1)*randomArrow);
        arrArrow.push(newArrows);
    }
};
function drawArrow(){
    arrArrow.forEach(function(Item){
        Item.draw();
    })
};
function moveArrow(){
    arrArrow.forEach(function(Item){
        Item.move();
    })
};
createArrow();
//-----------------------------------------------------end arrow
//----------------------------------------------------- start shield 
class shield{
    constructor(CX, CY){
        this.CX = CX + 10;
        this.CY = CY;
        this.CW = 150;
        this.CH = 200;
        this.IX = 0;
        this.IY = 0;
        this.IW = 200;
        this.IH = 262;
    };
    draw(){
        ctx.drawImage(imgShield, this.IX, this.IY, this.IW, this.IH, this.CX, this.CY, this.CW, this.CH);
    };
    move(){
        this.CX = Character.CX + 10;
        this.CY = Character.CY;
    }
}
var newShield = new shield(Character.CX, Character.CY);

//-----------------------------------------------------end shield
//-----------------------------------------------------begin 5k element
var arr5k = [];
class FiveK{
    constructor(CX, CY){
        this.CX = CX;
        this.CY = CY;
        this.CW = 50;
        this.CH = 60;
        this.IX = 0;
        this.IY = 0;
        this.IW = 200;
        this.IH = 240;
        this.state = 'live';
    };
    draw(){
        ctx.drawImage(img5k, this.IX, this.IY, this.IW, this.IH, this.CX, this.CY, this.CW, this.CH);

    };
    move(){
        this.CX -= 6;
        if (arr5k[0].CX < -arr5k[0].CW){
            arr5k.splice(0,1);
            let rdPosX = Math.round(Math.random()*7000)+500;
            let rdPosY = Math.random()*101+100; 
            let new5k = new FiveK(arr5k[arr5k.length-1].CX + rdPosX, rdPosY);
            arr5k.push(new5k);
        }
        if (isShield == true){
            timeShield -= 1;
            if (timeShield<=0){
                isShield = false;
                timeShield = 2500;
            }
        }
        
    }
}
function createFiveK(){
    for (let i = 0; i<=5; i++){
        let rdPosY = Math.random()*101+100; 
        let FiveKs = new FiveK(5000*(i+1)+1000, rdPosY);
        arr5k.push(FiveKs);
    }
}
createFiveK();
function draw5k(){
    arr5k.forEach(function(Item){
        Item.draw();
    })
}
function move5k(){
    arr5k.forEach(function(Item){
        Item.move()
    })
}
//-----------------------------------------------------end 5k element



function setRestart(){
    score = 0;
    heart = 10;
    arrBoss =[];
    let fisrtBos = new boss(1000, 400);
    arrBoss.push(fisrtBos);
    createBoss();
    arrObstacle = [];
    creatObstacle();
    Character.d = 1;
    arrChorn = [];
    createFirstChorn();
    arrArrow = [];
    createArrow();
    arr5k = [];
    createFiveK();
}
function draw(){
    drawBack();
    drawLander();
    if (gameStatus != 'lobby' && gameStatus != 'setmode'){
        Character.draw();
    }
    if (gameStatus == 'play' || gameStatus == 'gameOver'){
        drawBoss();
        drawObstacle();
        drawChorn();
        drawExplode()
        draw5k();
        // if (gameStatus =='play'){
        //     console.log(arr5k);

        // }
        if (score>=10){
            drawArrow();
        }
        if (isShield == true){
            newShield.draw();
            newShield.move();
        }
    }
    
    drawUI();
};
function update(){
    if ( gameStatus == 'play' || gameStatus == 'start'){
        moveBack();
        moveLander();
        if (gameStatus == 'start'){
            Character.state = 'stand';
        } else if ( gameStatus == 'play'){
            Character.state = 'run';
            moveBoss();
            checkImpact();
            checkContact();
            moveExplode();
            moveObstacle();
            moveChorn();
            move5k();
            
            if (score>=10){
                moveArrow();
            }
        };
        if (Character.CY == 385){
            dubbleJump = 0;
        }
    };
    if (heart == 0){
        if (Character.state != 'die'){
            audioHurt.play()

        }
        gameStatus = 'gameOver';
        Character.state = 'die';
    }
    if (gameStatus != 'play' && gameStatus!='gameOver'){
        audioStart.play()
    } else if (gameStatus == 'play'){
        audioPlay.play()
        audioStart.pause()
    } else if (gameStatus == 'gameOver'){
        audioPlay.pause()
    }
    if (gameStatus == 'pause'){
        audioPlay.pause()
    }
}
function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    frame++;
};


canvas.addEventListener('click', function(action){
    if (gameStatus == 'lobby'){
        if (
            (action.offsetX>= 450)&&
            (action.offsetY>= 400)&&
            (action.offsetX<= 503)&&
            (action.offsetY<= 441)
        ){
            gameStatus = 'setmode';
            audioFocus.play();
        }
    }
    if (gameStatus == 'setmode'){
        if (
            (action.offsetX>= 250)&&
            (action.offsetY>= 105)&&
            (action.offsetX<= 459)&& //****** */
            (action.offsetY<= 360)
        ){
            modeGame = 'desert';
            audioFocus.play();
        } else if (
            (action.offsetX>= 530)&&
            (action.offsetY>= 102)&&
            (action.offsetX<= 739)&&
            (action.offsetY<= 357)
        ){
            audioFocus.play();
            modeGame = 'moutain';

        } else if(
            (action.offsetX>= 210)&&  
            (action.offsetY>= 40)&&
            (action.offsetX<= 265)&&
            (action.offsetY<= 83)
        ){
            audioFocus.play();
            gameStatus = 'lobby';
        };
        if (
            (action.offsetX>= 455)&&
            (action.offsetY>= 350)&&
            (action.offsetX<= 534)&&
            (action.offsetY<= 411)
        ){
            audioFocus.play();
            gameStatus = 'start';
        }
    }
    if (gameStatus == 'start'){
        if (
            (action.offsetX>= 530)&&
            (action.offsetY>= 475)&&
            (action.offsetX<= 609)&&   
            (action.offsetY<= 535)
        ){
            audioFocus.play();
            gameStatus = 'play';
        };
        if (
            (action.offsetX>= 390)&&
            (action.offsetY>= 475)&&
            (action.offsetX<= 469)&&
            (action.offsetY<= 535)
        ){
            audioFocus.play();
            gameStatus = 'setmode';
        };
    }
    if (gameStatus == 'play'){
        if (
            (action.offsetX>= 20)&&
            (action.offsetY>= 20)&&
            (action.offsetX<= 75)&&
            (action.offsetY<= 72)
        ){
            audioFocus.play();
            gameStatus = 'pause';
        }; 
    }
    if (gameStatus == 'pause'){
        if (
            (action.offsetX>= 435)&&
            (action.offsetY>= 250)&&
            (action.offsetX<= 545)&&
            (action.offsetY<= 361)
        ){
            audioFocus.play();
            gameStatus = 'play';
        };
    };
    if (gameStatus == 'gameOver'){
        if (
            (action.offsetX>= 450)&&
            (action.offsetY>= 300)&&
            (action.offsetX<= 510)&&
            (action.offsetY<= 350)
        ){
            audioFocus.play();
            gameStatus = 'setmode';
            setRestart()
        }
    }
})
addEventListener("keydown", function (event) {
    if (event.key == ' ' && Character.CY == 385){
        state = 'attack';
        Character.r = 1;
    };
    if (event.key == 'ArrowUp' && dubbleJump<2 && gameStatus != 'gameOver'){
        state = 'jump';
        audioJump.play()
        dubbleJump++;
        Character.a = 1;
        Character.v = 5;
    };
    if (event.key == 'ArrowDown' && gameStatus != 'gameOver' && Character.CY == 385){
        state = 'slide';
        Character.s = 0;
    };
    if (event.key == ' ' && Character.CY < 385){
        state = 'jattack';
    }
});

loop();










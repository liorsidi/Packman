
var shape;
var shapeM1;
var shapeM2;
var shapeM3;

var board;
var boardMonstar;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var lastKey;

window.onload = function(){ 
	context = canvas.getContext("2d");
	shape = new Object();
	shapeM1= new Object();
	shapeM2= new Object();
	shapeM3= new Object();
	Start();

 }


function Start() {
	board = new Array()
	boardMonstar = new Array()
	score = 0;
	pac_color="yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	var monstar_remain = 1;
	start_time= new Date();
	

	
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		boardMonstar[i] = new Array();
		for (var j = 0; j < 10; j++) {
			var randomNum = Math.random();
			if (randomNum <= 1.0 * food_remain / cnt) {
				food_remain--;
				board[i][j] = 1;
			} else if ((randomNum < 1.0 * (pacman_remain + food_remain) / cnt)) {
				shape.i=i;
				shape.j=j;
				pacman_remain--;
				board[i][j] = 2;
			} else {
				board[i][j] = 0;
			}
			cnt--;
		}
	}

		boardMonstar[0][0] = 1;
	shapeM1.i=0;
	shapeM1.j=0;
	
	boardMonstar[9][0] = 1;
	shapeM2.i=9;
	shapeM2.j=0;
	
	boardMonstar[0][9] = 1;
	shapeM3.i=0;
	shapeM3.j=9;
	
	
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
	}, false);
	interval=setInterval(UpdatePosition, 200);
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) { 
		return 2;
	}
	if (keysDown[37]) { 
		return 3;
	}
	if (keysDown[39]) { 
		return 4;
	}
}


function Draw() {
	canvas.width=canvas.width;
	lblScore.value = score;
	lblTime.value = time_elapsed;
	//var k = GetKeyPressed();
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { 
				if (boardMonstar[i][j] == 1) { //monstar eats packman
						context.beginPath();
						context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // half circle
						context.fillStyle = "red"; //color 
						context.fill();			
					window.clearInterval(interval);
					window.alert("Game Lost");
				} else{
					//drawPacman(i,j, 0.15 + Math.PI,1.85 + Math.PI ,5,-15);
					if(lastKey==1) //up
					{
						drawPacman(i,j, 1.65 ,1.35 ,15,5);
					}
					if(lastKey==2)//down
					{
						drawPacman(i,j, 0.65 ,0.35 ,15,-5);
					}
					if(lastKey==3)//left
					{
						drawPacman(i,j, 1.15, 1- 0.15,-5,-15);
						
					}
					if(lastKey==4)//right
					{
						drawPacman(i,j, 0.15,1.85,5,-15);	
					}
				}
				/*
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color 
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // half circle
				context.fillStyle = "black"; //color 
				context.fill();
				*/
			} else if (board[i][j] == 1) {
					if (boardMonstar[i][j] == 1){
						context.beginPath();
						context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // half circle
						context.fillStyle = "red"; //color 
						context.fill(); 
					}else{
						context.beginPath();
						context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // half circle
						context.fillStyle = "black"; //color 
						context.fill();
				}
			} else if (boardMonstar[i][j] == 1){
						context.beginPath();
						context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // half circle
						context.fillStyle = "red"; //color 
						context.fill();
			}
		}
	}

	//code here
}

function drawPacman(i,j, startMouth,endMouth,eyeX, eyeY){
	context.beginPath();
	var center = new Object();
	center.x = i * 60 + 30;
	center.y = j * 60 + 30;
	context.beginPath();
	context.arc(center.x, center.y, 30, startMouth * Math.PI, endMouth * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color 
	context.fill();
	context.beginPath();
	context.arc(center.x + eyeX, center.y + eyeY, 5, 0, 2 * Math.PI); // half circle
	context.fillStyle = "black"; //color 
	context.fill();
}


function UpdatePosition() {
	board[shape.i][shape.j]=0;
	var x = GetKeyPressed()
	//lastKey = x;
	if(x==1) //up
	{
		if(shape.j>0)
		{
			shape.j--;
			lastKey=1;
		}
	}
	if(x==2) //down
	{
		if(shape.j<9)
		{
			shape.j++;
			lastKey=2;
		}
	}
	if(x==3) //left
	{
		if(shape.i>0)
		{
			shape.i--;
			lastKey=3;
		}
	}
	if(x==4) // right
	{
		if(shape.i<9)
		{
			shape.i++;
			lastKey=4;
		}
	}
	
	if(board[shape.i][shape.j]==1)
	{
		score++;
	}
	
	board[shape.i][shape.j]=2;
	
	monstarMoveMenhatten(shapeM1);
	monstarMoveMenhatten(shapeM2);
	monstarMoveMenhatten(shapeM3);
	
	var currentTime=new Date();
	time_elapsed=(currentTime-start_time)/1000;
	if(score>=20&&time_elapsed<=10)
	{
		pac_color="green";
	}
	if(score==50)
	{
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	else
	{
		Draw();
	}
}

function monstarMoveMenhatten(m){
	boardMonstar[m.i][m.j]=0;
	if (Math.abs(shape.i-m.i)>Math.abs(shape.j-m.j)){
		if (shape.i-m.i > 0){
			m.i++;
		}else m.i--;
	
	}else { if (shape.j-m.j > 0){
			m.j++;
		}else m.j--;
	}
	boardMonstar[m.i][m.j]=1;
}

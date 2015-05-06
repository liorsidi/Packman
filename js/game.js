var shape;
var shapeM1;
//var shapeM2;
//var shapeM3;
var board;
var boardMonstar;
var score;
var pac_color;
var start_time;
var time_elapsed;
var last_time_move_m1;
var interval;
var lastKey = 4;
var usersData = [{userName:"p",password:"1"},{userName:"test2015",password:"1"}];
var curUser = "guest";
var imgRobo;

window.onload = function(){ 
	context = canvas.getContext("2d");
	shape = new Object();
	shapeM1= new Object();
	imgRobo = new Image();
	imgRobo.src = 'image/roboSwat.jpg';
//	shapeM2= new Object();
//	shapeM3= new Object();
	last_time_move_m1 = 0;
	ShowSection("welcome");
//	Start();
 }

function Start() {
	board = new Array();
	boardMonstar = new Array();
	score = 0;
	pac_color="yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	var monstar_remain = 1;
	start_time= new Date();
	//Creating the game-board and the monster-board
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
	//Setting the monster's start point
	//1st monster
	boardMonstar[0][0] = 1;
	shapeM1.i=0;
	shapeM1.j=0;
/*	
	//2nd monster
	boardMonstar[9][0] = 1;
	shapeM2.i=9;
	shapeM2.j=0;
	//3rd monster
	boardMonstar[0][9] = 1;
	shapeM3.i=0;
	shapeM3.j=9;
*/	
	//Event listeners for key pressing
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
	}, false);
	//Setting the game interval
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
	//game_player.innerText="player1";
	document.getElementById("game_player").innerText="player2";
	lblScore.value = score;
	lblTime.value = time_elapsed;
	//var k = GetKeyPressed();
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 50 + 20;
			center.y = j * 50 + 20;
			if (board[i][j] == 2)
			{ 
				if (boardMonstar[i][j] == 1)
				{ //Monster eats Pacman
					context.beginPath();
					//context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
					//context.fillStyle = "red";
					context.drawImage(imgRobo,center.x-20,center.y-20,45,45);
					context.fill();			
					window.clearInterval(interval);
					window.alert("Game Lost");
				}
				else
				{
					//drawPacman(i,j, 0.15 + Math.PI,1.85 + Math.PI ,5,-15);
					//Drawing Pacman according the movement
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
			} 
			else
			{
				if (board[i][j] == 1)
				{//Drawing the points
					if (boardMonstar[i][j] == 1)
					{//Monster at this point
						context.beginPath();
						//context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // half circle
						//context.fillStyle = "red"; //color 
						
						context.drawImage(imgRobo,center.x-20,center.y-20,45,45);
						context.fill();
					
						context.fill(); 
					}
					else
					{//No monster at this point
						context.beginPath();
						context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // half circle
						context.rect(center.x-15, center.y-15, 30 , 30); // rect
						context.rect(center.x-7.5, center.y-20, 15 , 5); // rect
						context.fillStyle = "red"; //color 
						context.fill();
					}
				} 
				else
				{
					if (boardMonstar[i][j] == 1)//Only monster at this spot
					{
						context.beginPath();
						//context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // half circle
						//context.fillStyle = "red"; //color 
						
						context.drawImage(imgRobo,center.x-20,center.y-20,45,45);
						context.fill();
					
						context.fill();
					}
				}
			}
		}
	}
	//code here
}

function drawPacman(i,j, startMouth,endMouth,eyeX, eyeY){
	context.beginPath();
	var center = new Object();
	center.x = i * 50 + 20;
	center.y = j * 50 + 20;
	//Pacman drawing
	context.beginPath();
	context.arc(center.x, center.y, 20, startMouth * Math.PI, endMouth * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color 
	context.fill();
	//Eye drawing
	context.beginPath();
	context.arc(center.x + eyeX, center.y + eyeY, 3, 0, 2 * Math.PI); // half circle
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
	
//	monstarMoveMenhatten(shapeM1);
//	monstarMoveMenhatten(shapeM2);
//	monstarMoveMenhatten(shapeM3);
	
	var currentTime=new Date();
	time_elapsed=(currentTime-start_time)/1000;
	//Setting the speed of monster movement
	if (time_elapsed - last_time_move_m1 >= 0.5)
	{
		monstarMoveMenhatten(shapeM1);
		last_time_move_m1 = time_elapsed;
	}
	//Checking score-on-time
	if(score>=10&&time_elapsed<=10)
	{
		pac_color="green";
	}
	//Checking game score
	if(score==25)
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

function ShowSection(id)
{
	//hide all sections
	var welcome = document.getElementById('welcome');
	welcome.style.visibility="hidden";
	var register = document.getElementById('register');
	register.style.visibility="hidden";
	var login = document.getElementById('login');
	login.style.visibility="hidden";
	var game_screen = document.getElementById('game_screen');
	game_screen.style.visibility="hidden";
	var game_setting = document.getElementById('game_setting');
	game_setting.style.visibility="hidden";
	
	//show only one section
	var selected = document.getElementById(id);
	selected.style.visibility="visible";
	if (id == "game_screen")
		Start();
}

function regValidate()
{
//Validation of the registration form
	var user = $("#reg_username");
	var pass = $("#reg_password");
	var fname = $("#reg_fname");
	var lname = $("#reg_lname");
	var email = $("#reg_email");
	var bday = $("#reg_day");
	var bmonth = $("#reg_month");
	var byear = $("#reg_year");
	
	var errorMsg = "";
	var notSpaceRegex = /\s/;
	var containNumRegex = /\d/;
	var containCharRegex = /[a-zA-Z]/;
	var validEmailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	
	if ((user.val() == "") || (notSpaceRegex.test(user.val())))
		errorMsg += "User Name must be filled without spaces!\n";
	if (containNumRegex.test(user.val()))
		errorMsg += "User Name must not contain digits!\n";
	if ((pass.val()).length < 8)
		errorMsg += "Password length should be at least 8!\n";
	if ((!containCharRegex.test(pass.val())) || (!containNumRegex.test(pass.val())))
		errorMsg += "Password must contain characters AND numbers!\n";
	if ((fname.val() == "") || (containNumRegex.test(fname.val())))
		errorMsg += "Invalid First Name!\n";
	if ((lname.val() == "") || (containNumRegex.test(lname.val())))
		errorMsg += "Invalid Last Name!\n";
	if ((bday.val() == "") || (bmonth.val() == "") || (byear.val() == ""))
		errorMsg += "Invalid Birth Day!\n";
	if (email.val() == "")
		errorMsg += "Must fill Email!\n";
	if (!(validEmailRegex.test(email.val())))
		errorMsg += "Invalid Email!\n";

	if (errorMsg.length > 0){
		alert(errorMsg);
		return false;
	}
	else{
		usersData.push({userName:user.val(),password:pass.val()});
		return true;
	}
}

function logValidate(){
	var user = $("#log_username");
	var pass = $("#log_password");
	var isValid = false;
	
	for(var i = 0; i < usersData.length; i++){
		if(usersData[i].userName == user.val() && usersData[i].password == pass.val())
			isValid=true;
	}
	if (isValid){
		curUser = user.val();
		ShowSection('game_screen');
		return true;
	}
	alert("Invalid Username or Password.");
	return false;
}





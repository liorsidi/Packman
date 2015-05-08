var shape;
var shapeM1;
var imgM1;
var shapeM2;
var imgM2;
var shapeM3;
var imgM3;

var board;
var boardMonstar;
var score;
var pac_color;
var start_time;
var time_elapsed;
var last_time_move_m1;
var last_time_move_m2;
var last_time_move_m3;
var food_interval_active;

var interval;
var M1_interval;
var M2_interval;
var M3_interval;
var food_interval;

var lastKey;
var usersData = [{userName:"p",password:"1"},{userName:"test2015",password:"1"}];
var curUser = "guest";


var imgFood1;
var shapeFood1;
var imgFood2;
var shapeFood2;
var imgFood3;
var shapeFood4;

var board_food_surprise;
var start_time_move_food=5;
var last_time_move_food;
var food_timer_frequent = 20;
var food_timer_set = 200;
var food_timer;

var brickColor;

var speed = 1;
var size = 10;
var AmountParts;
var timeGame;
var Level;
	
var isM1;
var isM2;
var isM3;
var BasicSpeed = 200;
var start_time_food;

var colorPart5;
var colorPart15;
var colorPart25;
var game_song;
var isMusicOn;

window.onload = function(){ 
	context = canvas.getContext("2d");
	shape = new Object();

	shapeM1= new Object();
	shapeM2= new Object();
	shapeM3= new Object();
	
	shapeFood1 = new Object();
	shapeFood2 = new Object();
	shapeFood3 = new Object();
	
	imgM1 = new Image();
	imgM1.src = 'image/badCop.jpg';
	imgM2 = new Image();
	imgM2.src = 'image/lordBussiness.jpg';
	imgM3 = new Image();
	imgM3.src = 'image/roboSwat.jpg';
	
	imgFood1 = new Image();
	imgFood1.src = 'image/cup.jpg';
	imgFood2 = new Image();
	imgFood2.src = 'image/kraglee.jpg';
	imgFood3 = new Image();
	imgFood3.src = 'image/PieceOfResistance.jpg';
	
	//Event listeners for key pressing
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
		updatePosPac();
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
		updatePosPac();
	}, false);
	ShowSection("welcome");

 }

function Start() {
	
	score = 0;
	pac_color="yellow";
	
	board = new Array();
	boardMonstar = new Array();
	board_food_surprise = new Array();
	last_time_move_m1 = 0;
	last_time_move_m2 = 0;
	last_time_move_m3 = 0;
	food_timer = food_timer_set;
	

	brickColor = ["pink",colorPart5,colorPart15,colorPart25,"gold"];
	
	
	var cnt = 10*size;
	var f5_remain = Math.floor(0.5*(AmountParts/10)*size);
	var f15_remain = Math.floor(0.3*(AmountParts/10)*size);
	var f25_remain = Math.floor(0.2*(AmountParts/10)*size);
	var food_remain = f25_remain+f15_remain+f5_remain;
	
	var pacman_remain = 1;
	
	
	start_time= new Date();
	lastKey = 4;
	game_song = document.getElementById("game_music");
	game_song.play();
	isMusicOn = true;
	game_song.pause();
	
	//Creating the game-board and the monster-board
	//randomBoard();
	
	for (var i = 0; i < 1*size; i++) {
		board[i] = new Array();
		boardMonstar[i] = new Array();
		board_food_surprise[i] = new Array();
		for (var j = 0; j < 1*size; j++) {
			boardMonstar[i][j]=0;
			board_food_surprise[i][j]=0;
			var randomNum = Math.random();
			if (randomNum <= 1.0 * food_remain / cnt) {
				food_remain--;
				if (randomNum <= 1.0 * f5_remain / ((AmountParts/10)*size)) {
					board[i][j] = 2;
					f5_remain--;
				}else if (randomNum <= 1.0 * f15_remain / ((AmountParts/10)*size)) {
					board[i][j] = 3;
					f15_remain--;
				}else if (randomNum <= 1.0 * f25_remain / ((AmountParts/10)*size)) {
					board[i][j] = 4;
					f25_remain--;
					}
			} else if ((randomNum < 1.0 * (pacman_remain + food_remain) / cnt)) {
				shape.i=i;
				shape.j=j;
				pacman_remain--;
				board[i][j] = 1;
			} else {
				board[i][j] = 0;
			}
			cnt--;
		}
	}
	
	
	
	//Setting the monster's start point

	
	if (isM1){//badcop - smart + fast
		boardMonstar[0][0] = 1;
		shapeM1.i=0;
		shapeM1.j=0;
	}	
	
	if (isM2){//badcop - smart + fast
		boardMonstar[0][size-1] = 1;
		shapeM2.i=0;
		shapeM2.j=size-1;
	}	
	
	if (isM3){//badcop - smart + fast
		boardMonstar[size-1][0] = 1;
		shapeM3.i=size-1;
		shapeM3.j=0;
	}	

	//Event listeners for key pressing
	/*
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
		updatePosPac();
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
		updatePosPac();
	}, false);*/
	//Setting the game interval
	Draw();
	interval=setInterval(UpdatePosition, BasicSpeed*speed);
	if (isM1) M1_interval=setInterval(updateMonstarSmart1, BasicSpeed*5);
	if (isM2) M2_interval=setInterval(updateMonstarSmart2, BasicSpeed*3);
	if (isM3) M3_interval=setInterval(updateMonstarStupid, BasicSpeed*2);
	food_interval=setInterval(ActivateFood, 10000);
}

function randomBoard(){
	
	board = new Array();
	boardMonstar = new Array();
	board_food_surprise = new Array();
	
	var f5_remain = Math.floor(0.5*(AmountParts/10)*size);
	var f15_remain = Math.floor(0.3*(AmountParts/10)*size);
	var f25_remain = Math.floor(0.2*(AmountParts/10)*size);
	var pacman_remain = 1;
	
	for (var i = 0; i < 1*size; i++) {
		board[i] = new Array();
		boardMonstar[i] = new Array();
		board_food_surprise[i] = new Array();
		for (var j = 0; j < 1*size; j++) {
			boardMonstar[i][j]=0;
			board_food_surprise[i][j]=0;
			
			if (f5_remain>0){
				board[i][j]=2;
				f5_remain--;
				continue;
			}
			if (f15_remain>0){
				board[i][j]=3;
				f15_remain--;
				continue;
			}
			if (f25_remain>0){
				board[i][j]=4;
				f25_remain--;
				continue;
			}
			
			if (pacman_remain>0){
				board[i][j]=1;
				pacman_remain--;
				shape.i=i;
				shape.j=j;
				continue;
			}
			board[i][j]=0;
		}
	}
	
	for (var i = 0; i < 1*size*size; i++) {
		var random1 = Math.floor((Math.random() * (size-1)));
		var random2 = Math.floor((Math.random() * (size-1)));
		var x = board[random1][random2];
		var y = board[random2][random1];
		if (x==y) continue;
		if (x==1){
			shape.i=random2;
			shape.j=random1;
		}
		if (y==1){
			shape.i=random1;
			shape.j=random2;
		}
		board[random2][random1] = x;
		board[random1][random1] = y;
		
	}
	
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

function drawFood(center,f){
	context.beginPath();
	//context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // half circle
	context.rect(center.x-15, center.y-15, 30 , 30); // rect
	context.rect(center.x-7.5, center.y-20, 15 , 5); // rect
	context.fillStyle = brickColor[f]; //color 
	context.fill();

}
function finish(){
	window.clearInterval(interval);
	window.clearInterval(food_interval);
	window.clearInterval(M1_interval);
	window.clearInterval(M2_interval);
	window.clearInterval(M3_interval);
}

function Draw() {
	canvas.width=canvas.width;
	//game_player.innerText="player1";
	document.getElementById("game_player").innerText=curUser;
	lblScore.value = score;
	lblTime.value = time_elapsed;
	//var k = GetKeyPressed();
	for (var i = 0; i < 1*size; i++) {
		for (var j = 0; j < 1*size; j++) {
			var center = new Object();
			center.x = i * 50 + 20;
			center.y = j * 50 + 20;
			var Mimg = checkWhichMonsterIs(i,j);
			if ((boardMonstar[i][j]==1)&&(board[i][j] == 1))
			{
				context.drawImage(Mimg,center.x-20,center.y-20,45,45);		
				finish();
				window.alert("Game Lost");
				game_song.pause();
				continue;
			}
			if ((boardMonstar[i][j]==1))
			{
				context.drawImage(Mimg,center.x-20,center.y-20,45,45);
				continue;
			}
			if (board[i][j] == 1){
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
				continue;
			}
			
			if (board_food_surprise[i][j] == 1)
			{
				drawFood(center,4);
				continue;
			}
				
			if (board[i][j] > 1)
			{
				drawFood(center,board[i][j]-1);
				continue;
			}

		}
	}
	
}

function updatePosPac(){
	board[shape.i][shape.j]=0;
	var x = GetKeyPressed();
	//lastKey = x;
	if(x==1 && shape.j>0) //up
	{
		shape.j--;
		lastKey=1;
	}
	if(x==2 && shape.j<9) //down
	{
		shape.j++;
		lastKey=2;
	}
	if(x==3 && shape.i>0) //left
	{
		shape.i--;
		lastKey=3;
	}
	if(x==4 && shape.i<9) // right
	{
		shape.i++;
		lastKey=4;
	}
	calculateScore();
	board[shape.i][shape.j]=1;
	Draw();
}

function ActivateFood(){
	start_time_food = new Date();
	shapeFood1.i = Math.floor((Math.random() * (size-1))); 
	shapeFood1.j = Math.floor((Math.random() * (size-1)));
	food_interval_active =setInterval(UpdateFoodPosition, 800*speed);
}

function calculateScore(){
	if(board[shape.i][shape.j]==2)
	{
		score=score+5;
	}
	if(board[shape.i][shape.j]==3)
	{
		score=score+15;
	}
	if(board[shape.i][shape.j]==4)
	{
		score=score+25;
	}
	if(board_food_surprise[shape.i][shape.j]==1)
	{
		score=score+30;
		window.clearInterval(food_interval_active);
		board_food_surprise[shapeFood1.i][shapeFood1.j]=0;
	}
}

function updateMonstarSmart1(){
	monstarMoveMenhatten(shapeM1);
	Draw();
}
function updateMonstarSmart2(){
	monstarMoveMenhatten(shapeM2);
	Draw();
}
function updateMonstarStupid(){
	monstarMoveStupid(shapeM3);
	Draw();
}
function UpdatePosition() {

	var currentTime=new Date();
	time_elapsed=(currentTime-start_time)/1000;
	if(time_elapsed>timeGame){
		finish();
		window.alert("time is up!!!");
	}
	
	if(score>=10&&time_elapsed<=10)
	{
		pac_color="green";
	}
	//Checking game score
	if(score>=150)
	{
		finish();
		window.alert("Game completed");
		game_song.pause();
	}
	else
	{
		Draw();
	}
}

function checkWhichMonsterIs(i,j){
	if(isM1){
		if((shapeM1.i==i)&&(shapeM1.j==j)) return imgM1;
	}
	if(isM2){
		if((shapeM2.i==i)&&(shapeM2.j==j)) return imgM2;
	}
	if(isM3) { 
		if((shapeM3.i==i)&&(shapeM3.j==j)) return imgM3;
	}
	return imgM3;

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

function UpdateFoodPosition(){
	var currentTime=new Date();
	if ((currentTime-start_time_food)/1000>5)
		{
			board_food_surprise[shapeFood1.i][shapeFood1.j]=0;
			window.clearInterval(food_interval);
			
		}else {
			foodMoveMenhatten(shapeFood1);
		}

}

function monstarMoveMenhatten(m){
	boardMonstar[m.i][m.j]=0;
	var mi=m.i;
	var mj=m.j;

	if (Math.abs(shape.i-m.i)>Math.abs(shape.j-m.j)){
		if (shape.i-m.i > 0){
			mi = m.i+1;
		}else mi = m.i-1;
	
	}else { if (shape.j-m.j > 0){
			mj = m.j+1;
		}else mj = m.j-1;
	}
	if (boardMonstar[mi][mj]==0){
		m.j = mj;
		m.i = mi;
	}
	boardMonstar[m.i][m.j]=1;
}

function monstarMoveStupid(m){
	boardMonstar[m.i][m.j]=0;
	mi=m.i;
	mj=m.j;
	var r = Math.random();
	if ((r<0.25)&&(m.i>0)){
		m.i--;
		
	}else
	if ((r<0.5)&&(m.i<size-1)){
		m.i++;
		
	}else
	if ((r<0.75)&&(m.j>0)){
		m.j--;
		
	}else
	if (m.j<size-1){
		m.j++;
		
	}
	if (boardMonstar[m.i][m.j]==1){
		boardMonstar[mi][mj]==1;
	}else boardMonstar[m.i][m.j]==1;	
	
	boardMonstar[m.i][m.j]=1;
}

function foodMoveMenhatten(m){
	board_food_surprise[m.i][m.j]=0;
	if (Math.abs(shape.i-m.i)>Math.abs(shape.j-m.j)){
		if ((shape.i-m.i > 0) && (m.i>0))
		{ m.i--;
		}else if (m.i<size-1) m.i++;
	}else { if ((shape.j-m.j > 0)&&(m.j>0)){
			m.j--;
		}else if (m.j<size-1) 
			m.j++;
			}
	board_food_surprise[m.i][m.j]=1;
}

function ShowSection(id){
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

function regValidate(){
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
		ShowSection('welcome');
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
		ShowSection('game_setting');
		return true;
	}
	else{
		alert("Invalid Username or Password.");
		return false;
	}
}

function settingValidate(){
//Validate that at least 1 monster was chosen and set all game related variables
	
	timeGame = $("#set_time").val();
	Level = $("#set_lego").val();
	AmountParts = $("#set_lego").val();
	colorPart5 = $("#set_5pts").val();
	colorPart15 = $("#set_15pts").val();
	colorPart25 = $("#set_25pts").val();
	
	isM1 = $("#set_mon1").is(':checked');
	isM2 = $("#set_mon2").is(':checked');
	isM3 = $("#set_mon3").is(':checked');
	
	ShowSection('game_screen');

}

function changeMusic(){
	if (isMusicOn){
		game_song.pause();
		isMusicOn = false;
		musicPic = document.getElementById("btn_audio");
		musicPic.src = "image/soundOff.png";
	}
	else{
		game_song.play();
		isMusicOn = true;
		musicPic = document.getElementById("btn_audio");
		musicPic.src = "image/soundOn.png";
	}
}

function gameRestart(){
	finish();
	musicPic = document.getElementById("btn_audio");
	musicPic.src = "image/soundOn.png";
	game_song.load();
	Start();
}

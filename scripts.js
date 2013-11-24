var myCanvas = document.getElementById("myCanvas");
var myCanvasContext = myCanvas.getContext("2d");

/* this is a 
multiple line comment */

myCanvas.width = 640; 
myCanvas.height = 480;//setting for HTML

var gameIsRunning = true; 

setInterval( function(){
	if (enemiesCaught < 30) {
		update();
		draw();
	}
	else {
		gameIsRunning = false;		
		myCanvasContext.fillStyle = this.color; 
		myCanvasContext.font = "24px Helvetica" //Hellvetica 
		myCanvasContext.textAlign = "left"; 
		myCanvasContext.fillText("You Win!", myCanvas.width/2, myCanvas.height/2);
	}
}, 1000/60);

var update = function(){
	if (38 in keysDown) {
		player.y = player.y - player.speed; 
	}
	if (40 in keysDown) {
		player.y = player.y + player.speed; 
	}

	if (37 in keysDown) {
		player.x = player.x - player.speed; 
	}
	if (39 in keysDown) {
		player.x = player.x + player.speed; 
	}

	if ( player.x <= (enemy.x + player.radius)
		&& enemy.x <= (player.x + player.radius)
		&& player.y <= (enemy.y + player. radius)
		&& enemy.y <= (player.y + player.radius)
	) {
		enemy.x = Math.floor( (Math.random() * (myCanvas.width - 20)) + 10);
		enemy.y = Math.floor( (Math.random() * (myCanvas.height - 20)) + 10);
		enemiesCaught++; // 0 + 1, 2+1, 3+1, etc. Add by 1 each time 
		player.radius = player.radius + enemiesCaught; //makes it bigger everytime you eat 

	}

};

var draw = function() {
	myCanvasContext.fillStyle = "#CCCCCC";
	myCanvasContext.fillRect(0,0,myCanvas.width,myCanvas.height);
	player.draw();
	enemy.draw();
	score.draw();
};

var player = {
	color: "#7766ff",
	radius: 30,
	x: 30,
	y: 30,
	speed: 10,
	draw: function(){
		myCanvasContext.beginPath();
		myCanvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		//the boolean at the end just means draw in the opposite direction, doesn't matter really 
		//x pos, y pos, width (radius *2), beginning angle, ending angle (circumference), anti-clockwise? NO! 
		myCanvasContext.closePath();
		myCanvasContext.fillStyle = this.color;
		myCanvasContext.fill(); //fill our character wth the above color 
	}
};

var enemy = {
	color: "#FFFFFF",
	radius: 10,
	x: Math.floor(Math.random() * myCanvas.width),
	y: Math.floor(Math.random() * myCanvas.height),
	draw: function() {
		myCanvasContext.beginPath();
		myCanvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		myCanvasContext.closePath();
		myCanvasContext.fillStyle = this.color;
		myCanvasContext.fill(); 
	}
};

var enemiesCaught = 0; // Initial number of enemies caught 

var score = {
	color: "#000000",
	draw: function(){
		myCanvasContext.fillStyle = this.color; 
		myCanvasContext.font = "24px Helvetica" //Hellvetica 
		myCanvasContext.textAlign = "left"; 
		myCanvasContext.fillText("Enemies eaten: " + enemiesCaught, score.x, score.y);
	}
};

score.x = 20;
score.y = myCanvas.height-20;

//List of pressed keyes 
var keysDown = {};
// If a key is pressed 
addEventListener("keydown", function (key){
	keysDown[key.keyCode] = true;
});//when a key is presed down, do this function

addEventListener("keyup", function (key){
	delete keysDown[key.keyCode];
});


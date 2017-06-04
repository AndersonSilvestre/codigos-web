//Criando o canvas
var canvas = document.createElement("canvas");

//Definindo um contexto em 2D
var ctx = canvas.getContext("2d");
//Largura e Altura do Canvas
canvas.width = 400;
canvas.height = 400;
//Canvas é filho do BODY, ou seja, será criado dentro da tag BODY
//document.body.appendChild(canvas);
document.getElementById("artigo").appendChild(canvas);

//Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
	};
bgImage.src = "./img/background1.jpg";

//Jogador
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
	};
heroImage.src = "./img/player.png";

//Monstro
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
	};
monsterImage.src = "./img/monster.png";

//Objetos do Jogo
var hero ={
	speed: 256
};
var monster = {};
//Quantidade de monstros capturados
var monsterCought = 0;
//Controlando pelo teclado
var keysDown = {};

//Manipulador de evento do teclado, verifica o que esta acontecendo com o teclado
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Resetando o jogo
var reset = function (){
	//O player é criado no meio da tela(layout)
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	//Criação do monstro de forma randômica
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
}
//Controle de Direções
var update = function (modifier) {
	if(38 in keysDown && hero.y >0){
		hero.y-= hero.speed * modifier;
	}
	if(40 in keysDown && hero.y <canvas.height-32){
		hero.y+= hero.speed * modifier;
	}
	if(37 in keysDown && hero.x >0){
		hero.x-= hero.speed * modifier;

	}
	if(39 in keysDown && hero.x < canvas.width-32){
		hero.x+= hero.speed * modifier;

	}
	//Colisão
	if(hero.x <= (monster.x + 32) && 
		monster.x <= (hero.x + 32) && 
		hero.y <= (monster.y + 32) && 
		monster.y <= (hero.y + 32)){
		++monsterCought;
		reset();
	}
};
//Desenhar na Tela
var render = function (){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(heroReady){
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	//Placar
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "22px Verdana";
	ctx.textAlign= "left";
	ctx.textBaseline = "top";
	ctx.fillText("Capturados: " + monsterCought, 32, 32);
};

//Loop do Jogo
var main = function(){
	//Retornar número em milissegundos
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
};

//Inicia o Jogo
reset();
var then = Date.now();
//O método setInterval chama uma função ou avalia uma expressão em intervalos específicos (em milissegundos) 
setInterval(main, 1);
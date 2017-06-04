var contadorJogadas = 0;
var turno = 1;
var O_val = 	"O";
var X_val = 	"X";
var EMPTY_val = " ";

function rodada(sqr){
	if(sqr.value == EMPTY_val){
		if(turno==1){
			sqr.value = X_val;
			sqr.style.backgroundColor = "#F22D00";
		}else{
			sqr.value = O_val;
			sqr.style.backgroundColor = "#10F70D";
		}
		turno = turno*(-1);
		validaJogada();
	}
}
function validaJogada(){
	contadorJogadas = 0;
	var sqr1 = document.velha.sqr1.value;
	var sqr2 = document.velha.sqr2.value;
	var sqr3 = document.velha.sqr3.value;
	var sqr4 = document.velha.sqr4.value;
	var sqr5 = document.velha.sqr5.value;
	var sqr6 = document.velha.sqr6.value;
	var sqr7 = document.velha.sqr7.value;
	var sqr8 = document.velha.sqr8.value;
	var sqr9 = document.velha.sqr9.value;
	
	var valorTurno;
	if(turno == -1){
		valorTurno = X_val;
	}else if(turno == 1){
		valorTurno = O_val;
	}
	
	if(
	(sqr1 == valorTurno && sqr2 == valorTurno && sqr3 == valorTurno) ||
	(sqr4 == valorTurno && sqr5 == valorTurno && sqr6 == valorTurno) ||
	(sqr7 == valorTurno && sqr8 == valorTurno && sqr9 == valorTurno) ||
	(sqr1 == valorTurno && sqr4 == valorTurno && sqr7 == valorTurno) ||
	(sqr2 == valorTurno && sqr5 == valorTurno && sqr8 == valorTurno) ||
	(sqr3 == valorTurno && sqr6 == valorTurno && sqr9 == valorTurno) ||
	(sqr1 == valorTurno && sqr5 == valorTurno && sqr9 == valorTurno) ||
	(sqr7 == valorTurno && sqr5 == valorTurno && sqr3 == valorTurno)){
		alert("Jogador " + valorTurno + " ganhou!");
		reset();
	}else{
		if(sqr1 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}	
		if(sqr2 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(sqr3 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(sqr4 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(sqr5 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(sqr6 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(sqr7 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(sqr8 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(sqr9 != EMPTY_val){
			contadorJogadas = contadorJogadas + 1;
		}
		if(contadorJogadas >= 9){
			alert("Empate =/");
			reset();
		}
		
	}
}
function reset(){
	document.velha.sqr1.value = EMPTY_val;
	document.velha.sqr2.value = EMPTY_val;
	document.velha.sqr3.value = EMPTY_val;
	document.velha.sqr4.value = EMPTY_val;
	document.velha.sqr5.value = EMPTY_val;
	document.velha.sqr6.value = EMPTY_val;
	document.velha.sqr7.value = EMPTY_val;
	document.velha.sqr8.value = EMPTY_val;
	document.velha.sqr9.value = EMPTY_val;
	
	document.velha.sqr1.style.backgroundColor = "blue";
	document.velha.sqr2.style.backgroundColor = "blue";
	document.velha.sqr3.style.backgroundColor = "blue";
	document.velha.sqr4.style.backgroundColor = "blue";
	document.velha.sqr5.style.backgroundColor = "blue";
	document.velha.sqr6.style.backgroundColor = "blue";
	document.velha.sqr7.style.backgroundColor = "blue";
	document.velha.sqr8.style.backgroundColor = "blue";
	document.velha.sqr9.style.backgroundColor = "blue";
	
	turno = 1;
	contadorJogadas = 0;
}
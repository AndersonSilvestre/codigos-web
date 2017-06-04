var sequencia = "";
var minhaSequencia = "";
var pontos = 0;

function meuClique(n){
	minhaSequencia += n;
	mudaBorda(n);
	if(sequencia.indexOf(minhaSequencia)== -1){
		document.all.fail.style.display = "block";
		sequencia = "";
		pontos = 0;
		document.all.count.innerHTML = pontos;
		return;
	}
	if(sequencia == minhaSequencia){
		minhaSequencia = "";
		pontos++;
		document.all.count.innerHTML = pontos;
		setTimeout ("inicia()",1000);
	}
}
function inicia(){
	document.all.start.style.display = "none";
	document.all.fail.style.display = "none";
	sequencia += Math.floor(Math.random () *4);
	exibeSequencia();
}
function reinicia(){
	sequencia = "";
	minhaSequencia = "";
	inicia();
}
function mudaBorda(n){
	switch(n){
		case 0:
			var elem = document.all.a;
			var color1 = "#1aff00";
			var color2 = "#0b7000";
			var noneElemento = "a"
			break
		case 1:
			var elem = document.all.b;
			var color1 = "#ff0b00";
			var color2 = "#c30800";
			var noneElemento = "b"
			break
		case 2:
			var elem = document.all.c;
			var color1 = "#ffec00";
			var color2 = "#c3b400";
			var noneElemento = "c"
			break
		case 3:
			var elem = document.all.d;
			var color1 = "#29abd0";
			var color2 = "#196d85";
			var noneElemento = "d"
			break
	}
	elem.style.borderColor = color1;
	setTimeout("document.all."+noneElemento +".style.borderColor= '"+color2 +"'",200);
}
function exibeSequencia(){
	var num="";
	for(n = 0; n<sequencia.length; n++){
		num = sequencia.substr(n,1);
		setTimeout("mudaBorda("+num+")", 500 * n);
	}
}
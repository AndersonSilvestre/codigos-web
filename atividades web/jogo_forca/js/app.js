var app = {	
	//Telas
	screens: [],
	//palavra
	word: '',
	//Tentativa
	attempts: 8,
	//exitos
	hits: 0,
	//Escolhas
	choices: [],
	//Peças
	pieces: [],	
	//Peça Atual
	currentPiece: 0,
	//Entrada
	input: $('#inputWord'),
	//Teclado
	keyboard: {
		//Caracteres
		chars: []
	},
	errors: {
		//Caracteres inválidos!
		invalidChars: function(){
			alert('Caracteres inválidos!');
			app.input.focus();
		},
		minLength: function(){
			//Mínimo de caracteres
			alert('Mínimo de 3 caracteres!');
			app.input.focus();
		}
	},
	//Escreva a palavra
	setWord: function(word){
		//Obter a palavra se caracter especial 'getWithoutSpecialChars'
		//Converter palavra para caracteres maiúsculos 'toUpperCase'
		app.word = app.getWithoutSpecialChars(word.toUpperCase());
		return app.validateWord();
	},
	start: function(){
		if(app.setWord(app.getInputValue())){
			//Alterar tela
			app.changeScreen('#gameScreen');
			//Fazer opções de palavras
			app.renderWordChoices();
			//Carregar teclado
			app.loadKeyboard();
			//Carregar peça
			app.loadPieces();
		}		
	},
	loadScreens: function(){
		app.screens = $('.screen');	
		app.renderScreens();
	},
	renderScreens: function(){
		app.screens.each(function(index){
			$(this).css('top', $(this).height() * index);
		});
	},
	changeScreen: function(screenId){
		var newScreen = app.getScreenById(screenId),
			activeScreen = app.getActiveScreen();

		activeScreen.removeClass('screen-on');
		activeScreen.css('top', newScreen.css('top'));
		
		newScreen.addClass('screen-on');
		newScreen.css('top', 0);
	},
	getScreenById: function(screenId){				
		return app.screens.siblings(screenId);
	},
	getActiveScreen: function(){
		return app.screens.siblings('.screen-on');
	},
	getInputValue: function(){
		return app.input.val();
	},
	renderWordChoices: function(){	
		//Verificar se i é menor que o tamanho da palavra
		for(var i = 0; i < app.word.length; i++){	
			//Variável de escolha da palavra
			var choice = app.createWordChoiceDOM();
			app.choices.push(choice);			
			$('#wordChoices').append(choice);
		}
	},
	createWordChoiceDOM: function(){
		return $('<span class="choice">');
	},
	//Carregar teclado
	loadKeyboard: function(){
		app.keyboard.chars = $('.char');
		//Carregar eventos do teclado
		app.loadKeyboardEvents();
	},
	//Eventos do teclado
	loadKeyboardEvents: function(){	
		//Caracter de teclado recebe o click
		app.keyboard.chars.on('click', function(){
				//hasClass - verifica se tem classe
			if(!$(this).hasClass('char-off')){					
				app.makeChoice($(this).html());
				//addClass - Adiciona classe
				$(this).addClass('char-off');
			}			
		});
	},
	//Remove eventos de teclado
	removeKeyboardEvents: function(){
		app.keyboard.chars.off();
	},
	makeChoice: function(value){
		//findCharInString - Encontrar caracteres de uma string
		var indexes = app.findCharInString(value, app.word);		
		if(indexes.length > 0){
			for(var i = 0; i < indexes.length; i++){
				//choices - escolha
				$(app.choices[indexes[i]]).html(value);
			}
			//Adicionar exito
			app.addHits(indexes.length);
		}else{
			//Remover tentativa
			app.removeAttempt();
		}
		//Verificar o status do game
		app.verifyGameStatus();
	},
	//findCharInString - Buscar caracter em uma string
	findCharInString: function(value, string){
		var indexes = [];
		for(var i = 0; i < string.length; i++){
			if(value == string[i]){
				indexes.push(i);
			} 
		}
		return indexes;
	},
	//Carregar peças
	loadPieces: function(){
		app.pieces = $('.piece');
	},
	//Renderizar peça
	renderPiece: function(){
		$(app.pieces[app.currentPiece]).css('display', 'block');		
		app.currentPiece++;		
	},
	//Remover tentativa
	removeAttempt: function(){
		app.attempts--;
		app.renderPiece();
	},
	//Adicioanr exito
	addHits: function(n){
		app.hits += n;		
	},
	//Verificação do statis game
	verifyGameStatus: function(){
		//Se o tamanho da palavra é = a éxitos
		if(app.word.length == app.hits){
			//Venceu
			app.gameWin();
		//Se as tentativas forem igual a 0	
		}else if(app.attempts == 0){
			//Perdeu
			app.gameLose();
		}
	},
	//Ganhou
	gameWin: function(){
		alert("Você ganhou!!! :D");
		app.endGame();
	},
	//Perdeu
	gameLose: function(){
		alert("Você perdeu!!! :(  \n a palavra era " + app.word + "!!!");
		app.endGame();
	},
	//Reiniciar o jogo
	endGame: function(){
		location.reload();
	},
	//Caracateres espaciais
	getWithoutSpecialChars: function(string){
		//replace - Substituir
		return string.replace(/[àáâãÀÁÂÃ]/g,"A")
				.replace(/[éèêÈÉÊ]/g,"E")
				.replace(/[ìíÌÍ]/g,"I")
				.replace(/[òóÒÓõÕ]/g,"O")
				.replace(/[ùúÙÚ]/g,"U")
				.replace(" ", "");
	},
	hasSpecialChars: function(string){
		return !/^[a-zA-Z0-9- ]*$/.test(string);
	},
	hasMinLength: function(string, min){
		return string.length >= min ? true : false;
	},
	validateWord: function(){
		if(app.hasSpecialChars(app.word)){
			app.errors.invalidChars();
		}else if(!app.hasMinLength(app.word, 3)){
			app.errors.minLength();
		}else{
			return true;
		}
		return false;
	},
	init: function(){
		app.loadScreens();
		app.input.focus();
	}
}




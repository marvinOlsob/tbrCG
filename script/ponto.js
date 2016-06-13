//funçao de desenhar ponto
function Point(corEscolhida) { 
	this.x = -1;
	this.y = -1;
	this.selected = false;
	this.class = 1;
	this.color = corEscolhida;
	
	this.setCoords = function (x, y) { //recebe as coordenadas do mouse e atribui para os pontos
		this.x = x;
		this.y = y;		
	}
	

	this.draw = function (context, mouse = null) { //Desenha o ponto no contexto desejado 

		if(this.selected == true){
		this.color = 'blue';
	}else{
		this.color = corEscolhida;
	}

		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, 4, 0, 2* Math.PI);
		context.fill();
	}
}
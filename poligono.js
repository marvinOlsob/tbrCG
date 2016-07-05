function Polygon(corEscolhida) {
	this.points = new Array(); //Variavel de controle do ponto inicial e final
	this.class = 3;
	this.selected = false;
	this.finished = false;
	this.color = corEscolhida;

	this.pushPoint = function (point) { //Coloca o primeiro ponto na estrutura points
		this.points.push(point);
	}

	this.popPoint = function (point) {
		if (this.points.length > 0) return this.points.pop();
	}

	this.draw = function (context, mouse = null) { //Desenha a linha no contexto
		
		
      if(this.selected == true){
			this.color = 'blue';
		} else{
			this.color = corEscolhida;
		}
		context.strokeStyle = this.color;
		context.beginPath();
		context.moveTo(this.points[0].x, this.points[0].y);

		for (var i = 1; i < this.points.length; i++) {
			context.lineTo(this.points[i].x, this.points[i].y);
		}

		if (!this.finished) 
			context.lineTo(mouse.x, mouse.y);

		context.lineTo(this.points[0].x, this.points[0].y);
		context.stroke();
	}


}
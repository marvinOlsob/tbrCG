function Line(corEscolhida) {
	this.points = new Array();
	this.class = 2;
	this.width = 2;
	this.selected = false;
	this.finished = false;
	this.color = corEscolhida;



	this.pushPoint = function (point) {
		this.points.push(point);
	}

	this.popPoint = function () {
		if (this.points.length > 0) return this.points.pop();
	}

	this.draw = function (context, mouse = null) {
		context.lineWidth = this.width;

		if(this.selected == true){
			this.color = 'blue';
		} else{
			this.color = corEscolhida;
		}
		context.strokeStyle = this.color;
		// Começo a desenhar a linha
		context.beginPath();
		context.moveTo(this.points[0].x, this.points[0].y);
		// Desenhando até o ultimo ponto
		for (var i = 1; i < this.points.length; i++) {
			context.lineTo(this.points[i].x, this.points[i].y);
		}

		if (!this.finished) 
			context.lineTo(mouse.x, mouse.y); // Se ainda não foi finalizada, desenha até o mouse

		context.stroke();
	}
}

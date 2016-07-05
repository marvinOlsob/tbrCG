function fechoConvexo(pontos, corEscolhida){
	var quickPontos = pontos;
	

	this.draw = function (context, mouse = null) {
		// Começo a desenhar a linha
		for(var i = 0; i < quickPontos.length; i++){
			var inicio = quickPontos[i];
			var fim;
			if(i == quickPontos.length - 1)
					fim = quickPontos[0];
				else
					fim = quickPontos[i+1];
			context.beginPath();
			context.strokeStyle = corEscolhida;
			context.moveTo(inicio.x,inicio.y);
			context.lineTo(fim.x, fim.y);
			context.stroke();
			}

	}
}
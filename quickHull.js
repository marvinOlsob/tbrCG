function quickHull(pontos){
	function quickPt(){
		var inputPoints = pontos();
		var quickPontos;
		var max = inputPoints[0];
		var min = inputPoints[0];

		for(var i =0; i < inputPoints.length; i++){
	        if(inputPoints[i].x > max.x)
	        		max = inputPoints[i];
	        if(inputPoints[i].x < min.x)
	        		min = inputPoints[i];
	    }
	    var pontos1 = pontosLado(min, max, inputPoints);
	    var pontos2 = pontosLado(max, min, inputPoints);

	    quickPontos.push(min);
	    quickPontos.push(Array.prototype.push.apply(quickPontos,findHull(min, max, pontos1)));
	    quickPontos.push(max);
	    quickPontos.push(Array.prototype.push.apply(quickPontos, findHull(max, min, pontos2)));
	    console.log(quickPontos.length, "tamanho");
	    for(var i = 0; i < quickPontos.length; i++){
	    	console.log(quickPontos.x);
	    }
	    return quickPontos;	
		}

	function findHull(a,b,S){
	var findPontos;
	if(S.length != 0){
		var c = pontosMaiorArea(a,b,S);
		var A = pontosLado( a, c, S);
		var B = pontosLado( c, b, S);

		findPontos.push(Array.prototype.push.apply(findPontos,findHull(a, c, A)));
		findPontos.push(c);
		findPontos.push(Array.prototype.push.apply(findPontos,findHull(c, b, B)));
	}

	return findPontos;
	}

	function pontosLado(a, b, S){
	var subset;
	for(var i = 0; i < S.length; i++){
		if(isLeft(a, b, S[i]) > 0){
			if(S[i] != a && S[i] != b)
				subset.push(S[i]);
		}
	}
	return subset;
	}

	function isLeft(a, b, c){
	return (b.x - a.x)*(c.y - a.y) - (c.x - a.x)*(b.y - a.y);
	}

	function pontosMaiorArea(a, b, S){
	var ponto;
	var area = 0; 
	for(var i = 0; i < S.length; i++){
		var area1 = determinante (a, b, S[i]);
		if(area1 > area){
			area = area1;
			ponto = S[i];
		}
		}
	return ponto;
	}

	function determinante(p1, p2, p3){
	var det = 0;
	det = p2.y*p3.x + p1.y*p2.x + p1.x*p3.y;
    det = p1.x*p2.y + p2.x*p3.y + p1.y*p3.x - det;
    return det;
	}
/*
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
			context.moveTo(inicio.x,inicio.y);
			context.lineTo(fim.x, fim.y);
			context.stroke();
			}

	}
*/
}




























window.onload = function () {
	var c = new canvasState(document.getElementById('tela'));
	var selectedValue = 0;
	var justPoints = [];
	var drag;
	var pMedio = {x:0,y:0};


	c.canvas.onmousemove = function (evt) {
		c.updateMouse(evt);
		c.drawInterface();
		c.redraw();
		

		//translacao 
		for(var i = 0; i < c.drawings.length; i++){
		if(c.drawings[i].selected == true){
			//ponto
			if(c.drawings[i].class == 1 && selectedValue == 5){
				c.drawings[i].x += (c.mouse.x - drag.x);
				c.drawings[i].y += (c.mouse.y - drag.y);
				drag = c.mouse;
				c.redraw();
			}
			//linha
			if(c.drawings[i].class == 2 && selectedValue == 5){
			
				c.drawings[i].points[0].x += (c.mouse.x - drag.x);
				c.drawings[i].points[0].y += (c.mouse.y - drag.y);
				c.drawings[i].points[1].x += (c.mouse.x - drag.x);
				c.drawings[i].points[1].y += (c.mouse.y - drag.y);
				drag = c.mouse;
				console.log(drag);
				c.redraw();			
					}
			
			//poligono
			if(c.drawings[i].class == 3 && selectedValue == 5 ){
				dx = (c.mouse.x - drag.x);
				dy = (c.mouse.y - drag.y);
				for(var j = 0; j < c.drawings[i].points.length; j++ ){
				 	c.drawings[i].points[j].x += dx ;
					c.drawings[i].points[j].y += dy;
					console.log(drag);
					drag = c.mouse;
					c.redraw();
					}
		
				}
				// drag linha
			if(c.drawings[i].class == 2 && selectedValue == 6 ){
						pMedio = segmentos(c.drawings, i);
						var sin = ((c.mouse.y-pMedio.y)/calcDistancia(pMedio,c.mouse))
						var cos = ((c.mouse.x-pMedio.x)/calcDistancia(pMedio,c.mouse))
						console.log('pmedio',pMedio,'cos',cos,'sin',sin);
						
						for (var j = 0 ; j < c.drawings[i].points.length;j++){

							var pointx, pointy;
							pointx = (cos*(c.drawings[i].points[j].x -pMedio.x)) - (sin*(c.drawings[i].points[j].y- pMedio.y))
							pointy =  (sin*(c.drawings[i].points[j].x- pMedio.x)) + (cos*(c.drawings[i].points[j].y - pMedio.y))

							c.drawings[i].points[j].x = pMedio.x + pointx;
							c.drawings[i].points[j].y = pMedio.y + pointy;
						}
					}
					//drag poligono
			if(c.drawings[i].class == 3 && selectedValue == 6){
						//pMedio = segmentos(c.drawings, i);
						var sin = ((c.mouse.y-drag.y)/calcDistancia(drag,c.mouse))
						var cos = ((c.mouse.x-drag.x)/calcDistancia(drag,c.mouse))
						console.log('pmedio',pMedio,'cos',cos,'sin',sin);
						
						for (var j = 0 ; j < c.drawings[i].points.length;j++){

							var pointx, pointy;
							pointx = (cos*(c.drawings[i].points[j].x -drag.x)) - (sin*(c.drawings[i].points[j].y- drag.y))
							pointy =  (sin*(c.drawings[i].points[j].x- drag.x)) + (cos*(c.drawings[i].points[j].y - drag.y))

							c.drawings[i].points[j].x = drag.x + pointx;
							c.drawings[i].points[j].y = drag.y + pointy;
						}
					}


	}
}
}

    //ferramenta de escolha de cor 
	var escolha = document.getElementById("cor");
    var corEscolhida = escolha.value; //ja começa com a primeira cor 
    escolha.addEventListener("input", function() {
     corEscolhida = escolha.value;
    }, false);

	//pegar ferramenta escolhida
	$( "#ponto" ).click(function() {
 		selectedValue = 1;
		});
	$( "#linha" ).click(function() {
 		selectedValue = 2;
		});
	$( "#poligono" ).click(function() {
 		selectedValue = 3;
		});	
	$( "#selecao" ).click(function() {
 		selectedValue = 4;
		});
	$( "#trans" ).click(function() {
 		selectedValue = 5;
		});
	$( "#rot" ).click(function() {
 		selectedValue = 6;
		});
	$( "#fec" ).click(function() {
 		selectedValue = 7;
		});
	$( "#clean" ).click(function() {
 		selectedValue = 8;
		});



	// Objeto estado do canvas
function canvasState (canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');

	// Setando o canvas
	this.width = canvas.width;
	this.height = canvas.height;
	this.border_width = 7;
	this.mouse = null;
	this.drawings = [];//vetor de desenhos

	// CSS do canvas
	this.canvas.style.backgroundColor = 'white';
	this.canvas.style.border = '7px solid #F38630';

	// Atualiza o mouse no canvas
	this.updateMouse = function (evt) {
		this.mouse = {x: evt.clientX - this.canvas.offsetLeft - this.border_width,
					  y: evt.clientY - this.canvas.offsetTop - this.border_width};
	}
	// Verifica se a área onde o mouse está é valida para desenho
	this.drawable = function () {
	}

	this.redraw = function () {
		// Desenhando cada objeto na tela
		for (var i = 0; i < this.drawings.length; i++)
			this.drawings[i].draw(this.ctx, this.mouse);
	}

	this.drawInterface = function () {
		// Redesenhando o fundo
		this.ctx.fillStyle = this.canvas.style.backgroundColor;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

}
	// Se clicar com o botão esquerdo no canvas
c.canvas.onclick = function (evt) {
	c.updateMouse(evt);
	var actualLine = c.drawings.pop();// Desenho atual
	drag = c.mouse;
	drag = c.mouse;

	if(selectedValue == 1){
			var point = new Point(corEscolhida);
			point.setCoords(drag.x, drag.y);
			c.drawings.push(point);
			justPoints.push(point);
		}

	if(selectedValue == 2){
			if (actualLine != null) {
			// Se o desenho atual já esta finalizado: cria outra linha
			if (actualLine.finished) {
				c.drawings.push(actualLine); // Coloco o desenho novamente na estrutura drawings

				actualLine = new Line(corEscolhida); // Crio nova linha
				// Agora esse passa a ser o desenho selecionado
				actualLine.pushPoint(c.mouse); 
				// Adiciono nova coordenada na linha
			}
			// Senao: adiciona novo ponto ao desenho atual (que eh uma linha)
			else actualLine.pushPoint(c.mouse); // Adiciono nova coordenada na linha
		}
		// Se não tinha outro desenho: cria uma linha
		else {
			actualLine = new Line(corEscolhida); // Crio nova linha
			// Agora esse passa a ser o desenho selecionado
			actualLine.pushPoint(c.mouse); // Adiciono nova coordenada na linha			
		}
		}
		c.drawings.push(actualLine);

		var actualP = c.drawings.pop();  

	if(selectedValue == 3){
			if (actualP != null) {
			// Se o desenho atual já esta finalizado: cria outra linha
			if (actualLine.finished) {
				c.drawings.push(actualP); // Coloco o desenho novamente na estrutura drawings
				actualP = new Polygon(corEscolhida); // Crio nova linha
				//actualP.selected = true; // Agora esse passa a ser o desenho selecionado
				actualP.pushPoint(c.mouse); // Adiciono nova coordenada na linha
			}
			// Senao: adiciona novo ponto ao desenho atual (que eh uma linha)
			else actualP.pushPoint(c.mouse); // Adiciono nova coordenada na linha
		}
		// Se não tinha outro desenho: cria uma linha
		else {
			actualP = new Polygon(corEscolhida); // Crio nova linha
			//actualP.selected = true; // Agora esse passa a ser o desenho selecionado
			actualP.pushPoint(c.mouse); // Adiciono nova coordenada na linha
			
		}
		}

		c.drawings.push(actualP);
		c.drawInterface();
		c.redraw();

	if(selectedValue == 4){
		var xmin, xmax, ymin, ymax, tol = 6;
		var cod0 = [], cod1 = [];
		var x0, y0, x1, y1;
		xmin = c.mouse.x - tol;		
		xmax = c.mouse.x + tol;		
		ymin = c.mouse.y - tol;		
		ymax = c.mouse.y + tol;

		function PickCode(x, y, xmin, xmax, ymin, ymax, cod){
		 cod[0] = x < xmin;
		 cod[1] = x > xmax;
		 cod[2] = y < ymin;
		 cod[3] = y > ymax;
		}
		for(var i = 0; i <= c.drawings.length; i++){
			 // pick de ponto
				if(c.drawings[i].class==1){
					if(c.drawings[i].x <= xmax && c.drawings[i].y <= ymax  && c.drawings[i].x >= xmin && c.drawings[i].y >= ymin){
						console.log("Ponto!!");
						if(c.drawings[i].selected ==true ) c.drawings[i].selected = false;
							else c.drawings[i].selected = true;

									}
			}
			//pick de linha
				if(c.drawings[i].class==2){
					x0 = c.drawings[i].points[0].x;
					y0 = c.drawings[i].points[0].y;
					x1 = c.drawings[i].points[1].x;
					y1 = c.drawings[i].points[1].y;
					PickCode(x1,y1,xmin,xmax,ymin,ymax,cod1);
						do{
						PickCode(x0,y0,xmin,xmax,ymin,ymax,cod0);

						for(var k = 0; k < 4 ; k ++)
							if(cod0[k] && cod1[k]) break;
						if(k!=4)
							break;
						//move o ponto 0 para o limite da janela
						if(cod0[0]){
							y0 += ((xmin - x0) * (y1 - y0)) / (x1 - x0);
							x0 = xmin;
						}else if(cod0[1]){
							y0 += ((xmax - x0) * (y1 - y0)) / (x1 - x0);
							x0 = xmax;
						}else if(cod0[2]){
					    	x0 += ((ymin - y0) * (x1 - x0)) / (y1 - y0);
					    	y0 = ymin;
						}else if(cod0[3]){
							x0 += ((ymax - y0) * (x1 - x0)) / (y1 - y0);
							y0 = ymax;
						}else{
							console.log("Linha!");
							if(c.drawings[i].selected == true) c.drawings[i].selected = false;
								else c.drawings[i].selected = true;
							return i;
						}		
					}
				while(true);
				}
			//pick poligono
			if (c.drawings[i].class == 3) {
				var j;
	 			var ni = 0; //numero intersecçoes 	  		
	 			var fst = c.drawings[i].points.length -1;	//começa pela ultima posiçao 
				var xc;
				var nArestas = [];
				nArestas = c.drawings[i].points;
	 			var p1 , p2 ; 	// pontos aresta 	

	 			for (j = 0; j < c.drawings[i].points.length; j++){
	 				p1 = nArestas[j];
	 				p2 = nArestas[fst];

	 				if (p1.x == c.mouse.x && p1.y == c.mouse.y) return i;

	 				// descarta linhas horizontais, retas acima, retas abaixo, retas esquerdas 
					if (!(p1.y == p2.y) && !((p1.y > c.mouse.y) && (p2.y > c.mouse.y)) &&
					!((p1.y < c.mouse.y) && (p2.y < c.mouse.y)) && !((p1.x < c.mouse.x) && (p2.x < c.mouse.x))) {
						// primeiro ponto na mesma cota 
						if (p1.y == c.mouse.y) {
							//  a direita e acima do ponto
							if ((p1.x > c.mouse.x) && (p2.y > c.mouse.y)) ni += 1; 
						}
						// segundo ponto na mesma cota 
						else if (p2.y == c.mouse.y) {
							// //  a direita e acima do ponto
							if ((p2.x > c.mouse.x) && (p1.y > c.mouse.y)) ni += 1; //inteiramente a direita
						}
						else if ((p1.x > c.mouse.x) && (p2.x > c.mouse.x)) ni += 1;
						//  verifica ponto de intersecao
						else {
							var dx = p1.x - p2.x;
							xc = p1.x;
							if (dx != 0) 
								xc += (c.mouse.y - p1.y) * dx / (p1.y - p2.y);
							if (xc > c.mouse.x) ni += 1;
						}				
					}
					fst = j; //ultimo ponto para proxima aresta
					
	 			}

	 			if(ni % 2 == 1){
	 				console.log("poligono!");
	 			if(c.drawings[i].selected == true) c.drawings[i].selected = false;
								else c.drawings[i].selected = true;
					return i;
	 			}
	 				
			}						
		}
		}

	if(selectedValue == 7){
		
		console.log(justPoints.length);
		var quickPontos = [];
		var max = justPoints[0];
		var min = justPoints[0];
		teste(max, min, justPoints);

		function teste(max, min, justPoints){
		for(var i = 0; i < justPoints.length; i++){
	        if(justPoints[i].x > max.x)
	        		max = justPoints[i];
	        if(justPoints[i].x < min.x)
	        		min = justPoints[i];
	    }
	    

	    var pontos1 = pontosLado(min, max,justPoints);
	    var pontos2 = pontosLado(max, min, justPoints);

	    console.log("p1=", pontos1.length);
	    console.log("p2=", pontos2.length);

	    quickPontos.push(min);
	    quickPontos = quickPontos.concat(findHull(min, max, pontos1));
	    quickPontos.push(max);
	    quickPontos = quickPontos.concat(findHull(max, min, pontos2));
	    console.log(quickPontos.length);
	    return quickPontos;
	   }	

		function findHull(a,b,S){
		var findPontos = [];
		if(S.length != 0){
		var c = pontosMaiorArea(a,b,S);
		var A = pontosLado( a, c, S);
		var B = pontosLado( c, b, S);

		findPontos = findPontos.concat(findHull(a, c, A));
		findPontos.push(c);
		findPontos = findPontos.concat(findPontos,findHull(c, b, B));
			}

		return findPontos;
		}

		function pontosLado(a, b, S){
		var subset = [];
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
		var area = Number.MIN_VALUE; 
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
			actualP = new fechoConvexo(quickPontos, corEscolhida);
	}
  	
		c.drawings.push(actualP);
		c.drawInterface();
		c.redraw();
}

	// Se clicar com o botão direito no canvas
c.canvas.oncontextmenu = function () {
	var actualDrawing = c.drawings.pop();
	actualDrawing.selected = false;
	actualDrawing.finished = true;
	c.drawings.push(actualDrawing);
	selectedValue = 0;
	for(var i = 0; i < c.drawings.length; i++){
		if(c.drawings[i].selected == true)
			c.drawings[i].selected = false;
	}
	return false;
	}

	function segmentos(drawings, drag){
	var returnpoint = {x:0,y:0},
	dist = {x:0,y:0},
	xmax, xmin,ymax,ymin;

	xmax = c.drawings[drag].points[0].x;
	xmin = c.drawings[drag].points[0].x;
	ymin = c.drawings[drag].points[0].y;
	ymax = c.drawings[drag].points[0].y;

	for(var p=0;p<c.drawings[drag].points.length;p++){
		if(c.drawings[drag].points[p].x > xmax)
			xmax = c.drawings[drag].points[p].x;
		else if(c.drawings[drag].points[p].x <= xmin)
			xmin = c.drawings[drag].points[p].x;


		if(c.drawings[drag].points[p].y > ymax)
			ymax = c.drawings[drag].points[p].y;
		else if(c.drawings[drag].points[p].y <= ymin)
			ymin = c.drawings[drag].points[p].y;
	}

	dist.x = (xmax-xmin)/2;
	dist.y = (ymax-ymin)/2;

	returnpoint.x = xmin +dist.x;
	returnpoint.y = ymin +dist.y;

	return returnpoint;
}
function calcDistancia(pt1,pt2){
	return Math.sqrt(Math.pow(pt1.x - pt2.x,2)+Math.pow(pt1.y - pt2.y,2));
}

}






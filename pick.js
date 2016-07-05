function pickShape(drawings, mouse){
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
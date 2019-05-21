
var das = document.querySelectorAll(".line"); 		//ищем в документе все элементы с классом .line и запихиваем в массив das
var divClick = document.querySelectorAll(".block");	//ищем в документе все элементы с классом .block и запихиваем в массив divClick

for ( var i = 0; i < divClick.length; i++ ){

	divClick[i].onclick = function(){

		/* Данный цикл убирает подсвеченные ранее ходы и тексты*/
		for (var i = 0; i < divClick.length; i++ ){

			divClick[i].classList.remove('step','blue','text');
		}
		//////////////////////////////////////////////////////////
		var firstVal = this.classList[1]+this.parentNode.classList[1];	//собираем значение первой клетки, на которую клацнули мышкой 
		var desc = []; //массив содержит все значения шахматного поля

		this.classList.add('blue','text');		//красим в синий выбранный квадрат и выводим на него текст
		this.setAttribute('name', firstVal);	//присваиваем ему атрибут name со значением firstVal

		/* Данный цикл собирает все значения шахматного поля и засовывает в массив desc */
		for (var i = 0; i < das.length; i++){

			for (var j = 0; j < 8; j++)

				desc.push(divClick[j].classList[1]+das[i].classList[1]);
		}

		/* Запускаем функцию определения ходов конем по заданнаму начальному значению firstVal, которое мы получили выше*/
		var vals = horseSteps(firstVal);

		/* Данный цикл берет полученные выше значения ходов и присваивает соответствующим элементам классы .step и .text, а так же
		   присваивает атрибут name со значением текущего хода
		   desc.indexOf(vals[i])] ищет порядковый номер ячейки на шахматной доске, значение которой совпало со значением из vals
		   поскольку порядок элементов desc идентичен порядку элементов divClick, мы точно знаем какой элемент divClick нужно покрасить*/
		for (var i = 0; i < vals.length; i++){

			divClick[desc.indexOf(vals[i])].classList.add('step','text'); 
			divClick[desc.indexOf(vals[i])].setAttribute('name', vals[i]);
		}

	}
}

//функция определения возможных ходов конем из заданной позиции

var horseSteps = function(firstVal) {

	var vals = [];										//создаем пустой массив для хранения ходов

	//задаем оси
	var xAxis = ['A','B','C','D','E','F','G','H'];		
	var yAxis = [8,7,6,5,4,3,2,1];

	//задаем смещения по X и Y
	var shift1 = [-1,1];
	var shift2 = [-2,2];

	var X = xAxis.indexOf(firstVal[0]);					//определяем позицию исходной коодинаты на оси X
	var Y = yAxis.indexOf(parseInt(firstVal[1]));		//определяем позицию исходной коодинаты на оси Y

	if (X == -1 || Y == -1){							//проверяем исходную координату на валидность

		return null;									//если координата не валидна, функция возвращает null

	}

	/*логика такая: есть два массива со смещениями по оси X и Y, если мы смещаем координату X на 1 и -1, то координата Y смещается на 2 и -2
	и наоборот, поэтому мы запускаем 3 цикла, сначала запускаем перебор значений по оси X со смещением 1 и -1, при этом по Y смещение проходит
	на 2 и -2, затем мы меняем массивы со смещениями местами и запускаем перебор заново, но уже со смещениями по оси X на 2 и -2 и
	на 1 и -1 по Y, в общей сложности получается 8 значений, если начальная позиция находится в центре шахматной доски.*/

	for (var g = 0; g < 2; g++){						
		
		for (var i = 0; i < shift1.length; i++){
			
			for (var j = 0; j < shift2.length; j++){

				
				var xVal = xAxis[X+shift1[i]];					//вычисляем смещенное значение X
				var yVal = yAxis[Y+shift2[j]]					//вычисляем смещенное значение Y
				
				if ( xVal != undefined && yVal != undefined){	//отсекаем значения, которые вышли за пределы шахматной доски
					
					vals.push(xVal + yVal);						//загоняем в массив итоговые значения
					
				}
				
			}
			
			if ( i == shift1.length-1){							//меняем массивы со смещениями местами
				
				var prev = shift1;
				shift1 = shift2;
				shift2 = prev;
			}
			
		}
		
	}
	
	return vals;			//возвращаем массив итоговых значений
	
}

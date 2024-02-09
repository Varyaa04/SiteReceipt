// Math.floor(Math.random()*3)


var arr, arr_events = [], win_block, winner, again, winning, game;

var comp_sym = "o"; //компьютер
var user_sym = "x"; //человек

onload = function(){  //запуск игры
	game = document.getElementById("game");
	arr = game.getElementsByClassName("inner");
	win_block = document.getElementById("win_block");
	win_text = win_block.getElementsByClassName("winner")[0];
	again = win_block.getElementsByClassName("again")[0];
	winning = game.getElementsByClassName("winning")[0];

	again.onclick = function(){ 
		winning.style.display = "none";
		win_block.style.display = "none";
		clearTable();
		randomMove();
	};
// тут игра начинается заново^

	for(var i = 0; i < arr.length; i++){
		arr[i].onclick = function(){
			drawSym(this);
		};

		
	}
	randomMove();

};

function randomMove(){ //выбирает случайным образом, кто из игроков начинает игру первым.
	var rnd = getRandomInt(2);
	console.log(rnd);
	if (rnd == 1) {
		autoDrawing();
	}
	return true;
}

function drawSym(item, sym = user_sym){ //при клике на соответствующий элемент таблицы рисуется символ
	// console.log(item);
	if (item.hasChildNodes()) return false;
	item.innerHTML = sym;
	
	var winner = checkWinner();

	if (sym == user_sym && !winner)
		autoDrawing();


	if (winner == user_sym) { //действия победителя
		win_text.innerHTML = "Вы выиграли!";
		win_text.style.color = "green";
		winning.style.backgroundColor = "rgba(0,200,0, 0.5)";
		window.location.href = 'recipe1.html'; 
	}else if (winner == comp_sym) {
		win_text.innerHTML = "Выиграл компьютер! Попоробуйте еще раз!";
		win_text.style.color = "red";
		winning.style.backgroundColor = "rgba(200,0,0, 0.5)";
	}
	if (winner) {
		winning.style.display = "block";
		win_block.style.display = "block";
	}
	return true;
}

function checkWinner(){ //проверка победителя
	var winner = "";
	var j = 0;


	var xy_1_1 = arr[0].innerHTML;
	var xy_1_2 = arr[4].innerHTML;
	var xy_1_3 = arr[8].innerHTML;

	var xy_2_1 = arr[2].innerHTML;
	var xy_2_2 = arr[4].innerHTML;
	var xy_2_3 = arr[6].innerHTML;

	if ((xy_1_1 && xy_1_2 && xy_1_3) || (xy_2_1 && xy_2_2 && xy_2_3)) {

		if (xy_1_1 == user_sym && xy_1_2 == user_sym && xy_1_3 == user_sym) {
			winner = user_sym;
		}
		else if(xy_1_1 == comp_sym && xy_1_2 == comp_sym && xy_1_3 == comp_sym){
			winner = comp_sym;
		}


		if (xy_2_1 == user_sym && xy_2_2 == user_sym && xy_2_3 == user_sym) {
			winner = user_sym;
		}
		else if(xy_2_1 == comp_sym && xy_2_2 == comp_sym && xy_2_3 == comp_sym){
			winner = comp_sym;
		}
	}




	if (!winner){
		for(var i = 0; i < 3; i++){

			// alert(i);

			var a1 = arr[i].innerHTML;
			var a2 = arr[i + 3].innerHTML;
			var a3 = arr[i + 6].innerHTML;

			var b1 = arr[i].innerHTML;
			var b2 = arr[i + 1].innerHTML;
			var b3 = arr[i + 2].innerHTML;
			

			// console.log("b1 = '" + (b1) + "' b2 = '" + (b2) + "' b3 = '" + (b3) +"'");

			if (a1 == user_sym && a2 == user_sym && a3 == user_sym) {
				winner = user_sym;
				break;
			}
			else if(a1 == comp_sym && a2 == comp_sym && a3 == comp_sym){
				winner = comp_sym;
				break;
			}


			if (i != 0) j = 3*i;

			b1 = arr[j].innerHTML;
			b2 = arr[j + 1].innerHTML;
			b3 = arr[j + 2].innerHTML;

			if (b1 == user_sym && b2 == user_sym && b3 == user_sym) {
				winner = user_sym;
				break;
			}
			else if(b1 == comp_sym && b2 == comp_sym && b3 == comp_sym){
				winner = comp_sym;
				break;
			}
			if (winner) 
				break;
		}
	}

	return winner;
}

function autoDrawing(){  //если ничья

	if (!ckeckFreeSpace()) {
		
		win_text.innerHTML = "Выиграла ничья! ";
		win_text.style.color = "blue";
		winning.style.display = "block";
		winning.style.backgroundColor = "rgba(0,0,200, 0.5)";
		win_block.style.display = "block";

		return false;
	}
	var el, rnd;

	do{
		rnd = getRandomInt(arr.length);
		el = arr[rnd];
		// console.log(rnd);
	}while(!drawSym(el, comp_sym));

	if (!ckeckFreeSpace()) {
		autoDrawing();
	}
}

function clearTable(){
	for(var i = 0; i < arr.length; i++){
		arr[i].innerHTML =  "";
	}
}

function ckeckFreeSpace(){
	var res = false;

	for(var i = 0; i < arr.length; i++){
		if (arr[i].hasChildNodes()){
			res = false;
		}else{
			res = true;
			break;
		}
	}

	return res;
}

function getRandomInt(max){
	return Math.floor(Math.random() * max);
}







function addHandler(el, ev, func ){
	try{
		el.addEventListener(ev, func, false);
	}
	catch(e){
		el.attachEvent("on"+ev, func);
	}
}


function removerEvent(el, ev, func){
	try{
		el.removeEventListener(ev, func, false);

	}catch(x){
		el.detachEvent("on"+ev, func);
		
	}
}
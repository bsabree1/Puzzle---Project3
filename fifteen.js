var TILE_SIZE = 100;
var div16T = "300px"; //y position of the blank tile
var div16L = "300px"; //x position of the blank tile
var begin = new Date();
var moveCount = 0;
var timerTime = null;
var timestamp;
var myTime = null;
var seconds =0;
var minutes = 0;

window.onload = function () {
	Tiles();
	$("start").observe("click", shuffle);
	$("puzzleBackground").observe("click", setBackground);
	$("solve").observe("click", Tiles);
	document.getElementById("moveCount").innerHTML = moveCount;
}

function Tiles() {
	var number=15;
	var x = 0;
	var y = 0;
	for (var i = 0; i <number; i++) {
		if (i % 4 == 0 && i!==0) {
			x = 0;
			y += 100;
		}

		var puzzle = 	$$("#puzzle15> div")[i];
		puzzle.style.left = x + "px";
		puzzle.style.top = y + "px";
		puzzle.value = i +1;
		puzzle.id = i +1;
		setBackground()
		puzzle.style.backgroundPosition = -x + "px " + -y + "px ";
		puzzle.observe("mouseover", animate);
		puzzle.observe("click", current);
		x =x+100;
	}
	var moveCount = 0;
	document.getElementById("moveCount").innerHTML = moveCount;
 	clearInterval(timerTime);
 	document.getElementById("time").innerHTML = "Time: 0";
 	document.getElementById("time").style.color = "black";
	 myTime = setInterval(function(){timer()},1000);
}


function animate(event) {
	var top = parseInt(this.getStyle("top"));
	var left = parseInt(this.getStyle("left"));
	if (checkNeighbor(top, left)) {
		this.addClassName("animation");
	}
}

function checkNeighbor(top, left) {
	if ((parseInt(div16T) + 100 == top) && (parseInt(div16L) == left))
 		{
 			 return true;
 		}
 		else if((parseInt(div16T) - 100 == top) && (parseInt(div16L) == left))
 		{
 			return true;
 		}
 		else if((parseInt(div16T) == top)&& (parseInt(div16L) + 100 == left))
 		{
 			return true;
 		}
 		else if((parseInt(div16T) == top) && (parseInt(div16L) - 100 == left)) {
 		return true;
 	}
 	else {
 		return false;
 	}
 }

function current(event) {
	var temp = 0;
	var top = parseInt(this.getStyle("top"));
	var left = parseInt(this.getStyle("left"));
	if (top + 100 == parseInt(div16T) && left == parseInt(div16L)) {
		temp = div16T;
		div16T = this.getStyle("top");
		this.style.top = temp;
	} else if (top - 100 == parseInt(div16T) && left == parseInt(div16L)) {
		temp = div16T;
		div16T = this.getStyle("top");
		this.style.top = temp;
	} else if (top == parseInt(div16T) && left + 100 == parseInt(div16L)) {
		temp = div16L;
		div16L = this.getStyle("left");
		this.style.left = temp;
	} else if (top == parseInt(div16T) && left - 100 == parseInt(div16L)) {
		temp = div16L;
		div16L = this.getStyle("left");
		this.style.left = temp;
	}
	moveCount ++;
	document.getElementById("moveCount").innerHTML = moveCount;

}

function shuffle() {

		for (var t = 0; t < 100; t++) {
			var a = $("#puzzle15 >div")[t].remove.toArray();
			for (var i = a.length - 1; i >= 1; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var bi = a[i];
				var bj = a[j];
				a[i] = bj;
				a[j] = bi;
			}
			setBackground()
			}

			for (var a = 0; a < 100; a++) {
				var space = [];
				for (var i = 0; i <15; i++) {
					var top = parseInt($$("#puzzle15 > div")[i].getStyle("top"));
					var left = parseInt($$("#puzzle15 > div")[i].getStyle("left"));
					if (checkNeighbor(top, left)) {
						space.push(getTile(top, left));
					}
				}
// }
	// 			var div = $("#puzzle15 > div").remove().toArray();
 // 				for (var i = div.length - 1; i >= 1; i--) {
	// 			var j = Math.floor(Math.random() * (i + 1));
	// 			var bi = a[i];
	// 			var bj = a[j];
	// 			a[i] = bj;
	// 			a[j] = bi;
	// 		}
	//
	// $("#puzzle15").append(div);
	// }

}



function timer(begin){		// Timer
    if(seconds==59){
        minutes++;
        seconds = 0;
    }
    seconds++;
    timestamp="Time: "+minutes+":"+seconds;
    document.getElementById("time").innerHTML = timestamp;
}



 function setBackground() {
  var selectedPuzzle;
  var mainBackground;
 	var choice = document.getElementById('puzzleChoice');
 	var text = choice.options[choice.selectedIndex].value;
 	var puzzleA =$$("#puzzle15> div");
 	console.log("text is " + text);

 switch(text)	{
 case "micky.png":
  		selectedPuzzle = "micky.png";
  		mainBackground = "1st.jpg";
 			for (var i = 0; i < puzzleA.length-1; i++) {
 				$$("#puzzle15 > div")[i].style.backgroundImage = "url(" + selectedPuzzle + ")";
 				document.body.style.backgroundImage = "url(" + mainBackground + ")";
 			}
  		break;

 	case "lionKing.jpg":
 		selectedPuzzle = document.getElementById("lion").value;
  		mainBackground = "2nd.jpg";
 			for (var i = 0; i < puzzleA.length-1; i++) {
 				puzzleA[i].style.backgroundImage = "url(" + selectedPuzzle + ")";
 				document.body.style.backgroundImage = "url(" + mainBackground + ")";
 			}
 		break;

 	case "toyStory.jpg":
  		selectedPuzzle = "toyStory.jpg";
  		mainBackground = "3rd.jpg";
 			for (var i = 0; i <15; i++) {
 				puzzleA[i].style.backgroundImage = "url(" + selectedPuzzle + ")";
 				document.body.style.backgroundImage = "url(" + mainBackground + ")";
 			}
 			break;

 	case "tangled.png":
  		selectedPuzzle = document.getElementById("tangled").value;
  		mainBackground = "4th.jpg";
 			for (var i = 0; i < puzzleA.length-1; i++) {
 				puzzleA[i].style.backgroundImage = "url(" + selectedPuzzle + ")";
 				document.body.style.backgroundImage = "url(" + mainBackground + ")";
 			}
  		break;

 	default:
 	selectedPuzzle ="lionKing.jpg";
 	mainBackground = "2nd.jpg";
 		for (var i = 0; i < puzzleA.length-1; i++) {
 			puzzleA[i].style.backgroundImage = "url(" + selectedPuzzle + ")";
 			document.body.style.backgroundImage = "url(" + mainBackground + ")";
 		}
 	}
 }

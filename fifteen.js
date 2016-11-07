var TILE_SIZE = 100;
var BLANK_TOP = (3 * TILE_SIZE) + "px"; //y position of the blank tile
var BLANK_LEFT = (3 * TILE_SIZE) + "px"; //x position of the blank tile
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
		if (i % 4 == 0 && i != 0) {
			x = 0;
			y += TILE_SIZE;
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
		x =x+TILE_SIZE;
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
	if ((parseInt(BLANK_TOP) + TILE_SIZE == top) && (parseInt(BLANK_LEFT) == left))
 		{
 			 return true;
 		}
 		else if((parseInt(BLANK_TOP) - TILE_SIZE == top) && (parseInt(BLANK_LEFT) == left))
 		{
 			return true;
 		}
 		else if((parseInt(BLANK_TOP) == top)&& (parseInt(BLANK_LEFT) + TILE_SIZE == left))
 		{
 			return true;
 		}
 		else if((parseInt(BLANK_TOP) == top) && (parseInt(BLANK_LEFT) - TILE_SIZE == left)) {
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
	if (top + TILE_SIZE == parseInt(BLANK_TOP) && left == parseInt(BLANK_LEFT)) {
		temp = BLANK_TOP;
		BLANK_TOP = this.getStyle("top");
		this.style.top = temp;
	} else if (top - TILE_SIZE == parseInt(BLANK_TOP) && left == parseInt(BLANK_LEFT)) {
		temp = BLANK_TOP;
		BLANK_TOP = this.getStyle("top");
		this.style.top = temp;
	} else if (top == parseInt(BLANK_TOP) && left + TILE_SIZE == parseInt(BLANK_LEFT)) {
		temp = BLANK_LEFT;
		BLANK_LEFT = this.getStyle("left");
		this.style.left = temp;
	} else if (top == parseInt(BLANK_TOP) && left - TILE_SIZE == parseInt(BLANK_LEFT)) {
		temp = BLANK_LEFT;
		BLANK_LEFT = this.getStyle("left");
		this.style.left = temp;
	}
	moveCount ++;
	document.getElementById("moveCount").innerHTML = moveCount;

}

function shuffle() {
	for (var a = 0; a < 100; a++) {

		//Find the tiles that can be moved (next to empty space)
		var canMove = [];
		for (var i = 0; i <15; i++) {
			var top = parseInt($$("#puzzle15 > div")[i].getStyle("top"));
			var left = parseInt($$("#puzzle15 > div")[i].getStyle("left"));
			if (checkNeighbor(top, left)) {
				canMove.push(getTile(top, left));
			}
		}


		//Randomly pick one...
		var randomNumber = parseInt(Math.random() * canMove.length);
		var movingTile = canMove[randomNumber];
		var movingTileTop = $("" + movingTile).getStyle("top");
		var movingTileLeft = $("" + movingTile).getStyle("left");
		var temp;

		//...and move it
		if (parseInt(BLANK_TOP) != parseInt(movingTileTop)) {
			temp = BLANK_TOP;
			BLANK_TOP = movingTileTop;
			movingTileTop = temp;
			$("" + movingTile).style.top = movingTileTop;

		} else if (parseInt(BLANK_LEFT) != parseInt(movingTileLeft)) {
			temp = BLANK_LEFT;
			BLANK_LEFT = movingTileLeft;
			movingTileLeft = temp;
			$("" + movingTile).style.left = movingTileLeft;
		}
	}
}

function getTile(top, left) {
	for (var i = 0; i <15; i++) {
		if (parseInt($$("#puzzle15 > div")[i].getStyle("top")) == top && parseInt($$("#puzzle15 > div")[i].getStyle("left")) == left) {
			return $$("#puzzle15 > div")[i].value;
		}
	}
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

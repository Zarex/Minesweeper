function Board(width, height) {
	
	board = [];
	
	for (var y = 0; y < height; y++) {
		
		board.push([]);
		
		for (var x = 0; x < width; x++) {
			
			board[y].push([]);
		
		}
	
	}
	
	return board;

}

function Cell (mine, loc, revealed)
{
	this.mine = mine;
	this.revealed = revealed;
	if(this.revealed === undefined)
		this.revealed = false;
	this.loc = [parseInt(loc/width), loc % width];
	var tempLoc= [this.loc[0],this.loc[1]];
	this.surroundings = function (){
		var surroundingCells = [];
		for(var i = -1; i < 2; i++)
		{
			for(var j = -1; j < 2; j++)
			{
			
				try {
					var cell = board[tempLoc[0]+i][tempLoc[1]+j];
				}
				
				catch(e) {
					continue;
				}
				
				if (cell === undefined || cell.loc[0] == tempLoc[0] && cell.loc[1] == tempLoc[1]) continue;
				surroundingCells.push(cell);
					
			}
		}
		return surroundingCells;
	};
	
}



// max for randInt is exclusive
function randInt(max) {
	
	return parseInt(Math.random() * max);

}

function mineLocGen(area, mines)
{
// BEWARE: if mines > area, infinite loops may occur
	mineLocs = [];
	for(var i = 0; i < mines; i++)
	{
		loc = randInt(area);
		while(mineLocs.indexOf(loc) != -1)
			loc = randInt(area);
		mineLocs.push(loc);
	}
	return mineLocs;
}

function forEach(array, action) {

	for (var i = 0; i < array.length; i++) {
		
		action(array[i]);
		
	}

}

function map(func, array) {

	var result = [];
	
	forEach(array, function (element) {
	
		result.push(func(element));
		
	});
	
	return result;
	
}

function asArray(quasiArray, start) {

	var result = [];
	
	for (var i = (start || 0); i < quasiArray.length; i++) {
	
		result.push(quasiArray[i]);
		
	}
	
	return result;
	
}

function partial(func) {

	var fixedArgs = asArray(arguments, 1);
	
	return function() {
	
		return func.apply(null, fixedArgs.concat(asArray(arguments)));
		
	};
	
}

function placeMines(board, mineLocs) {

	var element = -1;

	return map(partial(map, function() {
			
		element++;
	
		if (mineLocs.indexOf(element) != -1) {
				
				return new Cell(true,element);
			
			}
			
			else {
				
				return new Cell(false, element);
			
			}
	}), board);

}

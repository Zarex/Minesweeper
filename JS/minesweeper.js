function Board(width, height) {
	
	var tempBoard = this; // Many methods need access to this inside themselves.
	 
	this.board = [];
	
	for (var y = 0; y < height; y++) {
		
		this.board.push([]);
		
		for (var x = 0; x < width; x++) {
			
			this.board[y].push([]);
		
		}
	
	}
	this.contains= function (loc0, loc1)
	{
		if(tempBoard.board[loc0] === undefined)
			return false;
		if(tempBoard.board[loc0][loc1] === undefined)
			return false;
		return true;
	};
	
	this.cellAt = function(loc0, loc1) {
		
		if (tempBoard.contains(loc0, loc1)) {
			
			return tempBoard.board[loc0][loc1];
			
		}
		
		return false;
		
	}
	
	
	this.surroundings = function (center_cell){
	
		var surroundingCells = [];
		
		for(var i = -1; i < 2; i++)
		{
			for(var j = -1; j < 2; j++)
			{	
				new_cell = tempBoard.cellAt(center_cell.loc[0] + i,
											center_cell.loc[1] + j);
				
				// Don't include spaces off the board or yourself.
				if (!(new_cell) || i == 0 && j == 0) continue;
				
				surroundingCells.push(new_cell);
					
			}
			
		}
		
		return surroundingCells;
		
	};
	
}

function Cell (mine, loc, revealed)
{
	this.mine = mine;
	
	this.revealed = revealed;
	if(this.revealed === undefined)
		this.revealed = false;
		
	this.loc = [parseInt(loc/width), loc % width];
	
}

function mineLocGen(area, mines)
{
// BEWARE: if mines > area, infinite loops will occur.
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



function placeMines(board, mineLocs) {

	var element = -1;

	return map(partial(map, function() {
			
		element++;
		
		// If mineLocs says there should be a mine here, put one here.
		if (mineLocs.indexOf(element) != -1) {
				
				return new Cell(true,element);
			
			}
			
			else {
				
				return new Cell(false, element);
			
			}
	}), board);

}

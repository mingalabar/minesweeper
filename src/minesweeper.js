class Game {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._board = new Board (numberOfRows, numberOfColumns, numberOfBombs);
		this._numberOfBombs = numberOfBombs;
	}

	playMove(rowIndex, columnIndex) {
		this._board.flipTile(rowIndex, columnIndex);
		if (this._board._playerBoard[rowIndex][columnIndex] === 'B') {
			console.log("The game is over, bitch!");
			this._board.print();
		}
		else if (this._board.hasSelfTiles === true) {
			console.log("You have won, hero!");
		}
		else {
			console.log("Current Board: ");
			this._board.print();
			this._board.printBombBoard();
		}
	}
}


class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfRows = numberOfRows;
		this._numberOfColumns = numberOfColumns;
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = (numberOfRows * numberOfColumns);
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard () {
		return this._playerBoard;
	}

	get numberOfBombs () {
		return this._numberOfBombs;
	}

	//flipTile flips a tile and changes it to 'B' if it is a bomb or number of bombs aside otherwise
	flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !=  ' ') {
				console.log("This tile has already been flipped!");
			}
			else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				this._playerBoard[rowIndex][columnIndex] = 'B';
			}
			else {
				this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			}
		this._numberofTiles--;
	}

	getNumberOfNeighborBombs(rowIndex, columnIndex) {
			const neighborOffsets = [
				[-1, -1], [0, -1], [1, -1] ,[-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]
			];
			const numberOfRows = this._bombBoard.length;
			const numberOfColumns = this._bombBoard[0].length;
			var numberOfBombs = 0;

			neighborOffsets.forEach(offset => {
				const neighborRowIndex = rowIndex + offset[0];
				const neighborColumnIndex = columnIndex + offset[1];
				if (neighborRowIndex >= 0 && neighborColumnIndex >= 0 &&
					neighborRowIndex < numberOfRows && neighborColumnIndex < numberOfColumns) {
						if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						numberOfBombs++;
						}
				}
			});
		return numberOfBombs;
	}

	hasSafeTiles() {
		return (this._numberOfTiles === this._numberOfBombs);
	}

	print() {
	  console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
	  return this._playerBoard;
	}

	printBombBoard()	{
		console.log(this._bombBoard.map(row => row.join(' | ')).join('\n'));
	  return this._bombBoard;
	}

	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		this._playerBoard = [];
				for (let i = 1; i <= numberOfRows; i++) {
					let row = [];
					for (let j = 1; j <= numberOfColumns; j++) {
						row.push(' ');
					}
				this._playerBoard.push(row);
				}
		return this._playerBoard;
	}

	static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
	  this._bombBoard = [];
	  for (let i = 1; i <= numberOfRows; i++) {
	          let row = [];
	          for (let j = 1; j <= numberOfColumns; j++) {
	                  row.push(null);
	          }
	  				this._bombBoard.push(row);
	  }

		let numberOfBombsPlaced = 0;
		while (numberOfBombsPlaced < numberOfBombs) {
		  let randomRowIndex = Math.floor(Math.random() * numberOfRows);
		  let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
			if (this._bombBoard[randomRowIndex][randomColumnIndex] !== 'B') {
				this._bombBoard[randomRowIndex][randomColumnIndex] = 'B';
			  numberOfBombsPlaced++;
			}
		}
	return this._bombBoard;
	}
}

g = new Game(3, 3, 3);
g.playMove(0,0);

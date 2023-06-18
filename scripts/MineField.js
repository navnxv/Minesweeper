// Importing cell.js
import Cell from "./Cell.js";
const MAX_SIZE = 10;

export default class MineField{
    constructor(size = MAX_SIZE, count){

        // Initializing the class variables
        this.size = size;
        this.theMineField = Array(this.size).fill().map(() => Array(this.size).fill().map(() => new Cell()));
        this.count = count;
        
        // Calling class functions
        this.placeMine();
        this.adjacentMines();
    }

    // Placing mines on random cells on the grid
    placeMine(){
        for(let i = 0; i < this.count; i++){
            
            let row, col;
            do {
                row = Math.floor(Math.random() * this.size);
                col = Math.floor(Math.random() * this.size);
            } while (this.theMineField[row][col].hasMine());
            
            this.theMineField[row][col].addMine();
        }        
    }

    // Checking if there is a mine on a cell
    isThereAMineAt(row,col){
        return this.theMineField[row][col].hasMine();
    }

    // Getting the adjacent mines of each cell and incrementing by one
    adjacentMines(){
        for(let x = 0; x < this.size; x++){
            for(let y = 0; y < this.size; y++){
                
                if(!this.theMineField[x][y].hasMine()) continue;

                for(let dx = -1; dx <= 1; dx++){
                    for(let dy = -1; dy <= 1; dy++){

                        let nx = x + dx;
                        let ny = y + dy;

                        if(nx < 0 || ny < 0 || nx >= this.size || ny >= this.size || (dx === 0 && dy === 0)) continue;

                        this.theMineField[nx][ny].addAdjacentMine();
                    }
                }
            }
        }
    }
}

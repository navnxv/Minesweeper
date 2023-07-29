// Copyright (C) 2022 Navpreet Singh
// This class handles the mine field and no UI
// Importing cell.js
import Cell from "./Cell.js";
const MAX_SIZE = 10;

export default class MineField{
    constructor(size = MAX_SIZE, count){

        // Initializing the class variables
        this.size = size;
        this.theMineField = [];
        this.count = count;
        
        // Calling class functions
        this.createMineField();
        this.placeMine();
        this.adjacentMines();
    }

    // Creating the mine field
    createMineField(){
        this.theMineField = [];
        
        // Making a 2 dimensional array to create a grid and contains an object from cell
        for(let i = 0; i< this.size; i++){
            this.theMineField[i] = [];
            for(let j = 0; j < this.size; j++){
                
                this.theMineField[i][j] = new Cell();
            }
        }
    }

    // Placing mines on random cells on the grid
    placeMine(){
        for(let i = 0; i < this.count; i++){
            
            let row = Math.floor(Math.random() * this.size);
            let col = Math.floor(Math.random() * this.size);
            
            // Checking if the cell already has a mine and adding the mine if it doesn't contain a mine
            if(!this.theMineField[row][col].hasMine()){
                this.theMineField[row][col].addMine();
            }

            else{
                i--;
            }
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
                
                if(this.theMineField[x][y].hasMine()){
                    for(let i = -1; i <= 1; i++){
                        if((x+i) < 0){
                            continue;
                        }

                        for(let j = -1; j <= 1; j++){
                            if((y+j) < 0){
                                continue;
                            }

                            if( i == 0 && j == 0){
                                continue; 
                            }
                            
                            else{
                                let rowToCheck = x+i;
                                let columnToCheck = y+j;
                                
                                if(rowToCheck <= 14 && columnToCheck <= 14){
                                    this.theMineField[rowToCheck][columnToCheck].addAdjacentMine();
                                }
                            }              
                        }
                    }
                }
            } 
        }
    }
}
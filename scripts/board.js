// Copyright (C) 2022 Navpreet Singh

// This file handles the UI part of Minesweeper
// Importing from MineField.js
import MineField from './MineField.js';
export default class Board{

    // Initializing the constructor 
    constructor(size = 15, count = 25){
        
        // Initializing the class variables
        this.size = size;
        this.count = count;
        this.board = document.querySelector("#game-board");
        this.flagCounter = this.count;
        this.mineField = new MineField(this.size, this.count);

        // Initializing the first click from the mouse to late use to check if the first click is a mine or now
        let clickCounter = 1; 

        // Calling the table initializing funciton
        this.init(); 
        
        // Adding event listener on the cancel button after the user win or lose the game
        document.getElementById("cancel-btn").addEventListener("click", event => {
            this.Cancel();
        });

        // Adding event listener to the okay button and running the okay() function
        document.getElementById("ok-btn").addEventListener("click", event => {
            this.Okay();
        });

        // Adding event listener to the reload smiley button to reload the grid
        document.getElementById("ResetButton").addEventListener("click", event => {
            location.reload();
        });

        // Printing number of mines/flags in the UI
        document.getElementById("totalFlags").innerHTML = this.count;

        // Adding event listener to the board
        this.board.addEventListener("click", event => { 
            let col = parseInt(event.target.dataset.column);
            let row = parseInt(event.target.dataset.row);

            // Getting the first click on the board
            if(clickCounter == 1){
                // Starting the timer
                this.startTimer();
                
                try{
                    if(this.mineField.theMineField[row][col].hasMine()){
                        this.mineField = new MineField(this.size, this.count);
                        this.init();
                        this.adjacentNumbers(row, col);
                        this.styleClickedCell(row,col);

                        if(this.mineField.theMineField[row][col].getAdj() == 0){
                            this.zeroAdjacentClicked(row, col);
                        }

                        return;
                    }
                }
                catch{}
                clickCounter ++;
            }

            try{
                // Checking if a cell has a flag                                   
                if(this.mineField.theMineField[row][col].hasFlag()){
                    return;
                }
                
                // Checking if there is a mine at the clicked cell
                if(this.mineField.isThereAMineAt(row,col)){
                    this.Lose();
                }
                else{
                    this.adjacentNumbers(row, col);
                    this.styleClickedCell(row,col);
                }
    
                // Checking if clicked cell has zero adjacent mines
                if(this.mineField.theMineField[row][col].getAdj() == 0){
                    this.zeroAdjacentClicked(row, col);
                }                   
            }
            catch{}
        });

        // Right clicking on the board will run this event listener
        this.board.addEventListener("contextmenu", event => {
            try{
                if(event != undefined){
                    event.preventDefault();
                    let col = parseInt(event.target.dataset.column);
                    let row = parseInt(event.target.dataset.row);

                    if(!this.mineField.theMineField[row][col].getReveal()){
                        this.flag(row, col);
                        this.Win();
                    }
                }
            }
            catch{}
        } );
    }
    
    // Making a function called init() that gets called everytime a Board is made in main.js creating a table within the for loops
    init(){
        document.getElementById("my-dlg").close();
        let markup = "<table>";
        let id = "";

        for (let i = 0; i < this.size; i++){
            markup += "<tr>";
            for (let j = 0; j < this.size; j++){
                id = `cell-${i}-${j}`;
                markup += `<td class="cell" data-row="${i}" data-column="${j}" id = "${id}"></td>`;
            }
            markup += "</tr>";
        }
        
        markup += "</table>";
        this.board.innerHTML = markup;        
    }   

    // Adding flag to a cell
    flag(row, col){       
        let flagUI = document.getElementById(`cell-${row}-${col}`);
        let mineCell = this.mineField.theMineField[row][col];

        // Checking if a cell already has a flag
        if(mineCell.hasFlag()){
            mineCell.removeFlag();
            flagUI.innerHTML = "";
            this.flagCounter++;
            this.updateFlagsUi();
        }
    
        // Comparing the flag counter and the mines
        else{
            if(this.flagCounter > 0 ){
                this.flagCounter--;
                mineCell.addFlag();
                flagUI.innerHTML = "🚩";    
                this.updateFlagsUi();
            }
        }
    }
    
    
    // Displaying all cells when the player wins or loses
    bombs(){
        for(let i =0; i<=14;i++){
            for (let j = 0; j < this.size; j++){

                if(this.mineField.theMineField[i][j].getAdj() > 0){
                    document.getElementById(`cell-${i}-${j}`).innerHTML = this.mineField.theMineField[i][j].getAdj();
                }

                if(this.mineField.theMineField[i][j].hasMine()){
                    document.getElementById(`cell-${i}-${j}`).innerHTML = "	&#128128;";
                }
            }
        }
    }

    // Getting adjacent numbers of mines
    adjacentNumbers(row, col){
        if(this.mineField.theMineField[row][col].getAdj() > 0){
            document.getElementById(`cell-${row}-${col}`).innerHTML = this.mineField.theMineField[row][col].getAdj();
        }
    }

    // Styling the clicked cell 
    styleClickedCell(row, col){
        this.mineField.theMineField[row][col].setReveal();
        let clicked = document.querySelector(`#cell-${row}-${col}`);
        clicked.classList.add("clicked");
        
        if(this.mineField.theMineField[row][col].hasFlag()){
            clicked.innerHTML = "";
        }
        this.Win();
    }

    // This function checks the neighbouring cells if they are empty and using recursion to get every cell until they get to a number
    zeroAdjacentClicked(row, col){
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){

                let rowToCheck = row+i;
                let columnToCheck = col+j;
                
                // Checking if variables are in the bounds
                if((row+i) < 0 || (col+j) < 0 || rowToCheck > 14 || columnToCheck > 14){
                    continue;
                }

                // Excluding the middle cell to be checked
                else if(i == 0 && j == 0 ){
                    continue;
                }
                
                // Checking if a cell has already been checked
                if(this.mineField.theMineField[rowToCheck][columnToCheck].getChecked()){
                    continue;    
                }

                // Setting the checked variable to true of the current cell
                this.mineField.theMineField[rowToCheck][columnToCheck].setChecked();
                
                // Checking it the adjacent cells are more than 0
                if(this.mineField.theMineField[rowToCheck][columnToCheck].getAdj() > 0){
                    this.styleClickedCell(rowToCheck, columnToCheck);
                    this.adjacentNumbers(rowToCheck, columnToCheck);
                }
                else{
                    // console.log(rowToCheck+","+columnToCheck);
                    this.styleClickedCell(rowToCheck, columnToCheck);
                    this.adjacentNumbers(rowToCheck, columnToCheck);
                    this.zeroAdjacentClicked(rowToCheck,columnToCheck);
                }
            }
        }
        
    }

    // This function gets called everytime the cell is clicked and checks if the player won the game
    Win(){
        let counter = 0;
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++){

                if(this.mineField.theMineField[i][j].getReveal() == false){
                    counter++;
                }
            }
        }

        // Counting and comparing it to the number of mines
        if(counter == this.count){
            this.stopTimer();
            document.getElementById("lose").style.display = "block";
            document.getElementById("lose").style.backgroundColor = "green";
            document.getElementById("my-dlg").show();        
            document.getElementById("dlg-msg").innerHTML = "You Win! Play again?";
        }
    }  

    // This function stops the timer, display the bombs and dialogue box if the player clicks on a mine
    Lose(){
        this.bombs();
        this.stopTimer();
        document.getElementById("lose").style.display = "block";
        document.getElementById("my-dlg").show();
        document.getElementById("dlg-msg").innerHTML = "You Lose! Play again?";
    }

    // This function makes the game area unplayable
    Cancel(){
        document.getElementById("lose").style.display = "none";
        document.getElementById("my-dlg").close();
        this.bombs();
        document.getElementById("CancelPlay").style.display = "block";
    }

    // This function reloads the game if the player chooses to play again
    Okay(){
        location.reload();
    }

    // This function starts the timer on backend
    startTimer(){
        document.getElementById("timer").innerHTML;
        let tiktok = 0;
        this.timer = window.setInterval(time =>{
            tiktok++;
            document.getElementById("timer").innerHTML = tiktok;
        }, 1000);
    }

    // Stopping timer on Win or Lose
    stopTimer(){
        window.clearInterval(this.timer);
    }

    // Updating timer on UI
    updateFlagsUi(){
        document.getElementById("totalFlags").innerHTML = this.flagCounter;
    }
}

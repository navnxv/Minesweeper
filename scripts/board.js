// Copyright (C) 2022 Navpreet Singh
// Making class app to make the game app

import MineField from './MineField.js';


export default class Board{
    constructor(size = 15, count = 25){
        this.size = size;
        this.count = count;
        this.board = document.querySelector("#game-board");
        this.init(); 
        this.mineField = new MineField(this.size, this.count);
        let clickCounter = 1;
        this.flagCounter = this.count;
        

        document.getElementById("cancel-btn").addEventListener("click", event => {
            this.Cancel();
        });
        document.getElementById("ok-btn").addEventListener("click", event => {
            this.Okay();
        });

        document.getElementById("ResetButton").addEventListener("click", event => {
            location.reload();
        });

        document.getElementById("totalFlags").innerHTML = this.count;

        this.board.addEventListener("click", event => { 
            let col = parseInt(event.target.dataset.column);
            let row = parseInt(event.target.dataset.row);
            if(clickCounter == 1){
                this.startTimer();
                try{
                    if(this.mineField.theMineField[row][col].hasMine()){
                        console.log("creating new");
                        this.mineField = new MineField(this.size, this.count);
                        this.init();
                        
                        return;
                    }
                }
                catch{}
                clickCounter ++;
            }
                       
            try{               
                if(this.mineField.theMineField[row][col].hasFlag()){
                    return;
                }
                
                if(this.mineField.isThereAMineAt(row,col)){
                    this.Lose();
                }
    
                else{
                    this.adjacentNumbers(row, col);
                    this.styleClickedCell(row,col);
                }
    
                if(this.mineField.theMineField[row][col].hasMine()){
                    return;
                }
                else if(this.mineField.theMineField[row][col].getAdj() == 0){
                    this.zeroAdjacentClicked(row, col);
                    
                }
                
            }
            catch{}            
            
        });

        this.board.addEventListener("contextmenu", event => {
            try{
                if(event != undefined){
                    event.preventDefault();
                    let col = parseInt(event.target.dataset.column);
                    let row = parseInt(event.target.dataset.row);

                    if(!this.mineField.theMineField[row][col].getReveal()){
                        this.flag(event,row, col);
                        this.Win();
                    }
                }
            }
            catch{}
        
        } );
    }
    

    

// Making a function called init() that gets called everytime an app() is made and creating a table within the for loops
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


    flag(event, row, col){   
            
        let flagUI = document.getElementById(`cell-${row}-${col}`);
        let mineCell = this.mineField.theMineField[row][col];
        if(mineCell.hasFlag()){
            mineCell.removeFlag();
            flagUI.innerHTML = "";
            this.flagCounter++;
            this.updateFlagsUi();
        }
    
        else{
            if(this.flagCounter > 0 ){
                this.flagCounter--;
                mineCell.addFlag();
                flagUI.innerHTML = "🚩";    
                this.updateFlagsUi();
            }
        }
    }
    
    

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

    adjacentNumbers(row, col){
        if(this.mineField.theMineField[row][col].getAdj() > 0){
            document.getElementById(`cell-${row}-${col}`).innerHTML = this.mineField.theMineField[row][col].getAdj();
        }
    }

    styleClickedCell(row, col){
        try{
            this.mineField.theMineField[row][col].setReveal();
            let clicked = document.querySelector(`#cell-${row}-${col}`);
            clicked.classList.add("clicked");
            
            if(this.mineField.theMineField[row][col].hasFlag()){
                clicked.innerHTML = "";
            }
            this.Win();
        }
        catch{
            return;
        }
    }

    zeroAdjacentClicked(row, col){
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                let hix = row+i;
                let why = col+j;
                
                if((row+i) < 0 || (col+j) < 0 || hix > 14 || why > 14){
                    continue;
                }

                else if(i == 0 && j == 0 ){
                    continue;
                }
                
                if(this.mineField.theMineField[hix][why].getChecked()){
                    continue;    
                }

                this.mineField.theMineField[hix][why].setChecked();

                if(this.mineField.theMineField[hix][why].getAdj() > 0){
                    this.styleClickedCell(hix, why);
                    this.adjacentNumbers(hix, why);
                }
                else{
                    // console.log(hix+","+why);
                    this.styleClickedCell(hix, why);
                    this.adjacentNumbers(hix, why);
                    this.zeroAdjacentClicked(hix,why);
                }
            }
        }
        
    }

    Win(){
        let counter = 0;
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++){
                if(this.mineField.theMineField[i][j].getReveal() == false){
                    counter++;
                }
            }

        }
        // console.log(counter);
        if(counter == this.count){
            document.getElementById("lose").style.display = "block";
            document.getElementById("lose").style.backgroundColor = "green";
            document.getElementById("my-dlg").show();        
            document.getElementById("dlg-msg").innerHTML = "You Win! Play again?";
        }
    }  

    Lose(){
        this.bombs();
        this.stopTimer();
        document.getElementById("lose").style.display = "block";
        document.getElementById("my-dlg").show();
        document.getElementById("dlg-msg").innerHTML = "You Lose! Play again?";
    }

    Cancel(){
        document.getElementById("lose").style.display = "none";
        document.getElementById("my-dlg").close();
        this.bombs();
        document.getElementById("CancelPlay").style.display = "block";
    }

    Okay(){
        location.reload();
    }

    click(){
       
    }

    startTimer(){
        document.getElementById("timer").innerHTML;
        let tiktok = 0;
        this.timer = window.setInterval(time =>{
            tiktok++;
            document.getElementById("timer").innerHTML = tiktok;
        }, 1000);
    }

    stopTimer(){
        window.clearInterval(this.timer);
    }

    updateFlagsUi(){
        document.getElementById("totalFlags").innerHTML = this.flagCounter;
    }
}
    


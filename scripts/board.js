// Copyright (C) 2022 Navpreet Singh
// Making class app to make the game app

import Flag from './Flag.js'
import MineField from './MineField.js';

let flag ;
let i = 0;

export default class Board{
    constructor(size = 15){
        this.size = size;
        this.board = document.querySelector("#game-board");
        this.init(); 

        

        // this.board.addEventListener("click", event => {

        //     // let col = parseInt(event.target.id.dataset.column);
        //     // let row = parseInt(event.target.id.dataset.row);
            

        //     if(mineField.isThereAMineAt(row,col)){
        //         alert("Boom");
        //     }
        // });
        




    }
    

    

// Making a function called init() that gets called everytime an app() is made and creating a table within the for loops
    init(){
        let markup = "<table>";
        let k = 1;
        let id = "";
        for (let i = 1; i <= this.size; i++){
            markup += "<tr>";
            for (let j = 1; j <= this.size; j++){
                id = `cell-${i}-${j}`;
                markup += `<td class="cell" data-row="${i}" data-column="${j}" id = "${id}" ></td>`;
            }
            markup += "</tr>";
        }
        markup += "</table>";
        this.board.innerHTML = markup;
    }   
    
    flag(event){
        event.preventDefault();
        let row = parseInt(event.target.dataset.row);
        let column = parseInt(event.target.dataset.col);
        flag = new Flag(row, column);
        console.log(row);

        // this.getParent(event.target.id);
        
    
        let selectedCell = document.getElementById(`cell-${row}-${column}`);
        


        if(this.getParent(event.target) == ""){
            if(!flag.hasFlag(row, column)){
                flag.addFlag(row,column);
                //console.log(flag.hasFlag());
                selectedCell.innerHTML = "<img src = './Images/flag.png' alt = 'f' class = 'SmileyImage flag'>";
            }
        }
        else if(flag.hasFlag(row,column)){
            
                flag.removeFlag(row,column);
                console.log("DSfsfsfsc");
                console.log(this.getParent(event.target));
                console.log(selectedCell.parentElement);
                selectedCell.parentElement.innerHTML = "   ";
            
        }


        

        

        
        
        
        

    }

    getParent(targetId){
        return targetId.parentElement.id;
    }
    placeAFlag(x,y){
        
    }






    placeMine(){
        


    }
}
//     flag(event){
//         let row = parseInt(event.target.dataset.row);
//         console.log(row);
//     }
// }

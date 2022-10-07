// Copyright (C) 2022 Navpreet Singh
// Making class app to make the game app
let i = 0;
let gameBoard = document.getElementById("game-board");
export default class Board{
    constructor(size = 15){
        this.size = size;
        this.board = document.querySelector("#game-board");
        
  

        // for(let i = 0; i < size; i++){
        //     for(let j = 0; j < size; j++){
        //         console.log(document.getElementById("game-board").rows[i].cells[j].innerHTML);
        //     }
        //     console.log("===");
        // }
        

        // let getFlagClick = document.querySelectorAll(".cell")
        //                     .forEach(el => el.addEventListener('click', event =>
        //                     document.getElementById("game-board").rows[i].cells[j].innerHTML));
        // console.log(getFlagClick);

        document.querySelectorAll("table").forEach(event => event.addEventListener("contextmenu", event=>
            this.flag(event)));
        
        
        
        // All("table").forEach(e1 => e1.addEventListener
        //     ("contextmenu", event => event.preventDefault()));


    }
    

    

// Making a function called init() that gets called everytime an app() is made and creating a table within the for loops
    init(){
        let markup = "<table>";
        let k = 1;
        for (let i = 1; i <= this.size; i++){
            markup += "<tr>";
            for (let j = 1; j <= this.size; j++){
                markup += `<td class="cell" id = "key${k++}" ></td>`;
            }
            markup += "</tr>";
        }

        markup += "</table>";
        this.board.innerHTML = markup;

        let row = Math.floor(Math.random() * 15) + 1;
        let column = Math.floor(Math.random() * 15) + 1;

        console.log(row);
        console.log(column);




    }

    flag( event ){
        event.preventDefault();
        let getId = event.target.id;
        let flagParent = document.getElementById(getId).parentElement;
 
        //console.log(getId);

        let hey = document.getElementById(getId);
        let hi = document.getElementsByClassName("flag");
        //console.log(document.getElementById("flag"));
        let mm=document.getElementById(getId).parentElement;
        //console.log(mm);
        //  hi = "<img src = './Images/flag.png' alt = 'f' class = 'SmileyImage flag'>";
        for(let k = 0; k <= 24; k++){
            if(getId === "flag"+k){
                //if(mm.innerText === "<img src='./Images/flag.png' alt='f' class='SmileyImage flag' id='flag" + k + "'>" ){
                    
                    flagParent.innerHTML = " ";
                    i--;
                    console.log(i);
                    if(i < 0){
                        i=0;
                    }

                //}
            }
        }
        //console.log(getId);
        
        for(let k = 0; k < 15*15; k++){
            if(getId == "key"+k) {
                if(getId == "game-board"){
                    console.log("Game-board clicked");        
                }
                //else if(getId.innerText ===  "<img src = './Images/flag.png' alt = 'f' class = 'SmileyImage flag' id = 'flag"+k+"'>"){
                  //  console.log("Already exists");
                //}
                else {
                    if(i >=0 && i<=24){
                        console.log(document.getElementById(getId));
                        document.getElementById(getId).innerHTML = "<img src = './Images/flag.png' alt = 'f' class = 'SmileyImage flag' id = 'flag"+i+"'>";
                        i++;
                        console.log(i);
                    }
                    else{
                        console.log("enough");
                    }
                }
            }
        } 
        
    }

    
}

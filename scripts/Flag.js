


export default class Flag{
    constructor(id){
        this.flag = false;
        this.placed = false;
    }


    hasFlag(x,y){
        this.placed = true;
        return this.flag;
    }


    removeFlag(x,y){
        this.flag = false;
    }

    
    addFlag(x,y){
        this.flag = true;
    }

    placeFlag(x,y){
        
    }


}


// flag( event ){
//     event.preventDefault();
//     let getId = event.target.id;
//     let flagParent = document.getElementById(getId).parentElement;

//     //console.log(getId);

//     let hey = document.getElementById(getId);
//     let hi = document.getElementsByClassName("flag");
//     //console.log(document.getElementById("flag"));
//     let mm=document.getElementById(getId).parentElement;
//     //console.log(mm);
//     //  hi = "<img src = './Images/flag.png' alt = 'f' class = 'SmileyImage flag'>";
//     for(let k = 0; k <= 24; k++){
//         if(getId === "flag"+k){
//             //if(mm.innerText === "<img src='./Images/flag.png' alt='f' class='SmileyImage flag' id='flag" + k + "'>" ){
                
//                 flagParent.innerHTML = " ";
//                 i--;
//                 console.log(i);
//                 if(i < 0){
//                     i=0;
//                 }

//             //}
//         }
//     }
//     //console.log(getId);
    
//     for(let k = 0; k < 15*15; k++){
//         if(getId == "key"+k) {
//             if(getId == "game-board"){
//                 console.log("Game-board clicked");        
//             }
//             //else if(getId.innerText ===  "<img src = './Images/flag.png' alt = 'f' class = 'SmileyImage flag' id = 'flag"+k+"'>"){
//               //  console.log("Already exists");
//             //}
//             else {
//                 if(i >=0 && i<=24){
//                     console.log(document.getElementById(getId));
//                     document.getElementById(getId).innerHTML = "<img src = './Images/flag.png' alt = 'f' class = 'SmileyImage flag' id = 'flag"+i+"'>";
//                     i++;
//                     console.log(i);
//                 }
//                 else{
//                     console.log("enough");
//                 }
//             }
//         }
//     } 
    
// }
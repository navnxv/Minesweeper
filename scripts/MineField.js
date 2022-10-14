
import Cell from "./Cell.js";
const MAX_SIZE = 10;


export default class MineField{
    constructor(size = MAX_SIZE, count){
        this.size = size;
        this.theMineField = [];
        this.count = count;
        
        this.createMineField();
        this.placeMine();
        this.adjacentMines();
    }

    createMineField(){
        this.theMineField = [];
        
        for(let i = 0; i< this.size; i++){
            this.theMineField[i] = [];
            for(let j = 0; j < this.size; j++){
                
                this.theMineField[i][j] = new Cell();
            }
        }
    }

    placeMine(){
        for(let i = 0; i < this.count; i++){
            
            let row = Math.floor(Math.random() * this.size);
            let col = Math.floor(Math.random() * this.size);

            
            if(!this.theMineField[row][col].hasMine()){
                
                this.theMineField[row][col].addMine();
            }

            else{
                
                i--;
            }
        }
        
    }

    isThereAMineAt(row,col){
        try{
            return this.theMineField[row][col].hasMine();
        }
        catch{
            return;
        }
    }

    adjacentMines(){
        
        for(let x = 0; x < this.size; x++){
            for(let y = 0; y < this.size; y++){
                
                if(this.theMineField[x][y].hasMine()){
                    
                    for(let i = -1; i <= 1; i++){
                        if((x+i) < 0){
                            //console.log(x);
                            continue;
                        }

                        for(let j = -1; j <= 1; j++){
                            
                            if((y+j) < 0){
                                //console.log(y);
                                continue;
                            }
                            if( i == 0 && j == 0){
                                continue; 
                            }
                            
                            else{
                                let hix = x+i;
                                let why = y+j;
                                
                                if(hix <= 14 && why <= 14){
                                    
                                    
                                    this.theMineField[hix][why].addAdjacentMine();
                                    
                                }
                                
                            }              
            
            
                        }
                    }
                }
            }
            
        }
        console.log(this.theMineField);


    }

    
}
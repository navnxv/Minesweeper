import Mine from "./Mine.js";
import Cell from "./Cell.js";
const MAX_SIZE = 10;


export default class MineField{
    constructor(size = MAX_SIZE, count){
        this.size = size;
        this.theMineField = [];
        let row,col;
        this.count = count
        this.mine = new Mine();

        this.createMineField();
    }



    createMineField(){
        this.theMineField = [];

        for(let i = 0; i< this.size; i++){
            this.theMineField[i] = [];
            for(let j = 0; j < this.size; j++){
                this.theMineField[i][j] = new Cell();
                this.theMineField[i][j].mine = false;
            }
        }

        this.placeMine();
        console.log(this.theMineField);
    }

    placeMine(){
        let k=0;
        for(let i = 0; i < this.count; i++){
            
            let row =  Math.floor(Math.random() * this.size);
            let col = Math.floor(Math.random() * this.size);
            
            if(!this.theMineField[row][col].hasMine()){
                this.theMineField[row][col].addMine();
            }

            else{
                console.log("Mine Already Exists");
                i--;
            }
        }
    }

    isThereAMineAt(row,col){
        return this.mine.hasMine();
    }
}
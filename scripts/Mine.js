

export default class Mine{
    constructor(){
        this.exploded = false;
        this.adjacentMines = 0;
        this.mine = false;

    }

    addMine(){
        this.mine = true;

    }
    hasMine(){
        return this.mine;
    }


}
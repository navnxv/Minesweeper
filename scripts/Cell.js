

export default class Cell{
    constructor(){
        this.exploded = false;
        this.mine = null;
        this.adjacentMines = 0;
    }

    addMine(){
        this.mine = true;
    }

    removeMine(){
        this.mine = false;
    }

    hasMine(){
        return this.mine;
    }


}
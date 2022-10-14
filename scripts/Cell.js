

export default class Cell{
    constructor(){
        this.mine = false;
        this.flag = false;
        this.adjacent = 0;
        this.reveal = false;
        this.checked = false;
    }

    removeMine(){
        this.mine = false;
    }

    getChecked(){
        return this.checked;
    }

    setChecked(){
        this.checked = true;
    }

    addMine(){
        this.mine = true;
    }

    setReveal(){
        this.reveal = true;
    }

    getReveal(){
        return this.reveal;
    }
    
    hasMine(){
        return this.mine;
    }

    hasFlag(){
        return this.flag;
    }
    
    addFlag(){
        this.flag = true;
    }

    removeFlag(){
        this.flag = false;
    }

    addAdjacentMine(){
        this.adjacent += 1;
    }

    getAdj(){
        return this.adjacent;
    }


}
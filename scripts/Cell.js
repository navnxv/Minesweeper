// Copyright (C) 2022 Navpreet Singh

export default class Cell{
    constructor(){

        // Inititalizing the constructor
        this.mine = false;
        this.flag = false;
        this.adjacent = 0;
        this.reveal = false;
        this.checked = false;
    }

    // Removing mine (for debugging)
    removeMine(){
        this.mine = false;
    }

    // Getting checked cid they are checked
    getChecked(){
        return this.checked;
    }

    // Setting the checked to true for the cells that have been already checked
    setChecked(){
        this.checked = true;
    }

    // Adding mine
    addMine(){
        this.mine = true;
    }

    // Setting reveal to true if user clicks on it
    setReveal(){
        this.reveal = true;
    }

    // Revealing the cell
    getReveal(){
        return this.reveal;
    }
    
    // Checking if a cell has mine
    hasMine(){
        return this.mine;
    }

    // Checking if a cell has a flag
    hasFlag(){
        return this.flag;
    }
    
    // Adding Flag
    addFlag(){
        this.flag = true;
    }

    // Removing flag
    removeFlag(){
        this.flag = false;
    }

    // Adding mines to adjacent cells
    addAdjacentMine(){
        this.adjacent += 1;
    }

    // Getting adjacent mines
    getAdj(){
        return this.adjacent;
    }
}
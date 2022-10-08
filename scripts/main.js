// Copyright (C) 2022 Navpreet Singh

import Board from './board.js'
import MineField from './MineField.js';

const size = 15;

document.addEventListener('DOMContentLoaded', main);

function main( event ) {    
    this.board = new Board(size);
    this.mineField = new MineField(size, 25);

    // document.querySelectorAll("table").forEach(e1 => e1.addEventListener
    //         ('contextmenu', event => event.preventDefault()));

    
}

    
    


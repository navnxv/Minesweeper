// Copyright (C) 2022 Navpreet Singh

import Board from './board.js'

document.addEventListener('DOMContentLoaded', main);

function main( event ) {    
    const game = new Board(15);
    
    game.init();

    // document.querySelectorAll("table").forEach(e1 => e1.addEventListener
    //         ('contextmenu', event => event.preventDefault()));

    
}

    
    


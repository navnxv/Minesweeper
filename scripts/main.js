// Copyright (C) 2022 Navpreet Singh

import Board from './board.js'

const size = 15;
const count = 25;
document.addEventListener('DOMContentLoaded', main);

function main() {    
    
    this.board = new Board(size,count);
}


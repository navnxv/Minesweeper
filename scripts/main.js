// Copyright (C) 2022 Navpreet Singh
// This file is connecrted to the html
import Board from './Board.js'

const size = 15;
const count = 30;
document.addEventListener('DOMContentLoaded', main);

function main() {    
    // Creating Board
    this.board = new Board(size,count);
}


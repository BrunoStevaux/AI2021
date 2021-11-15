const fs = require('fs');

let ones = [];
let twos = [];
let threes = [];
let fours = [];
let fives = [];
let sixes = [];
let sevens = [];
let eights = [];
let nines = [];
let tens = [];

function preload(){
    
}

const files = fs.readdirSync(`./mnist_png/training/9`);

for(const file of files){
    console.log(file);
}
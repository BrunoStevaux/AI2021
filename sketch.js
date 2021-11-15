const fs = require('fs');
let numbers = [9];

function preload(){
    let files = [9];
    for(i = 0; i < 10; i++)
    {
        files[i] = fs.readdirSync(`./training_data/${i}`);
        for(const file of files[i]){
            // Load the file here
            // numbers[i] = loadImage
        }
    }    
}

files.forEach(file => console.log(file.length));
console.log(files[0][5000]);
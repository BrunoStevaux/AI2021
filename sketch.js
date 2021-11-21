let numbers = [9];
let images = [9];

function preload() {
    let files = [9];
    for(i = 0; i < 10; i++) {
        files[i] = fs.readdirSync(`./training_data/${i}`);
        images[i] = [files[i].length];
        for(j = 0; j < files[i].length; j++) {
            // Load the file here
            // numbers[i] = loadImage
            images[i][j] = loadImage(file);
        }
    }
}

let classifier;

function setup() {
    let options = {
        inputs: [28, 28, 4],
        task: 'imageClassification',
        debug: true,
    };
    classifier = ml5.neuralNetwork(options);

    for (let i = 0; i < images.length; i++) {
        for (let j = 0; j < images[i].length; j++) {
            classifier.addData({ image: images[i][j] }, { label: `${i}` });
        }
    }
    classifier.normalizeData();
    classifier.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
    console.log('Finished training');
    classifier.save();
}
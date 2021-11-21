let images = [9];

const counts = [5923, 6742, 5957, 6131, 5842, 5421, 5918, 6265, 5851, 5948];

function preload() {
    for (i = 0; i < 10; i++) {
        images[i] = [];
        // The upper bound on j must change to load more data from each digit
        for (j = 0; j < 10; j++) {
            images[i][j] = loadImage(`./training_data/${i}-${j}.png`);
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
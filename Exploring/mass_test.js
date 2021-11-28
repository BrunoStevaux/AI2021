let classifier;
let images = [9];

const countPerImage = 100;

function setup() {
    // Load testing data
    console.log('Loading test data');
    for (i = 0; i < 10; i++) {
        images[i] = [];
        for (let j = 0; j < countPerImage; j++) {
            images[i][j] = loadImage(`./testing_data/${i}-${j}.png`);
        }
        console.log(`Loaded ${i} images`);
    }

    // Load the model
    console.log('Loading model');
    let options = {
        inputs: [28, 28, 4],
        task: 'imageClassification',
    };
    classifier = ml5.neuralNetwork(options);
    const modelDetails = {
        model: 'trained_model/model.json',
        metadata: 'trained_model/model_meta.json',
        weights: 'trained_model/model.weights.bin',
    };
    classifier.load(modelDetails, modelLoaded);
}

let successes = [0.0, 0.0, 0.0, 0.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 0.0];

function modelLoaded() {
    console.log('Model ready for testing');

    for (let j = 0; j < countPerImage; j++) {
        for (let i = 0; i < 10; i++) {
            classifier.classify({ image: images[i][j] },
                function results(err, results) {
                    if (err) {
                        console.log('Error');
                        return;
                    }
                    let label = results[0].label;
                    if (parseInt(label) == i) {
                        successes[i] += 1.0;
                    }
                    if (i == 9 && j == countPerImage - 1) {
                        finishedTesting();
                    }
                }
            );
        }
    }
}

function finishedTesting() {
    console.log('Finished testing, results:');
    let s = 0.0;
    for (let i = 0; i < 10; i++) {
        let successRate = successes[i] / countPerImage;
        console.log(`Success rate ${i}: ${successRate}`);
        s += successRate;
    }
    let avg = s / 10.0;
    console.log(`Average success rate ${avg}`);
}
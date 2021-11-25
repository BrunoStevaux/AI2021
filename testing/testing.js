let classifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;

function setup() {
    // Create canvas
    canvas = createCanvas(400, 400);
    stroke(255);

    // Initialize model to load into
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

    // Create buttons
    background(0);
    clearButton = createButton('clear');
    clearButton.mousePressed(function() {
        background(0);
    });
    resultsDiv = createDiv('loading model');
    inputImage = createGraphics(28, 28);

    // Load the model
    classifier.load(modelDetails, modelLoaded);
}

function modelLoaded() {
    console.log('model ready!');
    classifyImage();
}

function classifyImage() {
    // Attempt to classify an image
    inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 28, 28);
    image(inputImage, 0, 0);
    classifier.classify({ image: inputImage }, gotResults);
}

function gotResults(err, results) {
    if (err) {
        console.error(err);
        return;
    }

    let label = results[0].label;
    let confidence = nf(100 * results[0].confidence, 2, 0);

    resultsDiv.html(`${label} ${confidence}%`);

    classifyImage();
}

function draw() {
    if (mouseIsPressed) {
        strokeWeight(40);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

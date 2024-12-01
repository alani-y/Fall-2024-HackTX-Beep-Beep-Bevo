let canvas;
let hiddenCanvas;
let capture; // when getting the color from the map, this program will first
// capture a picture of the map's current view and put it onto hiddenCanvas

const mapCanvas = map.getViewPort().element.getElementsByTagName('canvas')[0];

function setup() {
    canvas = createCanvas(1000, 800)
    canvas.position(0, 0)

    // Allows the cursor to interact with the map underneath this canvas
    canvas.style('pointer-events', 'none')
    // Only draws the pixelated overlay once
    noLoop();

    // creates an invisible canvas
    captureCanvas = document.createElement('canvas');
    captureCanvas.width = windowWidth;
    captureCanvas.height = windowHeight;
    capture = captureCanvas.getContext('2d');
}

function draw() {
    clear();

    capture.drawImage(mapCanvas, 0, 0, windowWidth, windowHeight);
    let imageData = capture.getImageData(0, 0, windowWidth, windowHeight);

    pixel_size = 10;

    console.log(mapCanvas.width, mapCanvas.height); // Should show non-zero values
    console.log(capture); // Ensure ctx is not null

    capture.fillStyle = 'blue';
    capture.fillRect(50, 50, 200, 200); // Should display a blue rectangle

    // loops once for each pixel across the y axis
    for(let y = 0; y < height; y+=pixel_size){
        // loops once for each pixel across the x axis
        for(let x = 0; x < width; x +=pixel_size){

            // index of the pixel in the imageData array
            let index = (y * imageData.width + x) * 4;

            let r = imageData.data[index];     // Red value
            let g = imageData.data[index + 1]; // Green value
            let b = imageData.data[index + 2]; // Blue value

            fill(r, g, b)
            noStroke();
            rect(x, y, pixel_size, pixel_size)
        }
    }

    // makes a static image of the map's current window
    /*map.capture(function(canvas){
        capture.drawImage(canvas, 0, 0, windowWidth, windowHeight);
        // creates an array of pixel color data
        let imageData = capture.getImageData(0, 0, windowWidth, windowHeight);

        // loops once for each pixel across the y axis
        for(let y = 0; y < height; y+=pixel_size){
            // loops once for each pixel across the x axis
            for(let x = 0; x < width; x +=pixel_size){

                // index of the pixel in the imageData array
                let index = (y * imageData.width + x) * 4;

                let r = imageData.data[index];     // Red value
                let g = imageData.data[index + 1]; // Green value
                let b = imageData.data[index + 2]; // Blue value

                fill(r, g, b)
                noStroke();
                rect(x, y, pixel_size, pixel_size)
            }
        }

    // H.Map.Capture.Static ensures that the image is static
    });//, [H.Map.Capture.Static]);*/
}

// redraws the pixelated map when the window changes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    draw();
}

// After changing the window view, it re-draws the canvas when the map stops moving
map.addEventListener('mapviewchangeend', () => {
    draw();
});
var global_map = map;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    canvas.position(0, 0)

    // Allows the cursor to interact with the map underneath this canvas
    canvas.style('pointer-events', 'none')
}

function draw(){
    // the button to calculate the distance between the Texas Union and a marker
    fill(100, 100, 100)
    rect(10, 10, 100, 100)
}

function mouseClicked(){
    noFill()
    if (mouseX >= 10 && mouseX <= 110 && mouseY >= 10 && mouseY <= 110 && all_markers.length > 1){

        console.log("Map: ", global_map)
        var union_pin = all_markers[0].getGeometry();
        var union_spot = global_map.geoToScreen(union_pin);

        var destination_pin = all_markers[all_markers.length-1].getGeometry();
        var destination_spot = global_map.geoToScreen(destination_pin)

        //alert(`Union Spot: ${union_spot.x}, ${union_spot.y} \nDestination Spot: ${destination_spot.x}, ${destination_spot.y}`);

        strokeWeight(10)
        line(union_spot.x, union_spot.y, destination_spot.x, destination_spot.y)
    }
}

map.addEventListener("mapviewchangeend", function(evt){
    clear();
});

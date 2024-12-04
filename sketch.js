// gets the map as a global variable
var global_map = map;
var connect_button;

class button{
    constructor(x, y, width, height, color, text){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.text = text;
    }

    draw(){
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.width, this.height)
        fill(0)
        textAlign(CENTER, CENTER)
        text(this.text, this.x + this.width/2, this.y + this.height/2)
    }
}


function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    canvas.position(0, 0)
    // Allows the cursor to interact with the map underneath this canvas
    connect_button = new button(20, 20, 70, 35, '#f95137',"Connect")
    canvas.style('pointer-events', 'none')
}

function draw(){
    // the button to visualize a connection between the Texas Union and a marker
    connect_button.draw()
}

function mouseClicked(){

    if (mouseX >= 20 && mouseX <= 120
        && mouseY >= 20 && mouseY <= 120
         && all_markers.length > 1){

        console.log("Map: ", global_map)
        var union_pin = all_markers[0].getGeometry();
        var union_spot = global_map.geoToScreen(union_pin);

        var destination_pin = all_markers[all_markers.length-1].getGeometry();
        var destination_spot = global_map.geoToScreen(destination_pin)

        //alert(`Union Spot: ${union_spot.x}, ${union_spot.y} \nDestination Spot: ${destination_spot.x}, ${destination_spot.y}`);

        stroke('#f95137')
        strokeWeight(10)
        line(union_spot.x, union_spot.y, destination_spot.x, destination_spot.y)
        noStroke()
    }
}

map.addEventListener("mapviewchangeend", function(evt){
    clear();
});

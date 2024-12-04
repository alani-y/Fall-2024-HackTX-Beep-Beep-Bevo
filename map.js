// https://www.here.com/learn/blog/here-traffic-api-raster-web-app-leaflet-js

var platform = new H.service.Platform({
    apikey: '4-HrAJRi3cT2dueFnfYFpn5fUhS_Tpi-4QW9F3I7fvw'
});

// coordinates of the Texas Union
const coords = [30.284336, -97.734588]

// sets the coordinates of the area of traffic data around UT
const trafficCoords1 = [30.263651, -97.810482]
const trafficCoords2 = [30.335960, -97.666177]

// creates the basis for the map layers
var defaultLayers = platform.createDefaultLayers();

// creates the base map layer in the html element called 'map'
var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
    center: {lat: coords[0], lng: coords[1]},
    zoom: 15,
    pixelRatio: window.devicePixelRatio || 1
});

// adds the traffic data layer to the map
map.addLayer(defaultLayers.vector.traffic.map)

// makes the window responsive to resizing
window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// creates a marker at the Texas Union
// Marker icon: https://icons.getbootstrap.com/
var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg>`

var all_markers = [];

var icon = new H.map.Icon(svg, { size: { w: 34, h: 34 } })

// adds a marker at the Texas Union
var marker = new H.map.Marker({ lat: 30.286549600870256, lng: -97.74117423316017 }, { icon: icon });
// stores all the markers
map.addObject(marker)
all_markers.push(marker)


// adds a pin where at where the mouse is clicked
function addMarkerPin(map){
    map.addEventListener("longpress", function (evt) {

        var pin_coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
        var new_marker = new H.map.Marker({ lat: pin_coord.lat, lng: pin_coord.lng }, { icon: icon });

        // adds an event listener to delete the pin if the cursor taps over it
        new_marker.addEventListener("tap", function(){
            map.removeObject(new_marker);
        })

        map.addObject(new_marker)
        all_markers.push(new_marker)

    });
}

addMarkerPin(map);


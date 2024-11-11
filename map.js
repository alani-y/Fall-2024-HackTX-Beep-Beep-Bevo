// https://www.here.com/learn/blog/here-traffic-api-raster-web-app-leaflet-js

var platform = new H.service.Platform({
    apikey: '4-HrAJRi3cT2dueFnfYFpn5fUhS_Tpi-4QW9F3I7fvw'
});


// seattle 47.606209, -122.332069
//const style = 'lite.night' // new york 40.748441, -73.985664
const coords = [30.284336, -97.734588] // UT 30.284336, -97.734588

// sets the coordinates of the area of traffic data we need
const trafficCoords1 = [30.263651, -97.810482]
const trafficCoords2 = [30.335960, -97.666177]

// seattle -122.351018,47.571051,-122.275047,47.658364
// [40.716766, -74.06601] const trafficCoords2 = [40.71193, -73.94080]

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
    center: {lat: coords[0], lng: coords[1]},
    zoom: 15,
    pixelRatio: window.devicePixelRatio || 1
});

map.addLayer(defaultLayers.vector.traffic.map)

window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

const hereTrafficApiUrl = 
`https://data.traffic.hereapi.com/v7/flow?locationReferencing=shape&in=bbox:${trafficCoords1[1]},${trafficCoords1[0]},${trafficCoords2[1]},${trafficCoords2[0]}&apiKey=${here.apiKey}`;

// Gets the traffic data
fetch(hereTrafficApiUrl)
   .then(response => response.json())
   .then(data => {
        // loops once for each data point object
        data.results.forEach(item => {
            const links = item.location.shape.links;
            // adds the data points together as a line
            links.forEach(link => {
                const points = link.points.map(point => new L.LatLng(point.lat, point.lng));
                const lineColor = getLineColor(link.currentFlow?.jamFactor || 0);
                L.polyline(points, { color: lineColor, weight: 5 }).addTo(map);
            });
           
        });

   })
   .catch(error => console.error('Error fetching traffic data:', error));

   // changes the color based on traffic level
   function getLineColor(jamFactor) {
    if (jamFactor <= 3) {
        return '#1bffff'; // cyan for low congestion
    } else if (jamFactor <= 5) {
        return '#831bff'; // purple for moderate congestion
    } else {
        return '#fc0bf1'; // magenta for high congestion
    }
 }




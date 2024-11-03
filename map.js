// 4-HrAJRi3cT2dueFnfYFpn5fUhS_Tpi-4QW9F3I7fvw

const here = {
    apiKey: '4-HrAJRi3cT2dueFnfYFpn5fUhS_Tpi-4QW9F3I7fvw'
};
// 47.606209, -122.332069
const style = 'lite.day' // new york 40.748441, -73.985664
const coords = [47.606209, -122.332069] //[30.284336, -97.734588] 
// initializes a map and sets the starting coordinates
var map = L.map('map').setView(coords, 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const hereTrafficApiUrl = `https://data.traffic.hereapi.com/v7/flow?locationReferencing=shape&in=bbox:-122.351018,47.571051,-122.275047,47.658364&apiKey=${here.apiKey}`;

fetch(hereTrafficApiUrl)
   .then(response => response.json())
   .then(data => {
        data.results.forEach(item => {
            const links = item.location.shape.links;
            links.forEach(link => {
                const points = link.points.map(point => new L.LatLng(point.lat, point.lng));
                const lineColor = getLineColor(link.currentFlow?.jamFactor || 0);
                L.polyline(points, { color: lineColor, weight: 5 }).addTo(map);
                //console.log(link)
                // Process each road segment
            });
           
        });

   })
   .catch(error => console.error('Error fetching traffic data:', error));

   function getLineColor(jamFactor) {
    if (jamFactor <= 0) {
        return '#2ECC40'; // Green for low congestion
    } else if (jamFactor <= 1) {
        return '#FF851B'; // Orange for moderate congestion
    } else {
        return '#FF4136'; // Red for high congestion
    }
 }




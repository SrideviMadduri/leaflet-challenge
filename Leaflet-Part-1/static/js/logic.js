// creating the map object

var map = L.map('map').setView([39.8, -98.6], 4);

// adding tile layer/map

var main_map = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
var dark_map = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
main_map.addTo(map);

var earthquakeData = new L.LayerGroup()
var mapLayer = {
    "Testing Site": main_map,
    "Dark Map": dark_map
}
var dataLayer = {
    earthquake : earthquakeData
}

// grabbing the data
L.control.layers(mapLayer , dataLayer).addTo(map)
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";


// create object for the mapstyle

// var mapstyle = {

//     color: 'red',
//     fillColor:'orange',
//     fillopacity: 0.4,
//     weight: 1.2

// }
// create a function to add color

function chooseColor(mag) {
    
    if (mag >5) return '#800026'

    else if (mag >4) return '#BD0026'

    else if (mag >3) return '#E31A1C'

    else if (mag >2) return '#FC4E2A'

    else if (mag >1) return '#FD8D3C'

    else return '#FFEDA0'    
    
}

// read in the data

d3.json(link).then(function(data){

    // use the geoJson function to draw map
    
    L.geoJson(data,{  
        
        pointToLayer:function(feature,lat_long){

            return L.circleMarker(lat_long)
        },
        // passing in mapstyle for our styling
        style:function(feature){

            // style each feature based on conditionals above

            return {

                color: 'red',
               fillColor:chooseColor(feature.properties.mag),
            //    fillColor:'#FFEDA0',
                fillopacity: 0.4,
                weight: 1.2,
                radius:feature.geometry.coordinates[2]
            
            }



       }


     }).addTo(earthquakeData)

    earthquakeData.addTo(map)


})

// var circle = L.circle([39.8, -98.6], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

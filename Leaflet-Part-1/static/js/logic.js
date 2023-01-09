// creating the map object

var map = L.map('map').setView([39.8, -98.6], 4);

// adding tile layer/map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// grabbing the data

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


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

        // passing in mapstyle for our styling
        style:function(feature){

            // style each feature based on conditionals above

            return {

                color: 'red',
                fillColor:chooseColor(feature.properties.mag),
                fillopacity: 0.4,
                weight: 1.2
            
            }



        }


    }).addTo(map)



})
var map = L.map('map').setView([50.087465, 14.421254],3)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 8,
    minZoom:2,
    attribution: '© OpenStreetMap',
}).addTo(map);

var southWest = L.latLng(-89.98155760646617, -180)
var northEast = L.latLng(89.99346179538875, 180);
var southWest = L.latLng(-90, -180);
var northEast = L.latLng(90, 180);
var bounds = L.latLngBounds(southWest, northEast);



map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});


locations = []
markers = []
function updateMapPoints(){
  window.api.receive("fromMainRequestTaskProperties", (data) => {
    if (data == "errorFlag")
    {
      console.log("errorFla")
      return
    }
    locations = []
    data.forEach(element => {     
      if (element.latitude!=null || element.longitude!=null){
        locations.push([element.name, element.latitude, element.longitude])
      }     
    });
    if(markers.length != 0){
      markers.forEach(element => {
        element.remove()
      });

      for (var i = 0; i < locations.length; i++) {
        markers[i] = L.marker([locations[i][1], locations[i][2]])
          .bindPopup(locations[i][0])
          .addTo(map);
      }
    }
    else if(markers.length == 0){
      for (var i = 0; i < locations.length; i++) {
        markers[i] = L.marker([locations[i][1], locations[i][2]], {riseOnHover: true})
          .bindPopup(locations[i][0])
          .addTo(map);
      }
    }
  })
}


var popup = L.popup();
//počáteční zoom je na 3

function onMapClick(e) {
  ll={"lat":e.latlng.lat ,"lng":e.latlng.lng}
  console.log(ll, map.getZoom())
  popup.setLatLng({"lat":e.latlng.lat ,"lng":e.latlng.lng})
      .setContent("lat:"+e.latlng.lat + "\n" + "lng:"+e.latlng.lng)
      .openOn(map);
}

map.on('click', onMapClick);


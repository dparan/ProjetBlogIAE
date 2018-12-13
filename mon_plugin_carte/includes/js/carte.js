
let macarte = document.getElementById("map");
/* récupération du contenu de saveMap.json */
let xhttp = new XMLHttpRequest();
var redIcon = L.icon({
    iconUrl: 'wp-content/plugins/mon_plugin_carte/includes/img/01.png',
    iconSize: [28, 40], // size of the icon
    iconAnchor: [22, 44], // point of the icon which will correspond to marker's location
    popupAnchor: [-7, -30] // point from which the popup should open relative to the iconAnchor
});

xhttp.onreadystatechange = function(){
    // si la réponse n'est pas vide
    if(xhttp.responseText!=""){
        var obj = JSON.parse(xhttp.responseText);
        /* création de la carte */
        carte = L.map('map').setView([obj.carte.position.x,obj.carte.position.y], obj.carte.zoom);
        /* affichage de la carte */
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(carte);
        /* création des markers */
        for(var k in obj.marker) {
            var marker;
            if(obj.marker[k].logo!="")
                marker = L.marker([obj.marker[k].position.x, obj.marker[k].position.y], {icon: redIcon}).addTo(carte);
            else
                marker = L.marker([obj.marker[k].position.x, obj.marker[k].position.y]).addTo(carte);
            // ajout du popup
            marker.bindPopup(obj.marker[k].text);
            // ajout du marqueur à la carte
            marker.addTo(carte);
        }
    }

};
// requète de récupération du json
xhttp.open("GET","wp-content/plugins/mon_plugin_carte/includes/json/saveMap.json",false);
xhttp.send();
let villeMarqueur = document.getElementById("villeMarqueur");
let rechercherVilleMarqueur = document.getElementById("rechercherVilleMarqueur");
let latitudeMarqueur = document.getElementById("latMarqueur");
let longitudeMarqueur = document.getElementById("lonMarqueur");
rechercherVilleMarqueur.addEventListener("click",rechercherLocalisationMarqueur);

function rechercherLocalisationMarqueur() {

    document.getElementById("resultsMarqueur").innerHTML="";
    if(villeMarqueur.value!="") {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + villeMarqueur.value, false);
        xhttp.send();
        let liste = JSON.parse(xhttp.responseText);
        let html = "";
        liste.forEach(function(elt){
            html+=
                "<li><a href='#' onclick='chooseAddressMarqueur(" +
                elt.lat + ", " + elt.lon + ");return false;'>" + elt.display_name +
                '</a></li>';
        });
        if(html!="")
            document.getElementById("resultsMarqueur").innerHTML=html;
        else{
            document.getElementById("resultsMarqueur").innerHTML="<p>Aucun Résultat à afficher...</p>";
        }

    }
}

/* on place dans les input hidden correspondant */
function chooseAddressMarqueur(x,y){
    latitudeMarqueur.value = x;
    longitudeMarqueur.value = y;
}

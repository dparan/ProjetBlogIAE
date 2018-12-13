let ville = document.getElementById("villeCarte");
let rechercherVille = document.getElementById("rechercherVilleCarte");
let latitudeCarte = document.getElementById("latCarte");
let longitudeCarte = document.getElementById("lonCarte");
rechercherVille.addEventListener("click",rechercherLocalisation);

function rechercherLocalisation() {
    document.getElementById("resultsCarte").innerHTML="";
    if(ville.value!="") {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + ville.value, false);
        xhttp.send();
        let liste = JSON.parse(xhttp.responseText);
        let html = "";
        liste.forEach(function(elt){
            html+=
                "<li><a href='#' onclick='chooseAddress(" +
                elt.lat + ", " + elt.lon + ");return false;'>" + elt.display_name +
                '</a></li>';
        });
        if(html!="")
            document.getElementById("resultsCarte").innerHTML=html;
        else{
            document.getElementById("resultsCarte").innerHTML="<p>Aucun Résultat à afficher...";
        }

    }
}

function chooseAddress(x,y){
    latitudeCarte.value = x;
    longitudeCarte.value = y;
}
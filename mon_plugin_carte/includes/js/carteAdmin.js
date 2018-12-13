/* récupération des élements HTML */
    let macarte = document.getElementById("macarte");
    macarte.innerHTML="<div id='carte' style='width:auto;height:400px;margin-right:1%;'></div>";
    let zoom = document.getElementById("zoom");
    let latitude = document.getElementById("latCarte");
    let longitude = document.getElementById("lonCarte");
    let feedback = document.getElementById("feedback");
    let popup = document.getElementById("popup");
    let creer = document.getElementById("creer");
    let sauverCarte = document.getElementById("sauverCarte");
    let creerMarqueur = document.getElementById("creerMarqueur");
    let divSuppr = document.getElementById("supprMarqueur");

/* variables qui serviront au traitement de la carte */
    let mapIsNull = true;
    let jsonSave= "";
    let nbMarqueur = 0;
    let suppr="";
    let markers = [];
    let carte;

/* icone rouge du marqueur */

var redIcon = L.icon({
    iconUrl: '../wp-content/plugins/mon_plugin_carte/includes/img/01.png',
    /* taille de l'icone */
    iconSize: [28, 40],
    /* point du marqueur qui doit correspondre à la position du marqueur */
    iconAnchor: [22, 44],
    // point ou le pop-up va pop */
    popupAnchor: [-7, -30]
});


let xhttp = new XMLHttpRequest();
/* Chargement du fichier */
xhttp.onreadystatechange = function(){
    /* si le fichier json n'est pas vide */
    if(xhttp.responseText!=""){
        var obj = JSON.parse(xhttp.responseText);
        /* création de la carte */
        carte = L.map('carte').setView([obj.carte.position.x,obj.carte.position.y], obj.carte.zoom);
        /* affichage de la carte */
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(carte);

        mapIsNull = false;
        /*
            ajout du json ( pour la sauvegarde )
            on supprime également tout le contenu du json
         */
        jsonSave = '{"carte":{'+
            '"zoom":'+obj.carte.zoom+','+
            '"position" : {'+
            '"x":'+obj.carte.position.x+','+
            '"y":'+obj.carte.position.y+
            '}';
        /* création des fichiers json */
        for(var k in obj.marker) {
            var marker;
            if(obj.marker[k].logo!="")
                marker = L.marker([obj.marker[k].position.x, obj.marker[k].position.y], {icon: redIcon}).addTo(carte);
            else
                marker = L.marker([obj.marker[k].position.x, obj.marker[k].position.y]).addTo(carte);
            marker.bindPopup(obj.marker[k].text);
            marker.addTo(carte);
            ajouterBoutonSuppression(nbMarqueur,marker,obj.marker[k].ville,obj.marker[k].logo!="");

        }
    }

};
xhttp.open("GET","../wp-content/plugins/mon_plugin_carte/includes/json/saveMap.json",false);
xhttp.send();

/* ajout des évènements aux boutons devant effectuer des actions. */
creer.addEventListener('click',creerCarte);
creerMarqueur.addEventListener('click',ajoutMarqueur);
sauverCarte.addEventListener('click',sauvegardeCarte);


/* vérification de la variable Zoom */
function verifierZoom(element){
    if(element.value!=""){
        if(!isNaN(element.value)&& element.value%1==0){
            return true;
        }
        return false;
    }
    return false;
}

/* fonction de vérification des champs pour l'ajout de la carte */
function verifierChamps(){
    return latitude.value!=""&&longitude.value!=""&&verifierZoom(zoom);
}

/* affichage du feedback dans la zone correspondante de la couleur choisie */
function afficherFeedback(message,couleur){
      feedback.textContent = message;
      feedback.style.color = couleur;
}

/* réinitialisation de la carte */
function supprimerCarte() {
        macarte.innerHTML="<div id='carte' style='width:auto;height:400px;margin-right:1%;'></div>";
}


/* création de la carte */
function creerCarte(){
    /* si les champs ne sont pas vérifiés on affiche une erreur */
    if(!verifierChamps()) {
        afficherFeedback("Veuillez saisir des champs valides","red");
    }
    else{
        /* on réinitialise la carte */
        supprimerCarte();
        /* création de la carte */
        carte = L.map('carte').setView([latitude.value,longitude.value], zoom.value);
        /* affichage de la carte */
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(carte);
        /* mapIsNull est une variable qui nous permettra plus tard de savoir si la carte a bien été créée */
        mapIsNull = false;
        /*
            ajout du json ( pour la sauvegarde )
            on supprime également tout le contenu du json
         */
        jsonSave = '{"carte":{'+
                '"zoom":'+zoom.value+','+
                '"position" : {'+
                    '"x":'+latitude.value+','+
                    '"y":'+longitude.value+
                '}';
    }
}

/* fonction de suppression d'un marqueur */
function supprimerMarqueur(id){

    var monId = parseInt(id[id.length-1], 10);

    let tmpMarker = markers[monId];
    carte.eachLayer(function(layer){
        if(layer===tmpMarker[0]){

            markers.splice(monId);
            carte.removeLayer(layer);
            nbMarqueur--;
        }
    });
    suppr="";
    if(markers.length!=0) {
        for (var i = 0; i < markers.length; i++) {
            //divSuppr.innerHTML = suppr;
            // il me reste elts - 1
            //fct(i);
            affichageBoutonSuppression(i, markers[i][0], markers[i][1]);
        }
    }else
        divSuppr.innerHTML = suppr;
}

/* verification des marqueurs */
function verifierChampsMarqueur(){
    return !mapIsNull && carte!=null && latitudeMarqueur.value!="" && longitudeMarqueur.value!="" && popup.value!="";
}

function affichageBoutonSuppression(nb,marker,ville){
    var id = 'deleteMarker'+nb;

    suppr+="<input type='button' onclick='supprimerMarqueur(id)' value='"+ville+"' id='"+id+"'/>";
    divSuppr.innerHTML = suppr;
}
/*  */
function ajouterBoutonSuppression(nb,marker,ville,icRouge){
    affichageBoutonSuppression(nb,marker,ville);
    markers.push([marker,ville,icRouge]);
    nbMarqueur++;
}

/* fonction permettant l'ajout d'un marqueur à la carte */
function ajoutMarqueur(event){
    /* si les champs sont bien remplis et que la carte est initialisé */
    if(verifierChampsMarqueur()) {
        /* variable qui va contenir notre marqueur durant la création de celui-ci */
        var marker;
        /* si le checkbox est cliqué on fait un marqueur rouge, sinon un marqueur bleu */
        if (document.getElementById("iconeRouge").checked == true)
            marker = L.marker([latitudeMarqueur.value, longitudeMarqueur.value], {icon: redIcon}).addTo(carte);
        else
            marker = L.marker([latitudeMarqueur.value, longitudeMarqueur.value]).addTo(carte);
        /* ajout du popup */
        marker.bindPopup(popup.value);
        /* création d'un bouton  pour la suppression du marqueur */
        var maVar = document.getElementById('villeMarqueur').value;
        ajouterBoutonSuppression(nbMarqueur,marker,maVar,document.getElementById("iconeRouge").checked == true);
    }
    else {
        afficherFeedback("On ne peux pas insérer de marqueur si la carte n'est pas créée!","red");
    }
}


function sauvegardeCarte(event){
    /* c'est la que va se faire la sauvegarde */

    if(markers.length>0) {
        for (var i = 0; i < markers.length; i++) {

            var curPos = markers[i][0].getLatLng();
            alert(curPos.lng + " : " + curPos.lat);
            if (i==0)
                jsonSave += '},' +
                    '"marker":{';
            else {
                jsonSave += ',';
            }
            jsonSave += '"' + i + '":{' +
                '"text": "<p>' + markers[i][0].getPopup().getContent() + '</p>",' +
                '"ville": "'+markers[i][1]+'",' +
                '"position":{' +
                '"x":' + curPos.lat + ',' +
                '"y":' + curPos.lng +
                '},';
            if (markers[i][2]) {
                jsonSave += '"logo":"red"' +
                    '}';
            }
            else{
                jsonSave += '"logo":""' +
                    '}';
            }

        }
    }
    jsonSave+='}}';

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = afficherFeedback("Sauvegarde effectuée.","green");
    xhttp.open("GET","../wp-content/plugins/mon_plugin_carte/includes/php/sauverCarte.php?chaine="+jsonSave,false);
    xhttp.send();
}
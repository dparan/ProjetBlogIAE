
let map = document.getElementById("ajoutMap");
let marqueur = document.getElementById("ajoutMarqueur");
let creationCarte = document.getElementById("creationCarte");
let creationMarqueur = document.getElementById("creationMarqueur");

/* on relie le clic du bouton a la fonction de création de la carte */
map.addEventListener('click',afficherCarte);
marqueur.addEventListener('click',afficherAjoutMarqueur)


/* fonctions d'affichage */
function afficherAjoutMarqueur() {
    creationMarqueur.style.display= 'inline';
    creationCarte.style.display = 'none';
}

function afficherCarte() {
    creationMarqueur.style.display='none';
    creationCarte.style.display = 'inline';
}
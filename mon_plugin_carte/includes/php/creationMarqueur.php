<?php
/**
 * Created by PhpStorm.
 * User: WINDOWS
 * Date: 16/11/2018
 * Time: 14:15
 */
?>
<div id="creationMarqueur" style="display: none;">
    <br />
    <input type="text" id="villeMarqueur" placeholder="Nom de la ville">
    <input type="button" id="rechercherVilleMarqueur" value="Rechercher...">
    <br />
    <!-- zone de résultat de la recherche -->
    <div id="resultsMarqueur"></div>
    <!-- longitude et latitude de la position séléctionnée -->
    <input type="hidden" id="lonMarqueur">
    <input type="hidden" id="latMarqueur">
    <br />
    <!-- Le conteneur de notre carte (avec une contrainte CSS pour la taille) -->
    <input type="text" id="popup" placeholder="Texte du popup">
    <br/>
    <p> C'est une bonne adresse. ( par défaut, c'est un évènement )
        <input type="checkbox" id="iconeRouge"/></p>
    <input type="button" id="creerMarqueur" value="Créer la carte">

</div>

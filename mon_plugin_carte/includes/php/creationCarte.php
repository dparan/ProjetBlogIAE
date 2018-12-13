<?php
/**
 * Created by PhpStorm.
 * User: WINDOWS
 * Date: 16/11/2018
 * Time: 14:11
 */
?>
<div id="creationCarte" style="display: none;">

    <br />
    <input type="text" id="villeCarte" placeholder="Nom de la ville">
    <input type="button" id="rechercherVilleCarte" value="Rechercher...">
    <br />
    <!-- zone de résultat de la recherche -->
    <div id="resultsCarte"></div>
    <!-- longitude et latitude de la position séléctionnée -->
    <input type="hidden" id="lonCarte">
    <input type="hidden" id="latCarte">
    <br />
    <input type="number"  id="zoom" step="1" value="10" min="0" max="20">
    <br />
    <br />
    <input type="button" id="creer" value="Créer la carte">
</div>
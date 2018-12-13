<?php
        /**
         * Plugin Name: mon_plugin_carte
         * Plugin URI: j'en ai pas
         * Description: Le plugin que j'ai développé pour la carte
         * Version: 1
         * Author: Dylan Parant
         * Text Domain mo_plugin_carte
         * Domain Path: /languages
         */

        if(!defined('ABSPATH')){
            die;
        }

        if(!function_exists('add_action')){
            exit;
        }


        class MonPluginCarte {

            function activation(){
            }

            function desactivation(){

            }

            function desinstallation(){

            }

            /* ce qui sera dans la page Wordpress */
            function ajout() {
                return "
                        <div id='map' style='width:auto;height:400px;'></div>
	                    <script src=\"http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js\"></script>
                        <link rel=\"stylesheet\" href=\"http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css\" />
                        <script src=\"http://code.jquery.com/jquery-latest.min.js\"></script>
                        <script src = \"wp-content/plugins/mon_plugin_carte/includes/js/carte.js\" ></script > ";
            }

        }

        //add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function = '', $icon_url = '', $position = null )
        // initialisation de ma classe
        $monPluginCarte = new MonPluginCarte();
        // shortcut
        add_shortcode( 'example',array($monPluginCarte,'ajout'));

        // activation
        register_activation_hook(__FILE__,array($monPluginCarte,'activation'));

        // desactivation
        register_deactivation_hook(__FILE__,array($monPluginCarte,'desactivation'));
        // $page_title, $menu_title, $capability, $menu_slug, $function

        /** Step 2 (from text above). */
        add_action( 'admin_menu', 'my_plugin_menu' );
        function my_plugin_menu() {
            add_options_page( 'MaCarte Options', 'MonPluginCarte', 'manage_options', 'configMonPluginMap', 'my_plugin_options' );
        }
        function my_plugin_options() {
            /* si l'utilisateur n'a pas les droits */
            if ( !current_user_can( 'manage_options' ) )  {
                wp_die( __( 'Vous n\'avez pas les droits pour accèder à cette page.') );
            }

            echo '<div class="wrap">';

                // inclusions  CSS et JS de leaflet
                echo '<script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>';
                echo '<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />';
                echo '<p>Le menu : </p>';
                // zone permettant d'afficher les erreurs ou succès lors du traitement
                echo "<div id=\"feedback\"></div>";
                // Boutons gérant l'affichage
                echo '
                       <input type="button" id="ajoutMap" value="Ajout de la carte">
                       <input type="button" id="ajoutMarqueur" value="Ajout d\'un marqueur">
                     ';
                // inclusion du contenu HTML
                require_once('includes/php/creationCarte.php');
                require_once('includes/php/creationMarqueur.php');
            echo '</div>';
            echo '<br/>';

            // Le conteneur de notre carte (avec une contrainte CSS pour la taille)
            echo '<div id="macarte"><div id=\'carte\' style=\'width:auto;height:400px;\'></div></div>';

            echo '<input type="button" id="sauverCarte" value="Sauver la carte">';

            /*
             * Suppression des marqueurs
             * Pour chaque marqueur il y aura un bouton de suppression de ce même élément.
             */
            echo '<p>Supprimer des marqueurs : </p>
                  <div id="supprMarqueur"></div>';
            // Les inclusions de script

            echo "<script src = \"../wp-content/plugins/mon_plugin_carte/includes/js/menuAdmin.js\" ></script > ";
            echo "<script src = \"../wp-content/plugins/mon_plugin_carte/includes/js/carteAdmin.js\" ></script > ";
            echo "<script src = \"../wp-content/plugins/mon_plugin_carte/includes/js/rechercheVilleCarte.js\" ></script > ";
            echo "<script src = \"../wp-content/plugins/mon_plugin_carte/includes/js/rechercheVilleMarqueur.js\" ></script > ";

        }

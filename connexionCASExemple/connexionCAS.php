<?php

	// Load the settings from the central config file
	$infosCAS_ini = parse_ini_file("../../util/config/configCAS.ini");
	// Load the CAS lib
	require_once ('../../util/php/phpCAS-master/CAS.php');
	// Enable debugging
	phpCAS::setDebug();
	// Enable verbose error messages. Disable in production!
	phpCAS::setVerbose(true);
	// Initialize phpCAS
	phpCAS::client(CAS_VERSION_2_0, $infosCAS_ini['CASHostname'], intval($infosCAS_ini['CASPort']),  $infosCAS_ini['CASServerPath']);
	phpCAS::setNoCasServerValidation();
	// force CAS authentication
	phpCAS::forceAuthentication();

	$erreur="";
 	/* fin de l'authentification du CAS */
	require_once("../modele/ClasseDAO/personnelAutoriseDAO.class.php");
	require_once("../modele/ClasseDAO/typePersonnelDAO.class.php");
	require_once("../modele/ClasseDAO/attributionTypePersonnelDAO.class.php");
	require_once("../modele/ClasseDAO/infoAccueilDAO.class.php");

 	$personnelAutoriseDAO = new PersonnelAutoriseDAO();
 	$personnel = $personnelAutoriseDAO->selectionnerDonnees(" where email='".$_SESSION['phpCAS']['attributes']['mail']."'");
 	if(!is_null($personnel->getEmail()))
  {
   	if(!isset($_SESSION['type']))
   	{
   		$attributionTypePersonnelDAO = new AttributionTypePersonnelDAO();
   		$attr = $attributionTypePersonnelDAO->selectionnerListe(" where idPersonne='".$personnel->getId()."'");
   		if(empty($attr))
   			$erreur = " Erreur : Aucun type trouvé pour l'utilisateur ".$personnel->getEmail();
   		else
   		{
   			$typePersonnelDAO = new TypePersonnelDAO();
   			$type = $typePersonnelDAO->selectionnerDonnees(" where type='superUtilisateur'");
   			foreach ($attr as $key => $value) {
   				if($value['idtype']==$type->getId())
   				{
   					$_SESSION['type']="superUtilisateur";
   				}
   			}		
   		}
   	}
  }
 	
 	/* ne renvoi que la grande adresse mail */
 	/* vérification encadrant */ 
 	if(!isset($_SESSION['type']))
 	{
	 	$infoAccueilDAO = new infoAccueilDAO();
	 	$liste = $infoAccueilDAO->selectionnerListe();
	 	foreach ($liste as $key => $value) {
	 		$tabl = explode(";", $value['encadrants']);
	 		if(in_array($_SESSION['phpCAS']['attributes']['mail'], $tabl))
	 			$_SESSION['type'] = 'encadrant';
	 	}
	 	if(!isset($_SESSION['type'])&&is_null($personnel->getId()))
	 	{
	 		$_SESSION['type'] = 'invite';
	 	}
	}
 	if(strcmp($erreur,""))
 		include('../vue/erreur.php');
 	else
 		include("../vue/menuAuth.php");
 		

?>
<?php

	// Load the settings from the central config file
	$infosCAS_ini = parse_ini_file("../../util/config/configCAS.ini");
	// Load the CAS lib
	require_once ('../../util/php/phpCAS-master/CAS.php');
 
 if(isset($_SESSION['login']))
 {
   unset($_SESSION['login']);
   header("Location : ../vue/accueil.php");
 }
 else
 {
  	// Enable debugging
  	phpCAS::setDebug();
  	// Enable verbose error messages. Disable in production!
  	phpCAS::setVerbose(true);
  	// Initialize phpCAS
  	phpCAS::client(CAS_VERSION_2_0, $infosCAS_ini['CASHostname'], intval($infosCAS_ini['CASPort']),  $infosCAS_ini['CASServerPath']);
  	phpCAS::setNoCasServerValidation();
  
  	phpCAS::logout();
 }
?>
<?php

  if(!isset($_POST))
  {
   exit;
  }
  else
  {
    if(!isset($_SESSION))
      session_start();
    if(!isset($_SESSION['token'])||$_POST['token']!=$_SESSION['token'])
		{
			if(isset($_SESSION['login'])||$_SESSION['phpCAS']){
				include("../vue/menuAuth.php");
			}
			else{
				include("../vue/accueil.php");
			}
		}
		else
		{
			unset($_SESSION['token']);
      if(!strcmp("adminL3i",$_POST['id'])&&!strcmp("zVj3O47Eb6",$_POST['pass']))
      {
        $_SESSION['login']=true;
        var_dump($_SESSION);
   		  include('../vue/menuAuth.php');
        
      }
      else
      {
        $erreur=" Id ou mot de passe incorrect ";
   		  include('../vue/erreur.php');
      }
    }
  }


?>
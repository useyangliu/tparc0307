<?php  
	try
	{
		session_start();  
		//get the challenge parameter from client 
		$strChallge = $_GET["challenge"];     
	 
		if( 0 < strlen($strChallge) )
		{ 
			if( strtolower("getChallenge") == strtolower($strChallge) )
			{   
					$strchag = dog_auth_get_challenge(); 
					if("" != $strchag)
					{  
						$_SESSION['ChallengeData'] = $strchag; 
						echo $strchag; 
					}
					else
					{
						unset($_SESSION['ChallengeData']);
						echo '';
					}  
			}
		} 
	}
	catch (Exception $e)
	{ 
		echo 'error:'.$e->getMessage();
	}    
?>
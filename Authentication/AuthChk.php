<?php 
	 
	include('CfgInfo.php');
	 
	$getCfg = new cfgInfo($_SERVER["DOCUMENT_ROOT"]);
	$vendorID = $getCfg->getVendorID(); 
	$factor = $getCfg->getAuthFactor(); 
	
	//get the auth parameters from client
	$dogID = $_GET["dogid"]; 
	$strDigest = $_GET["digest"]; 
	 
	$res = -1;
	session_start();  
	 
	if( 0 < strlen($dogID) && 0 < strlen($strDigest) 
		&& 0 < strlen($vendorID) && 0 < strlen($factor) )
	{ 
		try
		{ 
			$res = dog_auth_verify_digest($vendorID, $dogID, $_SESSION['ChallengeData'], $strDigest, $factor);
			echo $res;
			if(0 == $res)
			{ 
				$_SESSION['authState'] = 'pass';  
				echo 0; 
			}
			else
			{   
				unset($_SESSION['authState']); 
				echo $res;
			} 
		}
		catch (Exception $e)
		{ 
			 echo 'error:'.$e->getMessage();
		}   
	} 

?>
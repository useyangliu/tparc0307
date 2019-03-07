<?php 

	include('CfgInfo.php'); 
	
	//get the q parameter from URL
	$qrInfo=$_GET["data"]; 
	
	$getCfg = new cfgInfo($_SERVER["DOCUMENT_ROOT"]);
	if( 0 < strlen($qrInfo) )
	{
	  if( strtolower("AuthCode") == strtolower($qrInfo) )
	  {
		echo $getCfg->getAuthCode();
	  }
	}

?>
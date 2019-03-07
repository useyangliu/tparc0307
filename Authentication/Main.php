<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<link href="styles1.css" type="text/css" media="screen"
			rel="stylesheet" />
	</head>
	<object id="AuthIE" name="AuthIE" width="0px" height="0px"
		codebase="DogAuth.CAB#version=2,3,1,58083"
		classid="CLSID:05C384B0-F45D-46DB-9055-C72DC76176E3">
	</object>
	
	<script type="text/javascript" src="Func.js"></script>
	<script language="javascript">
	
	var dogNotPresent = false;
	var authCode = "";
	
	function removeDog()
	{
		window.location.href = "Login.php";
	}

	function insertDog()
	{

	}

	function checkDog()
	{
		var stat = "";
		var scope = "<dogscope/>";

		//Get Auth Code
		if ("" == authCode) {
			authCode = getAuthCode();
		}
		
		//Get object
		objAuth = getAuthObject();
		
		if (navigator.userAgent.indexOf("Chrome") > 0) {
            objAuth.GetUserNameEx(scope, authCode);
        }
		else {
			//Open
			stat = objAuth.Open(scope, authCode);
			if (0 != stat) {
				window.location.href = "Login.php";
			}
		}

		//Execute the check again after 2 seconds
		setTimeout(checkDog, 2000);
	}
	
	function loadFunc()
	{
		var objAuth = "";

		embedTag();
		//Get object
		objAuth = getAuthObject();

		if(navigator.userAgent.indexOf("Window")>0)
		{
			if (window.ActiveXObject || "ActiveXObject" in window) { //IE
				objAuth.SetCheckDogCallBack("insertDog", "removeDog");
			}
			else if (navigator.userAgent.indexOf("Chrome") > 0) { //Chrome
				window.addEventListener("message", function (event) {
					if (event.source != window)
						return;
					if (event.data.type == "SNTL_FROM_HOST") {
						var ReturnText = event.data.text;
						if ("GetUserNameEx" == ReturnText.InvokeMethod) {
							if (0 == ReturnText.Status) {
								dogNotPresent = false;
								return;
							}
							else {
								if (false == dogNotPresent) {
									dogNotPresent = true;
									if (undefined != typeof removeDog) {
										removeDog();
									}
								}
								return;
							}
						}
						else {
							return;
						}
					}
				}, false);
				
				setTimeout(checkDog, 1000);
            }
			else {
				setTimeout(checkDog, 1000);
			}
		}
		else if(navigator.userAgent.indexOf("Mac")>0)
		{
			setTimeout(checkDog, 1000);
		}
		else if(navigator.userAgent.indexOf("Linux")>0)
		{
			setTimeout(checkDog, 1000);
		}
		else
		{
			;
		}
	
	}
	
	</script>

	<?php 
		try
		{
			$sUsername = '';
			$sDogID = '';
			$sResult = '';
			$sMessage = '';
			
			$sUsername = $_GET["username"];
			$sDogID = $_GET["dogid"];
			$sResult = $_GET["response"];
			$sMessage = '';
			
			session_start();
			$_SESSION['username'] = $sUsername;
			$_SESSION['dogid'] = $sDogID;
			
			if('pass' != $_SESSION['authState'])
			{
				echo "<script language=\"javascript\">";
				echo "document.location=\"Login.php\"";
				echo "</script>"; 
			}
			
			$mdbFile = realpath(".\serverdata\UserDB.mdb");
			$conn = odbc_connect("Driver={Microsoft Access Driver (*.mdb)};Dbq= $mdbFile " ,  '',  '');
			// Get the error message
			if(false === $conn)
			{
				throw new ErrorExcpetion(odbc_errormsg());
			}
			
			$sql = "select b.dog_id from userinfo a, doginfo b where a.user_id = b.user_id and b.dog_status=1 and b.dog_id='$sDogID'";
			 
			$rs = odbc_exec($conn, $sql);
			if(odbc_fetch_row($rs))
			{
				$storeID = odbc_result($rs, 1);
				if($storeID == $sDogID)
				{
				$sMessage = "Welcome you ".$sUsername." !";
				}
			}
			else
			{	
				$sMessage = "This SuperDog can't login! The user data is not on record in the Database.";
			}
			odbc_free_result($rs);
			odbc_close($conn);
		}
		catch (Exception $e)
		{
			$sMessage .= $e->getMessage();
			if(false != $conn)
			{
				odbc_close($conn);
			}
		}
	?>

	<body onload="loadFunc()">
		<div>
			<table width="100%" align="center" bgcolor="">
                <tr>
                    <td>
                        <img src="head.jpg" alt="head" />
                    </td>
                </tr>
                <tr height="50px">
                </tr>
            </table>
		</div>
		<p align="center"><?php echo $sMessage ?></p>
		<table align="center" border="1" bgcolor="#ffffff">
			<tr>
				<td>Username</td>
				<td>
				<?php echo $_GET["username"]?>
				</td>
			</tr>
			<tr>
				<td>
					DogID
				</td>
				<td>
				<?php echo $_GET["dogid"]?> 
				</td>
			</tr>
			<tr>
				<td>
					Challenge
				</td>
				<td>
				<?php  
				echo $_SESSION['ChallengeData']
				?>
				</td>
			</tr>
			<tr>
				<td>
					Response
				</td>
				<td>
				<?php echo $_GET["response"]?>
				</td>
			</tr>
		</table>
		<div class="footer-bar">
			<div class="footer">
				Copyright 1983-2016 SafeNet, Inc. All rights reserved.
			</div>
		</div>
	</body>
</html>

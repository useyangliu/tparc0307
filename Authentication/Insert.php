<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<object id="AuthIE" name="AuthIE" width="0px" height="0px"
			codebase="DogAuth.CAB#version=2,3,1,58083"
			classid="CLSID:05C384B0-F45D-46DB-9055-C72DC76176E3">
		</object>

	</head>
	<script type="text/javascript" src="Func.js"></script>

	<body>
	</body>
	<?php
	
		$sUsername = '';
		$sDogID = '';
		$sUserPassword = '';
		$sUserID = '';    

		try 
		{  
			$sUsername = $_POST["username"];
			$sDogID = $_POST["dogid"];
			$sUserPassword = $_POST["password"];
			$sMessage = '';   
			
			//Check the request whether it has passed the authentication
			session_start();  
			if('pass' != $_SESSION['authState'])
			{  
				echo "<script language=\"javascript\">";
				echo "document.location=\"Login.php\"";
				echo "</script>"; 
			}
			
			$mdbFile = realpath(".\serverdata\UserDB.mdb");  
			$conn = odbc_connect("Driver={Microsoft Access Driver (*.mdb)};Dbq= $mdbFile" ,  '',  '');
			//Get the error message
			if(!$conn)
			{
				echo "<script language=\"javascript\">";
				echo "alert(\"Connect to database failed!\");";
				echo "document.location=\"Register.php\"";
				echo "</script>";  
				return;
			}
			
			odbc_autocommit($conn, FALSE);  
		 
			//Check database whether the SuperDog has been registered
			$sql = "select count(*)from userinfo a, doginfo b where a.user_id=b.user_id and b.dog_id='$sDogID' and b.dog_status=1";
			$rs1 = odbc_exec($conn, $sql);   
			if(odbc_fetch_row($rs1))
			{
				$state = odbc_result($rs1, 1); 
				if(1 == $state)
				{
					echo "<script language=\"javascript\">";
					echo "alert(\"The SuperDog has been registered!\");"; 
					echo "</script>";     
				}
				else 
				{ 
					//Record the user info into database
					$sql = "insert into userinfo(user_name, dog_id) values('$sUsername', '$sDogID')";
					$rs2 = odbc_exec($conn, $sql);   
					if($rs2)
					{
						//Get auto number
						$sql = "SELECT @@IDENTITY";	
						$rs3 = odbc_exec($conn, $sql); 
						if(odbc_fetch_row($rs3))
						{
							//Record the dog info into database.
							$sUserID = odbc_result($rs3, 1);  
							$sql = "insert into doginfo(user_id, dog_id) values($sUserID,'$sDogID')"; 
							$rs4 = odbc_exec($conn, $sql);  
							if($rs4)
							{ 
	?>
	<script type="text/javascript">
			
			var objAuth = "";
			var authCode = "";
			var scope = "<dogscope/>";
			
			embedTag();
			//Get object
			objAuth = getAuthObject();
			
			//Get AuthCode
			authCode = getAuthCode();
			
			var stat = objAuth.Open(scope, authCode);
			if(0 != stat)
			{
				alert("Open Failed!");
			}
			//Record the registration info into the SuperDog
			stat = objAuth.RegisterUser('<?php echo $sUsername?>', '<?php echo $sUserPassword?>');
			if(0 != stat)
			{
				alert("Register User Failed!");
			}
			else
			{
				alert("Register User Successful!");
			}
			objAuth.Close();
	</script>
	<?php
		odbc_commit($conn);
							} else {
								odbc_rollback($conn);
							}
						} else {
							odbc_rollback($conn);
						}
					} else {
						odbc_rollback($conn);
					} 
					if($rs2)
					{
						odbc_free_result($rs2);
					}
					if($rs3)
					{
						odbc_free_result($rs3);
					}
					if($rs4)
					{
						odbc_free_result($rs4);
					} 
				}
			}
			if($rs1)
			{
				odbc_free_result($rs1);
			} 
			if($conn)
			{
				odbc_close($conn);
			}  
			
			echo "<script language=\"javascript\">";
			echo "document.location=\"Register.php\"";
			echo "</script>"; 
	 
		} catch (Exception $e) {
			//echo $e->getMessage();
			if(false != $conn)
			{
				odbc_close($conn); 
			} 
	?>
            <script type="text/javascript">
				alert("Insert failed : "+"<?php echo $e->getMessage() ?>");
			</script>
	<?php 
        }
	?>
</html>

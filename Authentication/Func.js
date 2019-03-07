/******************************************************************************
Function: validateRegForm
Parameters: none
Return: true or false
Description: Validate the form for emptiness.
******************************************************************************/
function validateRegForm()
{
    var regForm = window.document.RegisterForm;
    var name = regForm.username.value;
    var pwd = regForm.password.value;
    var rPwd = regForm.repassword.value;
    if (isEmpty(name)) {
        reportStatus(907);
        return false;
    }
    else {
        if (name.length < 1 || name.length > 32) {
            reportStatus(914);
            return false;
        }
        if (!isLegalCharacters(name)) {
            reportStatus(903);
            return false;
        }
    }
    if (isEmpty(pwd)) {
        reportStatus(904);
        return false;
    }
    else {
        if (pwd.length < 6 || pwd.length > 16) {
            reportStatus(905);
            return false;
        }
        if (!isLegalCharacters(pwd)) {
            reportStatus(906);
            return false;
        }

    }
    if (isEmpty(rPwd)) {
        reportStatus(908);
        return false;
    }
    else {
        if (rPwd.length < 6 || rPwd.length > 16) {
            reportStatus(909);
            return false;
        }
        if (!isLegalCharacters(rPwd)) {
            reportStatus(910);
            return false;
        }
    }
    if (pwd != rPwd) {
        reportStatus(911);
        regForm.password.value ="";
        regForm.repassword.focus();
        return false;
    }

    return true;
}

/******************************************************************************
Function: validateChangeForm
Parameters: none
Return: true or false
Description: Validate the form for emptiness.
******************************************************************************/
function validateChangeForm() {
    var cForm = window.document.ChangePinForm;
    var oP = cForm.oldPwd.value;
    var nP = cForm.newPwd.value;
    var rP = cForm.retypePwd.value;

    if (isEmpty(oP)) {
        reportStatus(912);
        return false;
    }
    else {
        if (oP.length < 6 || oP.length > 16) {
            reportStatus(905);
            return false;
        }
        if (!isLegalCharacters(oP)) {
            reportStatus(906);
            return false;
        }
    }
    if (isEmpty(nP)) {
        reportStatus(913);
        return false;
    }
    else {
        if (nP.length < 6 || nP.length > 16) {
            reportStatus(905);
            return false;
        }
        if (!isLegalCharacters(nP)) {
            reportStatus(906);
            return false;
        }
    }
    if (isEmpty(rP)) {
        reportStatus(913);
        return false;
    }
    else {
        if (rP.length < 6 || rP.length > 16) {
            reportStatus(905);
            return false;
        }
        if (!isLegalCharacters(rP)) {
            reportStatus(906);
            return false;
        }
    }
    if (nP != rP) {
        reportStatus(911);
        cForm.newPwd.value = "";
        cForm.retypePwd.value = "";
        cForm.newPwd.focus();
        return false;
    }

    return true;
}

/******************************************************************************
Function: isLegalCharacters
Parameters: string
Return: true or false
Description: Judge the string whether it is legal.
******************************************************************************/
function isLegalCharacters(s)
{
    var str;
    var len;
    var i;
    var c;

    str = new String(s);
    len = str.length;

    for(i=0; i < len; i++) {

        c = str.charAt(i);
        if ( (!(c >= '0' && c <= '9'))
            && (!(c >= 'a' && c <= 'z'))
            && (!(c >= 'A' && c <= 'Z'))
        )
        {
            return false;
        }
    }
    return true;
}

/******************************************************************************
Function: isEmpty
Parameters: string
Return: true or false
Description: Judge the string whether it is empty.
******************************************************************************/
function isEmpty(strValue)
{
    var myString = new String(strValue);
    var len = myString.length;
    if ("" == myString)
    {
        return true;
    }
    for (var i=0; i < len; ++i)
    {
        if(myString.charAt(i) != " ")
        {
            return false;
        }
    }
    return true;
}

/******************************************************************************
Function: getChallenge
Parameters: none
Return: challenge
Description: Send XMLHttpRequest get challenge.
******************************************************************************/
function getChallenge()
{
    var challenge = sendRequest("GetChallge.php?challenge=getChallenge"); 
    return ""+challenge+"";
}

/******************************************************************************
Function: getAuthCode
Parameters: none
Return: authCode
Description: Send XMLHttpRequest get authCode.
******************************************************************************/
function getAuthCode()
{	
    var authCode;
    //authCode = sendRequest("ConfigInfo.php?data=AuthCode"); 
authCode ="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";
    return ""+authCode+"";
}

/******************************************************************************
Function: doAuth
Parameters: dogid, strDigest
Return: factor
Description: Send XMLHttpRequest do authenticate.
******************************************************************************/
function doAuth(dogid, strDigest)
{
    var ret = sendRequest("AuthChk.php?dogid="+dogid+"&digest="+strDigest+"");   
    return ret;
}

/******************************************************************************
Function: sendRequest
Parameters: url
Return: response text
Description: Send XMLHttpRequest
******************************************************************************/
function sendRequest(url)
{
    var httpRequest = null;

    if (window.XMLHttpRequest)
    {
        httpRequest = new XMLHttpRequest();
    }
    else
    {
        try
        {	
            httpRequest = new ActiveXObject("Msxm12.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e)
            {
            }
        }
    }
	
    if (null == httpRequest)
    {
        return false;
    }

    httpRequest.open('GET', url, false);
    httpRequest.send(null);
    var xmlText = httpRequest.responseText;
    var reg = /[^\[][^\]]*[^\]]/;
    var newXmlText = reg.exec(xmlText);

    return newXmlText;
}

/******************************************************************************
Function: getAuthObject
Parameters: none
Return: an object for authentication
Description: get object for authentication
******************************************************************************/
function getAuthObject() {
    var objAuth;
    if (window.ActiveXObject || "ActiveXObject" in window) //IE
    {
        objAuth = document.getElementById("AuthIE");
    }
    else if (navigator.userAgent.indexOf("Chrome") > 0) {
        objAuth = getAuthObjectChrome();
    }
    else {
        objAuth = document.getElementById("AuthNoIE");
    }

    return objAuth;
}

/******************************************************************************
Function: embedTag
Parameters: none
Return: none
Description: embed tag of object for authentication
******************************************************************************/
function embedTag() {
    if (window.ActiveXObject || "ActiveXObject" in window) {//IE
        ;
    }
    else if (navigator.userAgent.indexOf("Chrome") > 0) {//Chrome
        ;
    }
    else {
        var temp = document.body.innerHTML;
        var tag = "<embed id=\"AuthNoIE\" type=\"application/x-dogauth\" width=0 height=0 hidden=\"true\"></embed>";
        document.body.innerHTML = tag + temp;
    }
}

/******************************************************************************
Function: clearInfo
Parameters: none
Return: none
Description: Clear the error info displayed in page.
******************************************************************************/
function clearInfo() {
    document.getElementById("errorinfo").innerHTML = "";
}

/******************************************************************************
Function: reportStatus
Parameters: status
Return: Description
Description: Report status's description.
******************************************************************************/
function reportStatus(status) {
    var text = "Unknown status code";
    switch (status) {
        case 0: text = "Success";
            break;
        case 1: text = "Request exceeds data file range";
            break;
        case 3: text = "System is out of memory";
            break;
        case 4: text = "Too many open login sessions";
            break;
        case 5: text = "Access denied";
            break;
        case 7: text = "Required SuperDog not found";
            break;
        case 8: text = "Encryption/decryption data length is too short";
            break;
        case 9: text = "Invalid input handle";
            break;
        case 10: text = "Specified File ID not recognized by API";
            break;
        case 15: text = "Invalid XML format";
            break;
        case 18: text = "SuperDog to be updated not found";
            break;
        case 19: text = "Invalid update data";
            break;
        case 20: text = "Update not supported by SuperDog";
            break;
        case 21: text = "Update counter is set incorrectly";
            break;
        case 22: text = "Invalid Vendor Code passed";
            break;
        case 24: text = "Passed time value is outside supported value range";
            break;
        case 26: text = "Acknowledge data requested by the update, however the ack_data input parameter is NULL";
            break;
        case 27: text = "Program running on a terminal server";
            break;
        case 29: text = "Unknown algorithm used in V2C file";
            break;
        case 30: text = "Signature verification failed";
            break;
        case 31: text = "Requested Feature not available";
            break;
        case 33: text = "Communication error between API and local SuperDog License Manager";
            break;
        case 34: text = "Vendor Code not recognized by API";
            break;
        case 35: text = "Invalid XML specification";
            break;
        case 36: text = "Invalid XML scope";
            break;
        case 37: text = "Too many SuperDog currently connected";
            break;
        case 39: text = "Session was interrupted";
            break;
        case 41: text = "Feature has expired";
            break;
        case 42: text = "SuperDog License Manager version too old";
            break;
        case 43: text = "USB error occurred when communicating with a SuperDog";
            break;
        case 45: text = "System time has been tampered with";
            break;
        case 46: text = "Communication error occurred in secure channel";
            break;
        case 50: text = "Unable to locate a Feature matching the scope";
            break;
        case 54: text = "The values of the update counter in the file are lower than those in the SuperDog";
            break;
        case 55: text = "The first value of the update counter in the file is greater than the value in the SuperDog";
            break;
        case 400: text = "Unable to locate dynamic library for API";
            break;
        case 401: text = "Dynamic library for API is invalid";
            break;
        case 500: text = "Object incorrectly initialized";
            break;
        case 501: text = "Invalid function parameter";
            break;
        case 502: text = "Logging in twice to the same object";
            break;
        case 503: text = "Logging out twice of the same object";
            break;
        case 525: text = "Incorrect use of system or platform";
            break;
        case 698: text = "Requested function not implemented";
            break;
        case 699: text = "Internal error occurred in API";
            break;
        case 802: text = "Parameter error";
            break;
        case 803: text = "Verify password failed";
            break;
        case 804: text = "Modify password failed";
            break;
        case 810: text = "Password's length is wrong";
            break;
        case 811: text = "Name's length is wrong";
            break;
        case 812: text = "Info's length is wrong";
            break;
        case 813: text = "Name's length is wrong";
            break;
        case 814: text = "Parameter error";
            break;
        case 820: text = "Hardware internal error!";
            break;
        case 821: text = "Parameter error";
            break;
        case 822: text = "Need to verify Password";
            break;
        case 823: text = "Verify password failed";
            break;
        case 824: text = "Need to initialize";
            break;
        case 825: text = "Password has been locked";
            break;
        case 831: text = "Verify password failed, you still have 14 chances";
            break;
        case 832: text = "Verify password failed, you still have 13 chances";
            break;
        case 833: text = "Verify password failed, you still have 12 chances";
            break;
        case 834: text = "Verify password failed, you still have 11 chances";
            break;
        case 835: text = "Verify password failed, you still have 10 chances";
            break;
        case 836: text = "Verify password failed, you still have 9 chances";
            break;
        case 837: text = "Verify password failed, you still have 8 chances";
            break;
        case 838: text = "Verify password failed, you still have 7 chances";
            break;
        case 839: text = "Verify password failed, you still have 6 chances";
            break;
        case 840: text = "Verify password failed, you still have 5 chances";
            break;
        case 841: text = "Verify password failed, you still have 4 chances";
            break;
        case 842: text = "Verify password failed, you still have 3 chances";
            break;
        case 843: text = "Verify password failed, you still have 2 chances";
            break;
        case 844: text = "Verify password failed, you still have 1 chance";
            break;
        case 845: text = "Password has been locked";
            break;
        case 901: text = "Authenticate failed";
            break;
        case 902: text = "Generate challenge string failed";
            break;
        case 903: text = "Name is illegal";
            break;
        case 904: text = "Please enter your password";
            break;
        case 905: text = "Password's length should be between 6-16 characters";
            break;
        case 906: text = "Password is illegal";
            break;
        case 907: text = "Please enter your user name";
            break;
        case 908: text = "Please enter your confirm password";
            break;
        case 909: text = "Confirm password's length should be between 6-16 characters";
            break;
        case 910: text = "Password is illegal";
            break;
        case 911: text = "Passwords do not match";
            break;
        case 912: text = "Please enter your current password";
            break;
        case 913: text = "Please enter your new password";
            break;
        case 914: text = "Name length should be between 1-32 characters";
            break;
        case 915: text = "The SuperDog has been registered";
            break;
        case 916: text = "no dog_auth_srv in java.library.path";
            break;
        case 917: text = "Fail to get challenge";
            break;
        case 918: text = "Fail to get challenge";
            break;
        case 919: text = "Cannot find session file! Please confirm you have created session folder and set the folder path!";
            break;
        case 920: text = "Fail to load the library: dog_auth_srv_php.dll! Please confirm that your configuration file is right.";
            break;

    }
    document.getElementById("errorinfo").innerHTML = text + " (" + status + ")\n";
}

/**********************************************************************************************
Class: AuthObject
Dynamic prototype method
Description: used for Chrome and produced with dynamic prototype method
***********************************************************************************************/
function AuthObject() {

    if (typeof AuthObject._initialized == "undefined") {

        // GetUserNameEx
        AuthObject.prototype.GetUserNameEx = function (scope, authCode) {
            //console.log("enter GetUserNameEx()");
            window.postMessage({ type: "SNTL_FROM_PAGE", text: { "InvokeMethod": "GetUserNameEx", "Scope": scope, "AuthCode": authCode} }, "*");
            return 0;
        };

        // GetDigestEx
        AuthObject.prototype.GetDigestEx = function (scope, authCode, password, challenge) {
            //console.log("enter GetDigestEx()");
            window.postMessage({ type: "SNTL_FROM_PAGE", text: { "InvokeMethod": "GetDigestEx", "Scope": scope, "AuthCode": authCode, "UserPin": password, "Challenge": challenge} }, "*");
            return 0;
        };

        // RegisterUserEx   
        AuthObject.prototype.RegisterUserEx = function (scope, authCode, username, password) {
            //console.log("enter RegisterUserEx()");
            window.postMessage({ type: "SNTL_FROM_PAGE", text: { "InvokeMethod": "RegisterUserEx", "Scope": scope, "AuthCode": authCode, "Name": username, "UserPin": password } }, "*");
            return 0;
        };

        // ChangeUserPinEx
        AuthObject.prototype.ChangeUserPinEx = function (scope, authCode, oldPassword, newPassword) {
            //console.log("enter ChangeUserPinEx()");
            window.postMessage({ type: "SNTL_FROM_PAGE", text: { "InvokeMethod": "ChangeUserPinEx", "Scope": scope, "AuthCode": authCode, "OldPin": oldPassword, "NewPin": newPassword } }, "*");
            return 0;
        };

        // SetUserDataEx
        AuthObject.prototype.SetUserDataEx = function (scope, authCode, password, type, offset, data) {
            //console.log("enter SetUserDataEx()");
            window.postMessage({ type: "SNTL_FROM_PAGE", text: { "InvokeMethod": "SetUserDataEx", "Scope": scope, "AuthCode": authCode, "UserPin": password, "Type": type, "Offset": offset, "Data": data } }, "*");
            return 0;
        };

        // GetUserDataEx
        AuthObject.prototype.GetUserDataEx = function (scope, authCode, type, offset, size) {
            //console.log("enter GetUserDataEx()");
            window.postMessage({ type: "SNTL_FROM_PAGE", text: { "InvokeMethod": "GetUserDataEx", "Scope": scope, "AuthCode": authCode, "Type": type, "Offset": offset, "Size": size } }, "*");
            return 0;
        };

        // EnumDog
        AuthObject.prototype.EnumDog = function (authCode) {
            //console.log("enter EnumDog()");
            window.postMessage({ type: "SNTL_FROM_PAGE", text: { "InvokeMethod": "EnumDog", "AuthCode": authCode} }, "*");
            return 0;
        };

        AuthObject._initialized = true;
    }
}

/**********************************************************************************************
Function: getAuthObjectChrome
Parameters: none
Return: an AuthObject object
Description: get object for authentication 
***********************************************************************************************/
function getAuthObjectChrome() {
    var obj = new AuthObject();
    return obj;
}

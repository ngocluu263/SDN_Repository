function updatepassword(){
	var userName = $('#uname').val();
	var currPwd = $('#currPwd').val();
	var newPwd = $('#newPwd').val();
	jdata = {};
	jdata['userName'] = userName;
	jdata['currPwd'] = currPwd;
	jdata['newPwd'] = newPwd;
	console.log(jdata);
	objdata = JSON.stringify(jdata);

	if(userName == ""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the Name");
		//alert("Please Enter the Name");
		//$('#uname').val("");
		//$('#currPwd').val("");
		//$('#newPwd').val("");
		$('#userName').focus();
		return;
	} else if(userName == "admin"){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Default Admin Credentials Cannot be Changed");
		//alert("Default Admin Credentials Cannot be Changed");
		$('#uname').val("");
		$('#currPwd').val("");
		$('#newPwd').val("");
		$('#userName').focus();
		return;
	}
	if(currPwd == ""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the Current Password");
		//$('#uname').val("");
		//$('#currPwd').val("");
		//$('#newPwd').val("");
		//alert("Please Enter the Current Password");
		$('#currPwd').focus();
		return;
	}
	if(newPwd == ""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the New Password that you want to set");
		//$('#uname').val("");
		//$('#currPwd').val("");
		//$('#newPwd').val("");
		//alert("Please Enter the New Password that you want to set");
		$('#newPwd').focus();
		return;
	}
	var url = "../CIDD/rest/configuration/updatePwd";
	$.ajax({
		type : "POST",
		dataType : "html",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		data : objdata,
		statusCode : {
			200 : function() {
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("Updated the Password Successfully");
				//alert("Updated the Password Successfully");
				$('#uname').val("");
				$('#currPwd').val("");
				$('#newPwd').val("");
				$( "#change_password" ).popup( "close" );		
			},
			400 : function(){
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("Could not Update the Password");
				$('#uname').val("");
				$('#currPwd').val("");
				$('#newPwd').val("");
				//alert("Could not Update the Password");
			}
			,
			206 : function(){
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("User not Present");
				$('#uname').val("");
				$('#currPwd').val("");
				$('#newPwd').val("");
				//alert("User not Present.");
			},
			401 : function(){
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("Cannot Update Admin Password");
				$('#uname').val("");
				$('#currPwd').val("");
				$('#newPwd').val("");
				//alert("Cannot Update Admin Password");
			}
			,
			406 : function(){
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("Current Password is Incorrect");
				$('#uname').val("");
				$('#currPwd').val("");
				$('#newPwd').val("");
				//alert("Current Password is Incorrect");
			}
		}
	}).error(function(xhr, errorText) {
	});
}
$(document).ready(function() {
	$('#pop_up_alerts').hide();
	$('#uname, #currPwd, #newPwd').on("click", function() {
		$('#pop_up_alerts').hide();
	});
})

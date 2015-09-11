$(document).ready(function() {
	/* Setting height to fit the screen */	
	$('#settings_img').css({'height': $(window).height()-$("#header").height()-$("#footer").height()});
	$('#login-box').css({'margin-top': ($("#login-body").height()-$("#login-box").height())/2});
	$('#contact_info').css({'margin-top': ($("#login-body").height()-$("#login-box").height())/3});
	//$('#TEL_logo').css({'height': $("#header_title").height()});
	$('#TEL_logo').css({'height': $("#cid_logo").height()-($("#cid_logo").height()/60)});
	$('#TEL_logo').css({'width': $("#cid_logo").width()});
	//$('#login-header').css({'height': $("#header_title").height()});
	//$('#TEL_logo').css({'margin-top': ($("#header").height()-$("#TEL_logo").height())/2});
	
	/* Info in Forgot Password Modal */	
	$('#userNameForForgotPwd').on("click", function() {
		$('#FP_alerts').hide();
		$('#pop_up_alerts').hide();
		
	});
	
	$('#forgot_pw_link').on("click", function() {
		$('#FP_alerts').show();
		
		//$('#FP_text1').text("");
		$('#pop_up_alerts').hide();
		});	
	
	/*Hide the error message on click of username or password input textbox*/
	$('#user_name, #pass_word, #forgot_pw_link').on("click", function() {
		$('#errorMsg').hide();
		$('#contact_info').css({'margin-top': ($("#login-body").height()-$("#login-box").height())/3});
	});
	/*Forgot password */
	$('#ok_button_pop_up').on('click', function() {	
		$('#FP_alerts').hide();
		var user_forgot_pwd = $('#userNameForForgotPwd').val();
		jdata = {};
		if(user_forgot_pwd == ""){
			$('#pop_up_alerts').show();
			$('#pop_up_alerts').text("Please Enter the Username");
			//alert("Please Enter the Username");
			$('#userNameForForgotPwd').focus();
			$('#userNameForForgotPwd').val("");
			return ;
		}
		if('admin'==user_forgot_pwd){
			$('#pop_up_alerts').show();
			$('#pop_up_alerts').text("Sorry! You cannot change Admin User Credentials");
			//alert("Sorry! You cannot change Admin User Credentials");
			$('#userNameForForgotPwd').focus();
			$('#userNameForForgotPwd').val("");
			return ;
		}
	var objData = '{"username":"' + user_forgot_pwd + '"}';
	console.log(objData);
	var url = "../CIDD/rest/user/forgotPwd";
	$.ajax({
		type : "POST",
		dataType : "html",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		data : objData,
		statusCode : {
			200 : function(data) {
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("Password has been sent to your Registered Mail.");
				//alert("Password has been sent to your Registered Mail.");
				//$("#forgot_pw_close_btn").trigger("click");
				$('#loading').hide();
				$('#userNameForForgotPwd').val("");
			},
			206 : function(){
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("Invalid Username");
				//alert("Invalid Username");
				$('#userNameForForgotPwd').val("");
				$('#loading').hide();
				$( "#forgot_password" ).popup( "open" );
			},
			400 : function(){
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("Could Not Authenticate the Email ID");
				$('#userNameForForgotPwd').val("");
				//alert("Could Not Authenticate the Email ID");
				$('#loading').hide();
			},
			401 : function(){
				$('#pop_up_alerts').show();
				$('#pop_up_alerts').text("No Such Users");
				$('#userNameForForgotPwd').val("");
				//alert("No Such Users");
				$('#loading').hide();
			},
			503 : function(){
				$('#errorMsg').fadeIn("15000");
				$('#errorLogin').text("Service unavailable!!!");
			},
		}
		}).error(function(xhr, errorText) {
			
		});
	});	
});
/*Login functionality*/
function login() {
	sessionStorage.setItem('login_validate', 0);
	var username = $('#user_name').val();
	var password = $('#pass_word').val();
	var userType=$('#UserType-button span').text();
	console.log(userType +"--->usertype");
	if (username == "" || password == "") {
		$('#errorMsg').fadeIn("15000");
		$('#errorLogin').text("Please Enter Username and Password");
		$('#contact_info').css({'margin-top': ($("#login-body").height()-$("#login-box").height())/5});
		$('#user_name').val("");
		$('#pass_word').val("");
		return;
	} 
	var loginData = '{"username":"' + username + '","password":"' + password + '"}';
	var url = "../CIDD/rest/user/login";
	$.ajax({
		type : "POST",
		dataType : "html",
		contentType : "application/json",
		url : url,
		data : loginData,
		statusCode : {
			200 : function() {
				sessionStorage.setItem('login_validate', 1);
				sessionStorage.setItem('login_user', username);
				window.location.href = "html/home.html";
			},
			401 : function(){
				$('#errorMsg').fadeIn("15000");
				$('#errorLogin').text("Please Enter Valid Username and Password");
				$('#contact_info').css({'margin-top': ($("#login-body").height()-$("#login-box").height())/5});
				$('#user_name').val("");
				$('#pass_word').val("");
			},
			404 : function(){
				$('#errorMsg').fadeIn("15000");
				$('#errorLogin').text("No such users!!!");
				$('#contact_info').css({'margin-top': ($("#login-body").height()-$("#login-box").height())/5});
				$('#user_name').val("");
				$('#pass_word').val("");
			},
			503 : function(){
				$('#errorMsg').fadeIn("15000");
				$('#errorLogin').text("Service unavailable!!!");
			},
		}
	}).error(function(xhr, errorText) {
		
	});
}




	
$(document).ready(function() {
	// alert("In config user js");
	$('#pop_up_alerts').hide();
	load_users_list();
	$('#edit_user_list').show();
	$("#user_rem_btn").attr('disabled', false);
	$('#user_table').hide();
	$('#user_table').css({'height': $(window).height()-3*$("#header").height()-2*$("#footer").height()});
	$('#user_table').css({'overflow-y': 'scroll'});
	$('#user_table').css({'overflow-x': 'hidden'});

});
// Adding new user to the list
function update_user_list(){
	$('#edit_user_list').show();
	var name = $('#name').val();
	var username = $('#user_name').val();
	var password = $('#Pwd').val();
	var mailid = $('#mail_id').val();
	var usertype = $("#user_type option:selected").text();
	$("#user_rem_btn").attr('disabled', false);
	if(name === ""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the Name");
	}else if(username ===""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the Username");
	}else if(password ===""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the Password");
	}else if(mailid ===""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the Email ID");
	}else if((usertype ==="") || (usertype ===null)){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Select the User previlege type");
	}else{
		var userData = '{"name":"' + name + '","username":"' + username + 
			'","password":"' + password + '","emailId":"' + mailid + '","userType":"' + usertype + '"}';
		var url = "../rest/user/add";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : userData,
			statusCode : {
				200 : function() {
					alert("User Added Successfully");
					load_users_list();
					localStorage.setItem("datasaved","yes");
					$('#name').val("");
					$('#user_name').val("");
					$('#Pwd').val("");
					$('#mail_id').val("");
					$('#u_type').val("");
				},
				206 : function(){
					alert("User Already Present in the Database");
					localStorage.setItem("datasaved","yes");
				},
				400 : function(){
					alert("Could not Add the User.");
					localStorage.setItem("datasaved","yes");
				},
				204 : function(){
					alert("Email has not been sent to the Respective User. But the User has been Registered.");
					localStorage.setItem("datasaved","yes");
					$('#name').val("");
					$('#user_name').val("");
					$('#Pwd').val("");
					$('#mail_id').val("");
					$('#u_type').val("");
					},
				207 : function(){
					alert("User Cannot Create Admin ");
					localStorage.setItem("datasaved","yes");
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}

}
$('#name, #user_name, #Pwd, #mail_id, #u_type ').on("click", function() {
		$('#pop_up_alerts').hide();
});
//Loading userlist
function load_users_list(){
	//alert('inside load_users_list');
	$('#edit_user_list').show();
	var url = "../rest/user/get";
	$.ajax({
		type : "GET",
		dataType : "html",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			data = jQuery.parseJSON(data);
			var len = data.length;
			if(len == 0){
				$('#user_info').show();
				$('#user_info').text("No User to Display");
				$("#user_rem_btn").attr('disabled', true);
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>User</th>"+
						"<th>Email Address</th>"+
						"<th>previlege</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += "<tr><td><input type='checkbox' class='deleteUser' value="+data[count].userId+"></td>" +
							 "<td>"+data[count].username+"</td>" +
							 "<td>"+data[count].emailId+"</td>" +
							 "<td>"+data[count].userType+"</td>" +
							 "</tr>";
				}
				table +="</table>";
				$('#user_info').hide();
				$('#user_table').show();
				$('#user_table').html(table);
			}
		}
	}).error(function(xhr, errorText) {
		//alert("Could not load the users list");
		$("#user_add_btn").attr('disabled', true);
		$("#user_rem_btn").attr('disabled', true);
		$('#user_info').show();
		$('#user_info').text("Could not load the users list");
		$('#edit_user_list').hide();
	});
}
// Removing the user from the list
$("#user_rem_btn").on('click',function(){
	$('#edit_user_list').show();
	var userId = [];
	var chkArray = [];
	$(".deleteUser:checked").each(function() {
		chkArray.push($(this).val());
	});

	var len=chkArray.length;	
	if(chkArray.length==0){
		alert("Please Select Atleast One..."); 
	}else{
		if(chkArray.length>5){
			alert("Please Select Only 5 Users");
		}else{
			for(var i=0;i<len;i++){
				userId.push(chkArray[i]);	
			}
		}	
		var jData = '{"userId":"' + userId + '"}';
		//$( "#create_user_modal" ).popup( "close" );
		var url = "../rest/user/removeUser";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Deleted Successfully");
					load_users_list();
					//$('#Rem_AR').trigger('click');
					//$( "#myPopup" ).popup( "open" );
				},
				400 : function(){
					alert("User has not been Deleted ,Please Try Again!!!");
					//$('#Rem_AR').trigger('click');
					//$( "#myPopup" ).popup( "open" );
				}
			}
		}).error(function(xhr, errorText) {

		});
	
		}
	});					



$(document).ready(function() {
	//alert("In config email js");
	$('#email_info').hide();
	$('#email_list').hide();
	load_project_list();
	$("#email_rem_btn").attr('disabled', false);
	$('#pop_up_alerts').hide();
	$('#edit_email_list').show();
	$('#email_list').css({'height': $(window).height()-3*$("#header").height()-3*$("#footer").height()});
	$('#email_list').css({'overflow-y': 'scroll'});
	$('#email_list').css({'overflow-x': 'hidden'});
});

// For a fixed header
//var tableOffset = $("#email_table_dyn").offset().top;
//var $header = $("#email_table_dyn > thead").clone();
//var $fixedHeader = $("#email_header_fixed").append($header);

$(window).bind("scroll", function() {
    var offset = $(this).scrollTop();
    
    if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
        $fixedHeader.show();
    }
    else if (offset < tableOffset) {
        $fixedHeader.hide();
    }
});

$('#email_id').on("click", function() {
	$('#pop_up_alerts').hide();
});

$('#proj_name').change("click", function() {
	load_email_list();
});

function add_email_list(){
	var mailId = $('#email_id').val();
	var projectId = $('#proj_name').val();	
	var jData = '{"projectId":"' + projectId + '","email":"' + mailId + '"}';
	$("#email_rem_btn").attr('disabled', false);
	//mailId = $('#email_id').val();
	//projectId = $('#proj_name').val();	
	if(mailId == ""){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please Enter the E-mail ID");
	}else if( projectId == "" || projectId == "Select" || proj_name ===null){
		$('#pop_up_alerts').show();
		$('#pop_up_alerts').text("Please select the Project name");
	}else{
		reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (reg.test($('#email_id').val()) == false){
				alert('Invalid Email Address');
				return;
		}
		$('#pop_up_alerts').hide();
		var url="../rest/emails/addEmail";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			data : jData,
			crossDomain : true,
			statusCode : {
				200 : function() {
					alert("Email has been Added Successfully");
					$("#emailList").val("");
					load_email_list();
				},
				205 : function(data) {
					alert("One Or More Email Already Present In DB");
					$("#emailList").val("");
				},
				206 : function() {
					alert("Incorrect Email Format,Please Provide Correct Email Format");
				},
				400 : function(){
					alert("Email Not Added");
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);

		});
	}
}

//Loading Project list
function load_project_list(){
	//alert('on onLoad');
	var url = "../rest/projects/getProjects";
	$.ajax({
		type : "GET",
		dataType : "html",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			data = jQuery.parseJSON(data);
			var len  = data.length;
			$('#proj_name').empty();
			if(len=='0'){
				$('#proj_name').append('<option value="Select">Select</option>');
			}else{
				$('#proj_name').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#proj_name').append('<option value="' + data[count].projectId + '">' + data[count].projectName + '</option>');
				}
				document.getElementById('proj_name').selectedIndex = '1';
				load_email_list();
			}
		}
	}).error(function(xhr, errorText) {
		$('#email_info').show();
		$('#email_info').text("Could not load the Project list");
		$('#edit_email_list').hide();
		alert(errorText);
	});
}

//Loading E-mail list
function load_email_list(){
	$('#edit_email_list').show();
	var url = "../rest/emails/getEmails";
	var projectId = $('#proj_name').val();
	if(projectId == "Select" || projectId == ""){
		alert("Please Select Project");
		return false;
	}
	var jData = '{"projectId":"' + projectId +'"}';
	$.ajax({
		type : "POST",
		dataType : "html",
		contentType : "application/json",
		url : url,
		data : jData,
		crossDomain : true,
		success : function(data) {
			data = jQuery.parseJSON(data);
			var len = data.length;
			console.log(len);
			if(len==0){
				$('#email_info').show();
				$('#email_info').text("No E-Mail to Display");
				$("#email_rem_btn").attr('disabled', true);
				$('#edit_email_list').hide();
			}else{
				table = '<table id="email_table_dyn"><tbody>'+
						"<thead><tr><th></th>"+
						"<th>Project</th>"+
						"<th>Email Address</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += "<tr><td><input type='checkbox' class='deleteEmail' value="+data[count].emailId+"></td>" +
							 "<td>"+data[count].projectName+"</td>" +
							 "<td>"+data[count].email+"</td>" +
							 "</tr>";
				}
				//table +="</tbody></table>"+'<table id="email_header_fixed"></table>';
				$('#email_info').hide();
				$('#email_list').show();
				$('#email_list').html(table);
			}
		}
	}).error(function(xhr, errorText) {
		//alert("Could not load the E-mail list");
		$("#email_add_btn").attr('disabled', true);
		$("#email_rem_btn").attr('disabled', true);
		$('#email_info').show();
		$('#edit_email_list').hide();
		$('#email_info').text("Could not load the E-mail list");
	});
}

//Delete email list
$("#email_rem_btn").on('click',function(){
	$('#edit_email_list').show();
	var emailId = [];
	var chkArray = [];
	$(".deleteEmail:checked").each(function() {
		chkArray.push($(this).val());
	});
	var len=chkArray.length;	
	if(chkArray.length==0){
		alert("Please Select Atleast One..."); 
	}else{
		if(chkArray.length>5){
			alert("Please Select Only 5 Users");
		}else{
			//var finalObj = {};
			for(var i=0;i<len;i++){
				emailId.push(chkArray[i]);	
			}
		}	
		var jData = '{"emailId":"' + emailId + '"}';
		console.log(jData);
		//$( "#create_user_modal" ).popup( "close" );
		var url = "../rest/emails/removemail";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Email has been Deleted Successfully");
					load_email_list();
					//window.location.reload();
				},
				206 : function() {
					alert("Please Enter 1 Email Address");
					//window.location.reload();
				},
				202 : function() {
					alert("Email is not Available");
					//window.location.reload();
				},
				400 : function(){
					alert("Email is not Available so Not Added");
					//window.location.reload();
				}
			}
		}).error(function(xhr, errorText) {

		});
	}
});	

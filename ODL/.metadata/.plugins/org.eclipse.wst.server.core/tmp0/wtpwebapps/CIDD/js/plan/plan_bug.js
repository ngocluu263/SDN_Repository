$(document).ready(function() {
	$('#bug_list').css({'height': $(window).height()-5*$("#header").height()-4*$("#footer").height()});
	$('#bug_list').css({'overflow-y': 'scroll'});
	$('#bug_list').css({'overflow-x': 'hidden'});
	load_bug_list();
	$("#add_new_bug").show();
	$("#edit_bug_btn").hide();
	$("#save_bug_btn").hide();		
});

//Loading Bug list
function load_bug_list(){
	//alert('inside load_bug_list');
	$('#bug_list').show();
	var url = "../rest/bug/get";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#bug_list').text("No Bug to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint</th>"+
						"<th>User Story</th>"+
						"<th>Task</th>"+
						"<th>Test</th>"+
						"<th>Assigned To</th>"+
						"<th>Bug Title</th>"+
						"<th>Bug Description</th>"+
						"<th>Bug Severity</th>"+
						"<th>Bug Status</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td><a href="#" onclick="display_bug_details('+ count +')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
							 "<td>" +
							 	"<input type=hidden id=sprintId"+(count)+" value='"+data[count].sprintId+"'>"+
							 	"<input type=hidden id=sprintName"+(count)+" value='"+data[count].sprintName+"'>"
							 	+data[count].sprintName+
							 "</td>" +
							 "<td>" +
							 	"<input type=hidden id=userStoryId"+(count)+" value='"+data[count].userStoryId+"'>"+
							 	"<input type=hidden id=userStoryName"+(count)+" value='"+data[count].userStoryName+"'>"
							 	+data[count].userStoryName+
							 "</td>" +
							 "<td>" +
							 	"<input type=hidden id=taskId"+(count)+" value='"+data[count].taskId+"'>"+
							 	"<input type=hidden id=taskDescription"+(count)+" value='"+data[count].taskDescription+"'>"
							 	+data[count].taskDescription+
							 "</td>" +
							 "<td>" +
							 	"<input type=hidden id=testId"+(count)+" value='"+data[count].testId+"'>"+
							 	"<input type=hidden id=testSummary"+(count)+" value='"+data[count].testSummary+"'>"
							 	+data[count].testSummary+
							 "</td>" +
							 "<td>" +
							 	"<input type=hidden id=assignedTo"+(count)+" value='"+data[count].assignedTo+"'>"+
							 	"<input type=hidden id=assignedName"+(count)+" value='"+data[count].assignedName+"'>"
							 	+data[count].assignedName+
							 "</td>" +
							 "<td>" +
							 	"<input type=hidden id=bugId"+(count)+" value='"+data[count].bugId+"'>"+
							 	"<input type=hidden id=bugTitle"+(count)+" value='"+data[count].bugTitle+"'>"
							 	+data[count].bugTitle+
							 "</td>" +
							 "<td><input type=hidden id=bugDescription"+(count)+" value='"+data[count].bugDescription+"'>"+data[count].bugDescription+"</td>" +
							 "<td><input type=hidden id=bugSeverity"+(count)+" value='"+data[count].bugSeverity+"'>"+data[count].bugSeverity+"</td>" +
							 "<td><input type=hidden id=bugStatus"+(count)+" value='"+data[count].bugStatus+"'>"+data[count].bugStatus+"</td>" +
							 "</tr>";
				}
				table +="</table>";
				$('#bug_list').html(table);
			}
			getSprintRecordForDropdown();
		}
	}).error(function(xhr, errorText) {
		$('#bug_list').show();
		$('#bug_list').text("Could Not Load Bug List");
	});
}
$("#bug_sprint").on("change", function () {
	getUserStoryRecordForDropdownForSpecificSprint();
	getTaskRecordForDropdownForSpecificSprint();
	getTestRecordForDropdownForSpecificSprint();
	getUserRecordForDropdown();
});
function getSprintRecordForDropdown(){
	//alert('inside getSprintRecordForDropdown');
	var url = "../rest/common/sprintRecordForDropDown";
	$.ajax({
		type : "GET",
		async: false,
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			$('#bug_sprint').empty();
			if(len=='0'){
				$('#bug_sprint').append('<option value="Select">Select</option>');
			}else{
				$('#bug_sprint').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#bug_sprint').append('<option value="' + data[count].sprintId + '">' + data[count].sprintName + '</option>');
				}
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}
function getUserStoryRecordForDropdown(){
	//alert('inside getSprintRecordForDropdown');
	var url = "../rest/common/userStorytRecordForDropDown";
	$.ajax({
		type : "GET",
		async: false,
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			$('#bug_userstory').empty();
			if(len=='0'){
				$('#bug_userstory').append('<option value="Select">Select</option>');
			}else{
				$('#bug_userstory').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#bug_userstory').append('<option value="' + data[count].userStoryId + '">' + data[count].userStoryName + '</option>');
				}
				document.getElementById('bug_userstory').selectedIndex = '1';
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}
function getUserStoryRecordForDropdownForSpecificSprint(){
	//alert('inside getUserStoryRecordForDropdownForSpecificSprint');
	var sprintId = $('#bug_sprint').val();
	if(sprintId == "Select"){
		
	}else{
		var jData = '{"userStorySprintId":"' + sprintId + '"}';
		var url = "../rest/common/userStoryRecordForDropDownForSpecificSprint";
		$.ajax({
			type : "POST",
			async: false,
			dataType : "json",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			success : function(data) {
				var len = data.length;
				$('#bug_user_story').empty();
				if(len=='0'){
					$('#bug_user_story').append('<option value="Select">Select</option>');
				}else{
					$('#bug_user_story').append('<option value="Select">Select</option>');
					for(var count=0;count<len;count++){
						$('#bug_user_story').append('<option value="' + data[count].userStoryId + '">' + data[count].userStoryName + '</option>');
					}
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}
}
function getTaskRecordForDropdownForSpecificSprint(){
	//alert('inside getTaskRecordForDropDownForSpecificSprint');
	var sprintId = $('#bug_sprint').val();
	if(sprintId == "Select"){
		
	}else{
		var jData = '{"sprintId":"' + sprintId + '"}';
		var url = "../rest/common/taskRecordForDropDownForSpecificSprint";
		$.ajax({
			type : "POST",
			async: false,
			dataType : "json",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			success : function(data) {
				var len = data.length;
				$('#bug_task').empty();
				if(len=='0'){
					$('#bug_task').append('<option value="Select">Select</option>');
				}else{
					$('#bug_task').append('<option value="Select">Select</option>');
					for(var count=0;count<len;count++){
						$('#bug_task').append('<option value="' + data[count].taskId + '">' + data[count].taskDescription + '</option>');
					}
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}
}
function getTestRecordForDropdownForSpecificSprint(){
	//alert('inside getTestRecordForDropdownForSpecificSprint');
	var sprintId = $('#bug_sprint').val();
	if(sprintId == "Select"){
		return false;
	}else{
		var jData = '{"sprintId":"' + sprintId + '"}';
		var url = "../rest/common/testRecordForDropDownForSpecificSprint";
		$.ajax({
			type : "POST",
			async: false,
			dataType : "json",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			success : function(data) {
				var len = data.length;
				$('#bug_test').empty();
				if(len=='0'){
					$('#bug_test').append('<option value="Select">Select</option>');
				}else{
					$('#bug_test').append('<option value="Select">Select</option>');
					for(var count=0;count<len;count++){
						$('#bug_test').append('<option value="' + data[count].testId + '">' + data[count].testName + '</option>');
					}
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}
}
function getUserRecordForDropdown(){
	//alert('inside getUserRecordForDropdown');
	var url = "../rest/common/getUserRecordForDropdown";
	$.ajax({
		type : "GET",
		async: false,
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			$('#bug_assign').empty();
			if(len=='0'){
				$('#bug_assign').append('<option value="Select">Select</option>');
			}else{
				$('#bug_assign').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#bug_assign').append('<option value="' + data[count].userId + '">' + data[count].name + '</option>');
				}
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}
$('#add_new_bug').on('click',function(){
	var sprintId = $('#bug_sprint').val();
	var sprintName = $('#bug_sprint option:selected').text();
	var userStoryId = $('#bug_user_story').val();
	var userStoryName = $('#bug_user_story option:selected').text();
	var taskId = $('#bug_task').val();
	var taskDescription = $('#bug_task option:selected').text();
	var testId = $('#bug_test').val();
	var testSummary = $('#bug_test option:selected').text();
	var assignedTo = $('#bug_assign').val();
	var bugTitle=$('#bug_title').val();
	var bugDescription=$('#bug_description').val();
	var bugSeverity=$('#bug_severity').val();
	var bugStatus=$('#bug_status').val();
	if(sprintId == "Select"){
		alert("Please Select Sprint");
		return false;
	}
	if(userStoryId == "Select" && taskId == "Select" && testId == "Select"){
		alert("Please Select User Story, Task Or Test");
		return false;
	}
	if(userStoryId == "Select"){
		userStoryId = null;
		userStoryName = null;
	}
	if(taskId == "Select"){
		taskId = null;
		taskDescription = null;
	}
	if(testId == "Select"){
		testId = null;
		testSummary = null;
	}
	if(assignedTo === "" || assignedTo == "Select"){
		alert("Please Select Assigned To");
	}else if(bugTitle === ""){
		alert("Please Enter Bug Title");
	}else if(bugDescription === ""){
		alert("Please Enter Bug Description");
	}else if(bugSeverity === ""){
		alert("Please Select Sevrity");
	}else if(bugStatus === ""){
		alert("Please Select Status");
	}else{
		var jData = '{"sprintId":"' + sprintId +'","sprintName":"' + sprintName +  
			'","userStoryId":"' + userStoryId +'","userStoryName":"' + userStoryName +
			'","taskId":"' + taskId + '","taskDescription":"' + taskDescription + 
			'","testId":"' + testId +'","testSummary":"' + testSummary +'","assignedTo":"' + assignedTo +
			'","bugTitle":"' + bugTitle +'","bugDescription":"' + bugDescription +
			'","bugSeverity":"' + bugSeverity +'","bugStatus":"' + bugStatus + '"}';
		//console.log(jData);
		var url = "../rest/bug/add";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Bug Added Successfully");
					//localStorage.setItem("datasaved","yes");
					$('#bug_title').val("");
					$('#bug_desc').val("");
					load_bug_list();
				},
				206 : function(){
					alert("Bug Already Present in the Database");
				},
				400 : function(){
					alert("Could not Add Bug");
				},
				401 : function(){
					alert("Session-Out.Please Re-Login");
					window.location.href = "../../index.html";
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}

});


//Loading the contents present in the selected task
function edit_bug_details(row){

	$('#bug_sprint').val('');
	$('#bug_title').val('');
	$('#bug_desc').val('');
	$('#bug_severity').val('');
	$('#bug_status').val('');
	
}
$("#edit_bug").on("click", function () {
	$("#plan_bug_form :input").attr("disabled", false);
	$("#bug_sprint").attr("disabled", false);
	$("#bug_severity").attr("disabled", false);
	$("#bug_title").attr("disabled", true);
});
$('#save_bug').on('click',function(){
	var sprintId = $('#bug_sprint').val();
	var sprintName = $('#bug_sprint option:selected').text();
	var userStoryId = $('#bug_user_story').val();
	var userStoryName = $('#bug_user_story option:selected').text();
	var taskId = $('#bug_task').val();
	var taskDescription = $('#bug_task option:selected').text();
	var testId = $('#bug_test').val();
	var testSummary = $('#bug_test option:selected').text();
	var assignedTo = $('#bug_assign').val();
	var bugTitle=$('#bug_title').val();
	var bugDescription=$('#bug_description').val();
	var bugSeverity=$('#bug_severity').val();
	var bugStatus=$('#bug_status').val();
	var bugId=$('#perticular_bug_id').val();
	
	if(sprintId == "Select"){
		alert("Please Select Sprint");
		return false;
	}
	if(userStoryId == "Select" && taskId == "Select" && testId == "Select"){
		alert("Please Select User Story, Task Or Test");
		return false;
	}
	if(userStoryId == "Select"){
		userStoryId = null;
		userStoryName = null;
	}
	if(taskId == "Select"){
		taskId = null;
		taskDescription = null;
	}
	if(testId == "Select"){
		testId = null;
		testSummary = null;
	}
	if(assignedTo === "" || assignedTo == "Select"){
		alert("Please Select Assigned To");
	}else if(bugTitle === ""){
		alert("Please Enter Bug Title");
	}else if(bugDescription === ""){
		alert("Please Enter Bug Description");
	}else if(bugSeverity === ""){
		alert("Please Select Sevrity");
	}else if(bugStatus === ""){
		alert("Please Select Status");
	}else{
		var jData = '{"bugId":"' + bugId +'","sprintId":"' + sprintId +'","sprintName":"' + sprintName +  
			'","userStoryId":"' + userStoryId +'","userStoryName":"' + userStoryName +
			'","taskId":"' + taskId + '","taskDescription":"' + taskDescription + 
			'","testId":"' + testId +'","testSummary":"' + testSummary +'","assignedTo":"' + assignedTo +
			'","bugTitle":"' + bugTitle +'","bugDescription":"' + bugDescription +
			'","bugSeverity":"' + bugSeverity +'","bugStatus":"' + bugStatus + '"}';
		//console.log(jData);
		var url = "../rest/bug/update";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Bug saved Successfully");
					//localStorage.setItem("datasaved","yes");
					$('#bug_title').val("");
					$('#bug_desc').val("");
					//load_bug_list();
				},
				206 : function(){
					//alert("Bug Already Present in the Database");
				},
				400 : function(){
					alert("Could not Add Bug");
				},
				401 : function(){
					alert("Session-Out.Please Re-Login");
					window.location.href = "../../index.html";
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}

});
function display_bug_details(row){
	console.log('sprint id :: '+$('#sprintId'+row).val());
	$("#bug_title").val($('#bugTitle'+row).val());
	$("#bug_severity").val($('#bugSeverity'+row).val());
	$("#bug_status").val($('#bugStatus'+row).val());
	$("#bug_description").val($('#bugDescription'+row).val());
	
	$("#perticular_bug_id").val($('#bugId'+row).val());
	var sprintId = $('#sprintId'+row).val();
	var userStoryId = $('#userStoryId'+row).val();
	var taskId = $('#taskId'+row).val();
	var testId = $('#testId'+row).val();
	if(sprintId == "N/A"){
		document.getElementById('bug_sprint').selectedIndex = '0';
	}else{
		$('#bug_sprint').val(sprintId);
		getUserStoryRecordForDropdownForSpecificSprint();
		getTaskRecordForDropdownForSpecificSprint();
		getTestRecordForDropdownForSpecificSprint();
		getUserRecordForDropdown();
	}
	if(userStoryId == "N/A"){
		document.getElementById('bug_user_story').selectedIndex = '0';
	}else{
		$('#bug_user_story').val(userStoryId);	
	}
	if(taskId == "N/A"){
		document.getElementById('bug_task').selectedIndex = '0';
	}else{
		$('#bug_task').val(taskId);		
	}
	if(testId == "N/A"){
		document.getElementById('bug_test').selectedIndex = '0';
	}else{
		$('#bug_test').val(testId);		
	}
	$("#bug_assign").val($('#assignedTo'+row).val());
	$("#plan_bug_form :input").attr("disabled", true);	
	$("#add_new_bug").hide();
	
	if($('#bug_status').val()==="Declined" || $('#bug_status').val()==="Closed"){
		$("#edit_bug_btn").hide();
		$("#save_bug_btn").hide();
		alert("equal to declined or closed");
	}else{
		$("#edit_bug_btn").show();
		$("#save_bug_btn").show();	
		alert("status is editable");
	}
	/*if($('#bug_status').val()==="Declined" || $('#bug_status').val()==="Closed"){
		$("#edit_bug_btn").hide();
		$("#save_bug_btn").hide();
	}else{
		$("#edit_bug_btn").show();
		$("#save_bug_btn").show();		
	}*/	
	/*$("#bug_sprint").attr("disabled", true);

	$("#edit_bug").show();
	$("#save_bug").show();	

	$("#bug_sprint").attr("disabled", true);
	$("#bug_severity").attr("disabled", true);
	$("#add_new_bug_btn").hide();
	$("#bug_details_select").show();	
	edit_bug_details(row);
*/
}
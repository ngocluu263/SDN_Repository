$(document).ready(function() {
	$('#test_list').css({'height': $(window).height()-4*$("#header").height()-4*$("#footer").height()});
	$('#test_list').css({'overflow-y': 'scroll'});
	$('#test_list').css({'overflow-x': 'hidden'});

	$("#add_new_test").show();
	$("#edit_test").hide();
	$("#save_test").hide();	
	$("#test_details_select").hide();	
	load_test_list();
});

function getSprintRecordForDropdown(){
	//alert('inside getSprintRecordForDropdown');
	var url = "../rest/common/sprintRecordForDropDown";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			$('#test_spr').empty();
			if(len=='0'){
				$('#test_spr').append('<option value="Select">Select</option>');
			}else{
				$('#test_spr').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#test_spr').append('<option value="' + data[count].sprintId + '">' + data[count].sprintName + '</option>');
				}
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}
$("#test_spr").on("change", function () {
	getUserStoryRecordForDropdownForSpecificSprint();
	getTaskRecordForDropdownForSpecificSprint();
	getUserRecordForDropdown();
});
function getTaskRecordForDropdownForSpecificSprint(){
	//alert('inside getTaskRecordForDropDownForSpecificSprint');
	var sprintId = $('#test_spr').val();
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
				$('#task_assign').empty();
				if(len=='0'){
					$('#task_assign').append('<option value="Select">Select</option>');
				}else{
					$('#task_assign').append('<option value="Select">Select</option>');
					for(var count=0;count<len;count++){
						$('#task_assign').append('<option value="' + data[count].taskId + '">' + data[count].taskDescription + '</option>');
					}
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}
}
function getUserStoryRecordForDropdownForSpecificSprint(){
	//alert('inside getUserStoryRecordForDropdownForSpecificSprint');
	var sprintId = $('#test_spr').val();
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
				$('#test_user_story').empty();
				if(len=='0'){
					$('#test_user_story').append('<option value="Select">Select</option>');
				}else{
					$('#test_user_story').append('<option value="Select">Select</option>');
					for(var count=0;count<len;count++){
						$('#test_user_story').append('<option value="' + data[count].userStoryId + '">' + data[count].userStoryName + '</option>');
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
			$('#test_assign').empty();
			if(len=='0'){
				$('#test_assign').append('<option value="Select">Select</option>');
			}else{
				$('#test_assign').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#test_assign').append('<option value="' + data[count].userId + '">' + data[count].name + '</option>');
				}
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}
$('#add_new_test').on('click',function(){
	var sprintId = $('#test_spr').val();
	var sprintName = $('#test_spr option:selected').text();
	var taskId = $('#task_assign').val();
	var taskDescription = $('#task_assign option:selected').text();
	var userStoryId = $('#user_story').val();
	var userStoryName = $('#user_story option:selected').text();
	var assignedTo = $('#test_assign').val();
	var testStatus=$('#test_status').val();
	var testSummary=$('#test_summary').val();
	if(sprintId == "Select"){
		alert("Please Select Sprint");
		return false;
	}
	if(userStoryId == "Select" && taskId == "Select"){
		alert("Please Select User Story Or Task");
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
	if(assignedTo === "" || assignedTo == "Select"){
		alert("Please Select Assigned To");
	}else if(testStatus === ""){
		alert("Please Select Test Status");
	}else if(testSummary === ""){
		alert("Please Enter summary");
	}else{
		var jData = '{"sprintId":"' + sprintId + '","sprintName":"' + sprintName + 
		'","taskId":"' + taskId + '","taskDescription":"' + taskDescription +
		'","userStoryId":"' + userStoryId + '","userStoryName":"' + userStoryName +
		'","assignedTo":"' + assignedTo +'","testStatus":"' + testStatus + 
		'","testSummary":"' + testSummary + '"}';
		//console.log(jData);
		var url = "../rest/test/add";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Test Added Successfully");
					$('#test_status').val("");
					$('#test_summary').val("");
					load_test_list();
				},
				206 : function(){
					alert("Test Name Already Present in the Database");
				},
				400 : function(){
					alert("Could not Add Test.");
				},
				401 : function(){
					alert("Session-Out.Please Re-Login");
					window.location.href = "../index.html";
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}

});
//Loading Test list
function load_test_list(){
	$('#test_list').show();
	var url = "../rest/test/get";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#test_list').text("No Test to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint</th>"+
						"<th>Task</th>"+
						"<th>User Story</th>"+
						"<th>Name</th>"+
						"<th>Status</th>"+
						"<th>Summary</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td><a href="#" onclick="display_test_details('+ count +')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
							 "<td>" +
							 	"<input type=hidden id=sprintId"+(count)+" value='"+data[count].sprintId+"'>"+
							 	"<input type=hidden id=sprintName"+(count)+" value='"+data[count].sprintName+"'>"
							 	+data[count].sprintName+
							 "</td>" +
							 "<td>" +
							 	"<input type=hidden id=taskId"+(count)+" value='"+data[count].taskId+"'>"+
							 	"<input type=hidden id=taskDescription"+(count)+" value='"+data[count].taskDescription+"'>"
							 	+data[count].taskDescription+
							 "</td>" +
							 "<td>" +
							 	"<input type=hidden id=userStoryId"+(count)+" value='"+data[count].userStoryId+"'>"+
							 	"<input type=hidden id=userStoryName"+(count)+" value='"+data[count].userStoryName+"'>"
							 	+data[count].userStoryName+
							 "</td>" +
							 "<td><input type=hidden id=assignedTo"+(count)+" value='"+data[count].assignedTo+"'>"+data[count].assignedName+"</td>" +
							 "<td><input type=hidden id=testStatus"+(count)+" value='"+data[count].testStatus+"'>"+data[count].testStatus+"</td>" +
							 "<td>" +
							 "<input type=hidden id=testSummary"+(count)+" value='"+data[count].testSummary+"'>"+
							 "<input type=hidden id=testId"+(count)+" value='"+data[count].testId+"'>"
							 +data[count].testSummary+"</td>" +
							 "</tr>";
				}
				table +="</table>";
				$('#test_list').html(table);
			}
			getSprintRecordForDropdown();
		}
	}).error(function(xhr, errorText) {
		$('#test_list').text("Could not load the Test list");
	});
}
function display_test_details(row){
	$('#test_id').val($('#testId'+row).val());
	var sprintId = $('#sprintId'+row).val();
	var taskId = $('#taskId'+row).val();
	var userStoryId = $('#userStoryId'+row).val();
	var assignedTo = $('#assignedTo'+row).val();
	var testStatus = $('#testStatus'+row).val();
	var testSummary = $('#testSummary'+row).val();
	/*alert(testId+", "+sprintId+", "+sprintName+", "+taskId+", "+taskDescription+", "+
		userStoryId+", "+userStoryName+", "+bugId+", "+bugTitle+", "+assignedTo+", "+testStatus+", "+testSummary);*/
	if(sprintId == "N/A"){
		document.getElementById('test_spr').selectedIndex = '0';
	}else{
		$('#test_spr').val(sprintId);
		getUserStoryRecordForDropdownForSpecificSprint();
		getTaskRecordForDropdownForSpecificSprint();
		getUserRecordForDropdown();
	}
	if(taskId == "N/A"){
		document.getElementById('task_assign').selectedIndex = '0';
	}else{
		$('#task_assign').val(taskId);		
	}
	if(userStoryId == "N/A"){
		document.getElementById('test_user_story').selectedIndex = '0';
	}else{
		$('#user_story').val(userStoryId);	
	}
	$('#test_assign').val(assignedTo);
	$('#test_status').val(testStatus);
	$('#test_summary').val(testSummary);
	$("#add_new_test").hide();
	$("#edit_test").show();
	$("#save_test").show();	
	$("#test_details_select").show();	
	$("#plan_test_form :input").attr("disabled", true);
	$("#test_spr").attr("disabled", true);
	$("#test_assign").attr("disabled", true);
	$("#test_status").attr("disabled", true);
	$("#add_new_rel_btn").hide();
	$('#test_list').css({'height': $(window).height()-5*$("#header").height()-4*$("#footer").height()});
	$("#bug_display_btn").click();


}
$("#edit_test").on("click", function () {
	$("#plan_test_form :input").attr("disabled", false);
	$("#test_spr").attr("disabled", false);
	$("#test_assign").attr("disabled", false);
	$("#test_status").attr("disabled", false);
});
$("#bug_display_btn").on("click", function () {
	var taskId = $('#task_assign').val();
	load_bug_list_For_Test();
	$('#bug_display_btn').removeClass('btn-default');
	$('#bug_display_btn').addClass('btn-primary');
	$("#test_path").text("");
	$("#test_path").append('<a href="#" onclick="load_test_list()">Test/</a>'+
		'<span>'+ taskId +'/</span>'
		+'<span">Bugs</span>');
});
$('#save_test').on('click',function(){
	var testId = $('#test_id').val();
	var sprintId = $('#test_spr').val();
	var sprintName = $('#test_spr option:selected').text();
	var taskId = $('#task_assign').val();
	var taskDescription = $('#task_assign option:selected').text();
	var userStoryId = $('#user_story').val();
	var userStoryName = $('#user_story option:selected').text();
	var assignedTo = $('#test_assign').val();
	var testStatus=$('#test_status').val();
	var testSummary=$('#test_summary').val();
	if(sprintId == "Select"){
		alert("Please Select Sprint");
		return false;
	}
	if(userStoryId == "Select" && taskId == "Select"){
		alert("Please Select User Story Or Task");
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
	if(assignedTo === "" || assignedTo == "Select"){
		alert("Please Select Assigned To");
	}else if(testStatus === ""){
		alert("Please Select Test Status");
	}else if(testSummary === ""){
		alert("Please Enter summary");
	}else{
		var jData = '{"testId":"' + testId + '","sprintId":"' + sprintId + '","sprintName":"' + sprintName + 
		'","taskId":"' + taskId + '","taskDescription":"' + taskDescription +
		'","userStoryId":"' + userStoryId + '","userStoryName":"' + userStoryName +
		'","assignedTo":"' + assignedTo +'","testStatus":"' + testStatus + '","testSummary":"' + testSummary + '"}';
		console.log(jData);
		var url = "../rest/test/update";
		$.ajax({
			type : "PUT",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Test Updated Successfully");
					$('#test_status').val("");
					$('#test_summary').val("");
				},
				206 : function(){
					alert("Test Name Already Present in the Database");
				},
				400 : function(){
					alert("Could not Updated Test.");
				},
				401 : function(){
					alert("Session-Out.Please Re-Login");
					window.location.href = "../index.html";
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);
		});
	}

});
//Display bugs
function display_bugs(){
	var test_id = $('#test_id').val();
	var url = "../rest/sprint/get";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#test_list').text("No Tests added to the Sprint");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint Name</th>"+
						"<th>End Date</th>"+
						"<th>Sprint Duration</th>"+
						"<th>Sprint Items</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td></td>' +
						"<td>"+data[count].sprintName+"</td>" +
						"<td>"+data[count].endDate.substring(0, 10)+"</td>" +
						"<td>"+data[count].sprintDuration+"</td>" +
						"<td>"+data[count].sprintItem+"</td>" +
						"</tr>";
				}
				table +="</table>";
				$('#test_list').html(table);
			}
		}
	}).error(function(xhr, errorText) {
		$('#test_list').show();
		$('#test_list').text("Could Not Load Sprint List");
	});
}

/*$("#task_bug_display_btn").on("click", function () {
	load_bug_list_For_Task();
	$('#task_bug_display_btn').removeClass('btn-default');
	$('#task_bug_display_btn').addClass('btn-primary');
	$("#task_test_display_btn").removeClass('btn-primary');
	$("#task_test_display_btn").addClass('btn-default');
});*/

function load_bug_list_For_Test(){
	
	//$('#task_list').show();
	var test_id = $('#test_id').val();
	
	var url = "../rest/test/getBugListForTest?test_id="+test_id;
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#test_list').text("No Bug to Display");
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
					table += '<tr><td></td>' +
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
				$('#test_list').html(table);
			}
			
		}
	}).error(function(xhr, errorText) {
		$('#test_list').show();
		$('#test_list').text("Could Not Load Bug List");
	});
}
function getUserStoryRecordForDropdown(){
	alert('inside getUserStoryRecordForDropdown');
	var url = "../rest/common/userStorytRecordForDropDown";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			$('#test_user_story').empty();
			if(len=='0'){
				$('#test_user_story').append('<option value="Select">Select</option>');
			}else{
				$('#test_user_story').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#test_user_story').append('<option value="' + data[count].userStoryId + '">' + data[count].userStoryName + '</option>');
				}
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}
$(document).ready(function() {
	//getSprintRecordForDropdown();
	$('#userstory_list').css({'height': $(window).height()-4*$("#header").height()-4*$("#footer").height()});
	$('#userstory_list').css({'overflow-y': 'scroll'});
	$('#userstory_list').css({'overflow-x': 'hidden'});

	load_UserStory_list();

	$("#add_new_us").show();
	$("#edit_us").hide();
	$("#save_us").hide();	
	$("#userstory_details_select").hide();	

});

function getReleaseRecordForDropdown(){
	//alert('inside getReleaseRecordForDropdown');
	var url = "../rest/common/releaseRecordForDropDown";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			//data = jQuery.parseJSON(data);
			var len = data.length;
			$('#us_release').empty();
			if(len=='0'){
				$('#us_release').append('<option value="Select">Select</option>');
			}else{
				$('#us_release').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#us_release').append('<option value="' + data[count].releaseId + '">' + data[count].releaseName + '</option>');
				}
				document.getElementById('us_release').selectedIndex = '1';
			}
			getSprintRecordForDropdownForSpecificRelease();
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}

$('#us_release').change('click',function(){
	getSprintRecordForDropdownForSpecificRelease();
});

function getSprintRecordForDropdownForSpecificRelease(){
	//alert('inside getSprintRecordForDropdownForSpecificRelease');
	var releaseId = $('#us_release').val();
	if(releaseId == "" || releaseId == "Select"){
		return false;
	}
	var jData = '{"releaseId":"' + releaseId + '"}';
	var url = "../rest/common/sprintRecordForDropDownForSpecificRelease";
	$.ajax({
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		data : jData,
		success : function(data) {
			var len = data.length;
			$('#us_sprint').empty();
			if(len=='0'){
				$('#us_sprint').append('<option value="Select">Select</option>');
			}else{
				$('#us_sprint').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#us_sprint').append('<option value="' + data[count].sprintId + '">' + data[count].sprintName + '</option>');
				}
				document.getElementById('us_sprint').selectedIndex = '1';
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}

$('#add_new_us').on('click',function(){
	var userStoryName=$('#us_name').val();
	var userStoryStatus=$('#us_status').val();
	var userStoryAsA=$('#asa').val();
	var userStoryDesc=$('#us_desc').val();
	var userStorySprintId=$('#us_sprint').val();
	var userStoryReleaseId=$('#us_release').val();
	if(userStoryName == "" || userStoryName.length == "0"){
		alert('Please Enter UserStory Name');
	}else if(userStoryStatus == "" || userStoryStatus == "Select"){
		alert('Please Select Status');
	}else if(userStoryAsA === "" || userStoryAsA == "Select"){
		alert("Please Select As A");
	}else if(userStoryDesc == "" || userStoryDesc.length == "0"){
		alert('Please Enter Description');
	}else if(userStoryReleaseId == "" || userStoryReleaseId == "Select"){
		alert("Please Select Release");
	}else if(userStorySprintId == "" || userStorySprintId == "Select"){
		alert('Please Select Sprint');
	}else{
		var jData = '{"userStoryName":"' + userStoryName + '","userStoryStatus":"' + userStoryStatus + 
		'","userStoryAsA":"' + userStoryAsA + '","userStoryDescription":"' + userStoryDesc + 
		'","userStorySprintId":"' + userStorySprintId + '",	"userStoryReleaseId":"' + userStoryReleaseId + '"}';
		console.log(jData);
		var url = "../rest/userstory/add";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("User Story Added Successfully");
					//localStorage.setItem("datasaved","yes");
					$('#us_name').val("");
					$('#us_desc').val("");
					load_UserStory_list();
				},
				206 : function(){
					alert("User Story Already Present in the Database");
				},
				400 : function(){
					alert("Could not Add User Story");
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

//Loading UserStory list
function load_UserStory_list(){
	//alert('inside load_sprint_list');
	$('#userstory_list').show();
	$("#us_path").text("");
	var url = "../rest/userstory/get";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#userstory_list').text("No Release to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Userstory Name</th>"+
						"<th>Description</th>"+
						"<th>Status</th>"+
						"<th>Release</th>"+
						"<th>Sprint</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td><a href="#" onclick="edit_userstory_details('+count+')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
						"<td>" +
						"<input type=hidden id=userStoryId"+(count)+" value='"+data[count].userStoryId+"'>"+
						"<input type=hidden id=userStoryName"+(count)+" value='"+data[count].userStoryName+"'>"+
						"<input type=hidden id=userStoryAsA"+(count)+" value='"+data[count].userStoryAsA+"'>"
						+data[count].userStoryName+"</td>" +
						"<td><input type=hidden id=userStoryDescription"+(count)+" value='"+data[count].userStoryDescription+"'>"+data[count].userStoryDescription+"</td>" +
						"<td><input type=hidden id=userStoryStatus"+(count)+" value='"+data[count].userStoryStatus+"'>"+data[count].userStoryStatus+"</td>" +
						"<td><input type=hidden id=userStoryReleaseId"+(count)+" value='"+data[count].userStoryReleaseId+"'>"+data[count].userStoryReleaseName+"</td>" +
						"<td><input type=hidden id=userStorySprintId"+(count)+" value='"+data[count].userStorySprintId+"'>"+data[count].userStorySprintName+"</td>" +
						"</tr>";
				}
				table +="</table>";
				$('#userstory_list').html(table);
			}
			getReleaseRecordForDropdown();
		}
	}).error(function(xhr, errorText) {
		$('#userstory_list').show();
		$('#userstory_list').text("Could Not Load Sprint List");
	});
}
//Edit the userstory details 
function edit_userstory_details(row){
	$('#us_id').val($('#userStoryId'+row).val());
	$('#us_name').val($('#userStoryName'+row).val());
	$('#us_status').val($('#userStoryStatus'+row).val());
	$('#asa').val($('#userStoryAsA'+row).val());
	$('#us_desc').val($('#userStoryDescription'+row).val());
	$('#us_release').val($('#userStoryReleaseId'+row).val());
	getSprintRecordForDropdownForSpecificRelease();
	$('#us_sprint').val($('#userStorySprintId'+row).val());
	$("#plan_us_add_new :input").attr("disabled", false);
	$("#us_status").attr("disabled", false);
	$("#linked_tasks").attr("disabled", false);
	$("#asa").attr("disabled", false);
	$("#add_new_us").hide();
	$("#userstory_details_select").show();	
	$('#userstory_list').css({'height': $(window).height()-5*$("#header").height()-4*$("#footer").height()});
	$("#task_display_btn").click();
	if($('#us_status').val()==="Done" || $('#us_status').val()==="Decline"){
		$("#edit_us").hide();
		$("#save_us").hide();	
		console.log($('#us_status').val());
	}else{
		$("#edit_us").show();
		$("#save_us").show();	
	}	

}
$("#task_display_btn").on("click", function () {
	var userStoryName=$('#us_name').val();
	$('#task_display_btn').removeClass('btn-default');
	$('#task_display_btn').addClass('btn-primary');
	$("#bug_display_btn").removeClass('btn-primary');
	$("#bug_display_btn").addClass('btn-default');
	$('#test_display_btn').removeClass('btn-primary');
	$('#test_display_btn').addClass('btn-default');	
	load_task_list_for_userStory();
	$("#us_path").text("");
	$("#us_path").append('<a href="#" onclick="load_UserStory_list()">Userstory/</a>'+
		'<span>'+ userStoryName +'/</span>'
		+'<span">Tasks</span>');
});
$("#test_display_btn").on("click", function () {
	var userStoryName=$('#us_name').val();
	$('#test_display_btn').removeClass('btn-default');
	$('#test_display_btn').addClass('btn-primary');
	$("#bug_display_btn").removeClass('btn-primary');
	$("#bug_display_btn").addClass('btn-default');
	$("#task_display_btn").removeClass('btn-primary');
	$("#task_display_btn").addClass('btn-default');	
	load_test_list_forUserStrory();
	$("#us_path").text("");
	$("#us_path").append('<a href="#" onclick="load_UserStory_list()">Userstory/</a>'+
		'<span>'+ userStoryName +'/</span>'
		+'<span">Tests</span>')
});

$("#bug_display_btn").on("click", function () {
	var userStoryName=$('#us_name').val();
	$('#bug_display_btn').removeClass('btn-default');
	$('#bug_display_btn').addClass('btn-primary');
	$("#task_display_btn").removeClass('btn-primary');
	$("#task_display_btn").addClass('btn-default');
	$('#test_display_btn').removeClass('btn-primary');
	$('#test_display_btn').addClass('btn-default');	
	load_bug_list_For_UserStory();
	$("#us_path").text("");
	$("#us_path").append('<a href="#" onclick="load_UserStory_list()">Userstory/</a>'+
		'<span>'+ userStoryName +'/</span>'
		+'<span">Bugs</span>')
});

$("#edit_us").on("click", function () {
	$("#userstory_form :input").attr("disabled", false);
	$("#us_status").attr("disabled", false);
	$("#asa").attr("disabled", false);
	$("#us_name").attr("disabled", true);
});

$("#save_us").on("click", function () {
	var userStoryId=$('#us_id').val();
	var userStoryName=$('#us_name').val();
	var userStoryStatus=$('#us_status').val();
	var userStoryAsA=$('#asa').val();
	var userStoryDesc=$('#us_desc').val();
	var userStorySprintId=$('#us_sprint').val();
	var userStoryReleaseId=$('#us_release').val();

	if(userStoryName == "" || userStoryName.length == "0"){
		alert('Please Enter UserStory Name');
	}else if(userStoryStatus == "" || userStoryStatus == "Select"){
		alert('Please Select Status');
	}else if(userStoryAsA === "" || userStoryAsA == "Select"){
		alert("Please Select As A");
	}else if(userStoryDesc == "" || userStoryDesc.length == "0"){
		alert('Please Enter Description');
	}else if(userStoryReleaseId == "" || userStoryReleaseId == "Select"){
		alert("Please Select Release");
	}else if(userStorySprintId == "" || userStorySprintId == "Select"){
		alert('Please Select Sprint');
	}else{
		var jData = '{"userStoryId":"' + userStoryId + 
		'","userStoryName":"' + userStoryName +'","userStoryStatus":"' + userStoryStatus + 
		'","userStoryAsA":"' + userStoryAsA + '","userStoryDescription":"' + userStoryDesc + 
		'","userStorySprintId":"' + userStorySprintId + '",	"userStoryReleaseId":"' + userStoryReleaseId + '"}';
		console.log(jData);
		var url = "../rest/userstory/update";
		$.ajax({
			type : "PUT",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("User Story Updated Successfully");
					//localStorage.setItem("datasaved","yes");
					$('#us_name').val("");
					$('#us_desc').val("");
					load_UserStory_list();
				},
				206 : function(){
					alert("User Story Already Present in the Database");
				},
				400 : function(){
					alert("Could Not Update User Story");
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

//Loading task list present in the selected userstory
/*function display_task(){
	var userStoryId = $('#us_id').val();
	var jData = '{"userStoryId":"' + userStoryId + '"}';
	$('#userstory_list').show();
	var url = "../rest/test/getTestRecordForSpecificUserStory";
	$.ajax({
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		data : jData,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#userstory_list').text("No Task to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint</th>"+
						"<th>Task</th>"+
						"<th>User Story</th>"+
						"<th>Bug</th>"+
						"<th>Name</th>"+
						"<th>Status</th>"+
						"<th>Summary</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td></td>' +
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
							 "<td>" +
							 	"<input type=hidden id=bugId"+(count)+" value='"+data[count].bugId+"'>"+
							 	"<input type=hidden id=bugTitle"+(count)+" value='"+data[count].bugTitle+"'>"
							 	+data[count].bugTitle+
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
				$('#userstory_list').html(table);
			}
			getReleaseRecordForDropdown();
		}
	}).error(function(xhr, errorText) {
		$('#userstory_list').show();
		$('#userstory_list').text("Could Not Load Test List");
	});
}*/
//Loading tests list present in the selected userstory
function load_test_list_forUserStrory(){
	$('#userstory_list').show();
	var us_id = $('#us_id').val();
	var url = "../rest/userstory/getTestListForUserStrory?us_id="+us_id;
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#userstory_list').text("No Test to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint</th>"+
						"<th>Task</th>"+
						"<th>User Story</th>"+
						"<th>TestId</th>"+
						"<th>AssignTo</th>"+
						"<th>Status</th>"+
						"<th>Summary</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td><a href="#" onclick="display_test_details('+ count +')"></a></td>' +
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
							 "<td>" +
							 	"<input type=hidden id=testId"+(count)+" value='"+data[count].testId+"'>"+
							 data[count].testId+
							 "</td>" +
							 "<td><input type=hidden id=assignedTo"+(count)+" value='"+data[count].assignedTo+"'>"+data[count].assignedTo+"</td>" +
							 "<td><input type=hidden id=testStatus"+(count)+" value='"+data[count].testStatus+"'>"+data[count].testStatus+"</td>" +
							 "<td>" +
							 "<input type=hidden id=testSummary"+(count)+" value='"+data[count].testSummary+"'>"+
							 "<input type=hidden id=testId"+(count)+" value='"+data[count].testId+"'>"
							 +data[count].testSummary+"</td>" +
							 "</tr>";
				}
				table +="</table>";
				$('#userstory_list').html(table);
			}
			
		}
	}).error(function(xhr, errorText) {
		$('#userstory_list').text("Could not load the Test list");
	});
	
}

//Loading bug list present in the selected userstory
function load_bug_list_For_UserStory(){
	
	$('#userstory_list').show();
	var us_id = $('#us_id').val();
	var url = "../rest/userstory/getBugListForUserStory?us_id="+us_id;
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#userstory_list').text("No Bug to Display");
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
				$('#userstory_list').html(table);
			}
			
		}
	}).error(function(xhr, errorText) {
		$('#userstory_list').show();
		$('#userstory_list').text("Could Not Load Bug List");
	});
}
function load_task_list_for_userStory(){
	//alert('inside load_sprint_list');
	$('#task_list').show();
	var us_id = $('#us_id').val();
	var url = "../rest/userstory/getTaskListForUserStory?us_id="+us_id;
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			
			var len = data.length;
			
			if(len == 0){
				$('#userstory_list').text("No task to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint Id</th>"+
						"<th>Task Description</th>"+
						"<th>Start Date</th>"+
						"<th>End Date</th>"+
						"<th>Task Duration</th>"+
						"<th>Task Status</th>"+
						"<th>User Story</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td></td>' +
						"<td>" +
						/*"<input type=hidden id=sprintName"+(count)+" value='"+data[count].sprintName+"'>" +*/
						"<input type=hidden id=sprintId"+(count)+" value='"+data[count].sprintId+"'>"
						+data[count].sprintId+"</td>" +
						"<td>" +
						"<input type=hidden id=taskId"+(count)+" value='"+data[count].taskId+"'>"+
						"<input type=hidden id=taskDescription"+(count)+" value='"+data[count].taskDescription+"'>"
						+data[count].taskDescription+"</td>" +
						"<td><input type=hidden id=startDate"+(count)+" value='"+data[count].startDate.substring(0, 10)+"'>"+data[count].startDate.substring(0, 10)+"</td>" +
						"<td><input type=hidden id=endDate"+(count)+" value='"+data[count].endDate.substring(0, 10)+"'>"+data[count].endDate.substring(0, 10)+"</td>" +
						"<td><input type=hidden id=taskDuration"+(count)+" value='"+data[count].taskDuration+"'>"+data[count].taskDuration+"</td>" +
						"<td><input type=hidden id=taskStatus"+(count)+" value='"+data[count].taskStatus+"'>"+data[count].taskStatus+"</td>" +
						"<td>" +
						"<input type=hidden id=userStory"+(count)+" value='"+data[count].userStoryId+"'>" +
						"<input type=hidden id=userStory"+(count)+" value='"+data[count].userStoryId+"'>"
						+data[count].userStoryId+"</td>" +
						"<td>" +
						
						"</tr>";
				}
				table +="</table>";
				
				$('#userstory_list').html(table);
			}
			
		}
	}).error(function(xhr, errorText) {
		$('#userstory_list').show();
		$('#userstory_list').text("Could Not Load Task List");
	});
}
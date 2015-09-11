$(document).ready(function() {
	$('#task_list').css({'height': $(window).height()-5*$("#header").height()-4*$("#footer").height()});
	$('#task_list').css({'overflow-y': 'scroll'});
	$('#task_list').css({'overflow-x': 'hidden'});

	$("#add_new_task_btn").show();
	$("#edit_task_btn").hide();
	$("#save_task_btn").hide();	
	$("#task_details_select").hide();	
	$("#task_duration").attr("disabled", true);
	load_task_list();

	$( "#task_start_date" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#task_end_date" ).datepicker({ dateFormat: 'yy-mm-dd' });
});

$("#task_start_date").on("change", function () {
    var startDateObj = new Date($('#task_start_date').val());
    var endDateObj = new Date($('#task_end_date').val());
    if(startDateObj == 'Invalid Date'){
        //alert('Please Select Start Date');
        return false;
    }
    if(endDateObj == 'Invalid Date'){
        //alert('Please Select End Date');
        return false;
    }
    dateDifference();
});

$("#task_end_date").on("change", function () {
    var startDateObj = new Date($('#task_start_date').val());
    var endDateObj = new Date($('#task_end_date').val());
    if(startDateObj == 'Invalid Date'){
        //alert('Please Select Start Date');
        return false;
    }
    if(endDateObj == 'Invalid Date'){
        //alert('Please Select End Date');
        return false;
    }
    dateDifference();
});

function dateDifference(){
    var millisecPerDay = 1000 * 60 * 60 * 24;
    var startDate = new Date($('#task_start_date').val());
    var endDate = new Date($('#task_end_date').val());
    var differenceInMillisec = endDate.getTime() - startDate.getTime();
    var day = differenceInMillisec/millisecPerDay;
    $('#task_duration').val(parseInt(day)+1);
}
//Loading task list
function load_task_list(){
	//alert('inside load_sprint_list');
	$('#task_list').show();
	$("#task_path").text("");
	var url = "../rest/task/get";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#task_list').text("No Release to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint Name</th>"+
						"<th>Task Description</th>"+
						"<th>Start Date</th>"+
						"<th>End Date</th>"+
						"<th>Task Duration</th>"+
						"<th>Task Status</th>"+
						"<th>User Story</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td><a href="#" onclick="display_task_details('+ count +')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
						"<td>" +
						"<input type=hidden id=sprintName"+(count)+" value='"+data[count].sprintName+"'>" +
						"<input type=hidden id=sprintId"+(count)+" value='"+data[count].sprintId+"'>"
						+data[count].sprintName+"</td>" +
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
				$('#user_info').hide();
				$('#user_table').show();
				$('#task_list').html(table);
			}
			getSprintRecordForDropdown();
			getUserStoryRecordForDropdown();
		}
	}).error(function(xhr, errorText) {
		$('#task_list').show();
		$('#task_list').text("Could Not Load Task List");
	});
}

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
			$('#task_sprint').empty();
			if(len=='0'){
				$('#task_sprint').append('<option value="Select">Select</option>');
			}else{
				$('#task_sprint').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#task_sprint').append('<option value="' + data[count].sprintId + '">' + data[count].sprintName + '</option>');
				}
				document.getElementById('task_sprint').selectedIndex = '1';
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
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			$('#task_user_story').empty();
			if(len=='0'){
				$('#task_user_story').append('<option value="Select">Select</option>');
			}else{
				$('#task_user_story').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#task_user_story').append('<option value="' + data[count].userStoryId + '">' + data[count].userStoryName + '</option>');
				}
				document.getElementById('task_user_story').selectedIndex = '1';
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}

$('#add_new_task').on('click',function(){
	var taskSprintId=$('#task_sprint').val();
	var taskDescription=$('#task_desc').val().trim();
	var taskStatus=$('#task_status').val();
	var taskStartDate=$('#task_start_date').val();
	var taskEndDate=$('#task_end_date').val();
	var taskDuration=$('#task_duration').val();
	var userStoryId=$('#task_user_story').val();
	if(taskSprintId === "" || taskSprintId == "Select"){
		alert("Please Select Sprint");
	}else if(taskDescription === ""){
		alert("Please Enter Task Description");
	}else if(taskStatus === "" || taskStatus == "Select"){
		alert("Please Select Status");
	}else if(taskStartDate === ""){
		alert("Please Select Start Date");
	}else if(taskEndDate === ""){
		alert("Please Select End Date");
	}else if(taskDuration === ""){
		//alert("Please Select Start Date and End Date");
	}else if(userStoryId === "" || userStoryId == "Select"){
		alert("Please Select User story");
	}else{
		var jData = '{"sprintId":"' + taskSprintId + '","taskDescription":"' + taskDescription + 
		'","taskStatus":"' + taskStatus +'","taskStartDate":"' + taskStartDate +'","taskEndDate":"' + taskEndDate + 
		'","taskDuration":"' + taskDuration + '","userStoryId":"' + userStoryId +'"}';
		var url = "../rest/task/addTask";
		alert(jData);
		alert(url);
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Task Added Successfully");
					//localStorage.setItem("datasaved","yes");
					$('#task_desc').val("");
					load_task_list();
				},
				206 : function(){
					alert("Task Already Present in the Database");
				},
				400 : function(){
					alert("Could not Add Task");
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



function display_task_details(row){
	//console.log('row :: '+row);
	
	$('#task_sprint').val($('#sprintId'+row).val());
	$('#task_id').val($('#taskId'+row).val());
	$('#task_desc').val($('#taskDescription'+row).val());
	$('#task_status').val($('#taskStatus'+row).val());
	$('#task_start_date').val($('#startDate'+row).val());
	$('#task_end_date').val($('#endDate'+row).val());
	$('#task_duration').val($('#taskDuration'+row).val());
	$('#task_user_story').val($('#userStory'+row).val());
	
	$("#task_form :input").attr("disabled", true);
	$("#task_sprint").attr("disabled", true);
	$("#task_status").attr("disabled", true);
	$("#add_new_task_btn").hide();
	$("#task_details_select").show();	
	//edit_task_details(row);
	$("#task_test_display_btn").click();
	$('#task_list').css({'height': $(window).height()-6*$("#header").height()-4*$("#footer").height()});
	if($('#task_status').val()==="Done"){
		$("#edit_task_btn").hide();
		$("#save_task_btn").hide();
	}else{
		$("#edit_task_btn").show();
		$("#save_task_btn").show();		
	}
}

$("#task_test_display_btn").on("click", function () {
	var taskSprintId=$('#task_sprint').val();
	$('#task_test_display_btn').removeClass('btn-default');
	$('#task_test_display_btn').addClass('btn-primary');
	$("#task_bug_display_btn").removeClass('btn-primary');
	$("#task_bug_display_btn").addClass('btn-default');
	display_tests();
	$("#task_path").text("");
	$("#task_path").append('<a href="#" onclick="load_task_list()">Task/</a>'+
		'<span>'+ taskSprintId +'/</span>'
		+'<span">Tests</span>');
});

$("#task_bug_display_btn").on("click", function () {
	var taskSprintId=$('#task_sprint').val();
	$('#task_bug_display_btn').removeClass('btn-default');
	$('#task_bug_display_btn').addClass('btn-primary');
	$("#task_test_display_btn").removeClass('btn-primary');
	$("#task_test_display_btn").addClass('btn-default');
	display_bugs();
	$("#task_path").text("");
	$("#task_path").append('<a href="#" onclick="load_task_list()">Task/</a>'+
		'<span>'+ taskSprintId +'/</span>'
		+'<span">Bugs</span>');
});

$("#edit_task").on("click", function () {
	$("#task_form :input").attr("disabled", false);
	$("#task_sprint").attr("disabled", false);
	$("#task_status").attr("disabled", false);
	$("#add_new_task_btn").hide();
	$("#edit_task_btn").show();
	$("#save_task_btn").show();		

});
$("#save_task").on("click", function () {
	var taskSprintId=$('#task_sprint').val();
	var taskId=$('#task_id').val();
	var taskDescription=$('#task_desc').val();
	var taskStatus=$('#task_status').val();
	var taskStartDate=$('#task_start_date').val();
	var taskEndDate=$('#task_end_date').val();
	var taskDuration=$('#task_duration').val();
	var userStoryId=$('#task_user_story').val();
	if(taskSprintId === "" || taskSprintId == "Select"){
		alert("Please Select Sprint");
	}else if(taskDescription === ""){
		alert("Please Enter Task Description");
	}else if(taskStatus === "" || taskStatus == "Select"){
		alert("Please Select Status");
	}else if(taskStartDate === ""){
		alert("Please Select Start Date");
	}else if(taskEndDate === ""){
		alert("Please Select End Date");
	}else if(taskDuration === ""){
		//alert("Please Select Start Date and End Date");
	}else if(userStoryId === "" || userStoryId == "Select"){
		alert("Please Select user Story");
	}else{
		var jData = '{"sprintId":"' + taskSprintId + '","taskId":"' + taskId+'","taskDescription":"' + taskDescription + 
		'","taskStatus":"' + taskStatus +'","taskStartDate":"' + taskStartDate +'","taskEndDate":"' + taskEndDate + 
		'","taskDuration":"' + taskDuration + '","userStoryId":"' + userStoryId+'"}';
		//console.log(jData);
		var url = "../rest/task/update";
		$.ajax({
			type : "PUT",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Task Updated Successfully");
					load_task_list();
					$('#task_desc').val("");
				},
				206 : function(){
					alert("Task Name Already Present in the Database");
				},
				400 : function(){
					alert("Could not Update Task");
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
//Loading test list present in the selected task
function display_tests(){
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
		}
	}).error(function(xhr, errorText) {
		$('#userstory_list').show();
		$('#userstory_list').text("Could Not Load Test List");
	});
}

//Loading bug list present in the selected task
function display_bugs(){
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
}

function load_test_list_forTask(){
	$('#task_list').show();
	var taskId = $('#task_id').val();
	var url = "../rest/task/getTestListForTask?taskId="+taskId;
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#task_list').text("No Test to Display");
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
				$('#task_list').html(table);
			}
			
		}
	}).error(function(xhr, errorText) {
		$('#task_list').text("Could not load the Test list");
	});
	
}
$("#task_test_display_btn").on("click", function () {
	load_test_list_forTask();
	$('#task_test_display_btn').removeClass('btn-default');
	$('#task_test_display_btn').addClass('btn-primary');
	$("#task_bug_display_btn").removeClass('btn-primary');
	$("#task_bug_display_btn").addClass('btn-default');
});
$("#task_bug_display_btn").on("click", function () {
	load_bug_list_For_Task();
	$('#task_bug_display_btn').removeClass('btn-default');
	$('#task_bug_display_btn').addClass('btn-primary');
	$("#task_test_display_btn").removeClass('btn-primary');
	$("#task_test_display_btn").addClass('btn-default');
});

function load_bug_list_For_Task(){
	
	$('#task_list').show();
	var taskId = $('#task_id').val();
	var url = "../rest/task/getBugListForTask?task_id="+taskId;
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#task_list').text("No Bug to Display");
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
				$('#task_list').html(table);
			}
			
		}
	}).error(function(xhr, errorText) {
		$('#task_list').show();
		$('#task_list').text("Could Not Load Bug List");
	});
}
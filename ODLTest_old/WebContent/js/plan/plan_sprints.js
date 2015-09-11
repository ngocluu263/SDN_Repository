$(document).ready(function() {
	$('#sprint_list').css({'height': $(window).height()-4*$("#header").height()-4*$("#footer").height()});
	$('#sprint_list').css({'overflow-y': 'scroll'});
	$('#sprint_list').css({'overflow-x': 'hidden'});

	$("#sprint_dur").attr("disabled", true);
	$( "#spr_start_date" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#spr_end_date" ).datepicker({ dateFormat: 'yy-mm-dd' });
	load_sprint_list();

	$("#add_new_spr").show();
	$("#edit_spr").hide();
	$("#save_spr").hide();	
	$("#sprint_details_select").hide();	

});
$("#spr_start_date").on("change", function () {
    var startDateObj = new Date($('#spr_start_date').val());
    var endDateObj = new Date($('#spr_end_date').val());
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

$("#spr_end_date").on("change", function () {
    var startDateObj = new Date($('#spr_start_date').val());
    var endDateObj = new Date($('#spr_end_date').val());
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
    var startDate = new Date($('#spr_start_date').val());
    var endDate = new Date($('#spr_end_date').val());
    var differenceInMillisec = endDate.getTime() - startDate.getTime();
    var day = differenceInMillisec/millisecPerDay;
    $('#sprint_dur').val(parseInt(day)+1);
}

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
			$('#sprint_release').empty();
			if(len=='0'){
				$('#sprint_release').append('<option value="Select">Select</option>');
			}else{
				$('#sprint_release').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#sprint_release').append('<option value="' + data[count].releaseId + '">' + data[count].releaseName + '</option>');
				}
				document.getElementById('sprint_release').selectedIndex = '1';
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}

//Loading sprint list
function load_sprint_list(){
	//alert('inside load_sprint_list');
	$("#spr_path").text("");
	$('#sprint_list').show();
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
				$('#sprint_list').text("No Release to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Sprint Name</th>"+
						"<th>Release</th>"+
						"<th>End Date</th>"+
						"<th>Sprint Duration</th>"+
						"<th>Sprint Status</th>"+
						"<th>Sprint Item</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td><a href="#" onclick="display_sprint_details('+count+')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
						"<td>" +
						"<input type=hidden id=sprintId"+(count)+" value='"+data[count].sprintId+"'>" +
						"<input type=hidden id=sprintName"+(count)+" value='"+data[count].sprintName+"'>"
						+data[count].sprintName+"</td>" +
						"<td><input type=hidden id=releaseId"+(count)+" value='"+data[count].releaseId+"'>"+data[count].releaseName+"</td>" +
						"<td>" +
						"<input type=hidden id=startDate"+(count)+" value='"+data[count].startDate.substring(0, 10)+"'>" +
						"<input type=hidden id=endDate"+(count)+" value='"+data[count].endDate.substring(0, 10)+"'>"
						+data[count].endDate.substring(0, 10)+"</td>" +
						"<td><input type=hidden id=sprintDuration"+(count)+" value='"+data[count].sprintDuration+"'>"+data[count].sprintDuration+"</td>" +
						"<td><input type=hidden id=sprintStatus"+(count)+" value='"+data[count].sprintStatus+"'>"+data[count].sprintStatus+"</td>" +
						"<td><input type=hidden id=sprintItem"+(count)+" value='"+data[count].sprintItem+"'>"+data[count].sprintItem+"</td>" +
						"</tr>";
				}
				table +="</table>";
				$('#sprint_list').html(table);
			}
			getReleaseRecordForDropdown();
		}
	}).error(function(xhr, errorText) {
		$('#sprint_list').show();
		$('#sprint_list').text("Could Not Load Sprint List");
	});
}

$('#add_new_spr').on('click',function(){
	var releaseId =$('#sprint_release').val();
	var sprintName=$('#sprint_name').val();
	var sprintStartDate = $('#spr_start_date').val();
	var sprintEndDate = $('#spr_end_date').val();
	var sprintDuration=$('#sprint_dur').val();
	var sprintItem=$('#sprint_item').val();
	var sprintStatus=$('#sprint_status').val();
	if(sprintName === ""){
		alert("Please Enter Sprint Name");
	}else if(releaseId === "" || releaseId == "Select"){
		alert("Please Select Release");
	}else if(sprintStartDate === ""){
		alert("Please Select Start Dates");
	}else if(sprintEndDate === ""){
		alert("Please Select End Dates");
	}else if(sprintDuration === ""){
		alert("Please Select Start and End Dates");
	}else if(sprintItem === ""){
		alert("Please Enter Sprint Items");
	}else if(sprintStatus == "Select" || sprintStatus == ""){
		alert("Please Select Sprint Status");
	}else{
		var jData = '{"releaseId":"' + releaseId + '","sprintName":"' + sprintName + 
		'","sprintStartDate":"' + sprintStartDate +'","sprintEndDate":"' + sprintEndDate + 
		'","sprintDuration":"' + sprintDuration +'","sprintItem":"' + sprintItem +'","sprintStatus":"' + sprintStatus + '"}';
		console.log(jData);
		var url = "../rest/sprint/add";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Sprint Added Successfully");
					//localStorage.setItem("datasaved","yes");
					$('#sprint_name').val("");
					$('#sprint_item').val("");
					load_sprint_list();
				},
				206 : function(){
					alert("Sprint Already Present in the Database");
				},
				400 : function(){
					alert("Could not Add Sprint");
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

function display_sprint_details(row){
	$('#sprint_id').val($('#sprintId'+row).val());
	$('#sprint_name').val($('#sprintName'+row).val());
	$('#sprint_release').val($('#releaseId'+row).val());
	$('#spr_start_date').val($('#startDate'+row).val());
	$('#spr_end_date').val($('#endDate'+row).val());
	$('#sprint_dur').val($('#sprintDuration'+row).val());
	$('#sprint_item').val($('#sprintItem'+row).val());
	$('#sprint_status').val($('#sprintStatus'+row).val());
	
	$("#plan_spr_form :input").attr("disabled", true);
	$('#sprint_name').attr("disabled", true);
	$('#sprint_release').attr("disabled", true);
	$('#spr_start_date').attr("disabled", true);
	$('#spr_end_date').attr("disabled", true);
	$('#sprint_dur').attr("disabled", true);
	$('#sprint_item').attr("disabled", true);
	$('#sprint_status').attr("disabled", true);
	$("#add_new_spr").hide();
	$("#sprint_details_select").show();	
	
	$("#userStory_display_btn").click();
	$('#sprint_list').css({'height': $(window).height()-4*$("#header").height()-5*$("#footer").height()});
	if($('#spr_status').val()==="Closed"){
		$("#edit_spr").hide();
		$("#save_spr").hide();
	}else{
		$("#edit_spr").show();
		$("#save_spr").show();		
	}
}
$("#edit_spr").on("click", function () {
	$("#plan_spr_form :input").attr("disabled", false);
	$("#sprint_status").attr("disabled", false);
	$("#sprint_dur").attr("disabled", true);
	$("#sprint_name").attr("disabled", true);
});
$("#save_spr").on("click", function () {
	var sprintId=$('#sprint_id').val();
	var sprintName=$('#sprint_name').val();
	var releaseId=$('#sprint_release').val();
	var sprintStartDate = $('#spr_start_date').val();
	var sprintEndDate = $('#spr_end_date').val();
	var sprintDuration=$('#sprint_dur').val();
	var sprintItem=$('#sprint_item').val();
	var sprintStatus=$('#sprint_status').val();
	if(sprintName === ""){
		alert("Please Enter Sprint Name");
	}else if(releaseId === "" || releaseId == "Select"){
		alert("Please Select Release");
	}else if(sprintStartDate === ""){
		alert("Please Select Start Dates");
	}else if(sprintEndDate === ""){
		alert("Please Select End Dates");
	}else if(sprintDuration === ""){
		alert("Please Select Start and End Dates");
	}else if(sprintItem === ""){
		alert("Please Enter Sprint Items");
	}else if(sprintStatus == "Select" || sprintStatus == ""){
		alert("Please Select Sprint Status");
	}else{
		var jData = '{"releaseId":"' + releaseId + '","sprintId":"' + sprintId + '","sprintName":"' + sprintName + 
		'","sprintStartDate":"' + sprintStartDate +'","sprintEndDate":"' + sprintEndDate + 
		'","sprintDuration":"' + sprintDuration +'","sprintItem":"' + sprintItem +'","sprintStatus":"' + sprintStatus + '"}';
		console.log(jData);
		var url = "../rest/sprint/update";
		$.ajax({
			type : "PUT",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Sprint Updated Successfully");
					//localStorage.setItem("datasaved","yes");
					$('#sprint_name').val("");
					$('#sprint_item').val("");
					load_sprint_list();
				},
				206 : function(){
					alert("Sprint Already Present in the Database");
				},
				400 : function(){
					alert("Could not Updated Sprint");
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

$("#userStory_display_btn").on("click", function () {
	var sprintName=$('#sprint_name').val();
	display_userstories();
	$('#userStory_display_btn').removeClass('btn-default');
	$('#userStory_display_btn').addClass('btn-primary');
	$('#spr_bug_display_btn').removeClass('btn-primary');
	$('#spr_bug_display_btn').addClass('btn-default');
	$("#spr_path").text("");
	$("#spr_path").append('<a href="#" onclick="load_sprint_list()">Sprints/</a>'+
		'<span>'+ sprintName +'/</span>'
		+'<span">Userstories</span>');
});

$("#spr_bug_display_btn").on("click", function () {
	var sprintName=$('#sprint_name').val();
	load_bug_list_For_Sprint();
	$('#spr_bug_display_btn').removeClass('btn-default');
	$('#spr_bug_display_btn').addClass('btn-primary');
	$('#userStory_display_btn').removeClass('btn-primary');
	$('#userStory_display_btn').addClass('btn-default');
	$("#spr_path").text("");
	$("#spr_path").append('<a href="#" onclick="load_sprint_list()">Sprints/</a>'+
		'<span>'+ sprintName +'/</span>'
		+'<span">Bugs</span>');
});


//Loading Userstories present in the selected release
function display_userstories(){
	var sprintId = $('#sprint_id').val();
	var jData = '{"userStorySprintId":"' + sprintId + '"}';
	$('#sprint_list').show();
	var url = "../rest/userstory/getUserStoryRecordForSpecifiedReleaseOrSprint";
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
				$('#sprint_list').text("No Userstory is added to the release");
			}else{
				table = "<table>"+
					"<thead><tr><th></th>"+
					"<th>UserStory Name</th>"+
					"<th>Description</th>"+
					"<th>Status</th>"+
					"<th>Release</th>"+
					"<th>Sprint</th>"+
					"</tr></thead>";
					for(var count=0; count<len; count++){
						table += '<tr><td></td>' +
							"<td>"+data[count].userStoryName+"</td>" +
							"<td>"+data[count].userStoryDescription+"</td>" +
							"<td>"+data[count].userStoryStatus+"</td>" +
							"<td>"+data[count].userStoryReleaseName+"</td>" +
							"<td>"+data[count].userStorySprintName+"</td>" +
							"</tr>";
					}
					table +="</table>";
				$('#sprint_list').html(table);
			}
		}
	}).error(function(xhr, errorText) {
		$('#sprint_list').show();
		$('#sprint_list').text("Could Not Load Sprint List");
	});
}

//Loading bugs present in the selected sprint
/*function display_sprint_bugs(){
	var sprintId = $('#sprint_id').val();
	var jData = '{"userStorySprintId":"' + sprintId + '"}';
	$('#sprint_list').show();
	var url = "../rest/userstory/getUserStoryRecordForSpecifiedReleaseOrSprint";
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
				$('#sprint_list').text("No Userstory is added to the release");
			}else{
				table = "<table>"+
					"<thead><tr><th></th>"+
					"<th>UserStory Name</th>"+
					"<th>Description</th>"+
					"<th>Status</th>"+
					"<th>Release</th>"+
					"<th>Sprint</th>"+
					"</tr></thead>";
					for(var count=0; count<len; count++){
						table += '<tr><td></td>' +
							"<td>"+data[count].userStoryName+"</td>" +
							"<td>"+data[count].userStoryDescription+"</td>" +
							"<td>"+data[count].userStoryStatus+"</td>" +
							"<td>"+data[count].userStoryReleaseName+"</td>" +
							"<td>"+data[count].userStorySprintName+"</td>" +
							"</tr>";
					}
					table +="</table>";
				$('#sprint_list').html(table);
			}
		}
	}).error(function(xhr, errorText) {
		$('#sprint_list').show();
		$('#sprint_list').text("Could Not Load Sprint List");
	});
}*/
function load_bug_list_For_Sprint(){
	
	$('#sprint_list').show();
	var sprintId = $('#sprint_id').val();
	var url = "../rest/sprint/getBugListForSprint?sprintId="+sprintId;
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#sprint_list').text("No Bug to Display");
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
				$('#sprint_list').html(table);
			}
			
		}
	}).error(function(xhr, errorText) {
		$('#sprint_list').show();
		$('#sprint_list').text("Could Not Load Bug List");
	});
}
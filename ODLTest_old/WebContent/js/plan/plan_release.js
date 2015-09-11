$(document).ready(function() {
	$('#release_list').css({'height': $(window).height()-4*$("#header").height()-4*$("#footer").height()});
	$('#release_list').css({'overflow-y': 'scroll'});
	$('#release_list').css({'overflow-x': 'hidden'});

	$("#duration").attr("disabled", true);
	$("#add_new_rel_btn").show();
	$("#edit_rel_btn").hide();
	$("#save_rel_btn").hide();	
	$("#release_details_select").hide();	
	load_releases_list();
	$("#rel_path").hide();
	$("#rel_path").text("");


	$( "#start_date" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#end_date" ).datepicker({ dateFormat: 'yy-mm-dd' });
});

$("#start_date").on("change", function () {
	var startDateObj = new Date($('#start_date').val());
	var endDateObj = new Date($('#end_date').val());
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

$("#end_date").on("change", function () {
	var startDateObj = new Date($('#start_date').val());
	var endDateObj = new Date($('#end_date').val());
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
	var startDate = new Date($('#start_date').val());
	var endDate = new Date($('#end_date').val());
	var differenceInMillisec = endDate.getTime() - startDate.getTime(); 
	var day = differenceInMillisec/millisecPerDay;
	$('#duration').val(parseInt(day)+1);
}

$("#add_new_rel").on("click", function () {
	add_release_details();
});

function add_release_details(){
	var releaseName=$('#release_name').val();
	var startDate=$('#start_date').val();
	var endDate=$('#end_date').val();
	var duration=$('#duration').val();
	var status=$('#status_field').val();
	var content=$('#content_text').val();
	if(releaseName === ""){
		alert("Please Enter Release");
	}else if(startDate == "" || startDate.length == "0"){
		alert('Please Select Start Date');
	}else if(endDate == "" || endDate.length == "0"){
		alert('Please Select End Date');
	}else if(duration === ""){
		alert("Please Select Start And End Date");
	}else if(status == "Select" || status === ""){
		alert("Please Select Status");
	}else if(content === ""){
		alert("Please Enter Content");
	}else{
		var jData = '{"releaseName":"' + releaseName + '","startDate":"' + startDate + 
		'","endDate":"' + endDate + '","duration":"' + duration + 
		'","status":"' + status + '","content":"' + content + '"}';
		var url = "../rest/release/add";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Release Added Successfully");
					load_releases_list();
					$('#release_name').val("");
					$('#start_date').val("");
					$('#end_date').val("");
					$('#duration').val("");
					$('#status').text("Select");
					$('#content_text').val("");
				},
				206 : function(){
					alert("Release Name Already Present in the Database");
				},
				400 : function(){
					alert("Could not Add Release.");
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
}

//Loading Release list
function load_releases_list(){

	$('#release_name').val("");
	$('#start_date').val("");
	$('#end_date').val("");
	$('#duration').val("");
	$('#status_field').val("Select");
	$('#content_text').val("");
	$("#add_new_rel_btn").show();
	$("#edit_rel_btn").hide();
	$("#save_rel_btn").hide();	
	$("#edit_rel").click();
	$('#release_name').attr("disabled", false);

	$('#release_list').show();
	$("#rel_path").text("");
	var url = "../rest/release/get";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			var len = data.length;
			if(len == 0){
				$('#release_list').text("No Release to Display");
			}else{
				table = "<table>"+
						"<thead><tr><th></th>"+
						"<th>Release</th>"+
						"<th>End Date</th>"+
						"<th>Duration</th>"+
						"<th>Status</th>"+
						"<th>Content</th>"+
						"</tr></thead>";
				for(var count=0; count<len; count++){
					table += '<tr><td><a href="#" onclick="display_release_details('+ count +')"><span class="glyphicon glyphicon-pencil"></span></a></td>' +
							 "<td>" +
							 	"<input type=hidden id=releaseId"+(count)+" value='"+data[count].releaseId+"'>" +
							 	"<input type=hidden id=releaseName"+(count)+" value='"+data[count].releaseName+"'>"+
							 	"<input type=hidden id=startDate"+(count)+" value='"+data[count].startDate.substring(0, 10)+"'>"
							 	+data[count].releaseName+
							 "</td>" +
							 "<td><input type=hidden id=endDate"+(count)+" value='"+data[count].endDate.substring(0, 10)+"'>"+data[count].endDate.substring(0, 10)+"</td>" +
							 "<td><input type=hidden id=duration"+(count)+" value='"+data[count].duration+"'>"+data[count].duration+"</td>" +							 
							 "<td><input type=hidden id=status"+(count)+" value='"+data[count].status+"'>"+data[count].status+"</td>" +
							 "<td><input type=hidden id=content"+(count)+" value='"+data[count].content+"'>"+data[count].content+"</td>" +
							 "</tr>";
				}
				table +="</table>";
				$('#release_list').html(table);
			}
	}
	}).error(function(xhr, errorText) {
		$('#release_list').text("Could not load the Release list");
	});
}

function display_release_details(row){
	console.log('row :: '+row);	
	$("#rel_form :input").attr("disabled", true);
	$("#status_field").attr("disabled", true);
	$("#add_new_rel_btn").hide();
	$("#release_details_select").show();	
	$("#rel_path").show();
	$('#release_id').val($('#releaseId'+row).val());
	$('#release_name').val($('#releaseName'+row).val());
	$('#start_date').val($('#startDate'+row).val());
	$('#end_date').val($('#endDate'+row).val());
	$('#duration').val($('#duration'+row).val());
	$('#status_field').val($('#status'+row).val());
	$('#content_text').val($('#content'+row).val());
	$("#spr_display_btn").click();
	$('#release_list').css({'height': $(window).height()-4*$("#header").height()-5*$("#footer").height()});
	if($('#status_field').val()==="Delivered" || $('#status_field').val()==="End Of Life"){
		$("#edit_rel_btn").hide();
		$("#save_rel_btn").hide();
	}else{
		$("#edit_rel_btn").show();
		$("#save_rel_btn").show();		
	}
}

$("#edit_rel").on("click", function () {
	$("#rel_form :input").attr("disabled", false);
	$("#status_field").attr("disabled", false);
	$("#duration").attr("disabled", true);
	$("#release_name").attr("disabled", true);
});
$("#save_rel").on("click", function () {
	//$("#rel_form :input").attr("disabled", false);
	//$("#status_field").attr("disabled", false);
	//add_release_details();
	var releaseId=$('#release_id').val();
	var releaseName=$('#release_name').val();
	var startDate=$('#start_date').val();
	var endDate=$('#end_date').val();
	var duration=$('#duration').val();
	var status=$('#status_field').val();
	var content=$('#content_text').val();
	if(release_name === ""){
		alert("Please Enter Release");
	}else if(startDate == "" || startDate.length == "0"){
		alert('Please Select Start Date');
	}else if(endDate == "" || endDate.length == "0"){
		alert('Please Select End Date');
	}else if(duration === ""){
		alert("Please Select Start And End Date");
	}else if(status == "Select" || status === ""){
		alert("Please Select Status");
	}else if(content === ""){
		alert("Please Enter Content");
	}else{
		var jData = '{"releaseId":"' + releaseId + '","releaseName":"' + releaseName + 
		'","startDate":"' + startDate + '","endDate":"' + endDate + '","duration":"' + duration + 
		'","status":"' + status + '","content":"' + content + '"}';
		//console.log(jData);
		var url = "../rest/release/update";
		$.ajax({
			type : "PUT",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : jData,
			statusCode : {
				200 : function() {
					alert("Release Updated Successfully");
					$('#release_name').val("");
					$('#start_date').val("");
					$('#end_date').val("");
					$('#duration').val("");
					$('#status').text("Select");
					$('#content_text').val("");
				},
				206 : function(){
					alert("Release Name Already Present in the Database");
				},
				400 : function(){
					alert("Could not Update Release.");
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
$("#spr_display_btn").on("click", function () {
	var releaseName=$('#release_name').val();
	display_sprints();
	$('#spr_display_btn').removeClass('btn-default');
	$('#spr_display_btn').addClass('btn-primary');
	$("#us_display_btn").removeClass('btn-primary');
	$("#us_display_btn").addClass('btn-default');
	$("#rel_path").text("");
	
	$("#rel_path").append('<a href="#" onclick="load_releases_list()">Releases/</a>'+
		'<span>'+ releaseName +'/</span>'
		+'<span>Sprints</span>');
});
$("#us_display_btn").on("click", function () {
	var releaseName=$('#release_name').val();
	display_userstories();
	$("#us_display_btn").removeClass('btn-default');
	$("#us_display_btn").addClass('btn-primary');
	$('#spr_display_btn').removeClass('btn-primary');
	$('#spr_display_btn').addClass('btn-default');
	$("#rel_path").text("");
	//console.log($('#releaseId'+row).val());
	$("#rel_path").append('<a href="#" onclick="load_releases_list()">Releases/</a>'+
		'<span>'+ releaseName +'/</span>'
		+'<span">Userstories</span>');
});

//Loading sprints present in the selected release
function display_sprints(){
	var releaseId = $('#release_id').val();
	var jData = '{"releaseId":"' + releaseId + '"}';
	$('#release_list').show();
	var url = "../rest/sprint/getSprintRecordForSpecifiedRelease";
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
				$('#release_list').text("No Sprints added to the Release");
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
				$('#release_list').html(table);
			}
		}
	}).error(function(xhr, errorText) {
		$('#release_list').show();
		$('#release_list').text("Could Not Load Sprint List");
	});
}
//Loading Userstories present in the selected release
function display_userstories(){
	var releaseId = $('#release_id').val();
	var jData = '{"userStoryReleaseId":"' + releaseId + '"}';
	$('#release_list').show();
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
				$('#release_list').text("No Userstory is added to the release");
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
				$('#release_list').html(table);
			}
		}
	}).error(function(xhr, errorText) {
		$('#release_list').show();
		$('#release_list').text("Could Not User Story List");
	});
}
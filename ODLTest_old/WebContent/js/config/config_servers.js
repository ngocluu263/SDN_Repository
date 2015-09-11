$(document).ready(function() {
	// All the fields will be disabled  on refresh till the user clicks edit
	$('#email_list').hide();
	$("#config_blocks :input").attr("disabled", true);
	$('#config_table_contents').hide();
	$("#cancel_server_config").attr('disabled', true);
	$("#save_server_config").attr('disabled', true);
	$('#server_info').hide();
	$('#config_blocks').css({'height': $(window).height()-3*$("#header").height()-2*$("#footer").height()});
	$('#config_blocks').css({'overflow-y': 'scroll'});
	
	// To load the configuration saved in the properties file on refresh
	//load_config_values();

});
	
 
// To display the configuration present in the properties file
function load_config_values(){
	//alert('inside load_config_values');
	$("#config_blocks :input").attr("disabled", true);
	var url = "../rest/configuration/get";
	$.ajax({
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			console.log(data);
			//Version control tool values
			$('#ver_cntrl_tool').val(data.vcTool);
			$('#ver_cntrl_ip').val(data.vcIp);
			$('#ver_cntrl_user').val(data.vcUsername);
			$('#ver_cntrl_password').val(data.vcPassword);
			$('#ver_cntrl_path').val(data.vcPath);
			//continuous integration tool values
			$('#cont_intr_tool').val(data.ciTool);
			$('#continuous_int_ip').val(data.ciIp);
			$('#continuous_int_user').val(data.ciUsername);
			$('#continuous_int_password').val(data.ciPassword);
			$('#continuous_int_path').val(data.ciPath);
			//Test case management tool values
			$('#test_case_mgn_tool').val(data.tcmTool);
			$('#test_case_mgt_ip').val(data.tcmIp);
			$('#test_case_mgt_user').val(data.tcmUsername);
			$('#test_case_mgt_password').val(data.tcmPassword);
			$('#test_case_mgt_path').val(data.tcmPath);
			//Bug management tool values
			$('#bug_mgn_tool').val(data.bmTool);
			$('#bug_manage_ip').val(data.bmIp);
			$('#bug_manage_user').val(data.bmUsername);
			$('#bug_manage_password').val(data.bmPassword);
			$('#bug_manage_path').val(data.bmPath);
			//code analysis tool values
			$('#code_analysis_tool').val(data.caTool);
			$('#code_analysis_ip').val(data.caIp);
			$('#code_analysis_user').val(data.caUsername);
			$('#code_analysis_password').val(data.caPassword);
			$('#code_analysis_path').val(data.caPath);
			//code coverage tool values
			$('#code_cover_tool').val(data.ccTool);
			$('#code_coverage_ip').val(data.ccIp);
			$('#code_coverage_user').val(data.ccUsername);
			$('#code_coverage_password').val(data.ccPassword);
			$('#code_coverage_path').val(data.ccPath);
			//unit test tool values
			$('#unit_test_tool').val(data.utTool);
			$('#unit_test_ip').val(data.utIp);
			$('#unit_test_user').val(data.utUsername);
			$('#unit_test_password').val(data.utPassword);
			$('#unit_test_path').val(data.utPath);
			//other tool values
			$('#other_tool').val(data.otTool);
			$('#other_tools_ip').val(data.otIp);
			$('#other_tools_user').val(data.otUsername);
			$('#other_tools_password').val(data.otPassword);
			$('#other_tools_path').val(data.otPath);
			}
		})
		.error(function(xhr, errorText) {
			//alert('Error Occurred');
			$('#server_info').show();
			$('#server_info').text("Could not load the configuration Server details");
			$("#edit_server_config").attr('disabled', true);
		});
}

// To load the configuration on click of cancel button
$('#cancel_server_config').on('click',load_config_values());

// To save the entered configuration on click of save button
function save_config_values(){
	var jData = '{'+
		//VC TOOL
		'"vcTool":"' + version_cntrl_tool + 
		'","vcIp":"' + ver_cntrl_ip + 
		'","vcUsername":"' + ver_cntrl_user +
		'","vcPassword":"' + ver_cntrl_password +
		'","vcPath":"' + ver_cntrl_path + 
		//CI TOOL
		'","ciTool":"' + cont_intr_tool +
		'","ciIp":"' + continuous_int_ip +
		'","ciUsername":"' + continuous_int_user +
		'","ciPassword":"' + continuous_int_password +
		'","ciPath":"' + continuous_int_path +
		//TCM TOOL
		'","tcmTool":"' + test_case_mgn_tool +
		'","tcmIp":"' + test_case_mgt_ip +
		'","tcmUsername":"' + test_case_mgt_user +
		'","tcmPassword":"' + test_case_mgt_password +
		'","tcmPath":"' + test_case_mgt_path +
		//BM TOOL
		'","bmTool":"' + bug_mgn_tool +
		'","bmIp":"' + bug_manage_ip +
		'","bmUsername":"' + bug_manage_user +
		'","bmPassword":"' + bug_manage_password +
		'","bmPath":"' + bug_manage_path +
		//CA TOOL
		'","caTool":"' + code_analysis_tool +
		'","caIp":"' + code_analysis_ip +
		'","caUsername":"' + code_analysis_user +
		'","caPassword":"' + code_analysis_password +
		'","caPath":"' + code_analysis_path +
		//CC TOOL
		'","ccTool":"' + code_cover_tool +
		'","ccIp":"' + code_coverage_ip +
		'","ccUsername":"' + code_coverage_user +
		'","ccPassword":"' + code_coverage_password +
		'","ccPath":"' + code_coverage_password +
		//UT TOOL
		'","utTool":"' + unit_test_tool +
		'","utIp":"' + unit_test_ip +
		'","utUsername":"' + unit_test_user +
		'","utPassword":"' + unit_test_password +
		'","utPath":"' + unit_test_path +
		//OT TOOL
		'","otTool":"' + other_tool +
		'","otIp":"' + other_tools_ip +
		'","otUsername":"' + other_tools_user +
		'","otPassword":"' + other_tools_password +
		'","otPath":"' + other_tools_path +
	'"}';
	//console.log(jData);
	var url = "../rest/configuration/update";
	$.ajax({
		type : "POST",
		dataType : "html",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		data : jData,
		statusCode : {
			200 : function() {
				alert("Updated Successfully");
				$("#config_blocks :input").attr("disabled", true);
				$("#cancel_server_config").attr('disabled', true);
				$("#save_server_config").attr('disabled', true);
			},
			400 : function(){
				alert("Specified Path does not Exist");
				$("#config_blocks :input").attr("disabled", true);
				$("#cancel_server_config").attr('disabled', true);
				$("#save_server_config").attr('disabled', true);
			}
		}
	}).error(function(xhr, errorText) {
		alert(errorText);
	});
}
//Version control
$('#ver_cntrl_tool').on('change',function(){
	version_cntrl_tool= $('#ver_cntrl_tool').val();
	if(version_cntrl_tool === "None"){
		$("#version_control :input").attr("disabled", true);
		$("#ver_cntrl_tool").attr('disabled', false);
		$('#ver_cntrl_ip').val("");
		$('#ver_cntrl_user').val("");
		$('#ver_cntrl_password').val("");
		$('#ver_cntrl_path').val("");
		save_button_control();
	}else{
		save_button_control();
		$("#version_control :input").attr("disabled", false);
		$("#ver_cntrl_tool").attr('disabled', false);
	}
});	
function version_control_check(){
 	version_cntrl_tool= $('#ver_cntrl_tool').val();
 	ver_cntrl_ip = $('#ver_cntrl_ip').val();
 	ver_cntrl_user = $('#ver_cntrl_user').val();
 	ver_cntrl_password = $('#ver_cntrl_password').val();
	ver_cntrl_path = $('#ver_cntrl_path').val();
	if(ver_cntrl_ip ===""){
		alert("Please Enter the IP address for Version control tool");
		return 0;
	}else if(ver_cntrl_user === ""){
		alert("Please Enter the Username for Version control tool");
		return 0;
	}else if(ver_cntrl_password === ""){
		alert("Please Enter the Password for Version control tool");
		return 0;
	}else if(ver_cntrl_path === ""){
		alert("Please Enter the file Path for Version control tool");
		return 0;
	}
}
// continuous integration
$('#cont_intr_tool').on('change',function(){
	cont_intr_tool= $('#cont_intr_tool').val();
	save_button_control();
	if(cont_intr_tool === "None"){
		$("#continuous_int :input").attr("disabled", true);
		$("#cont_intr_tool").attr('disabled', false);
		$('#continuous_int_ip').val("");
		$('#continuous_int_user').val("");
		$('#continuous_int_password').val("");
		$('#continuous_int_path').val("");
	}else{
		$("#continuous_int :input").attr("disabled", false);
		$("#cont_intr_tool").attr('disabled', false);
	}
});

function continuous_int_check(){
	cont_intr_tool= $('#cont_intr_tool').val();
 	continuous_int_ip = $('#continuous_int_ip').val();
 	continuous_int_user = $('#continuous_int_user').val();
 	continuous_int_password = $('#continuous_int_password').val();
	continuous_int_path = $('#continuous_int_path').val();
	if(continuous_int_ip ==""){
		alert("Please Enter the IP address for Continuous Integration");
		return 0;
	}else if(continuous_int_user == ""){
		alert("Please Enter the Username for Continuous Integration");
		return 0;
	}else if(continuous_int_password == ""){
		alert("Please Enter the Password for Continuous Integration");
		return 0;
	}else if(continuous_int_path == ""){
		alert("Please Enter the file Path for Continuous Integration");
		return 0;
	}
}	

// Test case management
$('#test_case_mgn_tool').on('change',function(){
	test_case_mgn_tool= $('#test_case_mgn_tool').val();
	save_button_control();
	if(test_case_mgn_tool === "None"){
		$("#test_case_manage :input").attr('disabled', true);
		$("#test_case_mgn_tool").attr('disabled', false);
		$('#test_case_mgt_ip').val("");
		$('#test_case_mgt_user').val("");
		$('#test_case_mgt_password').val("");
		$('#test_case_mgt_path').val("");
		}else{
		$("#test_case_manage :input").attr('disabled', false);
		$("#test_case_mgn_tool").attr('disabled', false);	
	}
});
function test_case_mgt_check(){
	test_case_mgn_tool= $('#test_case_mgn_tool').val();
 	test_case_mgt_ip = $('#test_case_mgt_ip').val();
 	test_case_mgt_user = $('#test_case_mgt_user').val();
 	test_case_mgt_password = $('#test_case_mgt_password').val();
	test_case_mgt_path = $('#test_case_mgt_path').val();
	if(test_case_mgt_ip ===""){
		alert("Please Enter the IP address for Test case management tool");
		return 0;
	}else if(test_case_mgt_user === ""){
		alert("Please Enter the Username for Test case management tool");
		return 0;
	}else if(test_case_mgt_password === ""){
		alert("Please Enter the Password for Test case management tool");
		return 0;
	}else if(test_case_mgt_path === ""){
		alert("Please Enter the file Path for Test case management tool");
		return 0;
	}
}
//Bug management
$('#bug_mgn_tool').on('change',function(){
	bug_mgn_tool= $('#bug_mgn_tool').val();
	save_button_control();
	if(bug_mgn_tool === "None"){
		$("#bug_manage:input").attr('disabled', true);
		$("#bug_mgn_tool").attr('disabled', false);
		$('#bug_manage_ip').val("");
		$('#bug_manage_user').val("");
		$('#bug_manage_password').val("");
		$('#bug_manage_path').val("");	
	}else{
		$("#bug_manage:input").attr('disabled', true);
		$("#bug_mgn_tool").attr('disabled', false);

	}
});
function bug_mgt_check(){
	bug_mgn_tool= $('#bug_mgn_tool').val();
 	bug_manage_ip = $('#bug_manage_ip').val();
 	bug_manage_user = $('#bug_manage_user').val();
 	bug_manage_password = $('#bug_manage_password').val();
	bug_manage_path = $('#bug_manage_path').val();
	if(bug_manage_ip ===""){
		alert("Please Enter the IP address for Bug management tool");
		return 0;
	}else if(bug_manage_user === ""){
		alert("Please Enter the Username for Bug management tool");
		return 0;
	}else if(bug_manage_password === ""){
		alert("Please Enter the Password for Bug management tool");
		return 0;
	}else if(bug_manage_path === ""){
		alert("Please Enter the file Path for Bug management tool");
		return 0;
	}
}	
// code analysis
$('#code_analysis_tool').on('change',function(){
	code_analysis_tool= $('#code_analysis_tool').val();
	save_button_control();
	if(code_analysis_tool === "None"){
		$("#code_analysis:input").attr('disabled', true);
		$("#code_analysis_tool").attr('disabled', false);
		$('#code_analysis_ip').val("");
		$('#code_analysis_user').val("");
		$('#code_analysis_password').val("");
		$('#code_analysis_path').val("");	
	}else{
		$("#code_analysis:input").attr('disabled', true);
		$("#code_analysis_tool").attr('disabled', false);
	}	
});
function code_analysis_check(){
	code_analysis_tool= $('#code_analysis_tool').val();
 	code_analysis_ip = $('#code_analysis_ip').val();
 	code_analysis_user = $('#code_analysis_user').val();
 	code_analysis_password = $('#code_analysis_password').val();
	code_analysis_path = $('#code_analysis_path').val();
	if(code_analysis_ip ===""){
		alert("Please Enter the IP address for code analysis tool");
		return 0;
	}else if(code_analysis_user === ""){
		alert("Please Enter the Username for code analysis tool");
		return 0;
	}else if(code_analysis_password === ""){
		alert("Please Enter the Password for code analysis tool");
		return 0;
	}else if(code_analysis_path === ""){
		alert("Please Enter the file Path for code analysis tool");
		return 0;
	}
}
// code coverage tool
$('#code_cover_tool').on('change',function(){
	code_cover_tool= $('#code_cover_tool').val();
	save_button_control();
	if(code_cover_tool === "None"){
		$("#code_coverage:input").attr('disabled', true);
		$("#code_cover_tool").attr('disabled', false);
		$('#code_coverage_ip').val("");
		$('#code_coverage_user').val("");
		$('#code_coverage_password').val("");
		$('#code_coverage_path').val("");	
	}else{
		$("#code_coverage:input").attr('disabled', true);
		$("#code_cover_tool").attr('disabled', false);
	}	
});
function code_coverage_check(){
	code_cover_tool= $('#code_cover_tool').val();
 	code_coverage_ip = $('#code_coverage_ip').val();
 	code_coverage_user = $('#code_coverage_user').val();
 	code_coverage_password = $('#code_coverage_password').val();
	code_coverage_path = $('#code_coverage_path').val();
	if(code_coverage_ip ===""){
		alert("Please Enter the IP address for code coverage tool");
		return 0;
	}else if(code_coverage_user === ""){
		alert("Please Enter the Username for code coverage tool");
		return 0;
	}else if(code_coverage_password === ""){
		alert("Please Enter the Password for code coverage tool");
		return 0;
	}else if(code_coverage_path === ""){
		alert("Please Enter the file Path for code coverage tool");
		return 0;
	}
}	
//Unit test tool
$('#unit_test_tool').on('change',function(){
	unit_test_tool= $('#unit_test_tool').val();
	save_button_control();
	if(unit_test_tool === "None"){
		$("#unit_test:input").attr('disabled', true);
		$("#unit_test_tool").attr('disabled', false);
		$('#unit_test_ip').val("");
		$('#unit_test_user').val("");
		$('#unit_test_password').val("");
		$('#unit_test_path').val("");	
	}else{
		$("#unit_test:input").attr('disabled', true);
		$("#unit_test_tool").attr('disabled', false);
	}	
});
function unit_test_check(){
	unit_test_tool= $('#unit_test_tool').val();
 	unit_test_ip = $('#unit_test_ip').val();
 	unit_test_user = $('#unit_test_user').val();
 	unit_test_password = $('#unit_test_password').val();
	unit_test_path = $('#unit_test_path').val();
	if(unit_test_ip ===""){
		alert("Please Enter the IP address for Unit test tool");
		return 0;
	}else if(unit_test_user === ""){
		alert("Please Enter the Username for Unit test tool");
		return 0;
	}else if(unit_test_password === ""){
		alert("Please Enter the Password for Unit test tool");
		return 0;
	}else if(unit_test_path === ""){
		alert("Please Enter the file Path for Unit test tool");
		return 0;
	}
}
//other tools
$('#other_tool').on('change',function(){
	other_tool= $('#other_tool').val();
	save_button_control();
	if(other_tool === "None"){
		$("#other_tools:input").attr('disabled', true);
		$("#other_tool").attr('disabled', false);
		$('#other_tools_ip').val("");
		$('#other_tools_user').val("");
		$('#other_tools_password').val("");
		$('#other_tools_path').val("");
	}else{
		$("#other_tools:input").attr('disabled', true);
		$("#other_tool").attr('disabled', false);
	}
});
function other_tool_check(){
	other_tool= $('#other_tool').val();
 	other_tools_ip = $('#other_tools_ip').val();
 	other_tools_user = $('#other_tools_user').val();
 	other_tools_password = $('#other_tools_password').val();
	other_tools_path = $('#other_tools_path').val();
	if(other_tools_ip ===""){
		alert("Please Enter the IP address for other tool");
		return 0;
	}else if(other_tools_user === ""){
		alert("Please Enter the Username for other tool");
		return 0;
	}else if(other_tools_password === ""){
		alert("Please Enter the Password for other tool");
		return 0;
	}else if(other_tools_path === ""){
		alert("Please Enter the file Path for other tool");
		return 0;
	}
}	
// All the fields become editable on click of edit button
$('#edit_server_config').on('click',function(){
 	version_cntrl_tool= $('#ver_cntrl_tool').val();
	cont_intr_tool= $('#cont_intr_tool').val();
	test_case_mgn_tool= $('#test_case_mgn_tool').val();
	bug_mgn_tool= $('#bug_mgn_tool').val();
	code_analysis_tool= $('#code_analysis_tool').val();
	code_cover_tool= $('#code_cover_tool').val();
	unit_test_tool= $('#unit_test_tool').val();
	other_tool= $('#other_tool').val();
	$("#cancel_server_config").attr('disabled',false);
	$("#save_server_config").attr('disabled', false);
	/*$("#ver_cntrl_tool").attr("disabled", false);
	$("#cont_intr_tool").attr("disabled", false);
	$("#test_case_mgn_tool").attr("disabled", false);
	$("#bug_mgn_tool").attr("disabled", false);
	$("#code_analysis_tool").attr("disabled", false);
	$("#code_cover_tool").attr("disabled", false);
	$("#unit_test_tool").attr("disabled", false);
	$("#other_tool").attr("disabled", false);*/
	$("#config_blocks :input").attr("disabled", false);
	/*if(version_cntrl_tool !== "None"){
		alert("version control is not null");
		$("#version_control:input").attr('disabled',false);
	}*/
	$("#edit_server_config").attr('disabled', true);

});

// On click of save button
$('#save_server_config').on('click',function(){
	
 	version_cntrl_tool= $('#ver_cntrl_tool').val();
	cont_intr_tool= $('#cont_intr_tool').val();
	test_case_mgn_tool= $('#test_case_mgn_tool').val();
	bug_mgn_tool= $('#bug_mgn_tool').val();
	code_analysis_tool= $('#code_analysis_tool').val();
	code_cover_tool= $('#code_cover_tool').val();
	unit_test_tool= $('#unit_test_tool').val();
	other_tool= $('#other_tool').val();

	if(version_cntrl_tool !=="None"){
		if(version_control_check() ===0){
			return 0;
		}
	}
	if(cont_intr_tool !=="None"){
		if(continuous_int_check()===0){
			return 0;
		}
	}
	if(test_case_mgn_tool !=="None"){
		if(test_case_mgt_check() ===0){
			return 0;
		}
	}
	if(bug_mgn_tool !=="None"){
		if(bug_mgt_check() === 0){
			return 0;
		}
	}
	if(code_analysis_tool !=="None"){
		if(code_analysis_check() === 0){
			return 0;
		}
	}
	if(code_cover_tool !=="None"){
		if(code_coverage_check() === 0){
			return 0;
		}
	}
	if(unit_test_tool !=="None"){
		if(unit_test_check() === 0){
			return 0;
		}
	}
	if(other_tool !=="None"){
		if(other_tool_check() === 0){
			return 0;
		}
	}	
	if((version_cntrl_tool ==="None") && (cont_intr_tool ==="None") && 
		(test_case_mgn_tool ==="None") && (bug_mgn_tool ==="None") && 
		(code_analysis_tool ==="None") && (code_cover_tool ==="None") && 
		(unit_test_tool ==="None") && (other_tool ==="None")){
		$("#save_server_config").attr('disabled', true);
		return;
	}	
	save_config_values();
} );
// To disable save button if all the fields are empty
function save_button_control(){
	if((version_cntrl_tool ==="None") && (cont_intr_tool ==="None") && 
		(test_case_mgn_tool ==="None") && (bug_mgn_tool ==="None") && 
		(code_analysis_tool ==="None") && (code_cover_tool ==="None") && 
		(unit_test_tool ==="None") && (other_tool ==="None")){
		$("#save_server_config").attr('disabled', true);
	}else{
		$("#save_server_config").attr('disabled', false);
	}
}
// To enable check on editting any field in that div
/*$('form :input').change(function(){
   $('#log').prepend('<p>Form changed</p>')
});*/


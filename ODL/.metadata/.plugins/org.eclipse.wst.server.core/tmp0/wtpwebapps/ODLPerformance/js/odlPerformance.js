/*
$('#start_odl').on('click',function(){
	var num_of_switches=$('#num_of_switches').val();
	var vm_ip=$('#vm_ip').val().trim();
	var num_of_runs=$('#num_of_runs').val();
	var vm_UN=$('#vm_UN').val();
	var duration=$('#duration').val();
	var vm_PW=$('#vm_PW').val();
	var processors=$('#processors').val();
	var restart_option=$('#restart_option').val();
	
	if(num_of_switches === ""){
		alert("Please Enter number of switch");
	}else if(vm_ip === ""){
		alert("Please Enter VM IP");
	}else if(num_of_runs === ""){
		alert("Please Enter number of runs");
	}else if(vm_UN === ""){
		alert("Please Enter VM User name");
	}else if(duration === ""){
		alert("Please Enter duration");
	}else if(vm_PW === ""){
		alert("Please Enter VM Password");
	}else if(processors === ""){
		alert("Please Enter Processor");
	}else if(restart_option === "" || restart_option == "Select"){
		alert("Please Select Restart option");
	}else{
		alert("hi");
		var jData = '{"numOfSwitches":"' + num_of_switches + '","vmIp":"' + vm_ip + 
		'","numOfRuns":"' + num_of_runs +'","vmUN":"' + vm_UN +'","duration":"' + duration + 
		'","vmPW":"' + vm_PW +'","processors":"' + processors + '","restartOption":"' + restart_option +'"}';
		var url = "../rest/odl/odlPerformance";
		//alert(jData);
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

});*/
$(document).ready(function() {
	$("#start_odl").show();
	$("#stop_odl").hide();
	$('#content').css({'height': $(window).height()-$("#header").height()-$("#footer").height()});
	$('#content').css({'overflow-y': 'scroll'});
	
	$("#start_odl").on("click", function () {
		var num_of_runs=$('#num_of_runs').val();
		var duration=$('#duration').val();
		var odlIpAddr=$('#odl_ip_addr').val();
		var processors=$('#processors').val();
		var restart_option=$('#restart_option').val();
		
		if(num_of_runs === ""){
			alert("Please Enter the number of Iterations");
		}else if(duration === ""){
			alert("Please Enter the duration of the Test case");
		}else if(odlIpAddr == "" ){
			alert("Please Enter the IP address");
		}else if(processors === ""){
			alert("Please Enter the number of Processors");
		}else if(restart_option === ""){
			alert("Please Enter the Restart option");
		}else{
			if(ValidateIPaddress(odlIpAddr)){
				$("#start_odl").hide();
				$("#stop_odl").show();

				var jData = '{"numberOfRuns":"' + num_of_runs + '","duration":"' + duration + 
				'","odlIpAddress":"' + odlIpAddr + '","processors":"' + processors + 
				'","restartOdl":"' + restart_option + '"}';
				var url = "../rest/odl/start";
				$.ajax({
					type : "POST",
					dataType : "html",
					contentType : "application/json",
					url : url,
					crossDomain : true,
					data : jData,
					statusCode : {
						200 : function() {
							//alert("Release Added Successfully");
							//load_releases_list();
							$('#num_of_runs').val("");
							$('#duration').val("");
							$('#odl_ip_addr').val("");
							$('#processors').val("");
							$('#restart_option').val("");
						},
						206 : function(){
							//alert("Release Name Already Present in the Database");
						},
						400 : function(){
							//alert("Could not Add Release.");
						},
						401 : function(){
							//alert("Session-Out.Please Re-Login");
							//window.location.href = "../index.html";
						}
					}
				}).error(function(xhr, errorText) {
					alert(errorText);
				});
			}
		}
	});
	function ValidateIPaddress(inputText){
		var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		if(inputText.match(ipformat)){
			return true;
		}else{
			alert("Please Enter a Valild IP address");
			$('#odl_ip_addr').val("");
			//$('#odl_ip_addr').focus();
			return false;
		}
	}

	$(function (){$("#num_of_runs").blur(function (){
		var regX = /^\d+$/;  
		if(regX.test($(this).val()) == false) 
		{
			//do something it is not int. In this case clear value and alert message 
			$(this).val('');
			alert("Please enter an integer");
		}

		});
	});

	$(function (){$("#processors").blur(function (){
		var regX = /^\d+$/;  
		if(regX.test($(this).val()) == false) 
		{
			//do something it is not int. In this case clear value and alert message 
			$(this).val('');
			alert("Please enter an integer");
		}

		});
	});



	$("#duration").blur(function (){
		var regX = /^\d+$/;  
		if(regX.test($(this).val()) == false) 
		{
			//do something it is not int. In this case clear value and alert message 
			$(this).val('');
			alert("Please enter an integer");
		}

	});


	$(function (){$("#odl_ip_addr").blur(function (){
		var odlIpAddr=$('#odl_ip_addr').val();
		ValidateIPaddress(odlIpAddr);
		});
	});

});












/*var chart_data=[{ x: 10, y: 71 },
		{ x: 20, y: 55},
		{ x: 30, y: 50 },
		{ x: 40, y: 65 },
		{ x: 50, y: 95 },
		{ x: 60, y: 68 },
		{ x: 70, y: 28 },
		{ x: 80, y: 34 },
		{ x: 90, y: 14}]

window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer",
	{
	  title:{
	   text: "Trying Marker Types"
	  },
	  data: [{
		markerType:"circle",//"triangle", "square", "cross", "none"
		type: "line",
		dataPoints: chart_data
	  }]
	});

	chart.render();
  }
*/

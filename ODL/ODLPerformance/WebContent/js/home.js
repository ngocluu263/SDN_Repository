$(document).ready(function() {
	$("#start_odl").show();
	$("#stop_odl").hide();
	$('#content').css({'height': $(window).height()-$("#header").height()-$("#footer").height()});
	$('#content').css({'overflow-y': 'scroll'});
	
	$("#start_odl").on("click", function () {
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
			
			//if(ValidateIPaddress(odlIpAddr)){
				//$("#start_odl").hide();
				//$("#stop_odl").show();
			$("#start_odl").attr("disabled", true);
				//alert("hi");
				var jData = '{"numOfSwitches":"' + num_of_switches + '","vmIp":"' + vm_ip + 
				'","numOfRuns":"' + num_of_runs +'","vmUN":"' + vm_UN +'","duration":"' + duration + 
				'","vmPW":"' + vm_PW +'","processors":"' + processors + '","restartOption":"' + restart_option +'"}';
				var url = window.location.href;
				//alert(jData);
				//var url = "../rest/odl/odlPerformance";
				//alert(url);
				$.ajax({
					type : "POST",
					dataType : "JSON",
					contentType : "application/json",
					url : url + 'rest/odlPer/testodlPerformance',
					crossDomain : true,
					data : jData,
					statusCode : {
						
						5 : function(response) {
							//alert("Release Added Successfully");
							//load_releases_list();
							//alert("hi");
							$("#start_odl").attr("disabled", false);
							$('#num_of_runs').val("");
							$('#duration').val("");
							$('#odl_ip_addr').val("");
							$('#processors').val("");
							$('#restart_option').val("");
							$('#num_of_switches').val("");
							$('#vm_ip').val("");
							$('#vm_UN').val("");
							$('#vm_PW').val("");
						},
						200 : function(response){
							
						/*	alert("Got the data");
							//console.log("DATA",response)
							if (response.length == 0 ){
								alert("NO DATA")
							}*/
							//var details = JSON.parse(response)
							// Enable UI to Start next run
							$("#start_odl").attr("disabled", false);
							$('#num_of_runs').val("");
							$('#duration').val("");
							$('#odl_ip_addr').val("");
							$('#processors').val("");
							$('#restart_option').val("");
							$('#num_of_switches').val("");
							$('#vm_ip').val("");
							$('#vm_UN').val("");
							$('#vm_PW').val("");
							
							
							///
							
							
							var  i = 0;
							var k=0;
							var totalData = "";
							var tableContent = "<tr>";
							var seq=[0,1,2,3,8,10,14,15,17];//column selection sequence
							var timestamp=response[response.length-1];
							
							for (i = 0 ; i < 9 ; i++){
								
								tableContent += "<th>" + response[0].split(",")[seq[i]].replace("\"","").replace("\"","") + "</th>";
								
							}
							tableContent += "</tr>";
							var dataLine ="";
						    
							for (k=1; k < response.length-1 ;k++)
								{
								dataLine+="<tr>";
								
								for (i = 0 ; i < 9 ; i++){
									dataLine += "<td>" + response[k].split(",")[seq[i]].replace("\"","").replace("\"","")  + "</td>";
								}	
								dataLine+="</tr>";
								}
							
								totalData = tableContent + dataLine  + "</table>";
							//tableContent += "<tr>" + response[0] + "</tr></table>"
							//tableContent += "<tr> <th> RESp" + response[0].split(",")[0] + "</th></tr></table>"
							//alert(tableContent)
							$('#create_table').html(totalData);
							
							$("#start_odl").attr("disabled", false);
							//var imgsrc="<img src="+"\""+"c:/RemoteExecution/results.png"+"\" "+"id=\""+
							
							//$("#chartContainer").html('<img src="images/results.png" id="odl_graph_result" class="img-responsive" alt="ODL Graph"></div>')
							
							
							$("#chartContainer").html('<img src="images/results1234567890.png" id="odl_graph_result" class="img-responsive" alt="ODL Graph"/></div>');
							//document.getElementById('chartContainer').reload(true);
							//document.getElementById('odl_graph_result').reload(true);
							$("#chartContainer").attr("disabled", false);
							$("#odl_graph_result").attr("disabled", false);
							
							alert("Hi6");
							
							
							
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
				//	alert(errorText);
				});
				
				 
				
			//}
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


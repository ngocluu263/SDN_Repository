	$("body").delegate("#create_prop", 'click',function(){
		//$("#data_contents1").hide();  
		//$('#createnew').show(); 
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_prop_cli.html');
		
	});
		$("body").delegate("#create_data_file", 'click',function(){
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_data_cli.html');
	
	});
/*create button functionality for CLI */
	
	$("body").delegate('#create_cli','click', function() {
		var fileName = $('#name_cli').val();
		if(fileName==""){
            alert('Please Enter the Project Name');
            return;
		} 
		jdata = {};
		jdata['fileName']=fileName;
		objdata_cli = JSON.stringify(jdata);
		console.log(objdata_cli);
		var url = "../rest/command/createFolder";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : objdata_cli,
		
			statusCode : {
				200 : function(data) {
					console.log(data);
					if(data == 'Project Already Exist'){
						alert(data);
					}else if(data == 'Project Successfully Created'){
						alert(data);
					}
				},
				400 : function(){
					alert("Unsuccessful Creating the Project");
				}
			}
		}).error(function(xhr, errorText) {
		//	alert(errorText);

		});
	});

/* dropdown function for cli*/
function load_project_list3(){
	//alert('load_project_list');
	var url = "../rest/command/updateExistingDropdown";
	$.ajax({
		type : "GET",
		dataType : "html",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			data = jQuery.parseJSON(data);
			//console.log('**'+data.length);
			var len  = data.length;
			$('#proj_name3').empty();
			if(len=='0'){
				$('#proj_name3').append('<option value="Select">Select</option>');
			}else{
				$('#proj_name3').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#proj_name3').append('<option value="' + data[count] + '">' + data[count] + '</option>');
				}
				document.getElementById('proj_name3').selectedIndex = '0';
				load_command_list3();
			}
		}
	}).error(function(xhr, errorText) {
		//alert(errorText);
	});
}

$('#proj_name3').change("click", function() {
	  	load_command_list3();
	  });

function load_command_list3(){
    fileName_cli = $('#proj_name3').val();
}

    $("body").delegate('#cli_create_prop_save','click', function() {
    	
    	//var folderName = $('#name_cli').val();
      //  var fileName = $('#name_cli_cre').val();
        var cmdname_cli_cre_prop = $('#cmdname_cli_cre_prop').val();
        var cmdval_cli_cre_prop = $('#cmdval_cli_cre_prop').val();
        
           /*
            if(folderName==""){
                alert('Please Enter the Project Name');
                return;
            }*/
               
           /* if(fileName==""){
                alert('Please Enter the File Name');
                return;
            }*/
                
            if(cmdname_cli_cre_prop==""){
                alert('Please Enter the command');
                return;
            }
               
            if(cmdval_cli_cre_prop==""){
                alert('Please Enter the Value');
                return;
            }
      
        var inputs = [];
        inputs.push(fileName_cli);
        $('#createnew input').each(function(index, elem){
        	inputs.push(elem.value);
        });
        //objdata_create_prop = JSON.stringify($('#createnew').serializeArray());
        
        jdata = {};
     //   jdata['fileName_cli']=fileName_cli;
		jdata['inputs']=inputs;

		objdata_cli_data = JSON.stringify(jdata);
        
        console.log(inputs);

        var url = "../rest/command/createPropertiesSaveButton";
        $.ajax({
            type : "POST",
            dataType : "json",
            contentType : "application/json",
            url : url,
            crossDomain : true,
            data : objdata_cli_data,
            statusCode : {
                200 : function(data) {
                	//console.log(data.responseText);
                	//data.responseText
                	if(data.responseText=="Saved Successfully"){
                		alert("Saved Successfully");
                	} else if(data.responseText=="Please Create The Project"){
                		alert("Please Create The Project");
                	}   
                },
                204:function(data){
                    alert("Could not save the File");
                },
            }
        }).error(function(xhr, errorText) {
         //   alert(errorText);
        });
    });

 	/* save button functionality for CLI data file*/
	   
    $("body").delegate('#cli_create_data_save','click', function() {
    	
    	//var folderName = $('#name_cli').val();
      //  var fileName = $('#name_cli_cre').val();
        var cmdname_cli_cre_prop = $('#cmdname_cli_cre_prop').val();
        var cmdval_cli_cre_prop = $('#cmdval_cli_cre_prop').val();
        
           /*
            if(folderName==""){
                alert('Please Enter the Project Name');
                return;
            }*/
               
           /* if(fileName==""){
                alert('Please Enter the File Name');
                return;
            }*/
                
            if(cmdname_cli_cre_prop==""){
                alert('Please Enter the command');
                return;
            }
               
            if(cmdval_cli_cre_prop==""){
                alert('Please Enter the Value');
                return;
            }
      
        var inputs = [];
        inputs.push(fileName_cli);
        $('#createnew input').each(function(index, elem){
        	inputs.push(elem.value);
        });
       
        //objdata_create_prop = JSON.stringify($('#createnew').serializeArray());
        
        jdata = {};
       // jdata['fileName_webui']=fileName_webui;
		jdata['inputs']=inputs;

		objdata_cli_data = JSON.stringify(jdata);
        
        console.log(inputs);

        var url = "../rest/dataCLI/cliCreateDataXl";
        $.ajax({
            type : "POST",
            dataType : "json",
            contentType : "application/json",
            url : url,
            crossDomain : true,
            data : objdata_cli_data,
            statusCode : {
                200 : function() {
                	console.log(data);
                	if(data.responseText=="Saved Successfully"){
                		alert("Saved Successfully");
                	}else if(data.responseText=="Please Create The Project"){
                		alert("Please Create The Project");
                	}    
                },
                204:function(data){
                    alert("Could not save the File");
                },
            }
        }).error(function(xhr, errorText) {
         //   alert(errorText);
        });
    });

   /* Cancel button functionality for CLI create properties */
    
    $("body").delegate('#cli_create_prop_cancel','click', function() {
		$('#name_cli').val("");
    	$('#createnew input').val("");
	});


  /* Cancel button functionality for CLI data */
    
    $("body").delegate('#cli_data_cancel','click', function() {
		$('#name_cli').val("");
    	$('#createnew input').val("");
	});

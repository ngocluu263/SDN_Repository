	$("body").delegate("#create_prop1", 'click',function(){
		//$("#data_contents1").hide();  
		//$('#createnew').show(); 
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_prop_web_ui.html');
		
	});
	$("body").delegate("#create_data_file1", 'click',function(){
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_data_web_ui.html');
	
	});
	$("body").delegate("#create_obj_repo", 'click',function(){
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_obj_repo.html');
	
	});
/* dropdown function for web ui*/
function load_project_list4(){
	//alert('load_project_list');
	var url = "../Sg/rest/command/updateExistingDropdown";
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
			$('#proj_name4').empty();
			if(len=='0'){
				$('#proj_name4').append('<option value="Select">Select</option>');
			}else{
				$('#proj_name4').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#proj_name4').append('<option value="' + data[count] + '">' + data[count] + '</option>');
				}
				document.getElementById('proj_name4').selectedIndex = '0';
				load_command_list4();
			}
		}
	}).error(function(xhr, errorText) {
		//alert(errorText);
	});
}

  $('#proj_name4').change("click", function() {
	  	load_command_list4();
	  });

function load_command_list4(){
    fileName_webui = $('#proj_name4').val();
}

  
    /* save button functionality for Web UI create properties*/
	   
    $("body").delegate('#web_UI_create_prop_save','click', function() {
    	
  	  //	var folderName = $('#name_cli').val();
      //  var fileName = $('#name_cli_cre').val();
        var cmdname_cli_cre_prop = $('#cmdname_cli_cre_prop').val();
        var cmdval_cli_cre_prop = $('#cmdval_cli_cre_prop').val();
        
           
                
            if(cmdname_cli_cre_prop==""){
                alert('Please Enter the command');
                return;
            }
               
            if(cmdval_cli_cre_prop==""){
                alert('Please Enter the Value');
                return;
            }
      
        var inputs = [];
        inputs.push(fileName_webui);
        $('#createnew input').each(function(index, elem){
        	inputs.push(elem.value);
        });
       
        //objdata_create_prop = JSON.stringify($('#createnew').serializeArray());
        
        jdata = {};
		jdata['inputs']=inputs;

		objdata_cli_data = JSON.stringify(jdata);
        
        console.log(inputs);

        var url = "../Sg/rest/WebUi/webUIcreatePropertiesSaveButton";
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

    	/* save button functionality for webui data file*/
	   
    $("body").delegate('#web_UI_create_data_save','click', function() {
    	
   		//	var folderName = $('#name_cli').val();
      //  var fileName = $('#name_cli_cre').val();
        var cmdname_cli_cre_prop = $('#cmdname_cli_cre_prop').val();
        var cmdval_cli_cre_prop = $('#cmdval_cli_cre_prop').val();
        
           
          /*  if(folderName==""){
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
        inputs.push(fileName_webui);
        $('#createnew input').each(function(index, elem){
        	inputs.push(elem.value);
        });
       
        //objdata_create_prop = JSON.stringify($('#createnew').serializeArray());
        
        jdata = {};
		jdata['inputs']=inputs;

		objdata_cli_data = JSON.stringify(jdata);
        
        console.log(inputs);

        var url = "../Sg/rest/WebUi/webUICreateDataXl";
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
	

	    /* save button functionality for web UI create obj repo */
	   
    $("body").delegate('#web_ui_create_obj_repo_save','click', function() {
    	
   	 //	var folderName = $('#name_cli').val();
      //  var fileName = $('#name_cli_cre').val();
        var cmdname_cli_cre_prop = $('#cmdname_cli_cre_prop').val();
        var cmdval_cli_cre_prop = $('#cmdval_cli_cre_prop').val();
        
      
                
            if(cmdname_cli_cre_prop==""){
                alert('Please Enter the command');
                return;
            }
               
            if(cmdval_cli_cre_prop==""){
                alert('Please Enter the Value');
                return;
            }
      
        var inputs = [];
        inputs.push(fileName_webui);
        $('#createnew input').each(function(index, elem){
        	inputs.push(elem.value);
        });
       
        //objdata_create_prop = JSON.stringify($('#createnew').serializeArray());
        
        jdata = {};
		jdata['inputs']=inputs;

		objdata_cli_data = JSON.stringify(jdata);
        
        console.log(inputs);

        var url = "../Sg/rest/WebUi/webUIcreatePropertiesSaveButtonForOR";
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
                	if(data.responseText==""){
                		alert("Saved Successfully");
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
    
// var fileName_ccmd;
// var fileName_cli;
// var fileName_webui;
// $(document).ready(function() {
	
	//$("#menu").load('script_gen/menu.html');
	//load_project_list();
	//load_project_list1();
	/*var selector = '.nav li';
	$(selector).on('click', function(){
	    $(selector).removeClass('active');
	    $(this).addClass('active');
	});*/
	
	/*var selector1 = '#menu_list.nav-pills li';
	$(selector1).on('click', function(){
	    $(selector1).removeClass('active');
	    $(this).addClass('active');
	});*/
	
	
	/*$("#command_nav").on('click', function(){
		$("#menu_contents").empty();
		$("#menu").load('script_gen/menu.html');
	});
	$("#data_nav").on('click', function(){
		$("#menu_contents").empty();
		$("#menu").load('script_gen/data.html');
	});*/
	
/*	$("body").delegate('#create_new', 'click', function(){
	    $("#script_gen_contents").load("script_gen/create_new.html");
	    $('#menu_list.nav-pills li').removeClass('active');
		$(this).addClass('active');
	});
	
	$("body").delegate("#update_existing", 'click',function(){
		$("#script_gen_contents").load('script_gen/update_existing.html');
		load_project_list();
		$('#menu_list.nav-pills li').removeClass('active');
		
		$(this).addClass('active');
	});

	$("body").delegate("#check_command", 'click',function(){
		$("#script_gen_contents").load('script_gen/check_command.html');
		load_project_list1();
		$('#menu_list.nav-pills li').removeClass('active');
		$(this).addClass('active');
	});
	
	$("body").delegate("#cli", 'click',function(){
		$("#script_gen_contents").load('script_gen/cli.html');
		load_project_list3();
		$('#menu_list.nav-pills li').removeClass('active');
		$(this).addClass('active');
	});
	
	$("body").delegate("#web_ui", 'click',function(){
		$("#script_gen_contents").load('script_gen/web_ui.html');
		load_project_list4();
		$('#menu_list.nav-pills li').removeClass('active');
		$(this).addClass('active');
	});*/
	
/*	$("body").delegate("#create_prop", 'click',function(){
		//$("#data_contents1").hide();  
		//$('#createnew').show(); 
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_prop_cli.html');
		
	});*/
/*	$("body").delegate("#create_data_file", 'click',function(){
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_data_cli.html');
	
	});*/
	
/*	$("body").delegate("#create_prop1", 'click',function(){
		//$("#data_contents1").hide();  
		//$('#createnew').show(); 
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_prop_web_ui.html');
		
	});*/
/*	$("body").delegate("#create_data_file1", 'click',function(){
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_data_web_ui.html');
	
	});*/
/*	$("body").delegate("#create_obj_repo", 'click',function(){
		$('#data_contents1 ol').empty();
		$("#data_contents").load('script_gen/create_obj_repo.html');
	
	});*/
	
	
	/* Cancel button functionality */
/*	$("body").delegate('#cancel','click', function() {
		$('#command1').val("");
		$('#parameters').val("");
		$('#return1').val("");
		$('#description').val("");
		$('#example').val("");
		
	});*/
	
	/*create button functionality*/
	
	/*$("body").delegate('#create','click', function() {
		var fileName = $('#name').val();
		if(fileName==""){
            alert('Please Enter the file name');
            return;
		} 
		jdata = {};
		jdata['fileName']=fileName;
		objdata = JSON.stringify(jdata);
		console.log(objdata);
		var url = "../Sg/rest/command/create";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : objdata,
		
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
					alert("unsuccessfully Created the FileS");
				}
			}
		}).error(function(xhr, errorText) {
			alert(errorText);

		});
	});*/
	
	/* save button functionality for create new */
	   
    /*$("body").delegate('#save','click', function() {
    	//$("#create").trigger("click");
    	var fileName = $('#name').val();
        var command1 = $('#command1').val();
        var parameters = $('#parameters').val();
        var return1 = $('#return1').val();
        var description = $('#description').val();
        var example = $('#example').val();           
       
       
            if(command1==""){
                alert('Please Enter the command');
                return;
            }
               
            if(parameters==""){
                alert('Please Enter the parameters');
                return;
            }
               
            if(return1==""){
                alert('Please Enter the return value');
                return;
            }
               
            if(description==""){
                alert('Please Enter the description');
                return;
            }
               
            if(example==""){
                alert('Please Enter the example');
                return;
            }
           
       
        jdata = {};
        jdata['fileName']=fileName;
        jdata['command1']=command1;
        jdata['parameters']=parameters;
        jdata['return1'] = return1;
        jdata['description'] = description;
        jdata['example'] = example;
        console.log(jdata);
        objdata = JSON.stringify(jdata);

        var url = "../Sg/rest/command/save";
        $.ajax({
            type : "POST",
            dataType : "json",
            contentType : "application/json",
            url : url,
            crossDomain : true,
            data : objdata,
            statusCode : {
                200 : function(data) {
                	console.log(data);
                	if(data.responseText=="Please Create the File"){
                		var str = "JS String";
                		console.log(str);
                		alert("Please Create the File");
                	}else{
                    users = data;
                    var i = 0, len = users.length;
                    var rows = len/5;
               	 $("#create_new_table tbody").empty();  
                                    
                 $('#create_new_table').append('<tr>'+'<th>command</th>'+'<th>parameters</th>'+'<th>return</th>'+'<th>description</th>'+'<th>example</th>'+'</tr>');
                 $('#create_new_table tbody').append('<tr>');
                	for(var cell=0;cell<rows;cell++){
                		$('#create_new_table tbody').append('<td>'+users[cell*5]+'</td>');
                		$('#create_new_table tbody').append('<td>'+users[cell*5+1]+'</td>');
                		$('#create_new_table tbody').append('<td>'+users[cell*5+2]+'</td>');
                		$('#create_new_table tbody').append('<td>'+users[cell*5+3]+'</td>');
                		$('#create_new_table tbody').append('<td>'+users[cell*5+4]+'</td>');
                		if(i%5==0)
                    		$('#create_new_table tbody').append('</tr><tr>');
                	}
                	
                	$('#command1').val("");
            		$('#parameters').val("");
            		$('#return1').val("");
            		$('#description').val("");
            		$('#example').val("");
                	}     
                },
                204:function(data){
                    alert("Xls/Sheet is not Available to Fetch");
                },
                400 : function(){
                    alert("Specified Path does not Exist");
                }
            }
        }).error(function(xhr, errorText) {
            //alert(errorText);
        });
    });*/
    /* Update Existing Save button */
	   
/*    $("body").delegate('#save_update','click', function() {
    	var fileName = $('#proj_name').val();
        var command1 = $('#command1').val();
        var parameters = $('#parameters').val();
        var return1 = $('#return1').val();
        var description = $('#description').val();
        var example = $('#example').val();           
       
       
            if(command1==""){
                alert('Please Enter the command');
                return;
            }
               
            if(parameters==""){
                alert('Please Enter the parameters');
                return;
            }
               
            if(return1==""){
                alert('Please Enter the return value');
                return;
            }
               
            if(description==""){
                alert('Please Enter the description');
                return;
            }
               
            if(example==""){
                alert('Please Enter the example');
                return;
            }
           
       
        jdata = {};
        jdata['fileName']=fileName;
        jdata['command1']=command1;
        jdata['parameters']=parameters;
        jdata['return1'] = return1;
        jdata['description'] = description;
        jdata['example'] = example;
      
        console.log(jdata);
        objdata = JSON.stringify(jdata);

        var url = "../Sg/rest/command/updateexistingsavebutton";
        $.ajax({
            type : "POST",
            dataType : "json",
            contentType : "application/json",
            url : url,
            crossDomain : true,
            data : objdata,
            statusCode : {
                200 : function(data) {
                	console.log(data);
                	if(data.responseText=="Please Create the File"){
                		var str = "JS String";
                		console.log(str);
                		alert("Please Create the File");
                	}else{
                    users = data;
                    var i = 0, len = users.length;
                    var rows = len/5;
               	 $("#create_new_table tbody").empty();  
                                    
                 $('#create_new_table').append('<tr>'+'<th>command</th>'+'<th>parameters</th>'+'<th>return</th>'+'<th>description</th>'+'<th>example</th>'+'<th>check box</th>'+'</tr>');
                 $('#create_new_table tbody').append('<tr>');
                 for(var cell=0;cell<rows;cell++){

             		console.log(cell);
             		
             		var row = "<tr><td class='user-name'>"+users[cell*5]+"</td>";
             			row += "<td>"+users[cell*5+1]+"</td>";
             			row += "<td>"+users[cell*5+2]+"</td>";
             			row += "<td>"+users[cell*5+3]+"</td>";
             			row += "<td>"+users[cell*5+4]+"</td>";
             			row += "<td><input type='checkbox' class='deleteUser'/></td></tr>";
             			
             		$("#create_new_table tbody").append(row);
             		}
                	 
                	$('#command1').val("");
            		$('#parameters').val("");
            		$('#return1').val("");
            		$('#description').val("");
            		$('#example').val("");
                	}     
                },
                204:function(data){
                    alert("Xls/Sheet is not Available to Fetch");
                },
                400 : function(){
                    alert("Specified Path does not Exist");
                }
            }
        }).error(function(xhr, errorText) {
            alert(errorText);

        });
    });
	*/
 

	
	
	
	
	
/*	$("body").delegate('.deleteUser','click', function() {
		
		if($(this).prop("checked") == true){
			$(this).parents('tr').addClass('checked');
        }
        else if($(this).prop("checked") == false){
        	$(this).parents('tr').removeClass('checked');
        }
		
	});
    */
    /* remove button functionality */
/*    $("body").delegate('#remove','click', function() {
		var chk ="inside remove";
		console.log(chk);
		var chkArray = [];
		var data1 = [];
		$(".deleteUser:checked").each(function() {
				console.log("values are");
				chkArray.push($(this).parents('tr').find('.user-name').text());				
			});
		console.log("array value is "+chkArray);
		var len=chkArray.length;
		console.log(len);
		if(chkArray.length==0){
			alert("Please Select Atleast One"); 
		}
		else{
				for(var i=0;i<len;i++){
					data1.push(chkArray[i]);	
			}
			console.log('data1: '+data1);
						
		}	
				
		// $('#create_new_table tbody').find('tr.checked').remove();
		objdata4 = JSON.stringify(data1);
		console.log("data"+objdata4);
		var url = "../Sg/rest/command/remove";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : objdata4,
			statusCode : {
				
				200 : function(data) {
					if(data.responseText=="File Does Not Exists"){
                		alert("Please Create the File");
                		}
					else{
						users = data;
	                    var i = 0, len = users.length;
	                    var rows = len/5;
	                  	 $("#create_new_table tbody").empty();  
	                  	  $('#create_new_table').append('<tr>'+'<th>command</th>'+'<th>parameters</th>'+'<th>return</th>'+'<th>description</th>'+'<th>example</th>'+'<th>check box</th>'+'</tr>');
		                  $('#create_new_table tbody').append('<tr>');
	                	for(var cell=0;cell<rows;cell++){

	                		console.log(cell);
	                		
	                		var row = "<tr><td class='user-name'>"+users[cell*5]+"</td>";
	                			row += "<td>"+users[cell*5+1]+"</td>";
	                			row += "<td>"+users[cell*5+2]+"</td>";
	                			row += "<td>"+users[cell*5+3]+"</td>";
	                			row += "<td>"+users[cell*5+4]+"</td>";
	                			row += "<td><input type='checkbox' class='deleteUser'/></td></tr>";
	                			
	                		$("#create_new_table tbody").append(row);
	                		}
	                	}
				},             
				400 : function(){
					alert("Command has not been Deleted ,Please Try Again!!!");
				}
			}
		}).error(function(xhr, errorText) {
		});
		}
	);*/
    /* Add button(+) functionality */
    $("body").delegate('#add, #add_row', 'click', function(){
	    //$("#data_contents1").load("html/add.html");
    	
    	var addrow = '<li><div class="row" id="cli_row">\
			    		<div class="col-sm-4 col-md-4 col-lg-4"><input type="text" class="form-control" id="cmdname_cli_cre_prop" placeholder="Name"></div>\
			    		<div class="col-sm-4 col-md-4 col-lg-4"><input type="text" class="form-control" id="cmdval_cli_cre_prop" placeholder="Value"></div>\
			    		<div class="col-sm-2 col-md-2 col-lg-2">\
			    		<button type="submit" class="btn btn-default btn-sm" id="add_row">+</button>\
			    		<button type="submit" class="btn btn-default btn-sm" id="sub_row">-</button>\
			    		</div>\
			    	</div></li>';
    	
    	$("#data_contents1 ol").append(addrow);
    	
	});
    
    
    /* Add button(+) functionality of create data file */
    $("body").delegate('#add_data, #add_row_data', 'click', function(){
    	var addrow1 ='<li><div class="row" id="cli_row">\
    		<div class="col-sm-1 col-md-1 col-lg-1"><button type="submit" class="btn btn-default btn-sm" id="add_row_data">+</button></div>\
    		<div class="col-sm-1 col-md-1 col-lg-1"><button type="submit" class="btn btn-default btn-sm" id="sub_row">-</button></div>\
    		<div class="col-sm-4 col-md-4 col-lg-4"><input type="text" class="form-control" id="name" placeholder="Name"></div>\
    		<div class="col-sm-4 col-md-4 col-lg-4" id="data_val"><input type="text" class="form-control" id="value" placeholder="Value"></div>\
    	</div></li>';
    	
    	$("#data_contents1 ol").append(addrow1);
    	var nor= document.getElementById("no_of_rows").value;
    	for(var i = 1; i < nor; i++){
    		$('#data_contents1').find('li:last-child #data_val').append('<input type="text" class="form-control" id="value" placeholder="Value">');
    		
    	};
    	
	});
  
    /* subtract row functionality */
    $("body").delegate('#sub_row', 'click', function(){
     	$(this).parents('li').remove();
    });
        
    
/*create button functionality for CLI */
	
/*	$("body").delegate('#create_cli','click', function() {
		var fileName = $('#name_cli').val();
		if(fileName==""){
            alert('Please Enter the Project Name');
            return;
		} 
		jdata = {};
		jdata['fileName']=fileName;
		objdata_cli = JSON.stringify(jdata);
		console.log(objdata_cli);
		var url = "../Sg/rest/command/createFolder";
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
	});*/
	
/*	
create button functionality for CLI create properties
	
	$("body").delegate('#cre_prop','click', function() {
		var folderName = $('#name_cli').val();
		//var fileName = $('#name_cli_cre').val();
		if(folderName==""){
            alert('Please Enter the Project Name');
            return;
		} 
		if(fileName==""){
            alert('Please Enter the File Name');
            return;
		} 
		jdata = {};
		jdata['folderName']=folderName;
		//jdata['fileName']=fileName;

		objdata_cli_cre = JSON.stringify(jdata);
		console.log(objdata_cli_cre);
		var url = "../Sg/rest/command/createEmptyPropertyFile";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : objdata_cli_cre,
		
			statusCode : {		200 : function(data) {
				console.log(data);
				if(data == 'File Already Exist'){
					alert(data);
				}else if(data == 'File Successfully Created'){
					alert(data);
				}else if(data == 'Folder Does Not Exist'){
					alert(data);
				}
			},
			400 : function(){
				alert("Unsuccessful Creating the File");
			}}
		}).error(function(xhr, errorText) {
		//	alert(errorText);

		});
	});
	
    
create button functionality for CLI data file 
	
	$("body").delegate('#cre_data','click', function() {
		var folderName = $('#name_cli').val();
		var fileName = $('#name_cli_data').val();
		if(folderName==""){
            alert('Please Enter the Folder Name');
            return;
		} 
		if(fileName==""){
            alert('Please Enter the File Name');
            return;
		} 
		jdata = {};
		jdata['folderName']=folderName;
		jdata['fileName']=fileName;

		objdata_cli_data = JSON.stringify(jdata);
		console.log(objdata_cli_data);
		var url = "../Sg/rest/cli/data_file";
		$.ajax({
			type : "POST",
			dataType : "html",
			contentType : "application/json",
			url : url,
			crossDomain : true,
			data : objdata_cli_data,
		
			statusCode : {
				200 : function(data) {
					console.log(data);
					if(data == 'File Already Exist'){
						alert(data);
					}else if(data == 'File Successfully Created'){
						alert(data);
					}
				},
				400 : function(){
					alert("Unsuccessful Creating the File");
				}
			}
		}).error(function(xhr, errorText) {
		//	alert(errorText);

		});
	});
	
	*/
	/* save button functionality for CLI create properties*/
	   
/*    $("body").delegate('#cli_create_prop_save','click', function() {
    	
    	//var folderName = $('#name_cli').val();
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

        var url = "../Sg/rest/command/createPropertiesSaveButton";
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
	*/
	
	/* save button functionality for CLI data file*/
	   
/*    $("body").delegate('#cli_create_data_save','click', function() {
    	
    	//var folderName = $('#name_cli').val();
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

        var url = "../Sg/rest/dataCLI/cliCreateDataXl";
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
    });*/
	
    
    
    /* save button functionality for Web UI create properties*/
	   
 /*   $("body").delegate('#web_UI_create_prop_save','click', function() {
    	
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
    });*/
	
	
	/* save button functionality for webui data file*/
	   
    /*$("body").delegate('#web_UI_create_data_save','click', function() {
    	
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
*/	
    
    
    
    /* save button functionality for web UI create obj repo */
	   
/*    $("body").delegate('#web_ui_create_obj_repo_save','click', function() {
    	
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
    });*/
    
    
    /* Cancel button functionality for CLI create properties */
    
/*    $("body").delegate('#cli_create_prop_cancel','click', function() {
		$('#name_cli').val("");
    	$('#createnew input').val("");
	});
    */
  /* Cancel button functionality for CLI data */
    
/*    $("body").delegate('#cli_data_cancel','click', function() {
		$('#name_cli').val("");
    	$('#createnew input').val("");
	});
});*/

/*function load_command_list(){
	var fileName = $('#proj_name').val();
	jdata = {};
    jdata['fileName']=fileName;
    console.log(jdata);
    objdata = JSON.stringify(jdata);
		
	var url = "../Sg/rest/command/open";
	$.ajax({
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		data : objdata,
		statusCode : {

			200 : function(data) {
				if(data.responseText=="File Does Not Exists"){
            		alert("Please Create the File");
            		}
				else{
					users = data;
                    var i = 0, len = users.length;
                    var rows = len/5;
                    $("#create_new_table tbody").empty();
                    $('#create_new_table').append('<tr>'+'<th>command</th>'+'<th>parameters</th>'+'<th>return</th>'+'<th>description</th>'+'<th>example</th>'+'<th>check box</th>'+'</tr>');
                    $('#create_new_table tbody').append('<tr>');
                	for(var cell=0;cell<rows;cell++){

                		console.log(cell);
                		
                		var row = "<tr><td class='user-name'>"+users[cell*5]+"</td>";
                			row += "<td>"+users[cell*5+1]+"</td>";
                			row += "<td>"+users[cell*5+2]+"</td>";
                			row += "<td>"+users[cell*5+3]+"</td>";
                			row += "<td>"+users[cell*5+4]+"</td>";
                			row += "<td><input type='checkbox' class='deleteUser'/></td></tr>";
                			
                		$("#create_new_table tbody").append(row);
                		}
                	}              
				
			},
			204:function(data){
				alert("Xls/Sheet is not Available to Fetch");
			},
			400 : function(){
				alert("Specified Path does not Exist");
			}
		
		}
	}).error(function(xhr, errorText) {
	});
}*/

/* dropdown function check command*/
/*function load_project_list1(){
	//alert('on onLoad');
	var url = "../Sg/rest/command/updateExistingDropdown";
	$.ajax({
		type : "GET",
		dataType : "html",
		contentType : "application/json",
		url : url,
		crossDomain : true,
		success : function(data) {
			data = jQuery.parseJSON(data);
			var len  = data.length;
			$('#proj_name1').empty();
			if(len=='0'){
				$('#proj_name1').append('<option value="Select">Select</option>');
			}else{
				$('#proj_name1').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#proj_name1').append('<option value="' + data[count] + '">' + data[count] + '</option>');
				}
				document.getElementById('proj_name1').selectedIndex = '0';
				load_command_list1();
			}
		}
	}).error(function(xhr, errorText) {
		//alert(errorText);
	});
}*/

/* dropdown function */
/*function load_project_list(){
	alert('load_project_list');
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
			$('#proj_name').empty();
			if(len=='0'){
				$('#proj_name').append('<option value="Select">Select</option>');
			}else{
				$('#proj_name').append('<option value="Select">Select</option>');
				for(var count=0;count<len;count++){
					$('#proj_name').append('<option value="' + data[count] + '">' + data[count] + '</option>');
				}
				document.getElementById('proj_name').selectedIndex = '0';
				load_command_list();
			}
		}
	}).error(function(xhr, errorText) {
		//alert(errorText);
	});
}
*/
/* dropdown function for cli*/
/*function load_project_list3(){
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
*/

/* dropdown function for web ui*/
/*function load_project_list4(){
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
}*/


//Loading project list

/*$('#proj_name').change("click", function() {
	load_command_list();
});*/

/*$('#proj_name1').change("click", function() {
	load_command_list1();
});*/
/*$('#proj_name3').change("click", function() {
	  	load_command_list3();
	  });*/

	/*  $('#proj_name4').change("click", function() {
	  	load_command_list4();
	  });*/
	



/*function load_command_list1(){
    fileName_ccmd = $('#proj_name1').val();
}*/
/*function load_command_list3(){
    fileName_cli = $('#proj_name3').val();
}*/
/*function load_command_list4(){
    fileName_webui = $('#proj_name4').val();
}*/


	
  
    
    //Check Command functionality
  /*  $("body").delegate('#show','click', function() {
    	//$("#create").trigger("click");
    	//var cmd_list = $('#cmd_list').val();
        var cmd_name = $('#cmd_name').val();
		//        console.log(cmd_list);
      //  console.log(cmd_name);
       
     
        if(cmd_name==""){
            alert('Please Enter the Command Name');
            return;
        }

        jdata = {};
        jdata['fileName_ccmd']=fileName_ccmd;
        jdata['cmd_name']=cmd_name;
        console.log(jdata);
        objdata5 = JSON.stringify(jdata);
           
        var url = "../Sg/rest/commandList/checkfile";
            $.ajax({
                type : "POST",
                dataType : "json",
                contentType : "application/json",
                url : url,
                crossDomain : true,
                data : objdata5,
                statusCode : {

                    200 : function(data) {
                        if(data.responseText=="File Not found Exist1"){
                            alert("Please Enter the Correct File Name");
                            }
                        else if (data.responseText=="Command Does Not Exists in command list") {
                            alert("Please Enter the Correct Command Name");
                        } 
                        else{
                            users1 = data;
                            var len1= users1.length;
                            $('#create_new_table tbody').append('<tr>');
                            for(var i=0; i<len1; i++)     {                                                            
                            $('#create_new_table tbody').append('<td>'+users1[i]+'</td>');
                            };
                            }; 
                        	$('#cmd_list').val("");
                        	$('#cmd_name').val("");
                    },
                }
            }).error(function(xhr, errorText) {
                //alert(errorText);
            });
        }
    );*/
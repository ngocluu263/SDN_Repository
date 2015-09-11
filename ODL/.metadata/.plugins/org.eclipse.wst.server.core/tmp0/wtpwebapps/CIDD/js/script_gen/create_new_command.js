	/*create button functionality*/
	
	$("body").delegate('#create','click', function() {
		var fileName = $('#name').val();
		if(fileName==""){
            alert('Please Enter the file name');
            return;
		} 
		jdata = {};
		jdata['fileName']=fileName;
		objdata = JSON.stringify(jdata);
		console.log(objdata);
		var url = "../rest/command/create";
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
	});
	
	/* save button functionality for create new */
	   
    $("body").delegate('#save','click', function() {
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

        var url = "../rest/command/save";
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
    });

    /* Cancel button functionality */
    $("body").delegate('#cancel','click', function() {
        $('#command1').val("");
        $('#parameters').val("");
        $('#return1').val("");
        $('#description').val("");
        $('#example').val("");
        
    });
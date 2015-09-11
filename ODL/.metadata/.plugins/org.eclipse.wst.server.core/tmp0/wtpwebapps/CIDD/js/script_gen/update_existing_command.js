$(document).ready(function() {
	load_project_list();
});
$("body").delegate('#save_update','click', function() {
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

    /* remove button functionality */
    $("body").delegate('#remove','click', function() {
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
    );

function load_command_list(){
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
}
    $("body").delegate('.deleteUser','click', function() {
        
        if($(this).prop("checked") == true){
            $(this).parents('tr').addClass('checked');
        }
        else if($(this).prop("checked") == false){
            $(this).parents('tr').removeClass('checked');
        }
        
    });
$('#proj_name').change("click", function() {
    load_command_list();
});


function load_project_list(){
    alert('load_project_list');
    var url = "../rest/command/updateExistingDropdown";
    $.ajax({
        type : "GET",
        dataType : "html",
        contentType : "application/json",
        url : url,
        crossDomain : true,
        success : function(data) {
            data = jQuery.parseJSON(data);
            console.log('**'+data.length);
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

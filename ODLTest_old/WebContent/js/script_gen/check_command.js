$("body").delegate('#create_new', 'click', function(){
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
});
/* dropdown function check command*/
function load_project_list1(){
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
}

$('#proj_name1').change("click", function() {
	load_command_list1();
});

function load_command_list1(){
    fileName_ccmd = $('#proj_name1').val();
}

  $("body").delegate('#show','click', function() {
    	//$("#create").trigger("click");
    	//var cmd_list = $('#cmd_list').val();
        var cmd_name = $('#cmd_name').val();
		//        console.log(cmd_list);
      //  console.log(cmd_name);
       
      /*  if(cmd_list==""){
            alert('Please Enter the File Name');
            return;
        }
          */ 
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
    );
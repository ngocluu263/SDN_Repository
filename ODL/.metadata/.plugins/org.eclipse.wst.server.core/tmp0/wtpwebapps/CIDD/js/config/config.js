$(document).ready(function() {
	$("#config_contents").load('config/servers.html'); 	

	var config_selector = '#config_menu_list li a';
	$("body").delegate(config_selector, 'click', function(){
		$('#config_menu_list li a').removeClass('active');
		$(this).addClass('active');
	});
	$("body").delegate("#servers", 'click', function(){
		$("#config_contents").load('config/servers.html');
	});
	$("#create_user").on('click',function(){
		$("#config_contents").load('config/user_list.html');
	});
	$("#create_email_list").on('click',function(){
		$("#config_contents").load('config/email_list.html');
	});
	$("#path").on('click',function(){
		$("#config_contents").load('config/config_paths.html');
	})
	$('.dropdown').hover(function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
    }, function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
    });
})


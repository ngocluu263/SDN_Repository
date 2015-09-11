$(document).ready(function() {
	$('#script_gen_contents').css({'height': $(window).height()-2*$("#header").height()-2*$("#footer").height()});
	$('#script_gen_contents').css({'overflow-y': 'scroll'});
	$('#script_gen_contents').css({'overflow-x': 'hidden'});

	$('.dropdown').hover(function() {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
	}, function() {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
	});
	
/*	var script_selector = '#script_gen_menu_list li a';
	$("body").delegate(plan_selector, 'click', function(){
			$('#script_gen_menu_list li a').removeClass('active');
			$(this).addClass('active');
	});*/

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


});




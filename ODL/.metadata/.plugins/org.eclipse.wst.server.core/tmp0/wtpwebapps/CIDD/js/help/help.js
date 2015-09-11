$(document).ready(function() {
	$('#help_contents').css({'height': $(window).height()-2*$("#header").height()-2*$("#footer").height()});
	$('body').css({'height': $(window).height()});
	//$('body').css({'overflow': 'hidden'});
	$('#help_contents').css({'overflow-y': 'scroll'});
	$('#help_contents').css({'overflow-x': 'hidden'});


	var selector1 = '#help_menu_list li a';
	$("body").delegate(selector1, 'click', function(){
		$('#help_menu_list li a').removeClass('active');
		$(this).addClass('active');
	});

	$("#help_contents").load('help/about.html');


	$("body").delegate('#help', 'click', function(){
		$("#help_menu").load('help/help.html');
		$("#help_contents").load('help/about.html');
	});
	$("body").delegate('#About', 'click', function(){
		$("#help_contents").load("help/about.html");
		$('#help_menu_list li a').removeClass('active');
		$(this).find('a').addClass('active');
	});
	$("body").delegate("#Features", 'click',function(){
		$("#help_contents").load('help/features.html');
		$('#help_menu_list li a').removeClass('active');
		$(this).find('a').addClass('active');
	});
	$("body").delegate("#Components", 'click',function(){
		$("#help_contents").load('help/components.html');
		$('#help_menu_list li > a').removeClass('active');
		$(this).find('a').addClass('active');
	});
	$("body").delegate("#Support_For_All", 'click',function(){
		$("#help_contents").load('help/support_for_all.html');
	});
	$("body").delegate("#User_Guide", 'click',function(){
		$("#help_contents").load('help/guide.html');
	});
	$("body").delegate("#Benefits", 'click',function(){
		$("#help_contents").load('help/benefits.html');
	});
	$("body").delegate("#UC1", 'click',function(){
		$("#help_contents").load('help/UC1.html');
	});
	$("body").delegate("#UC2", 'click',function(){
		$("#help_contents").load('help/UC2.html');
	});
	$("body").delegate("#UC3", 'click',function(){
		$("#help_contents").load('help/UC3.html');
	});
	$("body").delegate("#UC4", 'click',function(){
		$("#help_contents").load('help/UC4.html');
	}); 
	$('#Use_Cases').hover(function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
    }, function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
    });
    var selector1 = '#dropdown-menu li a';
	$("body").delegate(selector1, 'click', function(){
		$('#dropdown-menu li a').removeClass('active');
		$(this).addClass('active');
	});
    
})
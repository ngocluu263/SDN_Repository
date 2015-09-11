$(document).ready(function() {
	$("#dashboard_contents").load('dashboard/overall_gantt.html'); 	

	var plan_selector = '#dashboard_menu_list li a';
	$("body").delegate(plan_selector, 'click', function(){
		$('#dashboard_menu_list li a').removeClass('active');
		$(this).addClass('active');
	});
	$("body").delegate("#overall_gantt", 'click', function(){
		$("#dashboard_contents").load('dashboard/overall_gantt.html');
	});
	$("body").delegate("#release_wise_gantt", 'click', function(){
		$("#dashboard_contents").load('dashboard/gantt_release_wise.html');
	});
	$("body").delegate("#burndown", 'click', function(){
		$("#dashboard_contents").load('dashboard/burndown.html');
	});
	$("body").delegate("#cont_int", 'click', function(){
		$("#dashboard_contents").load('dashboard/cont_integration.html');
	});
	$("body").delegate("#proj_analysis", 'click', function(){
		$("#dashboard_contents").load('dashboard/proj_analysis.html');
	});
	$("body").delegate("#build_analysis", 'click', function(){
		$("#dashboard_contents").load('dashboard/build_analysis.html');
	});
	$("body").delegate("#rel_analysis", 'click', function(){
		$("#dashboard_contents").load('dashboard/release_analysis.html');
	});
	$("body").delegate("#dev_analysis", 'click', function(){
		$("#dashboard_contents").load('dashboard/developer_analysis.html');
	});
	$("body").delegate("#qa_analysis", 'click', function(){
		$("#dashboard_contents").load('dashboard/quality_analysis.html');
	});
	$("body").delegate("#bug_analysis", 'click', function(){
		$("#dashboard_contents").load('dashboard/bug_analysis.html');
	});

	$('.dropdown').hover(function() {
	    $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
	}, function() {
	    $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
	});
});

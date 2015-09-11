$(document).ready(function() {
	$("#plan_contents").load('plan/plan_dashboard.html'); 	

	var plan_selector = '#plan_menu_list li a';
	$("body").delegate(plan_selector, 'click', function(){
		$('#plan_menu_list li a').removeClass('active');
		$(this).addClass('active');
	});
	$("body").delegate("#dashboard_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_dashboard.html');
	});
	$("body").delegate("#release_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_release.html');
	});
	$("body").delegate("#sprints_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_sprints.html');
	});
	$("body").delegate("#tasks_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_tasks.html');
	});
	$("body").delegate("#test_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_tests.html');
	});
	$("body").delegate("#epic_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_epic.html');
	});
	$("body").delegate("#userstory_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_userstory.html');
	});
	$("body").delegate("#bug_nav", 'click', function(){
		$("#plan_contents").load('plan/plan_bug.html');
	});

	$('#dashboard_tooltip').tooltip({title: "Dashboard"});
	$('#release_tooltip').tooltip({title: "Release"});
	$('#sprints_tooltip').tooltip({title: "Sprints"});
	$('#tasks_tooltip').tooltip({title: "Tasks"});
	$('#tests_tooltip').tooltip({title: "Tests"});
	$('#epic_tooltip').tooltip({title: "Epic"});
	$('#userstory_tooltip').tooltip({title: "Userstory"});
	$('#bug_tooltip').tooltip({title: "Bugs"});
});

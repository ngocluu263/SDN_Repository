$(document).ready(function() {
	$('#cid_logo').css({'height': $("#TEL_logo").height()});
	$('.cp_logout').css({'height': $("#tabs").height()/2});
	//$('#script_gen').css({'height': $('#dashboard').height() + '3px'});
	$('#user_acc').css({'height': $('#script_gen').height()});

	$("#page_contents").load('help/help.html');

	var selector1 = '#tabs li';
	$("body").delegate(selector1, 'click', function(){
		$('#tabs li').removeClass('active');
		$(this).addClass('active');
	});
tabs

	$("body").delegate("#help", 'click',function(){
		//$('#page_contents_about').hide();
		$('#page_contents').show();
		$("#page_contents").load('help/help.html');
	});

	$("body").delegate("#config", 'click',function(){
		//$('#page_contents_about').hide();
		$('#page_contents').show();
		$("#page_contents").load('config/config.html');
	});

	$("body").delegate("#plan", 'click',function(){
		//$('#page_contents_about').hide();
		$('#page_contents').show();
		$("#page_contents").load('plan/plan.html');
	});

	$("body").delegate("#execute", 'click',function(){
		//$('#page_contents_about').hide();
		$('#page_contents').show();
		$("#page_contents").load('execute/execute.html');
	});

	$("body").delegate("#dashboard", 'click',function(){
		//$('#page_contents_about').hide();
		$('#page_contents').show();
		$("#page_contents").load('dashboard/dashboard.html');
	});
	$("body").delegate("#script_gen", 'click',function(){
		//$('#page_contents_about').hide();
		$('#page_contents').show();
		$("#page_contents").load('script_gen/script_gen.html');
	});
	$('.dropdown').hover(function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
    }, function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
    });
	/*// To load the previously selected tab after refresh
	$('#tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // store the currently selected tab in the hash value
    $("ul.nav-tabs > li > a").on("shown.bs.tab", function (e) {
        var id = $(e.target).attr("href").substr(1);
        window.location.hash = id;
    });

    // on load of the page: switch to the currently selected tab
    var hash = window.location.hash;
    $('#tabs a[href="' + hash + '"]').tab('show');
*/

});

/*$(window).resize(function(){
	$('#tabs > li').css({'height': $('#script_gen > a').height() });    
	$('#user_acc').css({'height': $('#script_gen').height()});
});*/
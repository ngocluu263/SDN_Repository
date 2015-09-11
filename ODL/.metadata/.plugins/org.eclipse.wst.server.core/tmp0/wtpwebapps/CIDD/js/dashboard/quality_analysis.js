$(document).ready(function() {
	// Pie chart for displaying the percentage of total bugs present in each module
	qa_percent_data=[
	        {
	            "label": "A",
	            "value": "1250400"
	        },
	        {
	            "label": "B",
	            "value": "1463300"
	        },
	        {
	            "label": "C",
	            "value": "1050700"
	        },
	        {
	            "label": "D",
	            "value": "491000"
	        }
	     ];
	qa_percent={
	    "chart": {
	        "caption": "Percentage of Bugs present in each module",
	        "subcaption": "Last Year",
	        "startingangle": "120",
	        "showlabels": "0",
	        "showlegend": "1",
	        "pieRadius":"100px",
	        "enablemultislicing": "0",
	        "slicingdistance": "15",
	        "showpercentvalues": "1",
	        "showpercentintooltip": "0",
	        "plottooltext": "Module : $label Total Number of Bugs : $datavalue",
	        "theme": "fint"
	    },
	    "data": qa_percent_data
	}
	FusionCharts.ready(function(){
	    var qa_chart_var = new FusionCharts({
	        type: "pie3d",
	        renderAt: "bug_percent",
	        dataFormat: "json",
	        dataSource: qa_percent
	    });
	    qa_chart_var.render("bug_percent");
	});

	// Line chart to represent the number of bugs found in each stage of project
	var bud_identification_result=[
	        {
	            "label": "Self Review",
	            "value": "15"
	        },
	        {
	            "label": "Peer Review",
	            "value": "20"
	        },
	        {
	            "label": "Unit testing",
	            "value": "30"
	        },
	        {
	            "label": "Performance testing",
	            "value": "10"
	        },
	        {
	            "label": "Regression testing 1",
	            "value": "10"
	        },
	        {
	            "label": "Regression testing 1",
	            "value": "7"
	        },
	        {
	            "label": "After release",
	            "value": "2"
	        }
	    ];
	var bug_identified_res={
	    "chart": {
	        "caption": "Total number of bugs identified v/s phase of the project",
	        //"subCaption": "",
	        "xAxisName": "Phase",
	        "yAxisName": "No. of bugs",
	        "lineThickness": "2",
	        "paletteColors": "#0075c2",
	        "baseFontColor": "#333333",
	        "baseFont": "Helvetica Neue,Arial",
	        "captionFontSize": "14",
	        "subcaptionFontSize": "14",
	        "subcaptionFontBold": "0",
	        "showBorder": "0",
	        "bgColor": "#ffffff",
	        "showShadow": "0",
	        "canvasBgColor": "#ffffff",
	        "canvasBorderAlpha": "0",
	        "divlineAlpha": "100",
	        "divlineColor": "#999999",
	        "divlineThickness": "1",
	        "divLineDashed": "1",
	        "divLineDashLen": "1",
	        "divLineGapLen": "1",
	        "showXAxisLine": "1",
	        "xAxisLineThickness": "1",
	        "xAxisLineColor": "#999999",
	        "showAlternateHGridColor": "0"
	    },
	    "data": bud_identification_result
	}
	FusionCharts.ready(function(){
	    var qa_bug_identified = new FusionCharts({
	        type: "line",
	        renderAt: "bug_observed_in",
	        dataFormat: "json",
	        dataSource: bug_identified_res
	    });
	    qa_bug_identified.render("bug_observed_in");
	});
});
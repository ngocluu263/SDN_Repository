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
	        "lineColor": "#FF7800",
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
	        renderAt: "bugs_fixed_per_week",
	        dataFormat: "json",
	        dataSource: bug_identified_res
	    });
	    qa_bug_identified.render("bugs_fixed_per_week");
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
	        "lineColor": "#0000ff",
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
	        renderAt: "avg_bug_fix_time",
	        dataFormat: "json",
	        dataSource: bug_identified_res
	    });
	    qa_bug_identified.render("avg_bug_fix_time");
	});

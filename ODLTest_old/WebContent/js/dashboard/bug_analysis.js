//Fusion charts is used to Draw the charts in Bug analysis page
$(document).ready(function() {
    $('#bug_analyis_content').css({'height': $(window).height()-2*$("#header").height()-3*$("#footer").height()});
    $('#bug_analyis_content').css({'overflow-y': 'scroll'});
    $('#bug_analyis_content').css({'overflow-x': 'hidden'});
});

// Column chart to represent the overall status of all the bugs 
overall_bugs_data=[
        {
            "label": "New",
            "value": "45"
        },
        {
            "label": "Acknowledged",
            "value": "34"
        },
        {
            "label": "Verified",
            "value": "39"
        },
        {
            "label": "Under Implementation",
            "value": "21"
        },
        {
            "label": "Declined",
            "value": "17"
        },
        {
            "label": "Closed",
            "value": "14"
        }
    ];
var overall_bugs ={
    "chart": {
        "caption": "Overall Bug Report",
        "subcaption": "Bug Classification based on Status",
        "xaxisname": "Status",
        "yaxisname": "Total Number",
        "palette": "1",
        "animation": "1",
        "formatnumberscale": "0",
        "showvalues": "0",
        "showlegend": "1",
        "plotspacepercent": "0",
        "showBorder": "0"
    },
    "data": overall_bugs_data
}
FusionCharts.ready(function(){
    var overall_bug_Chart = new FusionCharts({
        type: "column3d",
        renderAt: "overall_bug_status",
        width: "500",
        height: "300",
        dataFormat: "json",
        dataSource: overall_bugs
    });
    overall_bug_Chart.render("overall_bug_status");
});
 

//Column chart to represent the total number of bugs present in each module
open_issue_num_data=[
        {
            "label": "A",
            "value": "45"
        },
        {
            "label": "B",
            "value": "34"
        },
        {
            "label": "C",
            "value": "39"
        },
        {
            "label": "D",
            "value": "21"
        },
        {
            "label": "E",
            "value": "17"
        },
        {
            "label": "F",
            "value": "14"
        }
    ];
var open_issue_num ={
    "chart": {
        "caption": "Open Issues",
        "subcaption": "",
        "xaxisname": "Module",
        "yaxisname": "Number",
        "palette": "5",
        "paletteColors":"#621a63,#fe531c,#546790,#414141,#b6914e,#254033,#eecd1b,#980335,#9e619e",
        "animation": "1",
        "formatnumberscale": "0",
        "showvalues": "0",
        "plotspacepercent": "0",
        "showlegend": "1",
        "showBorder": "0"
    },
    "data": open_issue_num_data
}
FusionCharts.ready(function(){
    var open_issues = new FusionCharts({
        type: "column3d",
        renderAt: "open_issue_num_ch",
        width: "500",
        height: "300",
        dataFormat: "json",
        dataSource: open_issue_num
    });
    open_issues.render("open_issue_num_ch");
});

// Pie chart for displaying the percentage of total bugs present in each module
open_issue_percent_data=[
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
open_issue_percent={
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
    "data": open_issue_percent_data
}
FusionCharts.ready(function(){
    var open_issues_per = new FusionCharts({
        type: "pie3d",
        renderAt: "open_issue_percent_ch",
        dataFormat: "json",
        dataSource: open_issue_percent
    });
    open_issues_per.render("open_issue_percent_ch");
});
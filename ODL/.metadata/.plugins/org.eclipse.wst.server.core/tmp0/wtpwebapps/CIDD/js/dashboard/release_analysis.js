$(document).ready(function() {
    $('#release_analyis_content').css({'height': $(window).height()-2*$("#header").height()-3*$("#footer").height()});
    $('#release_analyis_content').css({'overflow-y': 'scroll'});
    $('#release_analyis_content').css({'overflow-x': 'hidden'});
});
// Column chart to represent the overall status of all the bugs 

releases_data_values=[
        {
            "seriesname": "Defferred from Previous",
            "data": [
                {
                    "value": "0"
                },
                {
                    "value": "11"
                },
                {
                    "value": "15"
                }
            ]
        },
        {
            "seriesname": "Defferred Issue fixed",
            "data": [
                {
                    "value": "25"
                },
                {
                    "value": "29"
                },
                {
                    "value": "21"
                }
            ]
        },
        {
            "seriesname": "Deffered to next Release",
            "data": [
                {
                    "value": "27"
                },
                {
                    "value": "20"
                },
                {
                    "value": "11"
                }
            ]
        },
        
    ];
issue_list=[
                {
                    "label": "R1"
                },
                {
                    "label": "R2"
                },
                {
                    "label": "R3"
                }
            ];
release_data={
    "chart": {
        "caption": "Comparison of Issues in the Releases",
        "subcaption": "",
        "xaxisname": "Releases",
        "yaxisname": "Issues in Number",
        "paletteColors":"#30d617,#0f8975,#0f6089,#ff6700,#00fff9,#ddb200,#ff0000,#980335",
        "showlegend": "1",
        "theme": "fint"
    },
    "categories": [
        {
            "category": issue_list
        }
    ],
    "dataset": releases_data_values
}

FusionCharts.ready(function(){
    var overall_release_Chart = new FusionCharts({
        type: "mscolumn3d",
        renderAt: "overall_releases_status",
        width: "500",
        height: "300",
        dataFormat: "json",
        dataSource: release_data
    });
    overall_release_Chart.render("overall_releases_status");
});


// Column chart to represent the overall trend of the releases 
release_trend_values=[
        {
            "label": "R1",
            "value": "88"
        },
        {
            "label": "R2",
            "value": "73"
        },
        {
            "label": "R3",
            "value": "59"
        },
        {
            "label": "R4",
            "value": "52"
        },
        {
            "label": "R5",
            "value": "33"
        }
    ];
release_overall_trend=
	{
    "chart": {
        "caption": "Overall Release Trends",
        "subCaption": "",
        "yAxisName": "Releases",
        "xAxisName": "Bugs in numbers",
        "paletteColors": "#0075c2",
        "bgColor": "#ffffff",
        "showBorder": "0",
        "showCanvasBorder": "0",
        "usePlotGradientColor": "0",
        "plotBorderAlpha": "10",
        "placeValuesInside": "1",
        "valueFontColor": "#ffffff",
        "showAxisLines": "1",
        "axisLineAlpha": "25",
        "divLineAlpha": "10",
        "alignCaptionWithCanvas": "0",
        "showAlternateVGridColor": "0",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "toolTipColor": "#ffffff",
        "toolTipBorderThickness": "0",
        "toolTipBgColor": "#000000",
        "toolTipBgAlpha": "80",
        "toolTipBorderRadius": "2",
        "toolTipPadding": "5"
    },
    "data":release_trend_values 
	}
FusionCharts.ready(function(){
    var overall_release_trend_ch = new FusionCharts({
        type: "bar2d",
        renderAt: "overall_releases_trend",
        width: "500",
        height: "300",
        dataFormat: "json",
        dataSource: release_overall_trend
    });
    overall_release_trend_ch.render("overall_releases_trend");
});
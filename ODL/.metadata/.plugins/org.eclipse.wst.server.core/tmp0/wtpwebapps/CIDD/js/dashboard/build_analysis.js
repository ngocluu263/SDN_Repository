$(document).ready(function() {
    $('#build_analyis_content').css({'height': $(window).height()-2*$("#header").height()-3*$("#footer").height()});
    $('#build_analyis_content').css({'overflow-y': 'scroll'});
    $('#build_analyis_content').css({'overflow-x': 'hidden'});
});
// Column chart to represent the overall status of all the bugs 

build_data_values=[
        {
            "seriesname": "Module1",
            "data": [
                {
                    "value": "10"
                },
                {
                    "value": "11"
                },
                {
                    "value": "15"
                },
                {
                    "value": "10"
                }
            ]
        },
        {
            "seriesname": "Module2",
            "data": [
                {
                    "value": "25"
                },
                {
                    "value": "29"
                },
                {
                    "value": "21"
                },
                {
                    "value": "26"
                }
            ]
        },
        {
            "seriesname": "Module3",
            "data": [
                {
                    "value": "27"
                },
                {
                    "value": "20"
                },
                {
                    "value": "11"
                },
                {
                    "value": "9"
                }
            ]
        },
        {
            "seriesname": "Module4",
            "data": [
                {
                    "value": "35"
                },
                {
                    "value": "19"
                },
                {
                    "value": "11"
                },
                {
                    "value": "16"
                }
            ]
        }
    ];
module_list=[
                {
                    "label": "Build1"
                },
                {
                    "label": "Build2"
                },
                {
                    "label": "Build3"
                },
                {
                    "label": "Build4"
                }
            ];
build_data={
    "chart": {
        "caption": "Comparison of Issues in the builds",
        "subcaption": "",
        "xaxisname": "Builds",
        "yaxisname": "Issues in Number",
        "showlegend": "1",
        "theme": "fint"
    },
    "categories": [
        {
            "category": module_list
        }
    ],
    "dataset": build_data_values
}

FusionCharts.ready(function(){
    var overall_build_Chart = new FusionCharts({
        type: "mscolumn3d",
        renderAt: "build_analyis_content",
        width: "500",
        height: "300",
        dataFormat: "json",
        dataSource: build_data
    });
    overall_build_Chart.render("build_analyis_content");
});
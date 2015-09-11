gantt_categories=[
		{
			"bgcolor": "#999999",
			"category": [
				{
					"start": "1/4/2014",
					"end": "19/5/2014",
					"label": "Months",
					"align": "middle",
					"fontcolor": "#ffffff",
					"fontsize": "12"
				}
			]
		},
		{
			"bgcolor": "#999999",
			"align": "middle",
			"fontcolor": "#ffffff",
			"fontsize": "12",
			"category": [
				{
					"start": "1/4/2014",
					"end": "30/4/2014",
					"label": "April"
				},
				{
					"start": "1/5/2014",
					"end": "19/5/2014",
					"label": "May"
				}
			]
		},
		{
			"bgcolor": "#ffffff",
			"fontcolor": "#333333",
			"fontsize": "11",
			"align": "center",
			"category": [
				{
					"start": "1/4/2014",
					"end": "5/4/2014",
					"label": "Week 1"
				},
				{
					"start": "6/4/2014",
					"end": "12/4/2014",
					"label": "Week 2"
				},
				{
					"start": "13/4/2014",
					"end": "19/4/2014",
					"label": "Week 3"
				},
				{
					"start": "20/4/2014",
					"end": "26/4/2014",
					"label": "Week 4"
				},
				{
					"start": "27/4/2014",
					"end": "3/5/2014",
					"label": "Week 5"
				},
				{
					"start": "4/5/2014",
					"end": "10/5/2014",
					"label": "Week 6"
				},
				{
					"start": "10/5/2014",
					"end": "19/5/2014",
					"label": "Week 7"
				}
			]
		}
	];



var overall_gantt_processes= [
			{
				"label": "process1",
				"id": "1"
			},
			{
				"label": "process2",
				"id": "2",
				"hoverBandColor": "#e44a00",
				"hoverBandAlpha": "40"
			},
			{
				"label": "Process3",
				"id": "3",
				"hoverBandColor": "#e44a00",
				"hoverBandAlpha": "40"
			},
			{
				"label": "process4",
				"id": "4",
				"hoverBandColor": "#e44a00",
				"hoverBandAlpha": "40"
			},
			{
				"label": "process5",
				"id": "5",
				"hoverBandColor": "#e44a00",
				"hoverBandAlpha": "40"
			},
			{
				"label": "process6",
				"id": "6",
				"hoverBandColor": "#e44a00",
				"hoverBandAlpha": "40"
			},
			{
				"label": "process7",
				"id": "7"
			},
			{
				"label": "process8",
				"id": "8"
			}
		];


var gantt_start_data=[
					{
						"label": "9/4/2014"
					},
					{
						"label": "13/4/2014"
					},
					{
						"label": "26/4/2014",
						"bgcolor": "#e44a00",
						"bgAlpha": "40"
					},
					{
						"label": "4/5/2014",
						"bgcolor": "#e44a00",
						"bgAlpha": "40"
					},
					{
						"label": "6/5/2014"
					},
					{
						"label": "5/5/2014",
						"bgcolor": "#e44a00",
						"bgAlpha": "40"
					},
					{
						"label": "11/5/2014"
					},
					{
						"label": "16/5/2014"
					}
				];
var gantt_end_data=[
					{
						"label": "12/4/2014"
					},
					{
						"label": "25/4/2014",
						"bgcolor": "#e44a00",
						"bgAlpha": "40"
					},
					{
						"label": "4/5/2014",
						"bgcolor": "#e44a00",
						"bgAlpha": "40"
					},
					{
						"label": "10/5/2014"
					},
					{
						"label": "10/5/2014"
					},
					{
						"label": "11/5/2014",
						"bgcolor": "#e44a00",
						"bgAlpha": "40"
					},
					{
						"label": "14/5/2014"
					},
					{
						"label": "19/5/2014"
					}
				];
var gantt_task_list=[
			{
				"label": "Planned",
				"processid": "1",
				"start": "9/4/2014",
				"end": "12/4/2014",
				"id": "1-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "1",
				"start": "9/4/2014",
				"end": "12/4/2014",
				"id": "1",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			},
			{
				"label": "Planned",
				"processid": "2",
				"start": "13/4/2014",
				"end": "23/4/2014",
				"id": "2-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "2",
				"start": "13/4/2014",
				"end": "25/4/2014",
				"id": "2",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			},
			{
				"label": "Delay",
				"processid": "2",
				"start": "23/4/2014",
				"end": "25/4/2014",
				"id": "2-2",
				"color": "#e44a00",
				"toppadding": "56%",
				"height": "32%",
				"tooltext": "Delayed by 2 days."
			},
			{
				"label": "Planned",
				"processid": "3",
				"start": "23/4/2014",
				"end": "30/4/2014",
				"id": "3-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "3",
				"start": "26/4/2014",
				"end": "4/5/2014",
				"id": "3",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			},
			{
				"label": "Delay",
				"processid": "3",
				"start": "3/5/2014",
				"end": "4/5/2014",
				"id": "3-2",
				"color": "#e44a00",
				"toppadding": "56%",
				"height": "32%",
				"tooltext": "Delayed by 1 days."
			},
			{
				"label": "Planned",
				"processid": "4",
				"start": "3/5/2014",
				"end": "10/5/2014",
				"id": "4-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "4",
				"start": "4/5/2014",
				"end": "10/5/2014",
				"id": "4",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			},
			{
				"label": "Planned",
				"processid": "5",
				"start": "6/5/2014",
				"end": "11/5/2014",
				"id": "5-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "5",
				"start": "6/5/2014",
				"end": "10/5/2014",
				"id": "5",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			},
			{
				"label": "Planned",
				"processid": "6",
				"start": "4/5/2014",
				"end": "7/5/2014",
				"id": "6-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "6",
				"start": "5/5/2014",
				"end": "11/5/2014",
				"id": "6",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			},
			{
				"label": "Delay",
				"processid": "6",
				"start": "7/5/2014",
				"end": "11/5/2014",
				"id": "6-2",
				"color": "#e44a00",
				"toppadding": "56%",
				"height": "32%",
				"tooltext": "Delayed by 4 days."
			},
			{
				"label": "Planned",
				"processid": "7",
				"start": "11/5/2014",
				"end": "14/5/2014",
				"id": "7-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "7",
				"start": "11/5/2014",
				"end": "14/5/2014",
				"id": "7",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			},
			{
				"label": "Planned",
				"processid": "8",
				"start": "16/5/2014",
				"end": "19/5/2014",
				"id": "8-1",
				"color": "#008ee4",
				"height": "32%",
				"toppadding": "12%"
			},
			{
				"label": "Actual",
				"processid": "8",
				"start": "16/5/2014",
				"end": "19/5/2014",
				"id": "8",
				"color": "#6baa01",
				"toppadding": "56%",
				"height": "32%"
			}
		];
var gantt_char_var ={
	"chart": {
		"caption": "Gantt Chart of the project",
		"subcaption": "Planned vs Actual",
		"dateformat": "dd/mm/yyyy",
		"outputdateformat": "ddds mns yy",
		"ganttwidthpercent": "60",
		"ganttPaneDuration": "40",
		"ganttPaneDurationUnit": "d",
		"plottooltext": "$processName{br} $label starting date $start{br}$label ending date $end",
		"legendBorderAlpha": "0",
		"legendShadow": "0",
		"usePlotGradientColor": "0",
		"showCanvasBorder": "0",
		"flatScrollBars": "1",
		"gridbordercolor": "#333333",
		"gridborderalpha": "20",
		"slackFillColor": "#e44a00",
		"taskBarFillMix": "light+0"
	},
	"categories": gantt_categories,
	"processes": {
		"headertext": "Task",
		"fontcolor": "#000000",
		"fontsize": "11",
		"isanimated": "1",
		"bgcolor": "#6baa01",
		"headervalign": "bottom",
		"headeralign": "left",
		"headerbgcolor": "#999999",
		"headerfontcolor": "#ffffff",
		"headerfontsize": "12",
		"align": "left",
		"isbold": "1",
		"bgalpha": "25",
		"process":overall_gantt_processes
	},
	"datatable": {
		"showprocessname": "1",
		"namealign": "left",
		"fontcolor": "#000000",
		"fontsize": "10",
		"valign": "right",
		"align": "center",
		"headervalign": "bottom",
		"headeralign": "center",
		"headerbgcolor": "#999999",
		"headerfontcolor": "#ffffff",
		"headerfontsize": "12",
		"datacolumn": [
			{
				"bgcolor": "#eeeeee",
				"headertext": "Actual{br}Start{br}Date",
				"text": gantt_start_data
			},
			{
				"bgcolor": "#eeeeee",
				"headertext": "Actual{br}End{br}Date",
				"text": gantt_end_data
			}
		]
	},
	"tasks": {
		"task": gantt_task_list
	},
	"connectors": [
		{
			"connector": [
				{
					"fromtaskid": "1",
					"totaskid": "2",
					"color": "#008ee4",
					"thickness": "2",
					"fromtaskconnectstart_": "1"
				},
				{
					"fromtaskid": "2-2",
					"totaskid": "3",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "3-2",
					"totaskid": "4",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "3-2",
					"totaskid": "6",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "7",
					"totaskid": "8",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "7",
					"totaskid": "9",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "12",
					"totaskid": "16",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "12",
					"totaskid": "17",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "17-2",
					"totaskid": "18",
					"color": "#008ee4",
					"thickness": "2"
				},
				{
					"fromtaskid": "19",
					"totaskid": "22",
					"color": "#008ee4",
					"thickness": "2"
				}
			]
		}
	],
	"milestones": {
		"milestone": [
			{
				"date": "2/6/2014",
				"taskid": "12",
				"color": "#f8bd19",
				"shape": "star",
				"tooltext": "Completion of Phase 1"
			}
		]
	},
	"legend": {
		"item": [
			{
				"label": "Planned",
				"color": "#008ee4"
			},
			{
				"label": "Actual",
				"color": "#6baa01"
			},
			{
				"label": "Slack (Delay)",
				"color": "#e44a00"
			}
		]
	}
}

FusionCharts.ready(function(){
	var gantt_chart_instance = new FusionCharts({
		type: "gantt",
		renderAt: "dashboard_contents",
		width: "100%",
		height: "100%",
		dataFormat: "json",
		dataSource: gantt_char_var
	});
	gantt_chart_instance.render("dashboard_contents");
});

$(document).ready(function() {
	$('#dashboard_contents').css({'height': $(window).height()-2*$("#header").height()-2*$("#footer").height()});

});
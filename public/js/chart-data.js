var randomScalingFactor = function(){ return Math.round(Math.random()*1000) };

var lineChartData = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			label: "My First dataset",
			fillColor : "rgba(220,220,220,0.2)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [300, 400, 500, 700, 800, 900, 1000, 600]
		},
		{
			label: "My Second dataset",
			fillColor : "rgba(48, 164, 255, 0.2)",
			strokeColor : "rgba(48, 164, 255, 1)",
			pointColor : "rgba(48, 164, 255, 1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(48, 164, 255, 1)",
			data : [800, 500, 300, 400, 600, 700, 800, 900]
		}
	]
}

var barChartData = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		},
		{
			fillColor : "rgba(48, 164, 255, 0.2)",
			strokeColor : "rgba(48, 164, 255, 0.8)",
			highlightFill : "rgba(48, 164, 255, 0.75)",
			highlightStroke : "rgba(48, 164, 255, 1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		}
	]

}

var governmentAxisData;
var diplomaticAxisData;
var culturalAxisData;
var armsAxisData;
var summaryEthnicData;

var hasSummaryEthnicDataRendered = false;
var hasDiplomaticAndCulturalAxisDataRendered = false;
var hasArmsAndSummaryAxisDataRendered = false;

window.onload = function(){
	var chart1 = document.getElementById("line-chart").getContext("2d");
	window.myLine = new Chart(chart1).Line(lineChartData, {
		responsive: true
	});
	var chart2 = document.getElementById("bar-chart").getContext("2d");
	window.myBar = new Chart(chart2).Bar(barChartData, {
		responsive : true
	});

	$.ajax({
		type: "GET",
		url: "/StellarisSurvey/results-data",
		success: function(res){
			loadGovernmentPieChart(res);
			loadDiplomaticPieChart(res);
			loadCulturalPieChart(res);
			loadArmsPieChart(res);

			loadSummaryEthnicDonutChart(res);
		},
		error: function(res){
			generateNotification("failed", res.responseJSON.error);
		}
	});
};

function loadGovernmentPieChart(res){
	governmentAxisData = 
		[
			{
				value: res.result.Egalitarian,
				color: "#1fc2f3",
				highlight: "#6ad8fa",
				label: "Egalitarian",
			},
			{
				value: res.result.Authoritarian,
				color: "#147a70",
				highlight: "#0b534c",
				label: "Authoritarian",
			},
		]
}

function loadDiplomaticPieChart(res){
	diplomaticAxisData =
		[
			{
				value: res.result.Xenophile,
				color: "#ef4040",
				highlight: "#f85252",
				label: "Xenophile",
			},
			{
				value: res.result.Xenophobe,
				color: "#800000",
				highlight: "#5e0a0a",
				label: "Xenophobe",
			},
		]
}

function loadCulturalPieChart(res){
	culturalAxisData = 
		[
			{
				value: res.result.Spiritualist,
				color: "#ffe600",
				highlight: "#ffee50",
				label: "Spiritualist",
			},
			{
				value: res.result.Materialist,
				color: "#e9c600",
				highlight: "#ffd900",
				label: "Materialist",
			},
		]
}

function loadArmsPieChart(res){
	armsAxisData =
		[		
			{
				value: res.result.Pacifist,
				color: "#8d8d8df1",
				highlight: "#bdbdbdf1",
				label: "Pacifist",
			},
			{
				value: res.result.Militarist,
				color: "#444444",
				highlight: "#181616",
				label: "Militarist",
			},
		]
}

function loadSummaryEthnicDonutChart(res){

	summaryEthnicData = 
	[
		{
			value: res.result.Pacifist < 0 ? 0 : res.result.Pacifist,
			color: "#8d8d8df1",
			highlight: "#bdbdbdf1",
			label: "Pacifist",
		},
		{
			value: res.result.Militarist < 0 ? 0 : res.result.Militarist,
			color: "#444444",
			highlight: "#181616",
			label: "Militarist",
		},
		{
			value: res.result.Spiritualist < 0 ? 0 : res.result.Spiritualist,
			color: "#ffe600",
			highlight: "#ffee50",
			label: "Spiritualist",
		},
		{
			value: res.result.Materialist < 0 ? 0 : res.result.Materialist,
			color: "#e9c600",
			highlight: "#ffd900",
			label: "Materialist",
		},
		{
			value: res.result.Xenophile < 0 ? 0 : res.result.Xenophile,
			color: "#ef4040",
			highlight: "#f85252",
			label: "Xenophile",
		},
		{
			value: res.result.Xenophobe < 0 ? 0 : res.result.Xenophobe,
			color: "#800000",
			highlight: "#5e0a0a",
			label: "Xenophobe",
		},
		{
			value: res.result.Egalitarian < 0 ? 0 : res.result.Egalitarian,
			color: "#1fc2f3",
			highlight: "#6ad8fa",
			label: "Egalitarian",
		},
		{
			value: res.result.Authoritarian < 0 ? 0 : res.result.Authoritarian,
			color: "#147a70",
			highlight: "#0b534c",
			label: "Authoritarian",
		},
	];
}

function triggerDataPopulation(){
	triggerSummaryEthnicChart();
	triggerGovernmentAndDiplomaticDataPopulation();
	triggerCulturalAndArmsDataPopulation();
}

function triggerSummaryEthnicChart(){
	if (window.pageYOffset < 1300 || window.pageYOffset > 1450 || hasSummaryEthnicDataRendered){
		return;
	}

	var donutChart = document.getElementById("summary-ethnic-donut").getContext("2d");
	window.myDoughnut = new Chart(donutChart).Doughnut(summaryEthnicData, {
		responsive : true
	});

	hasSummaryEthnicDataRendered = true;	
}

function triggerGovernmentAndDiplomaticDataPopulation(){
	if (window.pageYOffset < 1800 || window.pageYOffset > 2150 || hasDiplomaticAndCulturalAxisDataRendered){
		return;
	}

	var governmentChart = document.getElementById("pie-chart-government").getContext("2d");
	window.myPie = new Chart(governmentChart).Pie(governmentAxisData, {
		responsive : true
	});

	var diplomaticChart = document.getElementById("pie-chart-diplomacy").getContext("2d");
	window.myPie = new Chart(diplomaticChart).Pie(diplomaticAxisData, {
		responsive : true
	});

	hasDiplomaticAndCulturalAxisDataRendered = true;
}

function triggerCulturalAndArmsDataPopulation(){
	if (window.pageYOffset < 2400 || window.pageYOffset > 2650 || hasArmsAndSummaryAxisDataRendered){
		return;
	}

	var culturalChart = document.getElementById("pie-chart-cultural").getContext("2d");
	window.myPie = new Chart(culturalChart).Pie(culturalAxisData, {
		responsive : true
	});

	var armsChart = document.getElementById("pie-chart-arms").getContext("2d");
	window.myPie = new Chart(armsChart).Pie(armsAxisData, {
		responsive : true
	});

	hasArmsAndSummaryAxisDataRendered = true;
}


window.onscroll = triggerDataPopulation;

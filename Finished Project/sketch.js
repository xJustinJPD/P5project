let values;
let values2;
let charts = [];

function preload(){
    values = loadTable('data/CombinedValues.csv', 'csv', 'header');
    values2 = loadTable('data/FazeKD.csv', 'csv', 'header');
}
function setup() {
    createCanvas(2000,1000);
    angleMode(DEGREES);
    rectMode(CORNER);
    noLoop();

    charts.push (new StackedChart(250,350,900,300,values,"Male/Female Casualties of Drivers Per Age Group 2020", "Ages", "Total", "Male", "Female", 0, 0));
    charts.push (new NormalChart(250,350, 475,300,values,"Total Casualties of Drivers Per Age Group 2020", "Ages", "Total"));
    charts.push (new HorizontalChart(250,350, 500,650,values,"Total Casualties of Drivers Per Age Group 2020", "Ages", "Total"));
    charts.push (new LineChart(250,350,50, 700, values, "Clustered Chat of Driver Casualties in 2020, Male vs Female, by Age Group", "Ages", "Total", ["Male", "Female"]));
    charts.push (new StackedChart2(250,350,50,300,values,"Male/Female Casualties of Drivers Per Age Group 2020", "Ages", "Total", ["Male", "Female"]));
    charts.push (new NormalChart(250,350,900, 700, values2, "Atlanta FaZe First Blood Spread 2023 Season", "Players", "KD's"));
}



function draw(){
    background(150)
    for(x=0; x<charts.length; x++){
        charts[x].render()
    }
}


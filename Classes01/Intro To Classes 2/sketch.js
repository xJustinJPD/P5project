let cars = [20, 30, 50, 10, 15]

let charts = []


function setup() {
    createCanvas(500,500)
    background (200)
    angleMode(DEGREES)
    rectMode(CORNER)
    noLoop()

    charts.push(new BarChart(400,400,50,450,cars,5))
    charts.push(new BarChart(400,400,50,450,cars,5))

}



function draw(){
    charts[0].render()
}








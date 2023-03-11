
// Array of Objects
let cars = [
    {name:"Ferrari", sales: 300},
    {name:"BMW", sales: 341},
    {name:"Bugatti", sales: 1200},
    {name:"Mercedes", sales: 530},
    {name:"Aston Martin", sales: 211},
    {name:"Nissan", sales: 200}
]

// Declarations of variables
let screenHeight = 500 
let screenWidth = 500
let chartWidth = 250
let chartHeight = 190
let chartXpos = 100
let chartYpos = 450
let mLeft = 10
let mRight = 10
let blockGap = 20
let numTicks = cars.length



// Calculations
let blockWidth = (chartWidth - (mLeft + mRight) - ((cars.length-1)*blockGap))/cars.length

// let firstBlockPlacement = ((screenWidth - chartWidth)/2) + mLeft

let masterGap = blockWidth + blockGap

let bigNum = Math.max(...cars.map(object => object.sales))


// Functions

// Scales the chart height and all other numbers to the largest number in the dataset
function scaler(_num){
    let ratioVal = chartHeight/bigNum
    return ratioVal * _num
}


// What We See
function setup() {
    createCanvas(screenHeight, screenWidth)
    background (200)
    angleMode(DEGREES)
    noLoop()
}

function draw(){
    background(200)
    fill(255)

    // Translates Chart
    translate(chartXpos + mLeft, chartYpos)

    // Draws each bar
    for(let x=0; x<cars.length; x++){
        push()
        fill(cars[x].sales,0,0)
        noStroke()
        translate(mLeft + (x*masterGap), 0)
        rect(0,0,blockWidth,scaler(-cars[x].sales))
        pop()
    }
    

    // Draw Lines
    stroke(155)
    strokeWeight(2)
    line(0, 0, chartWidth, 0)
    line(0, 0, 0, -chartHeight)
    
    // Draw Ticks
    let tickGap = chartWidth/(numTicks-1)
    let tickGap2 = chartHeight/(numTicks-1)



    for(let x=0; x<numTicks; x++){
        line(x*tickGap,0,x*tickGap,12)
    }

    for(let x=0; x<numTicks; x++){
        line(0, -x*tickGap2, -12, -x*tickGap2)
        textSize(11)
        textAlign(RIGHT,CENTER)
        text(((bigNum/(cars.length-1))*x).toFixed(0), -15, x*-tickGap2)
    }
    
}


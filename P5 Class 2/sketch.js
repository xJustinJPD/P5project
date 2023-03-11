
// Declarations
let data = [43, 500, 100, 201, 210, 300 ,14, 130, 170, 40]
let screenHeight = 500 
let screenWidth = 500
let chartWidth = 300
let chartHeight = 300
let mLeft = 10
let mRight = 10
let blockGap = 20



// Calculations
let blockWidth = (chartWidth - (mLeft + mRight) - ((data.length-1)*blockGap))/data.length

let firstBlockPlacement = ((screenWidth - chartWidth)/2) + mLeft

let masterGap = blockWidth + blockGap



function scaler(_num){
    let bigNum = Math.max(...data)
    let ratioVal = chartHeight/bigNum
    return ratioVal * _num
}

function setup() {
    createCanvas(screenHeight, screenWidth)
    background (200)
    angleMode(DEGREES)
    noLoop()
}

function draw(){
    background(200)
    fill(255)

    for(let x=0; x<data.length; x++){
        push()
        fill(data[x],0,0)
        noStroke()
        translate(firstBlockPlacement + (x*masterGap), 400)
        rect(0,0,blockWidth,scaler(-data[x]))
        pop()
    }

}


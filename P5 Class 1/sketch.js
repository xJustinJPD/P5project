let screenHeight = 500 
let screenWidth = 500

let numBlocks = 10
let chartWidth = 400
let chartHeight = 400
let mLeft = 10
let mRight = 10
let blockGap = 20


let blockWidth = (chartWidth - (mLeft + mRight) - ((numBlocks-1)*blockGap))/numBlocks

let firstBlockPlacement = ((screenWidth - chartWidth)/2) + mLeft

let masterGap = blockWidth + blockGap




function setup() {
    createCanvas(screenHeight, screenWidth)
    background (200)
    angleMode(DEGREES)
    noLoop()
}



function draw(){
    background(200)
    fill(255)

    for(let x=0; x<numBlocks; x++){
        
        push()
        translate(firstBlockPlacement + (x*masterGap), 400)
        rect(0,0,blockWidth,random(-50,-200))
        pop()
    }

}


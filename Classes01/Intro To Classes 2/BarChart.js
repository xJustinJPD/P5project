// class BarChart {

//     constructor(_height, _width, _posX, _posY, _data){
//         this.height = _height
//         this.width = _width
//         this.posX = _posX
//         this.posY = _posY
//         this.data = _data
//     }

//     render(){
//         push()
//         translate(this.posX, this.posY)
//         noFill()
//         stroke(155)
//         line(0,0,0,-this.height)
//         line(0,0,this.width,0)
//         pop()
//     }
// }

class BarChart {
    constructor(_height, _width, _posX, _posY, _data, _numTicks ){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY =_posY;
        this.data = _data;
        this.numTicks = _numTicks;
        this.tickWidth = this.width/_numTicks;
        this.margin = 20;
        this.dataGap = 10;
        this.dataWidth =(this.width - (this.margin*2) - (this.data.length - 1 )*this.dataGap)
        /this.data.length;
        this.maximumValue = Math.max(...this.data.map(item => item));
        this.textGap = this.maximumValue/(this.numTicks -1);
        this.dataText = this.height/(this.numTicks -1); 
    }

        render(){
            push();
            translate(this.posX, this.posY);
            noFill();
            stroke(155);
            line(0,0,0,-this.height);
            line(0,0,this.width,0);
            this.drawTickText();
            this.drawDataBar();
            pop();
        }

        dataScaled(_data){
            let dataScaler = this.height/this.maximumValue
            return _data * dataScaler;
        }

        drawTickText(){
            for (let x=0; x<this.numTicks+1 ; x++){
                stroke(100);
                line(0,-x*this.tickWidth ,-this.numTiks ,-x*this.tickWidth );
                noStroke();
                fill(50);
                textSize(10);
                textAlign(RIGHT,CENTER);
                text((x*this.textGap).toFixed(2), -10, x*-this.dataText);
            }
        }  
        
        drawDataBar(){
            fill(255,0,0);
            // translate(this.posX, this.posY);
            for(let x=0;x<this.data.length;x++){
                push();
                translate(this.margin + (x*this.dataGap), 0);
                noStroke();
                console.log(this.dataWidth); rect(this.dataWidth * x,0,50,this.dataScaled(-this.data[x]));
                pop();
        }
    }
    }
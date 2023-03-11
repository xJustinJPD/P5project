class NormalChart {
    constructor(_height, _width, _posX, _posY, _data, _title, _xVal, _yVal){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY =_posY;
        this.data = _data;
        this.title = _title;
        this.xVal = _xVal;
        this.yVal = _yVal;
        this.numTicks = this.data.getRowCount();
        this.tickWidth = this.height/this.numTicks;
        this.margin = 5;
        this.dataGap = 5;
        this.dataWidth =(this.width - (this.margin*2) - (this.data.getRowCount()-1)*this.dataGap)/this.data.getRowCount();
        this.yearsGap = this.dataWidth + this.dataGap;
        this.maximumValue = this.calcMax();
        this.textGap = this.maximumValue/(this.numTicks);
        this.dataText = this.height/(this.numTicks); 
    }

        render(){
            push();
            translate(this.posX, this.posY);
            noFill();
            stroke(0);
            this.drawAxis();
            this.drawTicks();
            this.drawText();
            this.drawDataBar();
            this.drawTitle();
            pop();
        }

        calcMax(){
            let bigNum = []
            for(let x=0; x<this.data.getRowCount(); x++){
                bigNum.push(int(this.data.rows[x].obj[this.yVal]))
            }

            let max = Math.max(...bigNum.map(item => item));

            for(let x = max; x<10000; x++){
                if(x%this.numTicks==0 && x%10==0){
                    max = x;
                    break;
                }
            }

            return max;
        }
        drawTitle(){
            stroke(0)
            fill(0);
            textSize(12);
            textAlign(CENTER,CENTER);
            text(this.title, this.width/2, -this.height*1.1);
        }

        drawAxis(){
            line(0,0,0,-this.height);
            line(0,0,this.width,0);
            
            let yearsText = this.data.getColumn(this.xVal);
            push()
            for(let x = 0; x<yearsText.length; x++){
                
                let value = yearsText[x]
                push()
                fill(0)
                noStroke()
                textSize(9)
                textAlign(LEFT,TOP);
                translate(this.yearsGap*x + (this.yearsGap/2),this.dataGap);
                rotate(45)
                text(value,0,0)
                pop()
                
            }
            pop()
        }

        dataScaled(_data){
            let dataScaler = this.height/this.maximumValue
            return _data * dataScaler;
        }

        colourScaled(_data){
            let colourScaler = 255/this.maximumValue
            return _data * colourScaler;
        }

        drawTicks(){
            for (let x=0; x<this.numTicks+1; x++){
                stroke(100);
                line(0,-x*this.tickWidth ,-this.numTicks ,-x*this.tickWidth);
            }
        }
        
        drawText(){
            for(let x=0; x<this.numTicks+1; x++){
                noStroke();
                fill(50);
                textSize(9);
                textAlign(RIGHT,CENTER);
                text((x*this.textGap).toFixed(0), -10, x*-this.dataText);
            }
        }
        
        drawDataBar(){
            for(let x=0;x<this.data.getRowCount();x++){
                push();
                translate(this.margin + (x*this.dataGap), 0);
                stroke(0,0,0)
                let value = int(this.data.rows[x].obj[this.yVal])
                fill(this.colourScaled(value),50,this.colourScaled(value*2))
                rect(this.dataWidth*x,0,this.dataWidth,this.dataScaled(-value));
                pop();
        }
    }
    }

    
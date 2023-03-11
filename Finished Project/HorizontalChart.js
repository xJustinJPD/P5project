class HorizontalChart {
    constructor(_height, _width, _posX, _posY, _data, _title, _xVal, _yVal){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY =_posY;
        this.data = _data;
        this.title = _title;
        this.numTicks = this.data.getRowCount();
        this.tickWidth = this.height/this.numTicks;
        this.xVal = _xVal;
        this.yVal = _yVal;
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
            translate(this.posX, this.posY-this.width/1.5);
            noFill();
            stroke(0);
            this.drawAxis();
            this.drawTicks();
            this.drawText();
            this.drawTitle();
            push()
            rotate(90);
            this.drawDataBar();
            pop()
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

        drawAxis(){
            line(0,this.width,this.height,this.width);
            line(0,0,0,this.width);
            
            
            let yearsText = this.data.getColumn(this.xVal);
            push()
            for(let x = 0; x<yearsText.length; x++){
                let value = yearsText[x]
                fill(0)
                noStroke()
                textSize(9)
                textAlign(CENTER,TOP);
                push()
                rotate(0)
                text(value,-20,this.yearsGap*x + (this.yearsGap/2))
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
                line(x*this.tickWidth,this.width+this.margin ,x*this.tickWidth , this.width);
            }
        }
        drawTitle(){
            push()
            stroke(0)
            fill(0);
            textSize(12);
            textAlign(CENTER,CENTER);
            translate(-20, this.height);
            text(this.title, this.width/2, -this.height*1.1);
            pop()
        }
        
        drawText(){
            for(let x=0; x<this.numTicks+1; x++){
                noStroke();
                fill(50);
                textSize(9);
                textAlign(RIGHT,CENTER);
                text((x*this.textGap).toFixed(0), x*this.dataText, this.width+this.margin+10);
            }
        }
        
        drawDataBar(){
            for(let x=0;x<this.data.getRowCount();x++){
                push();
                translate(this.margin + (x*this.dataGap), 0);
                stroke(0,0,0)
                let value = int(this.data.rows[x].obj[this.yVal])
                fill(this.colourScaled(value),0,100)
                rect(this.dataWidth*x,0,this.dataWidth,this.dataScaled(-value));
                pop();
        }
    }
    }
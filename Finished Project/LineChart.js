class LineChart {
    constructor(_height, _width, _posX, _posY, _data, _title, _xVal, _yVal,_dataArray){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY =_posY;
        this.data = _data;
        this.title = _title;
        this.numTicks = this.data.getRowCount();
        this.tickWidth = this.height/this.numTicks;
        this.margin = 5;
        this.dataGap = 5;
        this.xVal = _xVal;
        this.yVal = _yVal;
        this.dataArray = _dataArray;
        this.dataWidth =(this.width - (this.margin*2) - (this.data.getRowCount()-1)*this.dataGap)/this.data.getRowCount();
        this.yearsGap = this.dataWidth + this.dataGap;
        this.maximumValue = this.calcMax();
        this.textGap = this.maximumValue/(this.numTicks);
        this.dataText = this.height/(this.numTicks);
        this.colorPallete = ["#ee5d6c", "#eeaf61", "#ce4993", "#fb9062", "#6a0d83"]
    }

        render(){
            push();
            translate(this.posX, this.posY);
            noFill();
            stroke(0);
            this.drawAxis();
            this.drawTicks();
            this.drawText();
            this.drawLine();
            this.drawTitle();
            this.drawLegend();
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
                    max = x/1.5;
                    break;
                }
            }

            return max;
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

        drawTicks(){
            for (let x=0; x<this.numTicks+1; x++){
                push()
                stroke(100);
                translate(-7,0)
                line(0,-x*this.tickWidth , this.width+7 ,-x*this.tickWidth);
                pop()
            }
        }
        drawTitle(){
            stroke(0)
            fill(0);
            textSize(12);
            textAlign(CENTER,CENTER);
            text(this.title, this.width/2, -this.height*1.1);
        }

        drawLegend(){
            stroke(0)
            textSize(12);
            textAlign(CENTER,CENTER);
            for (let i=0; i<this.dataArray.length;i++){  
                push()           
                let ary = this.dataArray[i];             
                let col = this.colorPallete[i];             
                fill(color(col))
                translate(this.width/2.2,this.height*1.3)             
                text(ary,i*this.width/8,-this.height*1.1)
                pop()
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

    drawLine() {
        let dataUnit = this.dataWidth + this.dataGap;

        push();
        translate(this.margin,0);
        
        
        for (let x = 0; x < this.data.getRowCount()-1; x++) {
            push();

            for (let y = 0; y < this.dataArray.length; y++) {

                let array = this.dataArray[y];
                let col = this.colorPallete[y];

                strokeWeight(3)
                let value = int(this.data.rows[x].obj[array]);
                let value2 = int(this.data.rows[x+1].obj[array]);
                stroke(color(col));
                fill(color(col));

                ellipse(this.yearsGap*x + (this.yearsGap/2), this.dataScaled(-(value)), this.dataGap)
                line(this.yearsGap*x + (this.yearsGap/2) , this.dataScaled(-(value)), this.yearsGap*(x+1) + (this.yearsGap/2), this.dataScaled(-value2))
            }
            pop();
        }
        pop();
    }

    
    }
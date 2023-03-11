class StackedChart {
    constructor(_height, _width, _posX, _posY, _data, _title, _xVal, _yVal, _aVal, _bVal, _cVal, _dVal){
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
        this.aVal = _aVal;
        this.bVal = _bVal;
        this.cVal = _cVal;
        this.dVal = _dVal;
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
            this.drawFirstDataBar();
            this.drawAvgLine();
            this.drawTitle();
            // this.drawLegend();
            pop();
        }

        calcMax(){
            let aValArray = [];
            let bValArray = [];
            let cValArray = [];
            let dValArray = [];
            let combined = [];
            for(let x=0; x<this.data.getRowCount(); x++){
                        aValArray.push(int(this.data.rows[x].obj[this.aVal]))
                        bValArray.push(int(this.data.rows[x].obj[this.bVal]))
                        if(this.cVal.length>0){
                            cValArray.push(int(this.data.rows[x].obj[this.cVal]))
                        }
                        if(this.dVal.length>0){
                            dValArray.push(int(this.data.rows[x].obj[this.dVal]))
                        }
            }
            combined.push(bValArray)
            combined.push(aValArray)
            if(this.cVal.length>0){
                combined.push(cValArray)
            }
            if(this.dVal.length>0){
                combined.push(dValArray)
            }

            let bigNum = []
            for(let x=0; x<this.data.getRowCount(); x++){
                bigNum.push(int(this.data.rows[x].obj[this.yVal]))
            }

            let max = Math.max(...bigNum.map(item => item));

            for(let x = max; x<10000; x++){
                if(x%this.numTicks==0 && x%10==0){
                    max = (x) + ((x/2)*(combined.length-2));
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
                fill(0)
                noStroke()
                textSize(9)
                textAlign(CENTER,TOP);
                translate(0, 0);
                text(value,this.yearsGap*x + (this.yearsGap/2),15)
                
            }
            pop()
        }

        dataScaled(_data){
            let dataScaler = this.height/this.maximumValue
            return _data * dataScaler;
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
        
        drawFirstDataBar(){

            let aValArray = [];
            let bValArray = [];
            let cValArray = [];
            let dValArray = [];
            let combined = [];
            for(let x=0; x<this.data.getRowCount(); x++){
                        aValArray.push(int(this.data.rows[x].obj[this.aVal]))
                        bValArray.push(int(this.data.rows[x].obj[this.bVal]))
                        if(this.cVal.length>0){
                            cValArray.push(int(this.data.rows[x].obj[this.cVal]))
                        }
                        if(this.dVal.length>0){
                            dValArray.push(int(this.data.rows[x].obj[this.dVal]))
                        }
            }
            combined.push(bValArray)
            combined.push(aValArray)
            if(this.cVal.length>0){
                combined.push(cValArray)
            }
            if(this.dVal.length>0){
                combined.push(dValArray)
            }
            

            for(let x=0; x<combined.length; x++){
                for(let y=0; y<this.data.getRowCount(); y++){
                push()
                noStroke()
                let value = (combined[x][y])
                if(x==0){
                    fill(255,125,125)
                    translate(0, 0);
                }
                if(x==1){
                    fill(100,100,255)
                    translate(0, (-combined[x-1][y])/2);
                }
                if(x==2){
                    fill(0,0,0)
                    translate(0, ((-combined[x-2][y])+(-combined[x-1][y]))/2.9);
                }
                if(x==3){
                    fill(255,0,0)
                    translate(0, ((-combined[x-3][y])+(-combined[x-2][y])+(-combined[x-1][y]))/2.9);
                }
                
                translate(this.margin + (y*this.dataGap), 0);
                rect(this.dataWidth*y,0,this.dataWidth,this.dataScaled(-value));
                console.log(combined.length)
                pop()
                }
            }
    }

    drawTitle(){
        stroke(0)
        fill(0);
        textSize(12);
        textAlign(CENTER,CENTER);
        text(this.title, this.width/2, -this.height*1.1);
    }

    drawAvgLine(){
        
        push()
        for(let x=0; x<this.data.getRowCount()-1; x++){

            let aValArray = [];
            let bValArray = [];
            let cValArray = [];
            let dValArray = [];
            let combined = [];
            for(let x=0; x<this.data.getRowCount(); x++){
                        aValArray.push(int(this.data.rows[x].obj[this.aVal]))
                        bValArray.push(int(this.data.rows[x].obj[this.bVal]))
                        if(this.cVal.length>0){
                            cValArray.push(int(this.data.rows[x].obj[this.cVal]))
                        }
                        if(this.dVal.length>0){
                            dValArray.push(int(this.data.rows[x].obj[this.dVal]))
                        }
            }
            combined.push(bValArray)
            combined.push(aValArray)
            if(this.cVal.length>0){
                combined.push(cValArray)
            }
            if(this.dVal.length>0){
                combined.push(dValArray)
            }
            
            let value1 = (int(this.data.rows[x].obj[this.bVal]))
            let value2 = (int(this.data.rows[x].obj[this.aVal]))
            let value3 = (int(this.data.rows[x+1].obj[this.bVal]))
            let value4 = (int(this.data.rows[x+1].obj[this.aVal]))

            let value5 = 0;
            let value6 = 0;
            let value7 = 0;
            let value8 = 0;
            if(combined.length>2){
                value5 = (int(this.data.rows[x].obj[this.cVal]))
                value6 = (int(this.data.rows[x+1].obj[this.cVal]))
            }

            if(combined.length>3){
                value7 = (int(this.data.rows[x].obj[this.dVal]))
                value8 = (int(this.data.rows[x+1].obj[this.dVal]))
            }
            let average = (value1+value2+value5+value7)/combined.length
            let average2 = (value3+value4+value6+value8)/combined.length
            console.log("average 1:" + average)
            console.log("average 2:" + average2)
            stroke(255,255,255);
            strokeWeight(2)
            line(this.yearsGap*x + (this.yearsGap/2) , this.dataScaled(-average), this.yearsGap*(x+1) + (this.yearsGap/2), this.dataScaled(-average2))
            
        }
        
        pop()
        
        
    }
    }
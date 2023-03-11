class StackedChart2 {
    constructor(_height, _width, _posX, _posY, _data, _title, _xVal, _yVal, _dataArray){
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
        this.colorPallete = ["#67A3D9", "#F8B7CD", "#FCF1C0", "#BBDAD9", "C0B9BF"]
    }

        render(){
            push();
            translate(this.posX, this.posY);
            noFill();
            stroke(0);
            this.drawAxis();
            this.drawTicks();
            this.drawText();
            this.drawBars();
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
                    max = x;
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
        
        drawBars() {
            let dataUnit = this.dataWidth + this.dataGap;
    
            push();
            translate(this.margin,0);
            
            
            for (let x = 0; x < this.data.getRowCount(); x++) {
                push();
                translate(x * dataUnit + this.margin, 0);
    
                for (let y = 0; y < this.dataArray.length; y++) {
    
                    let array = this.dataArray[y];
                    let col = this.colorPallete[y];
    
                    noStroke();
                    let value = int(this.data.rows[x].obj[array]);
    
                    fill(color(col));
    
                    rect(0, 0, this.dataWidth, -this.dataScaled(value));
                    translate(0, -this.dataScaled(value));
                    // console.log(value)
                }
                pop();
            }
            pop();
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
    }
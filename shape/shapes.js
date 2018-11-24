class Shape{
    constructor(x, y, size, side){
        this.x = x;
        this.y = y;
        this.timer = 0;
        this.timerSpeed = 1;
        this.radians = Math.random() * (Math.PI * 2);
        this.color = 'black';
        this.timer = 0;
        this.size = size;
        this.side = side;

        this.isBase = false;
        this.base = null;
        this.lineWidth = 5;

        this.vertices = new Array(this.side);

        for(let i=0; i<this.side; i++){
            this.vertices[i] = new Array(2);
        }
    }

    checkSize(){
        if(this.size < this.base.size){
            return true;
        }
        return false;
    }

    distance(x1,y1, x2, y2){
        let disx = x1 - x2;
        let disy = y1 - y2;
        
        let distance = Math.sqrt(disx * disx + disy * disy);
        
        return distance;
    }

    check(){
        for(let i=0; i<this.vertices.length; i++){
            if(this.distance(this.vertices[i][0], this.vertices[i][1], 
                this.base.vertices[i][0], this.base.vertices[i][1]) > this.lineWidth){
                return false;
            }    
        }
        return true;
    }

    setColor(color){
        this.color = color;
    }

    shrink(){
        this.timer++;
        const shrinkSpeed = 0.5;
        if(this.timer > this.timerSpeed){
            this.size -= shrinkSpeed;
            this.timer = 0;
        }
    }

    drawShape(context){   
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        for(let i=0; i<this.vertices.length; i++){
            if(i == this.vertices.length-1){
                context.moveTo(this.vertices[i][0], this.vertices[i][1]);
                context.lineTo(this.vertices[0][0], this.vertices[0][1]);
            }else{
                context.moveTo(this.vertices[i][0], this.vertices[i][1]);
                context.lineTo(this.vertices[i+1][0], this.vertices[i+1][1]);
            }
        }
        context.stroke();
        context.closePath();      
    }
}

class Triangle extends Shape{
    constructor(x, y, size){
        super(x, y, size, 3);
    }

    update(){
        this.vertices[0][0] = this.x + Math.cos(this.radians) * this.size;
        this.vertices[0][1] = this.y + Math.sin(this.radians) * this.size;

        this.vertices[1][0] = this.x + Math.cos(this.radians - Math.PI * 4 / 5) * this.size;
        this.vertices[1][1] = this.y + Math.sin(this.radians - Math.PI * 4 / 5) * this.size;

        this.vertices[2][0] = this.x + Math.cos(this.radians + Math.PI * 4 / 5) * this.size;
        this.vertices[2][1] = this.y + Math.sin(this.radians + Math.PI * 4 / 5) * this.size;
    }

    render(context){
        this.drawShape(context);
    }

}

class Square extends Shape{
    constructor(x, y, size){
        super(x, y, size, 4);
    }

    update(){
        this.vertices[0][0] = this.x + Math.cos(this.radians + (Math.PI - Math.PI * 3 / 4)) * this.size;
        this.vertices[0][1] = this.y + Math.sin(this.radians + (Math.PI - Math.PI * 3 / 4)) * this.size;

        this.vertices[1][0] = this.x + Math.cos(this.radians + (Math.PI - Math.PI / 4)) * this.size;
        this.vertices[1][1] = this.y + Math.sin(this.radians + (Math.PI - Math.PI / 4)) * this.size;

        this.vertices[2][0] = this.x + Math.cos(this.radians + (Math.PI - Math.PI * 7 / 4)) * this.size;
        this.vertices[2][1] = this.y + Math.sin(this.radians + (Math.PI - Math.PI * 7 / 4)) * this.size;

        this.vertices[3][0] = this.x + Math.cos(this.radians + (Math.PI - Math.PI * 5 / 4)) * this.size;
        this.vertices[3][1] = this.y + Math.sin(this.radians + (Math.PI - Math.PI * 5 / 4)) * this.size;
    }


    render(context){
        this.drawShape(context);
    }

}

class Diamond extends Shape{
    constructor(x, y, size){
        super(x, y, size, 4);
    }

    update(){
        this.vertices[0][0] = this.x + Math.cos(this.radians + (Math.PI - Math.PI / 2)) * this.size;
        this.vertices[0][1] = this.y + Math.sin(this.radians + (Math.PI - Math.PI / 2)) * this.size;

        this.vertices[1][0] = this.x + Math.cos(this.radians + Math.PI) * (this.size / 2);
        this.vertices[1][1] = this.y + Math.sin(this.radians + Math.PI) * (this.size / 2);

        this.vertices[2][0] = this.x + Math.cos(this.radians + (Math.PI - Math.PI * 3 / 2)) * this.size;
        this.vertices[2][1] = this.y + Math.sin(this.radians + (Math.PI - Math.PI * 3 / 2)) * this.size;

        this.vertices[3][0] = this.x + Math.cos(this.radians) * (this.size / 2);
        this.vertices[3][1] = this.y + Math.sin(this.radians) * (this.size / 2);
    }


    render(context){
        this.drawShape(context);
    }

}



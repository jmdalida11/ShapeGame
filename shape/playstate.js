class PlayState{
    constructor(stateManager){
        this.stateManager = stateManager;

        this.center = {};
        this.center.x = stateManager.canvas.width / 2;
        this.center.y = stateManager.canvas.height / 2;

        this.score = 0;
        this.MAX_BASE_SHAPE = 2;
        this.isPressed = false;
        this.lastMousePos = 0;
        this.shapes = [];
        
        this.size = 100;
        this.baseSize = 100;

        this.lastShapeSpawn = null;
        this.lastColor = null;

        this.controlled = 0;

        for(let i=0; i<this.MAX_BASE_SHAPE; i++){ 
            let initShape = this.spawnRandomShape(this.center, this.size * (i+2));
            this.shapes.push(initShape);
        }
    }

    randomColor(){
        let colors = ['red', 'blue', 'yellow', 'green', 'orange', 'violet', 'purple'];
        let r = Math.floor(Math.random() * colors.length);

        while(colors[r] == this.lastColor){
            r = Math.floor(Math.random() * colors.length); 
        }
        this.lastColor = colors[r];

        return colors[r];
    }

    spawnRandomShape(center, size){
        
        let shapeTypes = ['triangle', 'square', 'diamond'];
        let r = Math.floor(Math.random() * shapeTypes.length);
        
        while(shapeTypes[r] == this.lastShapeSpawn){
            r = Math.floor(Math.random() * shapeTypes.length);
        }

        this.lastShapeSpawn = shapeTypes[r];
        let radColor = this.randomColor();

        if(shapeTypes[r] == 'triangle'){
            let shape = {'base': new Triangle(center.x, center.y, this.baseSize), 'spawn': new Triangle(center.x, center.y, size)};
            shape.base.setColor(radColor);
            shape.spawn.setColor(radColor);
            shape.base.isBase = true;
            shape.spawn.base = shape.base;
            return shape;
        }else if(shapeTypes[r] == 'square'){
            let shape = {'base': new Square(center.x, center.y, this.baseSize), 'spawn': new Square(center.x, center.y, size)};
            shape.base.setColor(radColor);
            shape.spawn.setColor(radColor);
            shape.base.isBase = true;
            shape.spawn.base = shape.base;
            return shape;
        }else if(shapeTypes[r] == 'diamond'){
            let shape = {'base': new Diamond(center.x, center.y, this.baseSize), 'spawn': new Diamond(center.x, center.y, size)};
            shape.base.setColor(radColor);
            shape.spawn.setColor(radColor);
            shape.base.isBase = true;
            shape.spawn.base = shape.base;
            return shape;
        }
        return null;
    }

    update(){
        for(let i=0; i<this.shapes.length; i++){
            this.shapes[i].base.update();
            this.shapes[i].spawn.update();
            this.shapes[i].spawn.shrink();

            if(this.shapes[i].spawn.checkSize()){
                if(this.shapes[i].spawn.check()){
                    this.score++;
                }
                this.shapes.splice(i, 1);
                this.controlled = 0;
                let spawnShape = this.spawnRandomShape(this.center, this.shapes[0].spawn.size * 1.5)
                this.shapes.push(spawnShape);
                i--;
            }
        }
    }

    render(context){
        for(let i=0; i<this.shapes.length; i++){
            this.shapes[i].base.render(context);
            this.shapes[i].spawn.render(context);
        }

        context.font = "30px Georgia";
		context.fillText("Score: " + this.score, 50 , 50);
    }
    
    mousedown(pos){
        this.isPressed = true;
        this.lastMousePos = pos;
    }

    mousemove(pos){
        if(this.isPressed){
            if(this.shapes.length != 0){
                this.shapes[this.controlled].spawn.radians -= (this.lastMousePos.x - pos.x) * 0.1;
            }
            this.lastMousePos = pos;
        }
    }

    mouseup(pos){
        this.isPressed = false;
    }

    keyup(e){
        switch(e.keyCode){
            case 17:  {
                this.controlled = this.controlled == 0 ? 1 : 0;
            }
        }
    }

}
class StateManager{

    constructor(canvas){
        this.states = [];
        this.canvas = canvas;
    }

    setState(state){
        if(this.states.length > 0){
            this.states.pop();
        }
        this.states.push(state);
    }

    push(state){
        this.states.push(state);
    }

    pop(){
        if(this.states.length > 0){
            return this.states.pop();
        }
        return null;
    }

    peek(){
        if(this.states.length > 0){
            return this.states[this.states.length-1];
        }
        return null;
    }

    update(){
        if(this.states.length > 0){
            this.states[this.states.length-1].update();
        }
    }

    render(context){
        if(this.states.length > 0){
            this.states[this.states.length-1].render(context);
        }
    }

}
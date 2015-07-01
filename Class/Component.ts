///<reference path='../typings/quazars.d.ts'/>
import ComponentProvider = require('./ComponentProvider');

class Component{
    id:string;
    provider:ComponentProvider;

    constructor(id:string,provider:ComponentProvider){
        this.id = id;
        this.provider = provider;
    }

    public getProvider(){
        return this.provider;
    }

    public getID(){
        return this.id;
    }
}

export = Component;
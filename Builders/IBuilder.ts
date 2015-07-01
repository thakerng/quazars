///<reference path='../../typings/quazars.d.ts'/>

var _ = require('lodash');

class IBuilder{
    protected config:any;
    protected from:string;
    protected name:string;

    constructor(from:string,config:any = {}){
        this.from = from;
        this.before();
        _.merge(this.config,quazars.config.get(this.name+'.default')||{},config);
        this.build();
        return this;
    }

    protected before():void{
        /**
         * Do Before Configuration Merging
         */
    }

    public build():any{
        /**
         * Building Method
         */
        return this;
    }

    public make(callback?:Function,error?:Function):void{
        /**
         * Make Method Here
         */
    }

    public setConfig(cfg:any){
        _.merge(this.config,cfg);
        return this;
    }

    public getConfig():any{
        return this.config;
    }
}

export = IBuilder;
///<reference path='typings/quazars.d.ts'/>
var _ = require('lodash');
class Configuration{
    static map:any = {};

    public static set(key:string,value:any){
        this.map[key]=value;
    }

    public static setMany(array:any){
        this.map = _.merge(this.map,array);
    }

    public static get(key:string){
        return this.map[key];
    }

    public static fetch():any{
        return this.map;
    }
}

export = Configuration;

///<reference path='../typings/quazars.d.ts'/>
"use strict";

var _ = require('lodash');
var path = require('path');
var serialize = require('serialize-javascript');
var fs = require('fs');
import {IBuilder} from './IBuilder';

class JsonBuilder extends IBuilder{
    protected path:string;

    public before(){
        this.name = "json";
        var APP_PATH = quazars.config.get('appPath');
        this.path = path.resolve(APP_PATH , this.from ,'./app/share.js');
        this.config = {

        };

    }

    public to(to:string){
        var APP_PATH = quazars.config.get('appPath');
        this.path = path.resolve(APP_PATH,this.from ,to ||'./app/share.js');
        return this;
    }

    public define(config:any){
        _.merge(this.config,config);
        return this;
    }

    public make(callback?:Function,error?:Function):void{
        var serialized;
        try {
            serialized = serialize(this.config);
        } catch (err) {
            if (error) return error(err);
        }
        var str =`module.exports = ${serialized};`;
        fs.writeFile(this.path, str, function(err){
            if(err && typeof error ==='function'){
                return error(err);
            }
            if(typeof callback ==='function')callback();
        });

    }
}

export {JsonBuilder};
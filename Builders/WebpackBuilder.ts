///<reference path='../typings/quazars.d.ts'/>
"use strict";

var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');
var serialize = require('serialize-javascript');
import {IBuilder} from './IBuilder';

class WebpackBuilder extends IBuilder{

    public before(){
        this.name = "webpack";
        var APP_PATH = quazars.config.get('appPath');
        this.config = {
            context: path.resolve(APP_PATH ,this.from),
            entry: "./app/main.js",
            output: {
                path: path.resolve(APP_PATH , this.from +'/public'),
                filename: "bundle.js"
            }
        };
    }

    public entry(ep:string){
        _.merge(this.config,{entry:ep});
        return this;
    }

    public external(exts:any){
        _.merge(this.config,{externals:exts});
        return this;
    }

    public to(fn:string="bundle.js",pth?:string){
        _.merge(this.config,{
            output:{
                filename:fn,
                path:pth
            }
        });
        return this;
    }

    public define(obj:any,raw:boolean = false){
        var newObj = {};
        for(var i in obj){
            if(obj.hasOwnProperty(i)) {
                var j = obj[i];
                newObj[i] = (typeof j !== 'boolean'&& typeof j !== 'function' &&!raw) ? serialize(j) : j;
            }
        }

        _.merge(this.config,{
            plugins:[
                new webpack.DefinePlugin(newObj)
            ]
        });

        return this;
    }

    public make(callback?:Function,error?:Function):void{
        webpack(this.config,function(err){
            if(err){
                if(typeof error ==='function')error();
                return;
            }
            if(typeof callback ==='function')callback();
        });
    }

}

export {WebpackBuilder};
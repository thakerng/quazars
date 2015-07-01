///<reference path='../typings/quazars.d.ts'/>
var express = require('express');
import IOC = require('../IOC');

class Router{
    router:any;
    ioc:any;
    constructor(share?:any){
        this.router = express.Router();
        this.ioc = IOC;
        this.route(share);
    }

    protected route(share:any){
        /*
         Use Route Here
         */
    }

    public get(){
        return this.router;
    }
}

export = Router;
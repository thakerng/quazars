///<reference path='../typings/quazars.d.ts'/>
"use strict";

var express = require('express');
import {IOC} from '../IOC';

class Router{
    router:any;
    ioc:any;

    constructor(...shares:any[]){
        this.router = express.Router();
        this.ioc = IOC;
        this.route(...shares);
    }

    protected route(...shares:any[]){
        /*
         Use Route Here
         */
        return this.router;
    }

    public get(){
        return this.router;
    }
}

export {Router};
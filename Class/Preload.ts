///<reference path='../typings/quazars.d.ts'/>
"use strict";

import {Configuration} from '../Configuration';

class Preload{
    configuration:any;
    constructor(){
        this.configuration = Configuration;
    }

    public setup(){
        /**
         * Set up process is defined here
         */
    }
}

export {Preload}
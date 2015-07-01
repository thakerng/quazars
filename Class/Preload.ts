///<reference path='../typings/quazars.d.ts'/>

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
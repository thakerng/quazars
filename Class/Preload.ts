/**
 * Created by thakerng on 6/24/2015 AD.
 */
///<reference path='../typings/quazars.d.ts'/>
import Configuration = require('../Configuration');
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
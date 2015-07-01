///<reference path='../typings/quazars.d.ts'/>

var Quazars = require('../Kernel');
import {IOC} from '../IOC';

class ComponentProvider implements Provider{
    app:any;
    ioc:any;
    config:any;

    constructor(config?){
        this.app = Quazars.app();
        this.ioc = IOC;
        this.config = config;
        this.build();
    }

    public build(){
        /*
         * Do after created. the sequence ordered by config.json along with constructor
         * can be run once when codebase change eg.[Webpack Builder,Transfer file] should no require any providers
         */
    }

    public register(){
        /*
         * Do after building ,the component object has been living in system
         * register should contain the execution that involves other component and system eg.[ioc Binding,Singleton]
         * the sequence will be ordered by topology sorting algorithm depend on dependency
         */
    }

    public boot(meta?:any){
        /*
         * Do when running has been trigger,
         * boot should contain execution method from living object or service
         */
    }

}

export {ComponentProvider};
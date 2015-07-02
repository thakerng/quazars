///<reference path='typings/quazars.d.ts'/>
"use strict";

import {WebpackBuilder} from './Builders/WebpackBuilder';
import {JsonBuilder} from './Builders/JsonBuilder';
import {IBuilder} from './Builders/IBuilder';

class Builder {

    public static build(builder:string, from:string, config?:any) {
        switch (builder) {
            case "webpack":
                return this.webpack(from, config);
                break;
            case "json":
                return this.json(from,config);
                break;
            default:
                break;
        }

    }

    protected static json(from:string,config?:any):any{
        return (new JsonBuilder(from,config));
    }

    protected static webpack(from:string, config?:any):any {
        return (new WebpackBuilder(from, config));
    }

    /**
     * Ignore building method use to ignore building without removing entire callee code
     * just put x in front of method's name
     * @param builder
     * @param from
     * @param config
     */
    public static xbuild(builder:string, from:string, config?:any){
        /**
         * no operation
         */
    }
}

export {Builder};
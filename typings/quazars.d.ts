///<reference path='express.d.ts'/>

declare var quazars:any;

interface IConfiguration{
    name:string;
    basePath?:string;
    appPath?:string;
    quazarsPath?:string;
    author?:{
        name?:string;
        email?:string;
        company?:string;
    };
    modules?:Array<string>;
    appConfig?:string;
    preload?:Array<string>;
}

interface  Provider{
    register():void;
    boot():void;
    build?():void;
}

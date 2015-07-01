///<reference path='typings/quazars.d.ts'/>
class IOC {

    protected static services:Array<any> = [];

    public static bind(id:string,service:any):void{
        return this.services[id]=service;
    }

    public static singleton(id:string,service:any):any{
        if(this.services[id])return this.service(id);
        this.bind(id,service);
        return this.service(id);
    }

    public static service(id:string){
        return this.services[id];
    }

    public static list(){
        return Object.keys(this.services);
    }

}

export {IOC};
"use strict";

function timeStamp(...input:any[]){
    var order=0,times = input;
    if(typeof input[0] === 'number') {
        order = input[0];
        input.shift();
        times = input;
    }

    return (target:Object,propertyKey:string,descriptor:any) => {
        var former = descriptor.value;
        descriptor.value = function(...args:any[]){
            for(var time of times) {
                if (time == 'created')
                    args[order].createdAt = new Date();
                else if(time =='updated')
                    args[order].updatedAt = new Date();
            }
            return former.apply(this,args);
        };
        return descriptor;
    }
}

export {timeStamp};
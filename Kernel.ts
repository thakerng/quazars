///<reference path='typings/quazars.d.ts'/>
"use strict";

var express = require('express');
var path = require('path');
var _ = require('lodash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks =require('nunjucks');

import {Component} from './Class/Component';
import {ComponentProvider} from './Class/ComponentProvider';
import {Configuration} from './Configuration';
import {IOC} from './IOC';

class Kernel{

    protected static app:any;
    protected static _components:any[];
    protected static _defaultConfig:IConfiguration;
    protected static _config:IConfiguration;

    /**
     * set Express environment
     */
    protected static setEnvironment():void{

        nunjucks.configure(this._config.appPath, {
            autoescape: true,
            express: this.app
        });
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        global.quazars.path = this._config.quazarsPath;
        global.quazars.kernel = path.resolve(this._config.quazarsPath,'Kernel');
    }

    /**
     * Initiate System
     */
    protected static initiate(){
        global.quazars = {};
        global.quazars.config = Configuration;
        this._defaultConfig = {
            name: "default"
        };
    }

    /**
     * Publish individual folder of each components
     * @param name {String} Component Name
     */
    public static publish(name:string):void{
        this.app.use('/public/' + name, express.static(path.resolve(this._config.basePath,this._config.appPath, name + '/public')));
    }

    /**
     * Modify some existed class/method
     */
    private static decorate():void{
        var EXT = '.html';
        Kernel.app.use( function( req, res, next ) {
            var _render = res.render;
            res.render = function( view:string, options:any, fn ) {
                var caps = /(.*)::(.*)/g.exec(view);
                if(caps) view = caps[1]+'/views/'+caps[2].replace(/\./g,'/')+EXT;
                else return;
                _.extend( options, {session: true} );
                _render.call( this, view, options, fn );
            };
            next();
        });
    }

    /**
     * Build System before run application
     * @param sharedApp Express Application binded from main script
     * @param appPath Path of application
     * @returns {Kernel}
     */
    public static build(sharedApp:any, config:any):any{
        Kernel.initiate();
        Kernel.app = sharedApp;

        if(typeof config==="string"){
            config = {basePath:config};
        }
        /**
         * Config
         */
        Kernel._config = _.clone(Kernel._defaultConfig);
        Kernel._config.basePath = config.basePath;
        Kernel._config.quazarsPath = config.quazarsPath || Kernel._config.basePath+'/Quazars';
        Kernel._config.appPath = config.appPath || Kernel._config.basePath+'/app';
        Kernel._config.appConfig = path.join(Kernel._config.appPath, 'config.json');
        Kernel._components=[];
        Kernel.config(require(Kernel._config.appConfig));

        /**
         * Set Environment
         */

        Kernel.setEnvironment();
        Kernel.decorate();
        global.quazars.config.setMany({
            'basePath':Kernel._config.basePath,
            'quazarsPath':Kernel._config.quazarsPath,
            'appPath':Kernel._config.appPath
        });
        /**
         * Module Loading
         */
        for (var i = 0; i < Kernel._config.preload.length; i++) {
            var preload = Kernel._config.preload[i];
            require(path.join(Kernel._config.appPath,preload)).setup();
        }

        for (var i = 0; i < Kernel._config.modules.length; i++) {
            var moduleName = Kernel._config.modules[i];
            Kernel.publish(moduleName);
            require(path.join(Kernel._config.appPath,moduleName+'/'+moduleName+'.provider.server.js'));
        }

        for (var i = 0; i < Kernel._components.length; i++) {
            var componentProvider = Kernel._components[i].getProvider();
            componentProvider.register();
        }

        return this;
    }

    /**
     * Get express application which's used in the framework
     * @returns {any} Express application
     */
    public static getApp():any{
        return Kernel.app;
    }

    /**
     * Load defined component into system
     * this will be call in app folder
     * @param id {String} identifier of component
     * @param provider {ComponentProvider} provider object of component
     */
    public static load(id:string,provider:ComponentProvider): void{
        var component = new Component(id,provider);
        Kernel._components.push(component);
    }

    /**
     * Merge former configuration with new one
     * @param cfg new configuration
     * @returns {Kernel}
     */
    public static config(cfg:IConfiguration):any{
        _.assign(Kernel._config, Kernel._config, cfg);
        return this;
    }

    /**
     * Run component after building has been ready
     */
    public static run(mode?:string):void{
        for (var i = 0; i < Kernel._components.length; i++) {
            var componentProvider = Kernel._components[i].getProvider();
            componentProvider.boot(mode);
        }
    }

    /**
     * Get living Component in system
     * @param componentId
     * @returns {any}
     */
    public static getComponent(componentId:string):Component{
        return this._components[componentId];
    }

}
/**
 * Module Mapper
 * @type {function(any, string): any}
 */

exports.build = Kernel.build;
exports.publish = Kernel.publish;
exports.config = Kernel.config;
exports.run = Kernel.run;
exports.load = Kernel.load;
exports.app = Kernel.getApp;
exports.get = IOC.service;
exports.bind = IOC.bind;
exports.singleton = IOC.singleton;

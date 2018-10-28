import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Router } from '@angular/router';
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { FuelEfficiency } from "../helper/fuel-efficiency";
import { DriveRoutingModule } from "./drive-routing.module";
import labelModule = require("tns-core-modules/ui/label");
import { DriveModule } from "./drive.module";
import { GestureTypes, GestureEventData } from "tns-core-modules/ui/gestures";
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "tns-core-modules/application-settings";


@Component({
    selector: "Drive",
    moduleId: module.id,
    templateUrl: "./drive.component.html"
})
export class DriveComponent implements OnInit {

    speed: number;
    latitude: number;
    longitude: number;
    optimalSpeed: number;
    efficiency :number;
    fuelEfficiency: FuelEfficiency;
    units: string ="mph";
    distanceTally: number = 0;
    distanceUnits;
     //variables to calculate acceleration and distanceTally
    acceleration: number;
    timeStamp: number;
    speedInit: number;
    speedFinal: number;
    timeInit: number;
    timeFinal: number;
        
    getLocationData() : Promise<any> {
        return new Promise((resolve, reject) => {
            getCurrentLocation({timeout: 1000}).then(location => {
                resolve(location);
            }).catch(error => {
                reject(error);
            });
        });  
    }
         
    public updateLocation() {
        this.getLocationData().then(result => {
            if(this.units == "mph"){
                this.speed = Math.round(result.speed*2.23693);
            } else {
                this.speed = Math.round(result.speed*3.6);
            }

            this.longitude= result.longitude;
            this.latitude = result.latitude;
            this.timeStamp = result.timestamp;

            var range = 5;
    
            this.efficiency = this.fuelEfficiency.getFuelEfficiency(this.speed);
            this.optimalSpeed = Math.round(this.fuelEfficiency.getMostEfficientSpeed(this.speed-range, this.speed+range));

        }, error => {
            console.error(error);
        });
    }  

    updateParkingLocation() {
        setNumber("parkingLocationX", this.latitude);
        setNumber("parkingLocationY", this.longitude);

    }

    constructor() {
        this.fuelEfficiency = new FuelEfficiency();
        var id = setInterval(() => this.updateLocation(), 1000);
        var id1 = setInterval(() => this.updateAcceleration(), 1000);
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSpeedLabelTap() : void{
        if(this.units == "mph"){
            this.units= "km/h";
            this.distanceUnits="km";
        } else {
            this.units = "mph";
            this.distanceUnits="miles";
        }        
        console.log("change units");
    }

    // getSpeedData () {
    //     return this.speed;
    // }

    public updateAcceleration() : number {
       
        //update speed final
        this.speedFinal = this.speed;
        this.timeFinal = this.timeStamp;
        
        //calculate acceleration
        if (this.timeInit == null || this.speedInit == null) {
            this.speedInit = 0;
            this.timeInit = 0;
            this.acceleration = ((this.speedFinal - this.speedInit) / ((this.timeFinal - this.timeInit))/3600);
            this.distanceTally = this.distanceTally+((this.speedFinal - this.speedInit) * ((this.timeFinal - this.timeInit)/3600));
        } else {
            this.acceleration = ((this.speedFinal - this.speedInit) / ((this.timeFinal - this.timeInit))/3600);
            this.distanceTally = this.distanceTally+((this.speedFinal - this.speedInit) * ((this.timeFinal - this.timeInit)/3600));
        }

        //update speed initial
        this.speedInit = this.speed;
        this.timeInit = this.timeStamp;


        return this.acceleration;
    }

}

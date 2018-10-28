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
            this.speed = Math.round(result.speed);
            this.longitude= result.longitude;
            this.latitude = result.latitude;

            var range = 5;
    
            this.efficiency = this.fuelEfficiency.getFuelEfficiency(this.speed);
            this.optimalSpeed = Math.round(this.fuelEfficiency.getMostEfficientSpeed(this.speed-range, this.speed+range));
        
            console.log("updateLocationspeed: "+result.speed);
        }, error => {
            console.error(error);
        });
    }  

    updatePage() : void {
        console.log("update speed :"+this.speed);
    }

    constructor() {
        this.fuelEfficiency = new FuelEfficiency();
        var id = setInterval(() => this.updateLocation(), 1000);
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSpeedLabelTap() : void{
        var label = new labelModule.Label();
        label.on(GestureTypes.tap, function (args: GestureEventData) {
            console.log("Tap");
        });
    }

}

import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { getDefaultFrame } from "nativescript-angular/platform-providers";
import { NavigationEnd, Router } from "@angular/router";
import {AppComponent} from "../app.component";
var utilityModule = require("utils/utils");

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
import { stringify } from "@angular/core/src/render3/util";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    parkingString :string;
    parkingMapsLink :string;

    constructor() {

        if(hasKey("parkingLocationX")){
            var parkingLocationX = parseFloat(getNumber("parkingLocationX").toFixed(3));
            var parkingLocationY = parseFloat(getNumber("parkingLocationY").toFixed(3));


            this.parkingMapsLink  = "https://www.google.com/maps/search/"+parkingLocationX+","+parkingLocationY;
            
            this.parkingString = "Last parked at "+ parkingLocationX +", " + parkingLocationY;
            console.log(this.parkingMapsLink);
        } else{
            this.parkingString = "No Parking data stored";
        }

        // Use the component constructor to inject providers.
    }


    openParkingLink(){
        utilityModule.openUrl(this.parkingMapsLink);
    }


    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}

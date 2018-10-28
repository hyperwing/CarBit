import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { setInterval, clearInterval } from "tns-core-modules/timer";
import {FuelEfficiency} from "../helper/fuel-efficiency"

@Component({
    selector: "Featured",
    moduleId: module.id,
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    efficiency: number;
    fuelEfficiency: FuelEfficiency;

    getSpeed() : number {
        return Math.floor(Math.random() * 91);
    }
        
    updatePage() : void {
        this.efficiency = this.fuelEfficiency.getFuelEfficiency(this.getSpeed());
    }

    constructor() {
        this.efficiency = 0;
        this.fuelEfficiency = new FuelEfficiency();
        var id = setInterval(() => this.updatePage(), 1000);
    }

    ngOnInit(): void {
    }
    
    // onFuelButtonTap():void {
    //     var data;
    //     var zip;
    //     $.load("https://www.gasbuddy.com/home?search="+zip+"&fuel=1", function(response) {
          
    //     });
    // }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}

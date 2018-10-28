import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
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
    selector: "Vehicle",
    moduleId: module.id,
    templateUrl: "./vehicle.component.html"
})
export class VehicleComponent implements OnInit {
    make: string;
    model: string;
    year: string;
    mileage: string;
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.make = "";
        this.model = "";
        this.year = "";
        this.mileage = "";
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onAddCarTap(): void {
        let index = 1;
        if(hasKey("numberOfCars")){
            index = getNumber("numberOfCars");
            index++;
        }
        setString("Make" + index, this.make);
        setString("Model" + index, this.model);
        setString("Year" + index, this.year);
        setString("Mileage" + index, this.mileage);

        alert({
            title:"Saved",
            message: "Your car has been added.",
            okButtonText: "Ok"
        })

        this.make = "";
        this.model = "";
        this.year = "";
        this.mileage = "";
    }
}

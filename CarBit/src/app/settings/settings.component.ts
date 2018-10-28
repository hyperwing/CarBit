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
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    make: string;
    year: number;
    model: string;
    email: string;
    name: string;
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.make="a";
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSaveButtonTap(args): void {

        if(hasKey("numberOfCars")){

            let index = getNumber("numberOfCars");
            setNumber("ModelDate"+index, this.year);
            setString("ModelYear"+index, this.make);
            setString("ModelYear"+index, this.model);
            setString("AccountEmail", this.email);
            setString("Name:", this.name);

        }


        alert(this.make);
    }
}

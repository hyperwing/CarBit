import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Vehicle",
    moduleId: module.id,
    templateUrl: "./vehicle.component.html"
})
export class VehicleComponent implements OnInit {
    make: string;
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

    onSaveButtonTap(): void {
        alert(this.make);
    }
}

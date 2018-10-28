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
    birthday: string;
    gender: string;
    email: string;
    name: string;
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.gender = getString("Gender");
        this.birthday = getString("Birthday");
        this.email = getString("Email");
        this.name = getString("Name");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSaveButtonTap(args): void {
        setString("Gender", this.gender);
        setString("Birthday", this.birthday);
        setString("Email", this.email);
        setString("Name", this.name);

        alert({
            title:"Saved",
            message: "Your information has been updated.",
            okButtonText: "Ok"
        })
    }
}

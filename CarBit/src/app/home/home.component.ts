import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var utilityModule = require("utils/utils");
import * as Bluetooth from "nativescript-bluetooth";

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
import { NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    parkingString :string;
    parkingMapsLink :string;
    gasBuddyLink:string= "https://www.gasbuddy.com/home?search=43201&fuel=1";
    arr: any;

    constructor(private routerExtensions: RouterExtensions) {

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

    openGasBuddyLink(){
        utilityModule.openUrl(this.gasBuddyLink);
    }


    ngOnInit(): void {
        this.arr = [];
        for(let i = 1; i <= getNumber("NumberOfCars"); i++){
            var uuid = getString("BluetoothUUID" + i);
            if(uuid != undefined && uuid != "" && uuid != null){
                this.arr.push({uuid, i});
            }
        }
    }

    scan(){
        Bluetooth.requestCoarseLocationPermission();
        Bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            skipPermissionCheck: true,
            onDiscovered: (peripheral) => this.startDrive(peripheral)
            }).then(function() {
                // console.log("scanning complete");
            }, function (err) {
                // console.log("error while scanning: " + err);
            });
    }

    startDrive(peripheral){
        if(peripheral != undefined){
            if(this.contains(peripheral.UUID)){
                for(let i=0; i<this.arr.length;i++){
                    if(this.arr[i].uuid == peripheral.UUID){
                        setNumber("ActiveCarIndex", i);
                    }
                }
                ;
                this.routerExtensions.navigate(['drive'], {
                    transition: {
                        name: "fade"
                    }
                });
            }
        }
    }

    contains(UUID): boolean{
        var contains = false;

        for(let i = 0; i < this.arr.length && !contains; i++){
            contains = this.arr[i].uuid == UUID;
        }

        return contains;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}

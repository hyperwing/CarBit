import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as Bluetooth from "nativescript-bluetooth";
import { BluetoothObject } from "./bluetoothObject";
import { EventData, booleanConverter, getViewById } from "tns-core-modules/ui/page/page";
import * as dialogs from "tns-core-modules/ui/dialogs";

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
    selector: "Bluetooth",
    moduleId: module.id,
    templateUrl: "./bluetooth.component.html"
})
export class BluetoothComponent implements OnInit {

    connectedText: string;
    availableBluetoothDevices: ObservableArray<BluetoothObject>;

    constructor() {
        this.availableBluetoothDevices = new ObservableArray<BluetoothObject>();
    }

    ngOnInit(): void {
        var enabled = Bluetooth.isBluetoothEnabled().then(function(enabled:boolean){
            return enabled;
        });
        if(!enabled){
            this.connectedText = "Turn on your bluetooth settings";
        }else{
            Bluetooth.requestCoarseLocationPermission();
            this.connectedText = "Connected - Searching for devices";
            this.scanForBluetooth();
        }

        setNumber("numberOfCars", 3 );
        setString("Make1", "mclaren");
        setString("Model1", "p1");
        setString("Make2", "acura");
        setString("Model2", "mdx");
        setString("Make3", "honda");
        setString("Model3", "accord");


    }

    scanForBluetooth(){
        this.availableBluetoothDevices = new ObservableArray<BluetoothObject>();
        Bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            skipPermissionCheck: true,
            onDiscovered: (peripheral) => this.addBluetoothDevice(peripheral)
            }).then(function() {
                // console.log("scanning complete");
            }, function (err) {
                // console.log("error while scanning: " + err);
            }).then(function(){
                if(this.availableBluetoothDevices.length <= 0){
                    this.connectedText = "No devices found"
                }else{
                    this.connectedText = "";
                }
            });
    }

    getAvailable(){
        return this.availableBluetoothDevices;
    }

    addBluetoothDevice(peripheral){
        var bluetoothObject = new BluetoothObject(peripheral.UUID, peripheral.name);
        if(peripheral.name != undefined){
            this.availableBluetoothDevices.push(bluetoothObject);
            this.connectedText = "";
        }
    }

    onItemTap(args){
        var bluetoothObject = this.availableBluetoothDevices.getItem(args.index);
        // alert({
        //     title: "UUID",
        //     message: bluetoothObject.uuid,
        //     okButtonText: "Ok"
        // });

        let numberOfCars = getNumber("numberOfCars");
        let cars = [];
        for(let i=1; i<=numberOfCars; i++){
            cars.push(getString("Make"+i)+ " " + getString("Model"+i));
            console.log(cars);
        }

        dialogs.action("Choose car to associate to", "Cancel button text", cars).then(result => {
            console.log("Dialog result: " + result);
            for(let i=1; i<=numberOfCars; i++){
                if(result == cars[i]){
                    alert({
                        title:result,
                        message: bluetoothObject.uuid,
                        okButtonText: "done"
                    })
                    setString("BluetoothName"+i, bluetoothObject.name );
                    setString("BluetoothUUID"+i, bluetoothObject.uuid );
                }
            }

            
        });

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    

}

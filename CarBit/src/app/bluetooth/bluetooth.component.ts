import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as Bluetooth from "nativescript-bluetooth";
import { BluetoothObject } from "./bluetoothObject";
import { EventData, booleanConverter, getViewById } from "tns-core-modules/ui/page/page";

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
    }

    scanForBluetooth(){
        alert('scanning');
        this.availableBluetoothDevices = new ObservableArray<BluetoothObject>();
        Bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            skipPermissionCheck: true,
            onDiscovered: (peripheral) => this.addBluetoothDevice(peripheral)
            }).then(function() {
                console.log("scanning complete");
            }, function (err) {
                console.log("error while scanning: " + err);
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
        }
    }

    onItemTap(args: EventData){
        alert('Item selected');
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}

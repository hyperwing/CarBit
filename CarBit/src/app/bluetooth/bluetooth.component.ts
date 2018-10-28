import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as Bluetooth from "nativescript-bluetooth";
import { BluetoothObject } from "./bluetoothObject";
import { EventData, booleanConverter, getViewById } from "tns-core-modules/ui/page/page";
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
    selector: "Bluetooth",
    moduleId: module.id,
    templateUrl: "./bluetooth.component.html"
})
export class BluetoothComponent implements OnInit {

    bluetoothName: string;
    bluetoothUUID: string;

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

        dialogs.action("Choose car to associate to", "Cancel button text", ["Option1", "Option2"]).then(result => {
            console.log("Dialog result: " + result);
            if(result == "Option1"){
                alert({
                    title:"option 1",
                    message: bluetoothObject.uuid,
                    okButtonText: "done"
                })
            }else if(result == "Option2"){
                alert({
                    title:"option 2",
                    message: bluetoothObject.uuid,
                    okButtonText: "done"
                })
            }
        });

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    

}

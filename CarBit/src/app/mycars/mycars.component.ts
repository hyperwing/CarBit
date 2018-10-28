import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Car } from "./car";
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
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "MyCars",
    moduleId: module.id,
    templateUrl: "./mycars.component.html"
})
export class MyCarsComponent implements OnInit {

    cars: ObservableArray<Car>;

    constructor() {
        this.cars = new ObservableArray<Car>();
    }

    ngOnInit(): void {
        let carsTotal = 0;
        if(hasKey("NumberOfCars")){
            carsTotal = getNumber("NumberOfCars");
            for(let i = 1; i <= carsTotal; i++){
                var make = getString("Make" + i);
                var model = getString("Model" + i);
                var year = getString("Year" + i);
                var mileage = getString("Mileage" + i);
                var bluetoothName = getString("BluetoothName" + i);
                var c = new Car(make, model, year, mileage, bluetoothName);
                this.cars.push(c);
            }
        }
    }

    onItemTap(args){
        var car = this.cars.getItem(args.index);

        dialogs.action("Remove this car?", "No", ["Yes"]).then(result=>{
            if(result == "Yes"){
                let carsTotal = getNumber("NumberOfCars");

                for(var i = args.index+1; i < carsTotal; i++){

                    var n = i + 1;

                    var make = getString("Make" + n);
                    var model = getString("Model" + n);
                    var year = getString("Year" + n);
                    var mileage = getString("Mileage" + n);
                    var bluetoothName =""; 
                    var bluetoothUUID ="";
                    if(hasKey("BluetoothName" + n)){
                        bluetoothName = getString("BluetoothName" + n);
                        bluetoothUUID = getString("BluetoothUUID" + n);
                        remove("BluetoothName" + n);
                        remove("BluetoothUUID" + n);
                    }

                    setString("Make" + i, make);
                    setString("Model" + i, model);
                    setString("Year" + i, year);
                    setString("Mileage" + i, mileage);
                    setString("BluetoothName" + i, bluetoothName);
                    setString("BluetoothUUID" + i, bluetoothUUID);
                }

                carsTotal--;
                setNumber("NumberOfCars", carsTotal);

                this.removeFromCars(args.index);
            }
        });
    }

    removeFromCars(index: number){
        if(hasKey("NumberOfCars")){
            var temp = new ObservableArray<Car>();
            var carsTotal = getNumber("NumberOfCars");
            for(let i = carsTotal; i > index; i--){
                temp.push(this.cars.pop());
            }

            var removed = this.cars.pop();

            var length = temp.length;
            for(let i = 0; i < length; i++){
                this.cars.push(temp.pop())
            }
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}

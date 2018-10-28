import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BluetoothRoutingModule } from "./bluetooth-routing.module";
import { BluetoothComponent } from "./bluetooth.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BluetoothRoutingModule
    ],
    declarations: [
        BluetoothComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BluetoothModule { }

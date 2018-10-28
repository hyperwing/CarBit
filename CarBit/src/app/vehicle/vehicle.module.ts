import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { VehicleRoutingModule } from "./vehicle-routing.module";
import { VehicleComponent } from "./vehicle.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VehicleRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        VehicleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VehicleModule { }

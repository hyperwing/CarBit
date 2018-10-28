import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MyCarsRoutingModule } from "./mycars-routing.module";
import { MyCarsComponent } from "./mycars.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MyCarsRoutingModule
    ],
    declarations: [
        MyCarsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MyCarsModule { }

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "drive", loadChildren: "~/app/drive/drive.module#DriveModule" },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule" },
    { path: "bluetooth", loadChildren: "~/app/bluetooth/bluetooth.module#BluetoothModule" },
    { path: "featured", loadChildren: "~/app/featured/featured.module#FeaturedModule" },
    { path: "vehicle", loadChildren: "~/app/vehicle/vehicle.module#VehicleModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

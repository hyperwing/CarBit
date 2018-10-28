export class Car {
    public make: string;
    public model: string;
    public year: string;
    public mileage: string;
    public bluetoothName: string;

    constructor(make: string, model: string, year: string, mileage: string, bluetoothName: string){
        this.make = make;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.bluetoothName = bluetoothName;
    }
}
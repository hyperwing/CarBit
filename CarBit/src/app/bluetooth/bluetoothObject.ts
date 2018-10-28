export class BluetoothObject {
    public uuid: string;
    public name: string;

    constructor(id: string, name: string){
        this.uuid = id;
        this.name = name;
    }
}
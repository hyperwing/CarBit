 
export class FuelEfficiency {
    map: Map<number, number>;

    getFuelEfficiency(speed:number) : number {

        if(speed <= 90 && speed > 0){
            return this.map.get(speed);
        }else{
            return 1;
        }
    }

    getMostEfficientSpeed(low:number, high:number) : number {

        var mostEfficientMPG = this.getFuelEfficiency(high);
        var mostEfficientMPH = high;
        for(var i = low; i < high; i++){
            var current = this.getFuelEfficiency(i);
            if(current > mostEfficientMPG){
                mostEfficientMPG = current;
                mostEfficientMPH = i;
            }
        }

        return mostEfficientMPH;
    }

    constructor() {
        this.map = new Map<number, number>();
        for(var i = 0; i < 91; i++){
            this.map.set(i, 91 - i);
        }
    }
 }

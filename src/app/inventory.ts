export class Inventory {
    constructor(
        
        public item: string,
        public units: number,
        public id?: string,
     
    ) {
        
        this.item = item;
        this.units = units;
        this.id =id;
       
     }
}
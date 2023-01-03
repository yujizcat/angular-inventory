export class Inventory {
    constructor(
        
        public item: string,
        public units: number,
        public price: number,
        public category: string,
        public sale: boolean,
        public description: string,
        public shopping: boolean,
        public bought: boolean,
        public checkout: number,
        public id?: string,
     
    ) {
        
        this.item = item;
        this.units = units;
        this.price = price;
        this.category = category;
        this.sale = sale;
        this.description = description;
        this.shopping = shopping;
        this.bought = bought;
        this.checkout = checkout;
        this.id =id;
       
     }
}
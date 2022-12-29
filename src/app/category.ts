import { ThisReceiver } from "@angular/compiler";

export class Category {
    constructor(
        public name: string,
        public id?: string,
    ) {
        this.name = name;
        this.id = id;
    }
}
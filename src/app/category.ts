import { ThisReceiver } from "@angular/compiler";

export class Category {
    constructor(
        public category: string,
        public id?: string,
    ) {
        this.category = category;
        this.id = id;
    }
}
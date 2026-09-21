import { Page } from "@playwright/test";

export class ShoppingPage{
    readonly page:Page


    constructor(page:Page){
        this.page=page;
    }
}
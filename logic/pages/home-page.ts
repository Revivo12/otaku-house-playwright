import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
    private _cardItem = (value:string) => this._page.locator(`//div[@class="card-title"]`).filter({hasText: value})
    
    constructor(page: Page) {
        super(page)
    }

    async getCardItem(value : string) {
        await this._cardItem(value).waitFor({timeout : 3000})
        return this._cardItem(value)
    }

    async clickCardItem(value : string) {
        await this._cardItem(value).click()
    }
}
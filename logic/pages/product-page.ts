import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { EnumReviewsRating } from "../enums/review-rating-enum";

export class ProductPage extends BasePage {
    private _productTitle : Locator
    private _addToCartButton : Locator
    private _reviewRatingDropdown : Locator
    private _reviewTextarea : Locator
    private _submitReviewButton : Locator
    private _publishedReviewText = (value:string) => this._page.locator(`//div[@class="list-group-item"]/p[contains(text(), '${value}')]`)
    private _publishedReviewStars = (value:string) => this._page.locator(`//div[@class="list-group-item"]/p[contains(text(), '${value}')]/ancestor::div[@class="list-group-item"]//div[@class="rating"]/span/i[@class="fas fa-star"]`)

    constructor(page: Page) {
        super(page)
        this._productTitle = page.locator('//div[@class="list-group-item"]//h3')
        this._addToCartButton = page.locator('//button[@type="button"]').filter({hasText: 'Add to Cart'})
        this._reviewRatingDropdown = page.locator('//select[@id="rating"]')
        this._reviewTextarea = page.locator('//textarea[@id="comment"]')
        this._submitReviewButton = page.locator('//button[@type="submit"]').filter({hasText : 'Submit'})
    }

    async getPublishedReviewStarsAmountByReviewText(value : string) {
        await this._publishedReviewStars(value).first().waitFor()
        return this._publishedReviewStars(value).count()
    } 

    async getPublishedReviewByText(value : string) {
        await this._publishedReviewText(value).waitFor()
        return this._publishedReviewText(value)
    }

    async getPageTitleText() {
        await this._productTitle.innerText()
    }

    async clickAddToCart() {
        await this._addToCartButton.click()
    }

    async selectReviewRating(value : EnumReviewsRating) {
        await this._reviewRatingDropdown.selectOption(value)
    }

    async fillReviewTextarea(value : string) {
        await this._reviewTextarea.fill(value)
    }

    async clickSubmitReviewButton() {
        await this._submitReviewButton.click()
    }
}
import { Locator, Page } from "@playwright/test";
import { EnumUserDopdown } from "../enums/user-dropdown-enum";

export class BasePage {
    protected _page : Page // ask tzahi
    private _logInButton : Locator
    private _cartButton : Locator
    private _searchInput : Locator
    private _searchButton : Locator
    private _homePageButton : Locator
    private _userNameDropdown : Locator
    private _userNameDropdownOption = (value:EnumUserDopdown) => this._page.locator('//a[@class="dropdown-item"]').filter({hasText: value})

    constructor(page:Page) {
        this._page = page
        this._logInButton = page.locator('//a[@href="#/login"]')
        this._cartButton = page.locator('//a[@href="#/cart"]')
        this._searchInput = page.locator('//input[@name="q"]')
        this._searchButton = page.locator('//button[@type="submit"]').filter({hasText: 'Search'})
        this._homePageButton = page.locator('//a[@href="#/"]')
        this._userNameDropdown = page.locator('//a[@id="username"]')
    }

    async getLogInButton() {
        return this._logInButton
    }

    async getUserNameText() {
        return this._userNameDropdown.innerText()
    }

    async clickLogInButton() {
        await this._logInButton.click()
    }

    async clickCartButotn() {
        await this._cartButton.click()
    }

    async fillSearchInput(value : string) {
        await this._searchInput.fill(value)
    }

    async clickSearchButton() {
        await this._searchButton.click()
    }

    async clickHomePageButton() {
        await this._homePageButton.click()
    }

    async selectFromUserDropdown(value : EnumUserDopdown) {
        await this._userNameDropdown.click()
        await this._userNameDropdownOption(value).click()
    }

    async searchProduct(value : string) {
        await this._searchInput.fill(value)
        await this._searchButton.click()
    }
}
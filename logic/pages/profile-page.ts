import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProfilePage extends BasePage{
    private _nameInput : Locator
    private _emailInput : Locator
    private _passwordInput : Locator
    private _confirmPasswordInput : Locator
    private _updateButton : Locator

    constructor(page : Page) {
        super(page)
        this._nameInput = page.getByPlaceholder('Enter Name')
        this._emailInput = page.getByPlaceholder('Enter Email')
        this._passwordInput = page.getByPlaceholder('Enter Password')
        this._confirmPasswordInput = page.getByPlaceholder('Confirm Password')
        this._updateButton = page.locator('//button[@type="submit"]').filter({hasText : 'Update'})
    }

    async fillNameInput(value : string) {
        await this._nameInput.fill(value)
    }

    async fillEmailInput(value : string) {
        await this._emailInput.fill(value)
    }

    async fillPasswordInput(value : string) {
        await this._passwordInput.fill(value)
    }

    async fillConfirmPasswordInput(value : string) {
        await this._confirmPasswordInput.fill(value)
    }

    async clickUpdateButton() {
        await this._updateButton.click()
    }
}
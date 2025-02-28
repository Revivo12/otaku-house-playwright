import { Locator, Page } from "@playwright/test"
import { BasePage } from "./base-page"

export class LogInPage extends BasePage{
    private _emailInput : Locator
    private _passwordInput : Locator
    private _signInButton : Locator
    private _registerButton : Locator

    constructor(page:Page) {
        super(page)
        this._emailInput = page.getByPlaceholder('Enter Email')
        this._passwordInput = page.getByPlaceholder('Enter Password')
        this._signInButton = page.locator('//button[@type="submit"]').filter({hasText: 'Sign In'})
        this._registerButton = page.getByRole('link', {name: 'Register'})
    }

    async fillEmailInput(value : string) {
        await this._emailInput.fill(value)
    }

    async fillPasswordInput(value : string) {
        await this._passwordInput.fill(value)
    }

    async clickSignInButton() {
        await this._signInButton.click()
    }

    async clickRegisterButton() {
        await this._registerButton.click()
    }
}
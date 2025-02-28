import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class RegisterPage extends BasePage{
    private _nameInput : Locator
    private _emailInput : Locator
    private _passwordInput : Locator
    private _confirmPasswordInput : Locator
    private _registerButton : Locator
    private _signInButton : Locator

    constructor(page : Page) {
        super(page)
        this._nameInput = page.getByPlaceholder('Enter Name')
        this._emailInput = page.getByPlaceholder('Enter Email')
        this._passwordInput = page.getByPlaceholder('Enter Password')
        this._confirmPasswordInput = page.getByPlaceholder('Confirm Password')
        this._registerButton = page.locator('//button[@type="submit"]').filter({hasText: 'Register'})
        this._signInButton = page.getByRole('link', {name: 'Sign In'})
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

    async clickRegisterButton() {
        await this._registerButton.click()
    }

    async clickSignInButton() {
        await this._signInButton.click()
    }
}
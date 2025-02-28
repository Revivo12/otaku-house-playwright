import test, { expect } from "@playwright/test";
import { getConfig } from "../playwright.config";
import { LogInPage } from "../logic/pages/login-page";
import { HomePage } from "../logic/pages/home-page";
import { RegisterPage } from "../logic/pages/register-page";
import { getUserData } from "./utiles/test-utiles";

const baseUrl = getConfig('BASE_URL')
const userData = getUserData()

test.describe('Register test - UI', async () => {
    let homePage : HomePage
    let logInPage : LogInPage
    let registerPage : RegisterPage

    test.beforeEach( async ({page}) => {
        await page.goto(baseUrl)

        homePage = new HomePage(page)
        await homePage.clickLogInButton()

        logInPage = new LogInPage(page)
        await logInPage.clickRegisterButton()
    })

    test('Register to website', async ({page}) => {
        registerPage = new RegisterPage(page)
        await registerPage.fillNameInput(userData.name)
        await registerPage.fillEmailInput(userData.email)
        await registerPage.fillPasswordInput(userData.password)
        await registerPage.fillConfirmPasswordInput(userData.password)
        await registerPage.clickRegisterButton()
        homePage = new HomePage(page)
        expect(await homePage.getUserNameText()).toEqual(userData.name.toUpperCase())
    })
})
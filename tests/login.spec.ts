import test, { expect } from "@playwright/test";
import { getConfig } from "../playwright.config";
import { getUserData } from "./utiles/test-utiles";
import { HomePage } from "../logic/pages/home-page";
import { LogInPage } from "../logic/pages/login-page";

const baseUrl = getConfig('BASE_URL')
const userData = getUserData()

test.describe('Login test - Hybrid UI + API', async () => {
    let homePage : HomePage
    let logInPage : LogInPage

    test.beforeEach( async ({page}) => {
        const registerRes = await page.request.post(`${baseUrl}/api/users/register/`, {
            headers: {
                'ContentType' : 'application/json'
            },
            form: {
                'email' : userData.email,
                'name' : userData.name,
                'password' : userData.password
            }
        })
        expect(registerRes.status()).toBe(200)
        await page.goto(baseUrl)

        homePage = new HomePage(page)
        await homePage.clickLogInButton()      
    })

    test('Login to website', async ({page}) => {
        logInPage = new LogInPage(page)
        await logInPage.fillEmailInput(userData.email)
        await logInPage.fillPasswordInput(userData.password)
        await logInPage.clickSignInButton()
        homePage = new HomePage(page)
        expect(await homePage.getUserNameText()).toEqual(userData.name.toUpperCase())
    })
})
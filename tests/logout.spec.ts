import { test, expect } from "@playwright/test";
import { getConfig } from "../playwright.config";
import { HomePage } from "../logic/pages/home-page";
import { EnumUserDopdown } from "../logic/enums/user-dropdown-enum";
import { loginAndSetSession } from "./utiles/test-utiles";
import { UserData } from "../logic/user-data/user-data";

const baseUrl = getConfig('BASE_URL')

const userCredentials : UserData = {
    name: String(process.env.EXISTING_USER_NAME),
    email : String(process.env.EXISTING_USER_USERNAME),
    password : String(process.env.EXISTING_USER_PASSWORD)
}

test.describe('Logout test - Hybrid UI + API', async () => {
    let homePage : HomePage
    
    test.beforeEach( async ({page}) => {
        await page.goto(baseUrl)
        await loginAndSetSession(userCredentials, page)
    })

    test('Logout from website', async ({page}) => {
        homePage = new HomePage(page)
        await homePage.selectFromUserDropdown(EnumUserDopdown.LOG_OUT)
        expect(await homePage.getLogInButton()).toBeVisible()
    })
})
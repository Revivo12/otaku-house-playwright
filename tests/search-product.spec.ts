import test, { expect } from "@playwright/test";
import { HomePage } from "../logic/pages/home-page";
import { getConfig } from "../playwright.config";
import { loginAndSetSession } from "./utiles/test-utiles";
import { UserData } from "../logic/user-data/user-data";

const baseUrl = getConfig('BASE_URL')

const productName = 'Dragon Ball Super - Son Goku & Vegeta Figure'

const userCredentials : UserData = {
    name: String(process.env.EXISTING_USER_NAME),
    email : String(process.env.EXISTING_USER_USERNAME),
    password : String(process.env.EXISTING_USER_PASSWORD)
}

test.describe('Search product', () => {
    let homePage : HomePage

    test.beforeEach( async ({page}) => {
        await page.goto(baseUrl)
        await loginAndSetSession(userCredentials, page)
    })

    test('Search for product in search bar', {tag:'@flaky'}, async ({page}) => {
        homePage = new HomePage(page)
        await homePage.searchProduct(productName)
        expect(await homePage.getCardItem(productName)).toBeVisible()
    })
})
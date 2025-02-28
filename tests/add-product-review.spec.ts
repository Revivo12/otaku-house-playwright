import test, { expect } from "@playwright/test";
import { getUserData, loginAndSetSession, registerNewAccount } from "./utiles/test-utiles";
import { HomePage } from "../logic/pages/home-page";
import { getConfig } from "../playwright.config";
import { ProductPage } from "../logic/pages/product-page";
import { EnumReviewsRating } from "../logic/enums/review-rating-enum";
import { generateRandomString } from "../infrastracture/utiles/infra-utiles";

const baseUrl = getConfig('BASE_URL')
const productName = 'Dragon Ball Super - Son Goku & Vegeta Figure'

test.describe('Write a review test', async () => {
    let homePage : HomePage
    let productPage : ProductPage
    let reviewText : string

    test.beforeEach( async ({page}) => {
        reviewText = generateRandomString(20)

        const userData = getUserData()
        await registerNewAccount(userData)

        await page.goto(baseUrl)
        await loginAndSetSession(userData, page)

        homePage = new HomePage(page)
        await homePage.clickCardItem(productName)
    })

    test('Add review with rating - Excellent', async ({page}) => {
        productPage = new ProductPage(page)
        await productPage.selectReviewRating(EnumReviewsRating.EXCELLENT)
        await productPage.fillReviewTextarea(reviewText)
        await productPage.clickSubmitReviewButton()
        expect(await productPage.getPublishedReviewByText(reviewText)).toBeVisible()
        expect(await productPage.getPublishedReviewStarsAmountByReviewText(reviewText)).toBe(5)
    })

    test('Add review with rating - Very good', {tag: '@bug'}, async ({page}) => {
        productPage = new ProductPage(page)
        await productPage.selectReviewRating(EnumReviewsRating.EXCELLENT)
        await productPage.fillReviewTextarea(reviewText)
        await productPage.clickSubmitReviewButton()
        expect(await productPage.getPublishedReviewByText(reviewText)).toBeVisible()
        expect(await productPage.getPublishedReviewStarsAmountByReviewText(reviewText)).toBe(4)
    })

    test('Add review with rating - Good', async ({page}) => {
        productPage = new ProductPage(page)
        await productPage.selectReviewRating(EnumReviewsRating.GOOD)
        await productPage.fillReviewTextarea(reviewText)
        await productPage.clickSubmitReviewButton()
        expect(await productPage.getPublishedReviewByText(reviewText)).toBeVisible()
        expect(await productPage.getPublishedReviewStarsAmountByReviewText(reviewText)).toBe(3)
    })

    test('Add review with rating - Fair', async ({page}) => {
        productPage = new ProductPage(page)
        await productPage.selectReviewRating(EnumReviewsRating.FAIR)
        await productPage.fillReviewTextarea(reviewText)
        await productPage.clickSubmitReviewButton()
        expect(await productPage.getPublishedReviewByText(reviewText)).toBeVisible()
        expect(await productPage.getPublishedReviewStarsAmountByReviewText(reviewText)).toBe(2)
    })

    test('Add review with rating - Poor', async ({page}) => {
        productPage = new ProductPage(page)
        await productPage.selectReviewRating(EnumReviewsRating.POOR)
        await productPage.fillReviewTextarea(reviewText)
        await productPage.clickSubmitReviewButton()
        expect(await productPage.getPublishedReviewByText(reviewText)).toBeVisible()
        expect(await productPage.getPublishedReviewStarsAmountByReviewText(reviewText)).toBe(1)
    })
})
import test, { expect } from "@playwright/test";
import { getConfig } from "../playwright.config";
import { getUserData, registerNewAccount } from "./utiles/test-utiles";

const baseUrl = getConfig('BASE_URL')
const userData = getUserData()
const newUserData = getUserData()

test.describe('Update user profile (name + email) - API', async () => {

    test('Check updated user profile info', {tag: '@bug'}, async ({page}) => {
        const registerResponse = await registerNewAccount(userData)

        const responseData = await registerResponse.json()
        const token = responseData.token
        const id = responseData.id

        const updateProfileRes = await page.request.put(`${baseUrl}/api/users/profile/update`, {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'ContentType' : 'application/json'
            },
            data: {
                email: newUserData.email,
                id: id,
                name: newUserData.name,
                password: newUserData.password
            }
        })

        expect(updateProfileRes.status()).toBe(200)
    })
})
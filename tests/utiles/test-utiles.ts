import { APIRequestContext, Browser, BrowserContext, Page, request } from "@playwright/test";
import { generateRandomPassword, generateRandomString, generateEmailAddress } from "../../infrastracture/utiles/infra-utiles"
import { generateUserData, UserData } from "../../logic/user-data/user-data"
import * as fs from 'fs'
import { getConfig } from "../../playwright.config";

const baseUrl = getConfig('BASE_URL')

export function getUserData() : UserData {
    const userData : UserData = generateUserData(
        generateRandomString(5),
        generateEmailAddress(),
        generateRandomPassword(),
    )

    fs.writeFile('logic/user-data/user-data.json', JSON.stringify(userData, null, 2), (err) => {
        if (err) throw err;
    });

    return userData
}


export async function loginAndSetSession(userData : UserData, page: Page) {
    const apiContext: APIRequestContext = await request.newContext();

    const response = await apiContext.post(`${baseUrl}/api/users/login/`, {
        data: {
            username: userData.email,
            password : userData.password
        }
    })
    if (response.status() != 200) {
        throw new Error(`Login failed: ${response.status()} ${await response.text()}`);
    }
    const responseData = await response.json();

    const refresh = responseData.refresh
    const access = responseData.access
    const id = responseData.id
    const isAdmin = responseData.isAdmin
    const userToken = responseData.token
    const name = userData.name
    const username = userData.email

    await page.evaluate(({ refresh, access, id, isAdmin, userToken, name, username }) => {
        localStorage.setItem('userInfo', JSON.stringify({
            refresh,
            access,
            id,
            _id: id,
            username,
            email: "",
            name,
            isAdmin,
            token: userToken
        }));
    }, { refresh, access, id, isAdmin, userToken, name, username });
    
    await page.reload()
}

export async function registerNewAccount(userData : UserData) {
    const apiContext: APIRequestContext = await request.newContext();

    const response = await apiContext.post(`${baseUrl}/api/users/register/`, {
        data: userData
    })

    if (response.status() != 200) {
        throw new Error(`Register failed: ${response.status()} ${await response.text()}`);
    }
    
    return response
}



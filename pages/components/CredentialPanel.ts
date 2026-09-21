import { expect, Locator, Page } from "@playwright/test";

export class CredentialPanel{
    readonly page: Page;
    readonly getLoginCredential: Locator
    readonly getLoginPassword: Locator


     constructor(page:Page){
        this.page=page;
        // await expect(this.page.getByTestId("login-credentials-container")).toBeAttached();
        this.getLoginCredential = this.page.getByTestId("login-credentials");
        this.getLoginPassword = this.page.getByTestId("login-password")
    }

    async getUsername(){
        const username = await this.getLoginCredential.allInnerTexts()
        return username
    }

    async getPassword(){
        const password = await this.getLoginPassword.allInnerTexts()
        return password
    }
}
import { expect, Page } from "@playwright/test";
import { CredentialPanel } from "./components/CredentialPanel";
import { LoginForm } from "./components/LoginForm";

export class LoginPage{
    readonly page:Page;
    readonly loginForm: LoginForm;
    readonly credentialPanel: CredentialPanel

    constructor(page:Page){
        this.page=page;
        expect(page).toHaveURL("https://www.saucedemo.com/");

        this.loginForm = new LoginForm(page);
        this.credentialPanel = new CredentialPanel(page);
    }

}
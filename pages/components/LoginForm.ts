import { expect, Locator, Page } from "@playwright/test";

export class LoginForm{
    private readonly page: Page;
    readonly getUsernameTextbox:Locator;
    readonly getPasswordTextbox: Locator;
    readonly getLoginButton: Locator;

    constructor(page: Page) {
        // expect(page.getByTestId("login-container")).toBeAttached();
        this.page = page;
        this.getUsernameTextbox =  this.page.getByRole("textbox",
        {
            name:"Username"
        })
        this.getPasswordTextbox = this.page.getByRole("textbox",
        {
                name:"Password"
        })
        this.getLoginButton = this.page.getByRole("button",{
            name: "Login"
        })
    
    }

    private async setUsername(username:string){
        await this.getUsernameTextbox.fill(username);

    }

    async setPassword(password:string){
        await this.getUsernameTextbox.fill(password);
    }

    async clickLogin(){
        await this.getLoginButton.click();        
    }

    

    
}
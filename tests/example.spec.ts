import test from "@playwright/test";
import { LoginForm } from "../pages/components/LoginForm";
import { LoginPage } from "../pages/LoginPage";


test("Pom",async ({page}) =>{
  await page.goto("https://www.saucedemo.com/")
  const loginPage = new LoginPage(page);
  const  usernames = loginPage.credentialPanel.getUsername()
  console.log(usernames)


})

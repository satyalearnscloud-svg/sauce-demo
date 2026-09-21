import test, { expect } from "@playwright/test";
import { Product } from "../../models/Product";
import { products as expectedProducts, products } from "../../resources/products";

test("End to End test",async ({page})=>{
    //Navigate to URL
    await page.goto("https://www.saucedemo.com/");
    //Get username
    const innerText =  await page.getByTestId('login-credentials').innerText()
    const usernames = innerText.split('\n').map(l=>l.trim()).filter(Boolean).filter(l=> l !== "Accepted usernames are:");
    const username = usernames[0]

    //Get password

    const passwordInnerText = await page.getByTestId("login-password").innerText()
    const passwordList = passwordInnerText.split('\n')
                                        .map(l=>l.trim())
                                        .filter(Boolean).
                                        filter(l=>l !== "Password for all users:")

    const password = passwordList[0]

    // Login
    
    await page.getByPlaceholder('Username').fill(username)
    await page.getByPlaceholder('Password').fill(password)
    await page.getByTestId("login-button").click()

    // Validate Inventory Page
    const actualUrl = await page.url();
    expect(actualUrl).toEqual("https://www.saucedemo.com/inventory.html");

    // Get all Items in the inventory and validate against the expected result
    //Create a object of Product Interface
    const products : Product[] = []
    const inventoryContainer = await page.getByTestId("inventory-container")
    await expect(inventoryContainer).toBeAttached()
    
    const inventoryItems = await inventoryContainer.getByTestId("inventory-item")
    const count = await inventoryItems.count()

    

    console.log(count)
    // await expect(count).toBeGreaterThan(0)
    for(let i = 0;i<count;i++){
            const inventoryItem = inventoryItems.nth(i)
            // await expect(inventoryItem).toBeVisible()
            const inventoryitemDescription = await inventoryItem.getByTestId("inventory-item-description")
            const inventoryitemName = await inventoryitemDescription.locator(".inventory_item_name ").innerText()
            const inventoryItemDesc = await inventoryitemDescription.getByTestId("inventory-item-desc").innerText()
            const inventoryPrice = Number((await inventoryitemDescription.getByTestId("inventory-item-price").innerText()).replace('$',''))
            products.push({
                name: inventoryitemName,
                description: inventoryItemDesc,
                price: inventoryPrice
            })                                                       
    }

    //Validate products match as per the expected products
    expect(products).toEqual(expectedProducts)

    //Get the lowest price product's name

    const cheapestProdcutsName = products.reduce(        
        (max,product)=> product.price < max.price? product: max
    ).name
    console.log(cheapestProdcutsName)

    const element =  await inventoryItems.filter({hasText : cheapestProdcutsName})
                                    .getByRole('button',{
                                        name: "Add to cart"
                                    })

    await element.click()

    await page.getByRole("button",{
        name : /Cart, \d+ items/
    }).click()

    //Validate Cart URL
    const expectCartUrl = await page.url()
    expect(expectCartUrl).toBe("https://www.saucedemo.com/cart.html")

    // Click Checkout
    await page.getByRole("button",{name:"Checkout"}).click()

    //Validate Checkout URL
    const expectCheckoutUrl = await page.url()
    expect(expectCheckoutUrl).toBe("https://www.saucedemo.com/checkout-step-one.html")

    //Fill checkout information
    // await page.getByRole("textbox",{name:"First Name"}).click();
    // await page.getByRole("textbox",{name:"First Name"}).fill("Satyabrata");
    // await page.getByRole("textbox",{name:"Zip/Postal Code"}).fill("560100")
    // await page.getByTestId("lastName").click();
    // await page.getByTestId("lastName").fill("Saha")

    // const formGroups =  page.getByRole("form",{name:"Checkout information"}).locator(".form_group")
    // const c = await formGroups.count()

    // await formGroups.nth(0).locator('input').fill('Satya')

    // await formGroups.nth(1).locator('input').fill('Saha')
    //  await formGroups.nth(1).locator('input').fill('Saha1')
    

    // await page.getByTestId("continue").click()

    await page.getByRole("textbox", { name: "First Name" }).fill("Satyabrata");
    await page.getByRole("textbox", { name: "Last Name" }).fill("Saha");
    await page.getByRole("textbox",{name:"Zip/Postal Code"}).fill("560100")

    await page.getByTestId("continue").click()

    //Validate Checkout URL
    const expectCheckoutStepTwoUrl = await page.url()
    expect(expectCheckoutStepTwoUrl).toBe("https://www.saucedemo.com/checkout-step-two.html")

    const total = await page.getByTestId("total-label").innerText()

    console.log(total)

    

    



    

    



   

    
    

});

test.skip("Arrays", async()=>{
    //Get Sum of all products
    const total = products.reduce(
        (sum,product) => sum + product.price,0)
    console.log(total)
    //Find the lowest price
    const lowest = products.reduce(
        (min,product)=> product.price < min ?  product.price : min, Infinity)
    console.log(lowest)
    //Find the highest price
    const highest = products.reduce(
        (max,product)=> product.price > max? product.price: max,0
    )
    console.log(highest)
    //Get the highest product object
    const product = products.reduce(
        (min, product) =>
        product.price > min.price ? product : min
    )

    console.log(product)

});


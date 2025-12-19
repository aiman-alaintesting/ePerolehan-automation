import { test, expect, Page } from '@playwright/test';
import { generateRandomName, generateRandomICNumber, generateDynamicValues } from './utils/datagenerator';
import { navigateWithTimeoutRetry } from './utils/pageReload';
import { time } from 'console';

test('Supplier declare application', async ({ page }) => {

    const targetUrl = 'http://ngepuat.eperolehan.com.my/home'; // Replace with your actual URL

    // Navigate with timeout retry
    await navigateWithTimeoutRetry(page, targetUrl);
  
    // Continue with the rest of your test steps after successful navigation/reload
     await expect(page).toHaveURL('http://ngepuat.eperolehan.com.my/home');

    // Close the popup if it appears
        async function conditionallyClick(page: Page) {
        const closeButton = page.getByRole('button', { name: '×' });
    
        if (await closeButton.isVisible()) {
        await closeButton.click();
        }
        }
        // Change language to English
        await conditionallyClick(page);
        await page.locator('[id="_82_languageId"]').selectOption('en_US');
        await page.waitForTimeout(3000); // Wait 3 seconds
     
        await page.getByTitle('Login To ePerolehan').click();
        await page.getByRole('textbox', { name: 'ID Log Masuk :' }).click();
        await page.getByRole('textbox', { name: 'ID Log Masuk :' }).fill('MOF_Sole47');
        await page.getByRole('textbox', { name: 'Kata Laluan:' }).click();
        await page.getByRole('textbox', { name: 'Kata Laluan:' }).fill('P@ssw0rd1234');
        await page.getByRole('button', { name: 'Log Masuk' }).click();
        await page.getByRole('link', { name: 'Declare Application' }).click();
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:smSupAnnRev_label"]').click();
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:smSupAnnRev_panel"]').getByText('RM10,000,001 -').click();
        await page.getByRole('cell', { name: '0', exact: true }).first().click();
        await page.locator('input[id$=":bumiStf"]').fill('10');
        await page.getByText('Owned').click();
        await page.getByText('Business Office').click();
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:fcltyOwnerName"]').click();
        // Owner name with random name generator
        // Call the imported functions to get the random data
        const randomName = generateRandomName(); 
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:fcltyOwnerName"]').fill(randomName);
        // Pick purchase date
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:purchaseDate"]').getByRole('button', { name: 'ui-button' }).click();
        const today = new Date().getDate().toString();
        await page.getByRole('link', { name: today }).click();

        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:purchasePrice"]').click();
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:purchasePrice"]').fill('300000');
        await page.getByText('Purchase Price (RM)').click();
    

        await page.getByRole('button', { name: 'Next Section' }).click();
            await page.waitForTimeout(2000); // Wait 2 seconds
        await page.getByRole('button', { name: 'OK' }).click();
            await page.waitForTimeout(3000); // Wait 3 seconds
        await page.getByRole('button', { name: 'Next Section' }).click();
            await page.waitForTimeout(2000); // Wait 2 seconds
        await page.getByRole('link', { name: 'Edit' }).click();
        
        await page.locator('td:nth-child(2) > table > tbody > tr:nth-child(2) > td').first().click();
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:equiPerRace_label"]').click();
        await page.locator('[id="_DirectMofRegistration_WAR_NGePportlet_:form:tt:equiPerRace_panel"]').getByText('INDIA MUSLIM').click();
        
    // Address Details
        // Mailing Address
            // 1. Define the locator that matches all 3 elements
            const allCheckboxes = page.locator('tr:has(u:has-text("Mailing Address")) + tr, tr:has-text("Same as permanent address"), tr:has-text("Same as company address")')
                .locator('.ui-chkbox-box')
                .filter({ visible: true });

            // 2. Convert the locator into an array of individual locators
            const checkboxList = await allCheckboxes.all();

            // 3. Iterate and click each one
            for (const checkbox of checkboxList) {
                await checkbox.click();
            }
        
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForTimeout(2000); // Wait 2 seconds
    
        // Look inside the specific personnel info panel for a button with the text "Add"
        //await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:persInfoDtPanel"]')
        await page.getByRole('button', { name: 'Add' })
            .first()
            .click();
        // Select role Staff
        await page.locator('td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(3)').click();
            await page.waitForTimeout(2000); // Additional wait to ensure form loads after role selection
        
        await page.getByText("Personnel Information").click();
        /*
        await page
            .locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerNam"]')
            .click();
        await page
            .locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerNam"]')
            .fill(randomName);

        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerSalutation_label"]').click();
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerSalutation_panel"]').getByText('Cik', { exact: true }).click();
        */
       // Pick date of birth
        await page.getByRole('button', { name: 'ui-button' }).click();
        const todayDate = new Date().getDate().toString();
        await page.getByRole('link', { name: todayDate }).click();
        // Select Bumiputera
        await page.getByRole('cell', { name: 'Yes' }).nth(1).click();
        
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerRace_label"]').click();
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerRace_panel"]').getByText('MELAYU', { exact: true }).click();
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerIcNum"]').click();
        const icNumber = generateRandomICNumber();
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:equiPerIcNum"]').fill(icNumber);
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:smPerDesignation"]').click();
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:smPerDesignation"]').fill('Staff');
        await page.getByRole('cell', { name: 'Muslim' }).nth(1).click();
        await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:staffPermAddrPan"] > table > tbody > tr:nth-child(3) > td:nth-child(2)').click();
        await page.locator('input[id$="staffEquiPersPermAddrLine"]').fill('Address 1');
        

});
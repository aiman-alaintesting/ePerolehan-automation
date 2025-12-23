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
        await page.getByRole('textbox', { name: 'ID Log Masuk :' }).fill('MOF_Sole67');
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
            await page.waitForTimeout(2000); // Wait 2 seconds   

        await page.getByRole('button', { name: 'Next Section' }).click();
            await page.waitForTimeout(2000); // Wait 2 seconds
        await page.getByRole('button', { name: 'OK' }).click();
            await page.waitForTimeout(7000); // Wait 7 seconds
        await page.getByRole('button', { name: 'Next Section' }).click();
            await page.waitForTimeout(3000); // Wait 3 seconds
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

        // Locate the input field right after the text 'Name'
        const randomName_ = generateRandomName();
        await page.locator('input[id$="equiPerNam"]').fill(randomName_);

        // For the salutation dropdown:
        // Locate the select box right after the text 'Salutation'
        const dropdown = page.locator('[id$="equiPerSalutation_label"]');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();
                await page.locator('[id$="equiPerSalutation_panel"]')
                .getByText('Cik', { exact: true })
                .click();
        // For the NRIC number:
        const icNumber = generateRandomICNumber();
        await page.locator('input[id$="equiPerIcNum"]').fill(icNumber);

        // For the Race dropdown:
        const raceDropdown = page.locator('[id$="equiPerRace_label"]');
        await raceDropdown.click();
                await page.locator('[id$="equiPerRace_panel"]')
                .getByText('MELAYU', { exact: true })
                .click();

        // For the Position field:
        await page.locator('input[id$="smPerDesignation"]').fill('Staff');
       
       // Pick date of birth
        await page.getByRole('button', { name: 'ui-button' }).click();
        const todayDate = new Date().getDate().toString();
        await page.getByRole('link', { name: todayDate }).click();
        // Select Bumiputera
        await page.getByRole('cell', { name: 'Yes' }).nth(1).click();
        // Select Religion
        await page.getByRole('cell', { name: 'Muslim' }).nth(1).click();
        //await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:staffPermAddrPan"] > table > tbody > tr:nth-child(3) > td:nth-child(2)').click();
        await page.locator('input[id$="staffEquiPersPermAddrLine"]').fill('Address 1');
        await page.waitForTimeout(1000); // Wait 1 seconds
        await page.getByText('State', { exact: true }).click();
        await page.waitForTimeout(1000); // Wait 1 seconds
        /*
        // 1. Click the State dropdown label using the unique suffix
        // 1. Ensure the element is attached and visible before clicking
            const stateDropdown = page.locator('[id$="shrPermState_label"]');
            await stateDropdown.waitFor({ state: 'visible', timeout: 10000 }); 
            await stateDropdown.click();

            // 2. Select JOHOR from the panel
            // Use a more specific selector if the panel isn't opening
            await page.locator('div[id$="shrPermState_panel"] li')
                .filter({ hasText: /^JOHOR$/ })
                .click();
                    await page.waitForTimeout(2000); // Wait 2 seconds

        // 2. Click the District dropdown label using the unique stable suffix
        const districtDropdown = page.locator('[id$="shrPermDist_label"]');
        await districtDropdown.click();
                await page.locator('[id$="shrPermDist_panel"]')
                    .getByText('BATU PAHAT', { exact: true })
                    .click();
                    await page.waitForTimeout(2000); // Wait 2 seconds

        // 3. Click the City dropdown label using the unique stable suffix
        const cityDropdown = page.locator('[id$="shrPermCity_label"]');
        await cityDropdown.click();
                await page.locator('[id$="shrPermCity_panel"]')
                    .getByText('AYER HITAM', { exact: true })
                    .click();
                    await page.waitForTimeout(2000); // Wait 2 seconds
        */
/*
// --- Select State (e.g., JOHOR) ---
// Define a locator for the main container using the text visible in your image
const addressDetailsSection = page.locator('div', { hasText: 'ADDRESS DETAILS' }).first();

// Ensure the main section is loaded and visible
await expect(addressDetailsSection).toBeVisible({ timeout: 20000 });

// Now, scope your search *inside* that container
const stateLabel = addressDetailsSection.locator('[id$="shrPermState_label"]');

// The element should now be found because its parent is active/visible
await stateLabel.click();

// ... rest of your code to select 'JOHOR' and wait for network idle ...

await page.locator('[id$="shrPermState_panel"]')
    .getByText('JOHOR', { exact: true })
    .click();

await page.waitForLoadState('networkidle');


    // --- Select District (e.g., BATU PAHAT) ---
    // The District dropdown is now visible and ready
    const districtLabel = page.locator('[id$="shrPermDist_label"]');
    await expect(districtLabel).toBeVisible({ timeout: 10000 }); 
    await districtLabel.click();

    // Select the option from the panel
    await page.locator('[id$="shrPermDist_panel"]')
        .getByText('BATU PAHAT', { exact: true })
        .click();
        
    // CRITICAL: Wait for the page to finish the AJAX update after selecting District
    await page.waitForLoadState('networkidle');


    // --- Select City/Town (e.g., AYER HITAM) ---
    // The City/Town dropdown is now visible and ready
    const cityLabel = page.locator('[id$="shrPermCity_label"]');
    await expect(cityLabel).toBeVisible({ timeout: 10000 }); 
    await cityLabel.click();

    // Select the option from the panel
    await page.locator('[id$="shrPermCity_panel"]')
        .getByText('AYER HITAM', { exact: true })
        .click();
        
    // CRITICAL: Wait for the page to finish the final AJAX update
    await page.waitForLoadState('networkidle');
    */

     // 1. Select State: JOHOR
    const stateLabel = page.locator('[id$="shrPermState_label"]');
    await stateLabel.click();

    const statePanel = page.locator('[id$="shrPermState_panel"]');
    await statePanel.getByText('JOHOR', { exact: true }).click();

    // 2. Select District: BATU PAHAT
    // Waiting for 'toBeEnabled' is more reliable than networkidle for AJAX updates
    const districtLabel = page.locator('[id$="shrPermDist_label"]');
    await expect(districtLabel).toBeEnabled({ timeout: 10000 });
    await districtLabel.click();

    const districtPanel = page.locator('[id$="shrPermDist_panel"]');
    await districtPanel.getByText('BATU PAHAT', { exact: true }).click();

    // 3. Select City/Town: AYER HITAM
    const cityLabel = page.locator('[id$="shrPermCity_label"]');
    await expect(cityLabel).toBeEnabled({ timeout: 10000 });
    await cityLabel.click();

    const cityPanel = page.locator('[id$="shrPermCity_panel"]');
    await cityPanel.getByText('AYER HITAM', { exact: true }).click();
    
    // Optional: Final validation to ensure the label updated correctly
    await expect(cityLabel).toHaveText('AYER HITAM');

        await page.locator('input[id$="staffEquiPersPermPostcode"]').fill('83000');
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForTimeout(3000); // Wait 3 seconds

});
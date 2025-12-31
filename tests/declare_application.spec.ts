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
        await page.getByRole('textbox', { name: 'ID Log Masuk :' }).fill('MOF_Sole116');
        await page.getByRole('textbox', { name: 'Kata Laluan:' }).click();
        await page.getByRole('textbox', { name: 'Kata Laluan:' }).fill('P@ssw0rd1234');
        await page.getByRole('button', { name: 'Log Masuk' }).click();
        await page.getByRole('link', { name: 'Declare Application' }).click();
            await page.waitForTimeout(1000); // Wait 1 seconds
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
            await page.waitForTimeout(5000); // Wait 5 seconds
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
        const salutationDropdown = page.locator('[id$="equiPerSalutation_label"]');
        await salutationDropdown.waitFor({ state: 'visible' });
        await salutationDropdown.click();
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
            await page.waitForTimeout(1000); // Wait 1 seconds
        // Select Bumiputera
        await page.getByRole('cell', { name: 'Yes' }).nth(1).click();
        // Select Religion
        await page.getByRole('cell', { name: 'Muslim' }).nth(1).click();
        //await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:staffPermAddrPan"] > table > tbody > tr:nth-child(3) > td:nth-child(2)').click();
        await page.locator('input[id$="staffEquiPersPermAddrLine"]').fill('Address 1');
        await page.waitForTimeout(1000); // Wait 1 seconds
        await page.getByText('State', { exact: true }).click();
        await page.waitForTimeout(1000); // Wait 1 seconds
       
// 1. Define the stable container using your filter
  // We use the $= CSS operator to match only the end of the ID (ignoring the dynamic prefix)
  const cellContainer = page.locator('td')
    .filter({ has: page.locator('[id$="staffPermAddrPan"]') }) // Matches ID ending with "staffPermAddrPan"
    .filter({ hasText: '- Select One -1210 0' });
    // 2. Now locate the State dropdown within that container   
  const StateDropdown = cellContainer.locator('[id$="staffEquiPersPermState_label"]');
  await StateDropdown.click();

  // 2. Locate the panel and click the 'JOHOR' option
    // We use [id$="_panel"] to find the panel ignoring the dynamic prefix
    const StateDropdownPanel = page.locator('[id$="staffEquiPersPermState_panel"]');
    await StateDropdownPanel.getByText('JOHOR', { exact: true }).click();
            await page.waitForTimeout(1000); // Wait 1 seconds

   // --- Case 1: Staff Personal Address District Dropdown ---
  // Scoping within the 'staffPermAddrPan' table cell with specific text
  const districtCell = page.locator('td')
    .filter({ has: page.locator('[id$="staffPermAddrPan"]') })
    .filter({ hasText: '- Select One -BATU PAHATJOHOR' });

  // Locate by stable ID suffix 'staffEquiPersPermDist_label'
  await districtCell.locator('[id$="staffEquiPersPermDist_label"]').click();

  // 2. Select 'BATU PAHAT' from the panel using a stable ID suffix match
    // We target the element ending in 'staffEquiPersPermDist_panel'
    const districtPanel = page.locator('[id$="staffEquiPersPermDist_panel"]');
    await districtPanel.getByText('BATU PAHAT', { exact: true }).click();
            await page.waitForTimeout(1000); // Wait 1 seconds

  // --- Case 2: Staff Personal Address City Dropdown ---
  // Scoping within the 'cell' role specifically named '- Select One -'
  const cityCell = page.getByRole('cell', { name: '- Select One -', exact: true });

  // Locate by stable ID suffix 'staffEquiPersPermCity_label'
  await cityCell.locator('[id$="staffEquiPersPermCity_label"]').click();
  
  // 2. Click the 'AYER HITAM' option from the panel
    // Use [id$="..."] to match the panel's stable ID suffix
    const cityPanel = page.locator('[id$="staffEquiPersPermCity_panel"]');
    await cityPanel.getByText('AYER HITAM', { exact: true }).click();
                await page.waitForTimeout(1000); // Wait 1 seconds

    // Locates the element whose ID ends with 'staffEquiPersPermAddrPostCodeMy'
    // This ignores the dynamic '_MOFApplication_WAR_NGePportlet_:form:tt:j_idt2229:' prefix
    const postCodeInput = page.locator('[id$="staffEquiPersPermAddrPostCodeMy"]');

    // Fill with the value 12345
    await postCodeInput.fill('12345');
        await page.waitForTimeout(1000); // Wait 1 seconds
      await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForTimeout(3000); // Wait 3 seconds

     await page.getByRole('button', { name: 'Next Section' }).click();
         await page.waitForTimeout(2000); // Wait 2 seconds

    const bumiAmtInput = page.locator('[id$="bumiAmt"]');
        // Fill with the value 3000000
        await bumiAmtInput.fill('3000000');

     await page.getByRole('gridcell', { name: 'Value (RM)' }).click();
         await page.waitForTimeout(2000); // Wait 2 seconds
     await page.getByRole('button', { name: 'OK' }).click();
         await page.waitForTimeout(2000); // Wait 2 seconds
     await page.getByRole('link', { name: 'Edit' }).click();
        await page.waitForLoadState('networkidle');
     //    await page.waitForTimeout(5000); // Wait 5 seconds

   const equityAmountInput = page.locator('[id$="equiShrDetAmt"]');
        // force: true bypasses the check for hidden overlays that might be stalling the action
        await equityAmountInput.click({ force: true });
        await equityAmountInput.fill('3000000', { force: true });

     await page.getByText('Amount (RM)').click();
        await page.waitForTimeout(1000); // Wait 1 seconds
     await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForLoadState('networkidle'); // Wait for network to be idle after selection
     //   await page.waitForTimeout(3000); // Wait 3 seconds
     await page.getByRole('button', { name: 'Next Section' }).click();    
        await page.waitForTimeout(1000); // Wait 1 seconds

    await page.getByRole('link', { name: 'Edit' }).click();
    //    await page.waitForTimeout(2000); // Wait 2 seconds

    const bankInfoPopup = page.getByText('Bank Information');
        // Explicitly wait for the title text to be in a 'visible' state
        await bankInfoPopup.waitFor({ state: 'visible' });
            
     //   await page.getByText('- Select One -RegistrationPaymentBoth (Payment,Registration)Payment').click();
     //   await page.locator('[id="_MOFApplication_WAR_NGePportlet_:form:tt:smBankAcctPurposeVal_panel"]').getByText('Both (Payment,Registration)').click();
        
// Define your locators again for clarity
const accountPurposeDropdown = page.locator('.ui-selectonemenu-trigger').first();
const optionsPanel = page.locator('[id$="smBankAcctPurposeVal_panel"]');   // *Use Partial ID selector
const desiredOption = optionsPanel.getByText('Both (Payment,Registration)');

// --- Execution ---

// 1. Click the dropdown wrapper
await accountPurposeDropdown.click();
    await page.waitForTimeout(1500); // Wait 1.5 seconds
// 2. WAIT EXPLICITLY for the options panel to be visible (auto-waits until timeout)
await expect(optionsPanel).toBeVisible(); 

// 3. Now click the specific desired option inside the panel
await desiredOption.click();

        await page.waitForLoadState('networkidle'); // Wait for network to be idle after selection

// Bank Address
const bankAddressInput = page.locator('[id$="suppBankAddrs"]');
await bankAddressInput.fill('Address 1');
// await page.getByText('Address', { exact: true }).click();

    // Bank Branch Name
const branchInput = page.locator('[id$="smBankBranchName"]');
await branchInput.fill('KL');
    await page.waitForTimeout(1000); // Wait 1 seconds
await page.getByText('Bank Branch').click();

// Bank Address
const addressInput = page.locator('[id$="suppBankAddrs"]');
await addressInput.fill('Address 1');
// await page.getByText('Address', { exact: true }).click();

// State Dropdown
await page.locator('[id$="smBankState_label"]').click();
    await expect(page.locator('[id$="smBankState_panel"]')).toBeVisible();
await page.locator('[id$="smBankState_panel"]').getByText('JOHOR', { exact: true }).click();
    await page.waitForLoadState('networkidle'); // Wait for network to be idle after selection

// District Dropdown
await page.locator('[id$="smBankDist_label"]').click();
    await expect(page.locator('[id$="smBankDist_panel"]')).toBeVisible();
await page.locator('[id$="smBankDist_panel"]').getByText('BATU PAHAT').click();
    await page.waitForLoadState('networkidle'); // Wait for network to be idle after selection

// City Dropdown
await page.locator('[id$="smBankCity_label"]').click();
    await expect(page.locator('[id$="smBankCity_panel"]')).toBeVisible();
await page.locator('[id$="smBankCity_panel"]').getByText('AYER HITAM').click();
    await page.waitForLoadState('networkidle'); // Wait for network to be idle after selection

// Postcode
const postcodeInput = page.locator('[id$="suppBankPostCodeMy"]');
await postcodeInput.fill('12345');

// Terms & Conditions / Additional Field
const tncInput = page.locator('[id$="banCqTnc"]');
await tncInput.fill('test');

        // Click the first checkbox in the list
    await page.locator('.ui-selectlistbox-item > .ui-chkbox').nth(0).click();

    // Click the second checkbox in the list
    await page.locator('.ui-selectlistbox-item > .ui-chkbox').nth(1).click();
  
    await page.getByLabel('Bank Information').getByRole('button', { name: 'Save' }).click();
            
});
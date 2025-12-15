import { test, expect } from '@playwright/test';
import { TimeoutError } from 'playwright/test'; // Import the specific error type
// Import the specific functions we need from our new utility file
import { generateRandomName, generateRandomICNumber } from './utils/datagenerator';

test('register MOF Account', async ({ page }) => {

    const targetUrl = 'http://ngepsit.eperolehan.com.my/home'; // Replace with your actual URL
  const navigationTimeout = 15000; // Set "too long" to 15 seconds (15000ms)

  try {
    // Attempt to go to the URL with a specific timeout
    await page.goto(targetUrl, { timeout: navigationTimeout });
    console.log('Successfully navigated to the website.');

  } catch (error) {
    // Check if the error is specifically a Playwright TimeoutError
    if (error instanceof TimeoutError) {
      console.warn(`Navigation timed out after ${navigationTimeout / 1000}s. Refreshing page...`);
      
      // Refresh the page
      await page.reload();

      // Wait for the page to reach a stable state after the reload
      await page.waitForLoadState('domcontentloaded'); 

      console.log('Page refreshed and ready. Proceeding with the test.');
      
    } else {
      // If it's a different kind of error, re-throw it to fail the test
      throw error;
    }
  }
  
  // Continue with the rest of your test steps after successful navigation/reload
     await expect(page).toHaveURL('http://ngepsit.eperolehan.com.my/home');
    // Close the popup if it appears
    async function conditionallyClick(page: Page) {
    const closeButton = page.getByRole('button', { name: '×' });

    if (await closeButton.isVisible()) {
    await closeButton.click();
    }
    }
    await page.locator('[id="_82_languageId"]').selectOption('en_US');
    await page.waitForTimeout(3000); // Wait 2 seconds
    await page.locator('xpath=//*[@id="quicklaunch"]/div/div[2]/div[2]/div').click();
    await page.locator('.ui-radiobutton-box').nth(1).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('.ui-chkbox-box').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3000); // Wait 3 seconds

//Supplier Registration Screen
//Account Information
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:suppTypeId_label"]').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:suppTypeId_panel"]').getByText('Contractor').click();
    await page.waitForTimeout(3000); // Wait 3 seconds
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busTypeId_label"]').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busTypeId_panel"]').getByText('ROB - Sole-Proprietorship').click();
    await page.waitForTimeout(2000); // Wait 2 seconds
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:regNo"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:regNo"]').fill('00112233-B');
    await page.waitForLoadState('networkidle'); //wait for page load
//Business Network
    await page.locator('.ui-chkbox-box').first().click();
    await page.waitForLoadState('networkidle'); //wait for page load
//Company Information
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:companyNameId"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:companyNameId"]').fill('testBusinessROBSole_1');
    await page.waitForLoadState('networkidle'); //wait for page load
    //Date Picker - Registration Date (today) 
    const today = String(new Date().getDate());
    await page.getByRole('button', { name: 'ui-button' }).click();
    await page.locator('.ui-datepicker, .ui-calendar, .ui-datepicker-div').waitFor({ state: 'visible' });
    await page.getByRole('link', { name: today }).click();

    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:compAdd1"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:compAdd1"]').fill('Company Address line_1');
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busState_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busState_panel"]').getByText('JOHOR').click();
    await page.waitForTimeout(3000); // Wait 3 seconds
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busDistrict_label"]').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busDistrict_panel"]').getByText('BATU PAHAT').click();
    await page.waitForTimeout(3000); // Wait 3 seconds
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busCity_label"]').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busCity_panel"]').getByText('AYER HITAM').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.getByRole('button', { name: 'View Map' }).click();
    await page.waitForTimeout(2000); // Wait 2 seconds
    await page.locator('xpath=//*[@id="_onlineRegistration_WAR_NGePportlet_:form:acgmap:gmapDialog:gmapDialogId"]/div[1]/a/span').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:compPostCodeMy"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:compPostCodeMy"]').fill('12345');
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:telNoId:areaCodeCompId"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:telNoId:areaCodeCompId"]').fill('12');
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:telNoId:phoneNoCompId"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:telNoId:phoneNoCompId"]').fill('34567890');
    await page.waitForLoadState('networkidle'); //wait for page load

//Owner Information
    // Call the imported functions to get the random data
    const randomName = generateRandomName(); 
    const randomIcNumber = generateRandomICNumber(); 
  
    // Selects the input that is the 3rd child (td) of the first table row (tr:nth-child(1)) *CSS selector
    const ownerNameInput = page.locator(
    '#_onlineRegistration_WAR_NGePportlet_\\:form\\:tableOwner tbody tr:nth-child(1) td:nth-child(3) input'
    );
    await ownerNameInput.fill(randomName);
    await page.waitForLoadState('networkidle'); //wait for page load

    // Selects the input that is the 5th child (td) of the first table row
    const icNumberInput = page.locator(
    '#_onlineRegistration_WAR_NGePportlet_\\:form\\:tableOwner tbody tr:nth-child(1) td:nth-child(5) input'
    );
    await icNumberInput.fill(randomIcNumber);
    await page.waitForLoadState('networkidle'); //wait for page load

//Nature of Business    
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busiNatureId:busiNatureIdlovBtn"]').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.getByRole('gridcell', { name: 'Ternakan udang air tawar' }).click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.getByRole('button', { name: 'Select' }).click();
    await page.waitForLoadState('networkidle'); //wait for page load

//Bank Information
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:addBnkBtnId"]').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:bankInfoId:0:bankNameId_label"]').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:bankInfoId:0:bankNameId_panel"]').getByText('AGROBANK', { exact: true }).click();
    //await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:bankInfoId:0:bankNameId_panel"]').getByText('AFFIN BANK BERHAD').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:bankInfoId:0:bankAccNoId"]').click();
    await page.waitForTimeout(2000); // Wait 2 seconds
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:bankInfoId:0:bankAccNoId"]').fill('123456789');
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.getByRole('button', { name: 'Next' }).click();
    //await page.waitForTimeout(2000); // Wait 2 seconds

//Supplier Administrator Information (2nd page)
    // Check the checkbox based on the associated text
    // Define both locators first so they are available
    const supplierAdminText = page.getByText('Please click if supplier administrator same as owner in Company Information');
    // 1. Locator for the actual hidden input (used for assertions)
    const checkboxInput = supplierAdminText.locator('input[type="checkbox"]');
    // 2. Locator for the visual DIV (used for clicking)
    const visualCheckboxBox = supplierAdminText.locator('.ui-chkbox-box');
    // Action: Click the visible div
    await visualCheckboxBox.click();
    // Assertion: Verify the underlying input is now checked
    await expect(checkboxInput).toBeChecked(); 
    await page.waitForTimeout(1000); // Wait 1 seconds 
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:salutationId_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:salutationId_panel"]').getByText('Cik', { exact: true }).click();
    await page.getByRole('cell', { name: 'Yes' }).nth(1).click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtPermAdd1"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtPermAdd1"]').fill('Address 1');
    
    // 1. Select the State 'JOHOR'
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:cmbPermState_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:cmbPermState_panel"]').getByText('JOHOR').click();
    await page.waitForTimeout(1000); // Wait 1 seconds    
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:cmbPermDistrict_label"]').click();

    // *** ADDED: Wait for the parent panel to become visible ***
    const districtPanel = page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:cmbPermDistrict_panel"]');
    await expect(districtPanel).toBeVisible(); 

    // Locate the specific option we want to click ('BATU PAHAT')
    const batuPahatOption = districtPanel.getByText('BATU PAHAT');

    // Perform the final click (this should now pass the visibility check)
    await batuPahatOption.click();
    await page.waitForTimeout(1000); // Wait 1 seconds

    // Wait for the City dropdown to become enabled/ready after 'BATU PAHAT' loads its data
    const cityTrigger = page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:cmbPermCity_label"]');
    await expect(cityTrigger).toBeEnabled();
    // 2. Click the City trigger to open the dropdown panel
    await cityTrigger.click();
    
    // *** ADDED: Wait for the parent panel to become visible ***
    const cityPanel = page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:cmbPermCity_panel"]');
    await expect(cityPanel).toBeVisible(); 

    // Locate the specific option we want to click ('AYER HITAM')
    const ayerHitamOption = cityPanel.getByText('AYER HITAM');

    // Perform the final click (this should now pass the visibility check)
    await ayerHitamOption.click();
    await page.waitForTimeout(1000); // Wait 1 seconds

    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtPermPostcodeMy"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtPermPostcodeMy"]').fill('12345');

    await page.getByRole('cell', { name: 'Muslim' }).nth(1).click();

    //Date Picker - Registration Date (today) 
    const today_ = String(new Date().getDate());
    await page.getByRole('button', { name: 'ui-button' }).click();
    await page.locator('.ui-datepicker, .ui-calendar, .ui-datepicker-div').waitFor({ state: 'visible' });
    await page.getByRole('link', { name: today_ }).click();

    const positionInput = page.locator('xpath=//label[text()="Position in Business / Company"]/../../td/input');
    await positionInput.fill('Director');

    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:usrEmail"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:usrEmail"]').fill('aimantesting02@gmail.com');
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:conEmail"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:conEmail"]').fill('aimantesting02@gmail.com');
    
    //Mobile No.*
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtMobileNoId:areaCodeCompId"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtMobileNoId:areaCodeCompId"]').fill('12');
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtMobileNoId:phoneNoCompId"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtMobileNoId:phoneNoCompId"]').fill('34567890');
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:txtMobileNoId:telcoCompId_label"]').click();
    await page.getByRole('listitem', { name: 'Celcom' }).click();

    //Tick checkbox 'Same as above' for Correspondence Address
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:chkAddMode"]').click();
    await page.waitForTimeout(2000); // Wait 2 seconds

    // Click Submit button
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(2000); // Wait 2 seconds

    //I Accept the terms and conditions (click the checkbox)
    await page.getByLabel('Supplier Administrator').getByRole('cell').filter({ hasText: /^$/ }).click();
  
    // Tick on Proceed button
    await page.getByRole('button', { name: 'Proceed' }).click();
    
});
import { test, expect } from '@playwright/test';

test('register Basic Account', async ({ page }) => {
    await page.goto('http://ngepuat.eperolehan.com.my/home');
    await expect(page).toHaveURL('http://ngepuat.eperolehan.com.my/home');

    await page.getByRole('button', { name: '×' }).click();
    await page.locator('[id="_82_languageId"]').selectOption('en_US');
    await page.waitForTimeout(2000); // Wait 2 seconds
    await page.locator('xpath=//*[@id="quicklaunch"]/div/div[2]/div[2]/div').click();
    await page.locator('.ui-radiobutton-box').first().click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('.ui-chkbox-box').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3000); // Wait 3 seconds

//Supplier Registration Screen
    //Account Information
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:suppTypeId_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:suppTypeId_panel"]').getByText('Contractor').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busTypeId_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busTypeId_panel"]').getByText('ROB - Sole-Proprietorship').click();
    await page.waitForTimeout(3000); // Wait 3 seconds
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:regNo"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:regNo"]').fill('00112233-B');
    await page.waitForLoadState('networkidle'); //wait for page load
    //Company Information
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:companyNameId"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:companyNameId"]').fill('testBusinessROBSole_1');
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.getByRole('button', { name: 'ui-button' }).click();
    await page.getByRole('link', { name: '1' }).click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:compAdd1"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:compAdd1"]').fill('Company Address line_1');
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busState_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busState_panel"]').getByText('JOHOR').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busDistrict_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busDistrict_panel"]').getByText('BATU PAHAT').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busCity_label"]').click();
    await page.locator('[id="_onlineRegistration_WAR_NGePportlet_:form:busCity_panel"]').getByText('AYER HITAM').click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.getByRole('button', { name: 'View Map' }).click();
    await page.waitForLoadState('networkidle'); //wait for page load
    await page.getByRole('button').nth(2).click();
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
});

// test('create basic account', async ({ page }) => {
 //   await page.goto('http://ngepuat.eperolehan.com.my/home');
 //   await page.getByRole('menuitem', { name: ' Login' }).click();
 //   await page.getByTitle('New Supplier Registration').click();
 //   await page.locator('.ui-radiobutton-box').first().click();
 //   await page.getByRole('button', { name: 'Next' }).click();
 //   await page.locator('.ui-chkbox-box').click();
 //   await page.getByRole('button', { name: 'Next' }).click();
//});
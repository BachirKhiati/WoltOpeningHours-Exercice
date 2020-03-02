describe('Example', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should show card view', async () => {
        await expect(element(by.id('card-view'))).toBeVisible();
    });

    it('Should show Opening Hours in english', async () => {
        await element(by.id('button')).tap();
        await expect(element(by.text('Monday'))).toBeVisible();
        await expect(element(by.text('FI'))).toBeVisible();
        // await delay(500);
        await element(by.id('button')).tap();
    });

    it('Should show Opening Hours in Finnish', async () => {
        await element(by.id('button')).tap();
        await expect(element(by.text('Monday'))).toBeVisible();
        await delay(500);
        await element(by.id('lang-button')).tap();
        await expect(element(by.text('Maanantai'))).toBeVisible();
        await expect(element(by.text('EN'))).toBeVisible();
        await delay(500);
        await expect(element(by.text('Aukioloajat'))).toBeVisible();
        await element(by.id('button')).tap();
        await delay(500);
    });

    it('Should switch back to English', async () => {
        await expect(element(by.text('Opening Hours'))).toBeVisible();
        await element(by.id('lang-button')).tap();
        await delay(500);
        await expect(element(by.text('Aukioloajat'))).toBeVisible();
        await element(by.id('lang-button')).tap();
        await delay(500);
        await expect(element(by.text('Opening Hours'))).toBeVisible();
    });
});

async function delay(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// import 'expect-puppeteer';

const baseUrl = 'http://localhost3000';
/* global page */
describe('app', () => {
  // beforeEach(async () => {
  //   await page.goto();
  //   await expect(page.url()).toBe('/');
});
it('should show the home page message', async () => {
  await expect(page).toMatch('Home');
  await page.goto(`${baseUrl}/`);
  expect(page.url()).toBe(`${baseUrl}/`);
  await expect(page).toClick('[data-test-id="header-about-link"]');
  // await page.$('[data-test-id=header-about.link"]').click();
  await page.waitForNavigation();
  expect(page.url()).toBe(`${baseUrl}/about`);
});

// afterAll(async () => {
//   await page.close();
//   await browser.close();
// });

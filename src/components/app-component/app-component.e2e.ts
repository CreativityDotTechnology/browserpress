import { newE2EPage } from '@stencil/core/testing';

describe('app-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<app-component></app-component>');
    const element = await page.find('app-component');
    expect(element).toHaveClass('hydrated');
  });

  it('rendersMenuByDefault', async () => {
    const page = await newE2EPage();

    await page.setContent('<app-component></app-component>');
    const menu = await page.find('menu-component');
    expect(menu).not.toBeNull();
  });

  it('rendersDashboardByDefault', async () => {
    const page = await newE2EPage();

    await page.setContent('<app-component></app-component>');
    const dashboard = await page.find('dashboard-component');
    expect(dashboard).not.toBeNull();
  });

  it('changesRouteCorrectly', async () => {
    const page = await newE2EPage();

    await page.setContent('<app-component></app-component>');
    const menu = await page.find('menu-component');
    menu.triggerEvent("routeChange", {detail: "designer"});
    await page.waitForChanges();
    const designer = await page.find('designer-component');
    expect(designer).not.toBeNull();
  });
});

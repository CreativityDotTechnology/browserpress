import { newE2EPage } from '@stencil/core/testing';

describe('dashboard-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<dashboard-component></dashboard-component>');
    const element = await page.find('dashboard-component');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<dashboard-component></dashboard-component>');
    const element = await page.find('div');
    expect(element.textContent).toEqual(`Dashboard`);
  });
});

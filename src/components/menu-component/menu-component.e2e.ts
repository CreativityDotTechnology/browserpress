import { newE2EPage } from '@stencil/core/testing';

describe('menu-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<menu-component></menu-component>');
    const element = await page.find('menu-component');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<menu-component></menu-component>');
    const element = await page.find('menu-component >>> div');
    expect(element.textContent).toEqual(``);
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('designer-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<designer-component></designer-component>');
    const element = await page.find('designer-component');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<designer-component></designer-component>');
    const element = await page.find('designer-component >>> div');
    expect(element.textContent).toEqual(``);
  });
});

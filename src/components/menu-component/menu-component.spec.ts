import { newSpecPage } from '@stencil/core/testing';
import { MenuComponent } from './menu-component';

describe('menu-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MenuComponent],
      html: '<menu-component></menu-component>',
    });
    expect(root).toEqualHtml(`
      <menu-component>
        <mock:shadow-root>
          <div>
           
          </div>
        </mock:shadow-root>
      </menu-component>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [MenuComponent],
      html: `<menu-component></menu-component>`,
    });
    expect(root).toEqualHtml(`
      <menu-component>
        <mock:shadow-root>
          <div>
            
          </div>
        </mock:shadow-root>
      </menu-component>
    `);
  });
});

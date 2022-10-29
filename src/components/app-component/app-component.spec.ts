import { newSpecPage } from '@stencil/core/testing';
import { AppComponent } from './app-component';

describe('app-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [AppComponent],
      html: '<app-component></app-component>',
    });
    expect(root).toEqualHtml(`
      <app-component>
        <mock:shadow-root>
          <div>
            
          </div>
        </mock:shadow-root>
      </app-component>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [AppComponent],
      html: `<app-component></app-component>`,
    });
    expect(root).toEqualHtml(`
      <app-component>
        <mock:shadow-root>
          <div>
            
          </div>
        </mock:shadow-root>
      </app-component>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { DesignerComponent } from './designer-component';

describe('designer-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [DesignerComponent],
      html: '<designer-component></designer-component>',
    });
    expect(root).toEqualHtml(`
      <designer-component>
        <mock:shadow-root>
          <div>
           
          </div>
        </mock:shadow-root>
      </designer-component>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [DesignerComponent],
      html: `<designer-component></designer-component>`,
    });
    expect(root).toEqualHtml(`
      <designer-component>
        <mock:shadow-root>
          <div>
            
          </div>
        </mock:shadow-root>
      </designer-component>
    `);
  });
});

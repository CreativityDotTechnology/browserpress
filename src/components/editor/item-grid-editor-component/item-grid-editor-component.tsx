import { Component, h, Host, Prop} from '@stencil/core';
import {PageElement} from '../../../interfaces';

@Component({
  tag: 'item-grid-editor-component',
  styleUrl: 'item-grid-editor-component.css',
  shadow: false,
  scoped: true
})
export class ItemGridEditorComponent {
  @Prop() pageId: string;
  @Prop() element: PageElement;

  render() {
    return <Host>
        <div>Item grid editor</div>
    </Host>
  }
}

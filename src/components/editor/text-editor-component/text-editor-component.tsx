import { Component, h, Host, Prop, Event, Watch } from '@stencil/core';
import Quill from 'quill';
import { PageElement } from '../../../interfaces';

@Component({
  tag: 'text-editor-component',
  styleUrl: 'text-editor-component.css',
  shadow: false,
  scoped: true
})
export class TextEditorComponent {

  @Prop() pageId: string;
  @Prop() element: PageElement;
  @Event() updateElementHtml;
  private quill;
  
  componentDidLoad() {
    this.quill = new Quill("#quill-container", {
      theme: "snow",
    });

    const delta = this.quill.clipboard.convert(this.element.textHTML);
    this.quill.setContents(delta, 'silent')

    this.quill.on("text-change", (_delta, _source) => {
      const html = this.quill.root.innerHTML;
      this.updateElementHtml.emit({
        pageId: this.pageId,
        elementId: this.element.id,
        newValue: html
      })
    });
  }

  @Watch("element")
  elementWatcher(newValue, oldValue) {
    if(oldValue.textHTML !== newValue.textHTML) {
      const delta = this.quill.clipboard.convert(newValue.textHTML);
      this.quill.retain(this.quill.getSelection().index).setContents(delta, 'silent')
    }
  }

  render() {
    return <Host>
        <div id="quill-container"></div>
    </Host>
  }
}

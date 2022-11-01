import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'website-preview-component',
  styleUrl: 'website-preview-component.css',
  shadow: false,
  scoped: true
})
export class WebsitePreviewComponent {
  @Prop() mobileView: boolean;
  @Prop() html: string;

  render() {
    return <iframe class={this.mobileView ? "mobile" : ""} srcDoc={this.html}></iframe>
  }


}
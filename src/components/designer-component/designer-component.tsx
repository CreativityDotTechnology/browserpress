import { Component, h, Prop, State, Watch } from '@stencil/core';
import { StyleConfigSettings, Website } from '../../interfaces';
import {initialSettings} from '../../constants/configSettings';
import { renderHTMLWrapper } from '../../services/renderHTMLWrapper';
import { renderDummyContent } from '../../services/renderDummyContent';
import { renderDummyMenuContent } from '../../services/renderDummyMenuContent';

@Component({
  tag: 'designer-component',
  styleUrl: 'designer-component.css',
  shadow: false,
  scoped: true
})
export class DesignerComponent {

  @State() style: StyleConfigSettings = initialSettings;
  @State() mobileView: boolean = false;

  @Prop() website: Website;

  @Watch('website')
  onSelectedWebsiteChanged(newValue: Website, oldValue: Website) {
    console.log("Website changed")
    if(newValue.id !== oldValue.id) {
        if(newValue.styleConfig) {
          this.style = newValue.styleConfig
        }
        else {
          this.style = initialSettings;
        }
    }
  }

  render() {

    // Generates some dummy content
    const dummyContent = renderDummyContent();
    // Generates a dummy menu
    const dummyMenu = renderDummyMenuContent();
    // Creates the wrapper html for the preview page, populating it with the content
    const iframeSrcDoc = renderHTMLWrapper(this.style, dummyContent, dummyMenu);
    
    return <div>
        <h2>Designer</h2>
        <website-controls-component showPreviewSizeToggle={true}></website-controls-component>
        <div class="website-design-content">
          <website-design-menu-component styleSettings={this.style} updateStyleSettings={this.handleStyleUpdate.bind(this)}></website-design-menu-component>
          <website-preview-component html={iframeSrcDoc}></website-preview-component>
        </div>
    </div>;
  }

  handleStyleUpdate(newStyle: StyleConfigSettings) {
    this.style = newStyle;
  }

}

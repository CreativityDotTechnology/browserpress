import { Component, h, Prop, State, Watch } from '@stencil/core';
import { StateUpdateType, StyleConfigSettings, Website } from '../../interfaces';
import {initialSettings} from '../../constants/configSettings';
import { renderHTMLWrapper } from '../../services/renderHTMLWrapper';
import { renderDummyContent } from '../../services/renderDummyContent';
import { renderDummyMenuContent } from '../../services/renderDummyMenuContent';
import isEqual from 'lodash.isequal';
import {dbUpdate} from '../../database/dbUpdate';

@Component({
  tag: 'designer-component',
  styleUrl: 'designer-component.css',
  shadow: false,
  scoped: true
})
export class DesignerComponent {

  @Prop() website: Website;
  @State() initial = initialSettings;
  @State() style: StyleConfigSettings = initialSettings;
  @State() mobileView: boolean = false;

  @Watch('website')
  onSelectedWebsiteChanged(newValue: Website, _oldValue: Website) {
    if(newValue.styleConfig) {
      this.initial = newValue.styleConfig;
      this.style = newValue.styleConfig;
    }
    else {
      this.initial = initialSettings;
      this.style = initialSettings;
    }
  }

  componentWillLoad() {
    if(this.website && this.website.styleConfig) {
      this.initial = this.website.styleConfig;
      this.style = this.website.styleConfig;
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
        <website-controls-component 
          showPreviewSizeToggle={true} 
          saveChangesHandler={this.handleSaveChanges.bind(this)}
          undoChangesHandler={this.handleUndoChanges.bind(this)}
          togglePreviewSizeClick={this.previewToggleHandler.bind(this)}
          disabled={!this.hasChanged()}>
        </website-controls-component>
        <div class="website-design-content">
          <website-design-menu-component styleSettings={this.style} updateStyleSettings={this.handleStyleUpdate.bind(this)}></website-design-menu-component>
          <website-preview-component html={iframeSrcDoc} mobileView={this.mobileView}></website-preview-component>
        </div>
    </div>;
  }

  handleSaveChanges() {
    this.handleSaveChangesClick();
  }

  handleUndoChanges() {
    this.style = this.initial;
  }

  previewToggleHandler(mobileView: boolean) {
    this.mobileView = mobileView;
  }

  handleStyleUpdate(newStyle: StyleConfigSettings) {
    this.style = newStyle;
  }

  hasChanged() {
      return !isEqual(this.initial, this.style);
  }

  handleSaveChangesClick() {
    dbUpdate({
          type: StateUpdateType.SAVE_STYLE,
          payload: {
              id: this.website.id,
              styleConfig: this.style
          }
      });
  }

}

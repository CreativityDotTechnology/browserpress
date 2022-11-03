import { Component, h, Prop, State, Watch } from '@stencil/core';
import { StateUpdateType, Website, Page } from '../../interfaces';
import isEqual from 'lodash.isequal';
import {dbUpdate} from '../../database/dbUpdate';

@Component({
  tag: 'editor-component',
  styleUrl: 'editor-component.css',
  shadow: false,
  scoped: true
})
export class EditorComponent {

  @Prop() website: Website;
  @State() initialPages: Page[] = [];
  @State() currentPages: Page[] = [];
  @State() mobileView: boolean = false;
  @State() contentView: string = "preview";

  @Watch('website')
  onSelectedWebsiteChanged(newValue: Website, _oldValue: Website) {
    this.initialPages = newValue.pages;
    this.currentPages = newValue.pages;
  }

  componentWillLoad() {
    this.initialPages = this.website.pages;
    this.currentPages = this.website.pages;
  }

  render() {
    
    return <div>
        <h2>Manage pages</h2>
        <website-controls-component 
          showPreviewSizeToggle={true} 
          saveChangesHandler={this.handleSaveChanges.bind(this)}
          undoChangesHandler={this.handleUndoChanges.bind(this)}
          togglePreviewSizeClick={this.previewToggleHandler.bind(this)}
          disabled={!this.hasChanged()}>
        </website-controls-component>
        <div class="website-design-content">
          <website-content-management-component pages={this.currentPages} updatePages={this.updatePages.bind(this)}></website-content-management-component>
          {
            this.renderContentView()
          }
        </div>
    </div>;
  }

  updatePages(newPages: Page[]) {
    this.currentPages = newPages;
  }


  renderContentView() {
    switch(this.contentView) {
      case "preview":
        return <website-preview-component html={"<div>Hello world!</div>"} mobileView={this.mobileView}></website-preview-component>
      default:
        return <div>Something went wrong...</div>
    }
  }

  handleSaveChanges() {
    this.handleSaveChangesClick();
  }

  handleUndoChanges() {
    this.currentPages = this.initialPages;
  }

  previewToggleHandler(mobileView: boolean) {
    this.mobileView = mobileView;
  }

  hasChanged() {
      return !isEqual(this.initialPages, this.currentPages);
  }

  handleSaveChangesClick() {
    dbUpdate({
          type: StateUpdateType.SAVE_PAGES,
          payload: {
              id: this.website.id,
              pages: this.currentPages
          }
      });
  }

}

import { Component, h, Prop, State, Watch, Listen } from '@stencil/core';
import { StateUpdateType, Website, Page, PageElementType } from '../../../interfaces';
import isEqual from 'lodash.isequal';
import {dbUpdate} from '../../../database/dbUpdate';
import {initialSettings} from '../../../constants/configSettings';
import {renderHTMLWrapper} from '../../../services/renderHTMLWrapper';
import {renderDummyContent} from '../../../services/renderDummyContent';
import {renderPreviewMenu} from '../../../services/renderPreviewMenu';
import {renderItemGrid} from '../../../services/renderItemGrid'
import { renderBannerContent } from '../../../services/renderBannerContent';

@Component({
  tag: 'editor-component',
  styleUrl: 'editor-component.css',
  shadow: false,
  scoped: true
})
export class EditorComponent {

  @Prop() website: Website;
  @Prop() pages: Page[];
  @State() initialPages: Page[] = [];
  @State() currentPages: Page[] = [];
  @State() mobileView: boolean = false;
  @State() contentView = {
    view: "preview",
    pageId: "",
    elementId: "",
    expandedPage: ""
  };

  @Listen('updatePages') 
  // Function for updating the entire array of pages
  updatePagesListener(newPages: CustomEvent<Page[]>) {
    this.currentPages = newPages.detail;
  }

  @Listen('updateElementHtml')
  updateElementHtmlListener(newData) {
    const {pageId, elementId, newValue} = newData.detail;
    console.log(newValue)
    const pageToUpdate = this.currentPages.find(page => page.id === pageId);
    if(pageToUpdate) {
      const elementToUpdate = pageToUpdate.elements.find(element => element.id === elementId);
      if(elementToUpdate) {
        const newElement = {...elementToUpdate, textHTML: newValue}
        const newElements = pageToUpdate.elements.map(el => {
          if(el.id === elementId) {
            return newElement
          }
          else {
            return el
          }
        })
        const newPage = {...pageToUpdate, elements: newElements};
        const newPages = this.currentPages.map(page => {
            if(page.id === pageId) {
                return newPage
            }
            else {
                return page;
            }
        });
        this.currentPages = newPages;
      }
    }
  }

  @Listen('updateContentView') 
  // Function for updating the entire array of pages
  updateContentViewListener(viewData) {
    this.contentView = viewData.detail;
  }

  @Listen('updatePage') 
  // Function for updating a specific page
  updatePageListener(newPageData) {
    const {pageId, newPage} = newPageData.detail;
    const pageIndex = this.currentPages.findIndex(page => page.id === pageId);
    if (pageIndex > -1) {
        const newPages = this.currentPages.map(page => {
            if(page.id === pageId) {
                return newPage
            }
            else {
                return page;
            }
        });
        this.currentPages = newPages;
    }
    this.contentView = {
      view: "preview",
      pageId: "",
      elementId: "",
      expandedPage: pageId
    };
  }

  @Listen('deletePage')
   // Function for updating a specific page
  deletePageListener(pageId: CustomEvent<string>) {
    this.currentPages = this.currentPages.filter(page => page.id !== pageId.detail);
  }

  @Watch('pages')
  onPagesChanged(newValue: Page[], _oldValue: Page[]) {
    this.initialPages = newValue;
    this.currentPages = newValue;
  }

  componentDidLoad() {
    this.onPagesChanged(this.pages, null);
  }

  render() {
    return <div>
        <h2>Manage pages</h2>
        <website-controls-component 
          showPreviewSizeToggle={this.contentView.view === "preview"} 
          saveChangesHandler={this.handleSaveChanges.bind(this)}
          undoChangesHandler={this.handleUndoChanges.bind(this)}
          togglePreviewSizeClick={this.previewToggleHandler.bind(this)}
          disabled={!this.hasChanged()}>
        </website-controls-component>
        <div class="website-design-content">
          <sortable-page-list  
            contentView={this.contentView}
            pages={this.currentPages}>
          </sortable-page-list>
          {
            this.renderContentView.bind(this)(this.contentView?.expandedPage)
          }
        </div>
    </div>;
  }

  renderContentView(previewPageId: string) {
    switch(this.contentView.view) {
      case "preview":
        return <website-preview-component html={this.renderContent.bind(this)(previewPageId)} mobileView={this.mobileView}></website-preview-component>
      case "text-editor":
        return <text-editor-component pageId={this.contentView.pageId} element={this.getElement(this.contentView.pageId, this.contentView.elementId)}></text-editor-component>
      default:
        return <div>Something went wrong...</div>
    }
  }

  getElement(pageId: string, elementId: string) {
    return this.currentPages.find(page => page.id === pageId)?.elements?.find(element => element.id === elementId);
  }

  renderContent(previewPageId: string) {
    let pageContent = "";
    let page = this.currentPages.find(page => page.id === previewPageId) 
    ? this.currentPages.find(page => page.id === previewPageId)
    : null
    if(page) {
        page.elements.forEach(element => {
          if(element.type === PageElementType.BANNER) {
              pageContent += renderBannerContent(element);
          }
          else if (element.type === PageElementType.TEXT) {
              if(element.textHTML) {
                  pageContent += `<div class="page-content">
                      ${element.textHTML}
                  </div>`;
              }
              else {
                  pageContent += renderDummyContent()
              }
              
          }
          else if (element.type === PageElementType.ITEM_GRID) {
              pageContent += renderItemGrid(this.website, element);
          }
      })
    }
    
    const html = renderHTMLWrapper(this.website?.styleConfig || initialSettings, pageContent, renderPreviewMenu(this.currentPages))
    return html;
}

  handleSaveChanges() {
    this.handleSaveChangesClick();
  }

  handleUndoChanges() {
    if(window.confirm("You are about to undo all changes that you have made. Are you sure you want to proceed?")) {
      this.currentPages = this.initialPages;
    }
  }

  previewToggleHandler(mobileView: boolean) {
    this.mobileView = mobileView;
  }

  hasChanged() {
      return !isEqual(this.initialPages, this.currentPages);
  }

  async handleSaveChangesClick() {
    try {
      await dbUpdate({
          type: StateUpdateType.SAVE_PAGES,
          payload: {
              id: this.website.id,
              pages: this.currentPages
          }
      });
    } catch (e) {
      console.log(e)
    }
    this.initialPages = this.currentPages;
  }

}

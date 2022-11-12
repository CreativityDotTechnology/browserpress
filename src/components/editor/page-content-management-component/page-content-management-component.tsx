import { Component, h, Prop, State, Event, EventEmitter, Listen, Watch } from '@stencil/core';
import { Page, PageElement, PageElementType } from '../../../interfaces';
import Chance from 'chance';
import Sortable from 'sortablejs';

@Component({
  tag: 'page-content-management-component',
  styleUrl: 'page-content-management-component.css',
  shadow: false,
  scoped: true
})
export class PageContentManagementComponent {
  chance = new Chance();
  @Prop() page: Page;
  @Prop() position: number;
  @Prop() contentView;
  @Event() deletePage;
  @Event() showPagePreview: EventEmitter<string>;
  @Event() updatePage: EventEmitter<{pageId: string, newPage: Page}>
  @State() addingContent: boolean = false;
  @State() selectedAddContent: PageElementType | null = null;
  @State() expandedElement: string = "";
  @Event() updateContentView;
  private sortable;

  @Listen("expandElement")
  expandElementHandler(elementData) {
    this.expandedElement = elementData.detail;
    this.updateContentView.emit({view: "preview", pageId: "", elementId: "", expandedPage: this.page.id});
  }
  
  @Watch("contentView")
  contentViewChangeHandler(newValue, _oldValue) {
    if(newValue.expandedPage !== this.page.id ) {
      this.expandedElement = "";
    }
  }
  

  @Listen("updateElementInPage")
  updatedElementInPageHandler(newData) {
    const {pageId, elementId, newElement} = newData.detail;
    // Since we have multiple pages with elements, need to check this is the right page
    if(pageId === this.page.id) {
      const newElements = this.page.elements.map((oldElement) => {
        if(oldElement.id === elementId) {
          return newElement;
        }
        else return oldElement;
      })
      const newPage = {...this.page, elements: newElements};
      this.updatePage.emit({pageId: this.page.id, newPage: newPage});
    }
  }

  componentDidLoad() {
    this.sortable = Sortable.create(document.getElementById("sortable-elements-list"), {
      animation: 150,
      dragoverBubble: false,
      group: 'elements',
      invertSwap: true,
      invertedSwapThreshold: 0.5,
      onUpdate: this.updateHandler.bind(this)
      
    });
  }

  componentDidUpdate() {
    if(this.pageIsExpanded()) {
      if(this.sortable) {
        this.sortable.destroy();
      }
      this.sortable = Sortable.create(document.getElementById("sortable-elements-list"), {
        animation: 150,
        dragoverBubble: false,
        invertSwap: true,
        invertedSwapThreshold: 0.5,
        group: 'elements',
        onUpdate: this.updateHandler.bind(this)
      });
    }
  }

  updateHandler(event) {
    event.preventDefault();
      try {
        // Create an array from the child elements of the new list
        const newElements = Array.from(event.to.children)
        // Get id from each div
        .map((div: HTMLDivElement) => div.id)
        // map the new array of ids to the page data from the original pages array
        .map(id => {
            const elementData = this.page.elements.find(element => element.id === id);
            return elementData;
        });
        const newPage = {...this.page, elements: newElements}
        
        this.updatePage.emit({pageId: this.page.id, newPage: newPage});
    } catch (e) {
        console.log("Error reordering the list");
    }
  } 

  render() {
    return <div>
        <div class="page-tools">
          <div class={this.pageIsExpanded() ? "page-name previewing" : "page-name"}>
            {this.page.name}
          </div>
          <div class="page-details">
          <div class="url-slug">{this.position === 0 ? "/" : ("/" + this.convertToSlug(this.page.name))}</div>
          <div class="page-actions">
              <div onClick={() => this.handleToggleExpandClick.bind(this)(this.pageIsExpanded() ? false : true )} class="expand-container">
                {
                  this.pageIsExpanded()
                  ? <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                      <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                    </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                      <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                }
              </div>
          </div>
          </div>
        </div>
        {
          this.pageIsExpanded()
          ? <div class="page-content">
                <label draggable={false} htmlFor="display-name">Page name </label>
                <input draggable={false} id="display-name" type="text" value={this.page.name} onInput={this.handlePageNameChange.bind(this)}></input>
                <div draggable={false}>
                  <button class="cancel"  data-id={this.page.id} onClick={this.handleDeleteClick.bind(this)}>
                      Delete
                  </button>
                </div>
                <label draggable={false} htmlFor="content-elements">Elements</label>
                <div id="sortable-elements-list">
                  {
                    this.page.elements.map((element) => {
                      return <element-controls-component 
                                key={element.id} 
                                id={element.id} 
                                contentView={this.contentView}
                                pageId={this.page.id}
                                element={element}
                                expandedElement={this.expandedElement}
                                >
                      </element-controls-component>
                    })
                  }
                </div>
                {
                  this.addingContent
                  ? <div>
                      <div>
                        <select onInput={this.selectAddContent.bind(this)}>
                          <option value={null} selected={this.selectedAddContent === null}>Choose content type</option>
                          <option value={PageElementType.BANNER} selected={this.selectedAddContent === PageElementType.BANNER}>Banner</option>
                          <option value={PageElementType.TEXT} selected={this.selectedAddContent === PageElementType.TEXT}>Text block</option>
                          <option value={PageElementType.ITEM_GRID} selected={this.selectedAddContent === PageElementType.ITEM_GRID}>Items grid</option>
                          <option value={PageElementType.ARTICLES} selected={this.selectedAddContent === PageElementType.ARTICLES}>Blog</option>
                        </select>
                      </div>
                      <button disabled={!this.selectedAddContent} onClick={this.handleConfirmAddContent.bind(this)}>Add content</button>
                      <button onClick={this.handleCancelAddContent.bind(this)} class="cancel">Cancel</button>
                  </div>
                  : <button onClick={(event) => this.handleAddContent.bind(this)(event)}>Add content</button>
                }
          </div>
          : null
        }
        
    </div>
  }

  pageIsExpanded() {
    return this.contentView?.expandedPage === this.page.id;
  }

  handleDeleteClick(event) {
    event.preventDefault();
    if(window.confirm("You are about to permanently delete the page. Are you sure you want to continue?")) {
      this.deletePage.emit(this.page.id);
    }
  }

  handlePageNameChange(event) {
    event.preventDefault();
    const newPage = {...this.page, name: event.target.value};
    this.updatePage.emit({pageId: this.page.id, newPage: newPage});
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
               .replace(/[^\w ]+/g, '')
               .replace(/ +/g, '-');
  }

  selectAddContent(event) {
    event.preventDefault();
    this.selectedAddContent = event.target.value;
  }

  handleAddContent(event) {
    event.preventDefault();
    this.addingContent = true;
  }

  handleConfirmAddContent(event) {
    event.preventDefault();
    this.addNewContentToPage(this.selectedAddContent);
    this.selectedAddContent = null;
    this.addingContent = false;
  }

  handleCancelAddContent(event) {
    event.preventDefault();
    this.selectedAddContent = null;
    this.addingContent = false;
  }

  handleToggleExpandClick(expand: boolean) {
    if(expand) {
      this.updateContentView.emit({view: "preview", pageId: "", elementId: "", expandedPage: this.page.id});
    }
    else {
      this.updateContentView.emit({view: "preview", pageId: "", elementId: "", expandedPage: ""});
    }
  }

  addNewContentToPage(type: PageElementType) {
      const chance = new Chance();
      let newElement: PageElement;
      switch(type) {
        case PageElementType.BANNER:
          newElement = {
              id: chance.guid(),
              type: type,
              bannerBackgroundImage: null,
              bannerMobileBackgroundImage: null,
              bannerTextFontColor: "#000000",
              bannerTextBackgroundColor: "#FFFFFF",
              bannerTextBackgroundOpacity: "100",
              bannerText: "",
              bannerTextWidth: "60",
              bannerTextAlign: "center",
              bannerTextPosition: "center",
              bannerHeight: "20"
          }
          break;
        case PageElementType.TEXT:
          newElement = {
            id: chance.guid(),
            type: type,
            textHTML: ""
          }
          break;
        case PageElementType.ITEM_GRID:
          newElement = {
            id: chance.guid(),
            type: type,
            itemGridTitle: "",
            itemGridCategories: [],
            itemGridItems: []
          }
          break;
        case PageElementType.ARTICLES:
          newElement = {
            id: chance.guid(),
            type: type,
            articles: []
          }
          break;
        default:
          throw new Error("Invalid type!");
      }       
      const newElements = this.page.elements.concat([newElement]);
      const newPage = {...this.page, elements: newElements};
      this.updatePage.emit({pageId: this.page.id, newPage: newPage});
  }

}

import { Component, h, Prop, State } from '@stencil/core';
import { Page, PageElement } from '../../interfaces';
import Sortable from 'sortablejs';
import Chance from 'chance';

@Component({
  tag: 'page-content-management-component',
  styleUrl: 'page-content-management-component.css',
  shadow: false,
  scoped: true
})
export class PageContentManagementComponent {
  chance = new Chance();
  sortableList: HTMLElement;
  sortable;
  @Prop() page: Page;
  @Prop() updatePage: (newElements: PageElement[]) => void;
  @Prop() position: number;
  @State() expanded: boolean = false;
  
  componentDidRender() {
    if(this.sortable?.current) {
      this.sortable.current.destroy();
    }
    this.sortable = new Sortable(this.sortableList, {
        animation: 150,
        ghostClass: 'grey-background-class',
        dragClass: "sortable-drag",
        chosenClass: "sortable-chosen",
        onUpdate: (e) => {
            try {
                // Create an array from the child elements of the new list
                const newElements = Array.from(e.to.children)
                // Get id from each div
                .map((div: HTMLDivElement) => div.id)
                // map the new array of ids to the page data from the original pages array
                .map(id => {
                    const elementData = this.page.elements.find(element => element.id === id);
                    return elementData;
                });
                this.updatePage(newElements);
            } catch (e) {
                console.log("Error reordering the list");
            }
        }
    });
  }

  render() {
    return <div>
        <label draggable={false} htmlFor="display-name">Page name <span onClick={this.handleToggleExpandClick.bind(this)} class="expand-container">
            {
              this.expanded
              ? <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                  <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                </svg>
            }
          </span></label>
        <input draggable={false} id="display-name" type="text" value={this.page.name} onChange={this.handlePageNameChange.bind(this)}></input>
        {
          this.expanded
          ? <div>
                <div draggable={false}>
                <button data-id={this.page.id} onClick={this.handlePreviewClick.bind(this)}>
                    View
                </button>
                <button class="cancel"  data-id={this.page.id} onClick={this.handleDeleteClick.bind(this)}>
                    Delete
                </button>
            </div>
            <label draggable={false} htmlFor="url-slug">URL slug</label>
            <input disabled draggable={false} id="url-slug" type="text" value={this.position === 0 ? "/" : ("/" + this.convertToSlug(this.page.name))}></input>
            <label draggable={false} htmlFor="content-elements">Elements</label>
            <ul>
                
            </ul>
            <button onClick={this.handleAddContent.bind(this)}>+</button>
          </div>
          : null
        }
        
    </div>
  }

  handleDeleteClick() {
    console.log("delete clicked");
  }

  handlePreviewClick() {
    console.log("preview clicked");
  }

  handlePageNameChange() {
    console.log("Page name changed");
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
               .replace(/[^\w ]+/g, '')
               .replace(/ +/g, '-');
  }

  handleAddContent() {
    console.log("Clicked handle add content")
  }

  handleToggleExpandClick() {
    this.expanded = !this.expanded
  }

}

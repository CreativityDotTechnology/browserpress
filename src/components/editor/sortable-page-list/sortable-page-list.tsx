import { Component, h, Prop, Event, Watch, EventEmitter } from '@stencil/core';
import { Page } from '../../../interfaces';
import Sortable from 'sortablejs';
import Chance from 'chance';

@Component({
  tag: 'sortable-page-list',
  styleUrl: 'sortable-page-list.css',
  shadow: false,
  scoped: true
})
export class SortablePageList {
  chance = new Chance();
  @Prop() pages: Page[];
  @Prop() contentView;
  @Event() updatePages;
  @Event() updatePage: EventEmitter<{pageId: string, newPage: Page}>
  private sortable;

  componentDidLoad() {
    this.sortable = Sortable.create(document.getElementById("sortable-pages-list"), {
      animation: 150,
      group: "pages",
      invertedSwapThreshold: 0.5,
      invertSwap: true,
      onUpdate: (e) => {
          try {
              e.preventDefault();
              // Create an array from the child elements of the new list
              const newPages = Array.from(e.to.children)
              // Get id from each div
              .map((div: HTMLDivElement) => div.id)
              // map the new array of ids to the page data from the original pages array
              .map(id => {
                  const pageData = this.pages.find(page => page.id === id);
                  return pageData;
              });
              this.updatePages.emit(newPages);
          } catch (e) {
              console.log("Error reordering the list");
          }
      }
    });
  }
  
  @Watch("pages")
  pagesChangeHandler() {
      if(this.sortable) {
        this.sortable.destroy();
      }
      this.sortable = Sortable.create(document.getElementById("sortable-pages-list"), {
        animation: 150,
        group: 'pages',
        invertedSwapThreshold: 0.5,
        invertSwap: true,
        onEnd: (e) => {
            try {
                // Create an array from the child elements of the new list
                const newPages = Array.from(e.to.children)
                // Get id from each div
                .map((div: HTMLElement) => div.id)
                // map the new array of ids to the page data from the original pages array
                .map(id => {
                    const pageData = this.pages.find(page => page.id === id);
                    return pageData;
                });
                this.updatePages.emit(newPages);
            } catch (e) {
                console.log("Error reordering the list");
            }
        }
      });
  }

  render() {
    return <div>
        <h4>Website pages</h4>
        <div id="sortable-pages-list">
          {
            this.pages.map((page, index) => {
              return <page-content-management-component
                  key={page.id} 
                  id={page.id}
                  page={page}
                  position={index}
                  contentView={this.contentView}
              >
              </page-content-management-component>
            })
          }
        </div>
        <button onClick={(event) => this.handleAddPage.bind(this)(event)}> Add new page</button>
    </div>;
  }

  handleAddPage(event) {
    event.preventDefault();
    const newPage: Page = {
      id: this.chance.guid(),
      name: "New page",
      elements: []
    }
    const newPages= this.pages.concat([newPage]);

    this.updatePages.emit(newPages);
  }



}

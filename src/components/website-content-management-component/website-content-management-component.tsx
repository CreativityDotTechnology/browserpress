import { Component, h, Prop } from '@stencil/core';
import { Page } from '../../interfaces';
import Sortable from 'sortablejs';
import Chance from 'chance';

@Component({
  tag: 'website-content-management-component',
  styleUrl: 'website-content-management-component.css',
  shadow: false,
  scoped: true
})
export class WebsiteContentManagementComponent {
  chance = new Chance();
  sortableList: HTMLElement;
  sortable;
  @Prop() pages: Page[];
  @Prop() updatePages: (newPages: Page[]) => void;
  
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
                const newPages = Array.from(e.to.children)
                // Get id from each div
                .map((div: HTMLDivElement) => div.id)
                // map the new array of ids to the page data from the original pages array
                .map(id => {
                    const pageData = this.pages.find(page => page.id === id);
                    return pageData;
                });
                this.updatePages(newPages);
            } catch (e) {
                console.log("Error reordering the list");
            }
        }
    });
  }

  render() {
    if(this.pages) {
      return <div>
          <h4>Website pages</h4>
          <div ref={el => this.sortableList = el}>
            {this.pages.map(page => {
              return <page-content-management-component
                  key={page.id} 
                  id={page.id}
                  page={page}
                  updatePage={()=> console.log("Update")}
              >
              </page-content-management-component>
            })}
          </div>
          <button onClick={this.handleAddPage.bind(this)}> Add new page</button>
      </div>;
    }
    else {
      return <div>Loading...</div>
    }
  }

  handleAddPage() {
    const newPage: Page = {
      id: this.chance.guid(),
      name: "New page",
      elements: []
    }
    const newPages= this.pages.concat([newPage]);

    this.updatePages(newPages);
  }

}

import { Component, h, Prop, State, Host } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { liveQuery } from "dexie";
import { db } from '../../database/db';
import { Website } from '../../interfaces';

@Component({
  tag: 'menu-component',
  styleUrl: 'menu-component.css',
  shadow: false,
  scoped: true
})
export class MenuComponent {

  @Prop() selectedWebsite: string;

  @Event() routeChange: EventEmitter<string>;
  @Event() websiteSelectChange: EventEmitter<string>;

  @State() hidden: boolean = false;
  

  /* Used to query websites from database */
  @State() websites: Website[] = [];
  
  websitesObservable = liveQuery (
    () => db.websites.toArray()
  );
  
  // Subscribe
  subscription = this.websitesObservable.subscribe({
    next: result => this.websites = result,
    error: error => console.error(error)
  });

  disconnectedCallback() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return <Host class={this.hidden ? "menu hidden" : "menu"}>
        <div class="menu-icon-container">
          <svg onClick={this.handleMenuIconClick.bind(this)} height="45px" viewBox="0 0 32 32" class="menu-icon"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
        </div>
        <div onClick={(event) => this.handleRouteChange.bind(this)(event, "")} class="logo hideable">
          BrowserPress
        </div>
        <ul class="hideable">
          <li>
            <p>Create a new website</p>
            <button onClick={(event) => this.handleRouteChange.bind(this)(event, "add-website")}>Add Website</button>
          </li>
          {
            this.websites?.length > 0
            ? <li>
                <p>Work on an existing website</p>
                <select onInput={(event) => this.handleSelect(event)}>
                <option selected={this.selectedWebsite === ""} value={""}>Select a website</option>
                  {this.websites.map((website) => {
                    return <option selected={this.selectedWebsite === website.id} value={website.id}>{website.name}</option>
                  })}
                </select>
              </li>
            : null
          }
          {
            this.selectedWebsite 
            ? [<li>
              <p>Customise how your website looks</p>
              <button onClick={(event) => this.handleRouteChange.bind(this)(event, "design-website")}>Design Website</button>
            </li>,
            <li>
              <p>Edit, add or delete your website pages</p>
              <button  onClick={(event) => this.handleRouteChange.bind(this)(event, "manage-website")}>Manage Pages</button>
            </li>,
            <li>
              <p>Generate website files or save website</p>
              <button  onClick={(event) => this.handleRouteChange.bind(this)(event, "export-website")}>Export Website</button>
            </li>,
            <li>
              <p>Permanently delete website</p>
              <button  onClick={(event) => this.handleRouteChange.bind(this)(event, "delete-website")}>Delete Website</button>
            </li>]
            : null
          }
        </ul>
    </Host>;
  }

  handleMenuIconClick() {
    this.hidden = !this.hidden;
    console.log(this.hidden)
  }

  handleRouteChange(event, route: string) {
    event.preventDefault()
    if(route === "add-website" || route === "") {
      console.log("clicked nothing")
      this.websiteSelectChange.emit("");
    }
    this.routeChange.emit(route);
  }

  handleSelect(event) {
    event.preventDefault();
    this.websiteSelectChange.emit(event.target.value);
  }
}

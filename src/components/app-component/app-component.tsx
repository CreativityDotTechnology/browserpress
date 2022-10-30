import { Component, h, Listen, State } from '@stencil/core';
import { liveQuery } from "dexie";
import { db } from '../../database/db';
import { Website } from '../../interfaces';

@Component({
  tag: 'app-component',
  styleUrl: 'app-component.css',
  shadow: false,
  scoped: true
})
export class AppComponent {

  /* Manages the current route of the application */
  @State() route = "/";
  @Listen('routeChange')
  routeChangeHandler(event: CustomEvent<string>) {
    this.route = "/" + event.detail;
  }

  /* Used to query websites from database */
  @State() websites: Website[];
  
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
    return [
      <menu-component></menu-component>,
      this.getMainContent.bind(this)()
    ];
  }

  // Simple routing logic to decide which screen to display in main content area
  getMainContent() {
    let mainContent;

    switch(this.route) {
      case "/":
        mainContent = <dashboard-component></dashboard-component>;
        break;
      case "/designer":
        mainContent = <designer-component></designer-component>;
        break;
      default:
        mainContent = null;
        break;
    }

    return mainContent;
  }
}

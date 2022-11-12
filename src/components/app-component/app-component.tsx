import { Component, h, Listen, State } from '@stencil/core';
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

  @State() websites: Website[] = [];

  /* Selected website */

  @State() selectedWebsite: string;

  /* Manages the current selected website */
  
  @Listen('websiteSelectChange')
  websiteSelectChangeHandler(event: CustomEvent<string>) {
    this.selectedWebsite = event.detail;
    if(this.selectedWebsite && this.selectedWebsite !== "") {
      this.route = "/design-website";
    }
    else {
      this.route = "/";
    }
  }

  render() {
    return [
      <menu-component selectedWebsite={this.selectedWebsite}></menu-component>,
      <div class="main-content-container">{this.getMainContent.bind(this)()}</div>
    ];
  }

  // Simple routing logic to decide which screen to display in main content area
  getMainContent() {
    let mainContent;

    switch(this.route) {
      case "/":
        // Show welcome page
        mainContent = <dashboard-component></dashboard-component>;
        break;
      case "/design-website":
        // Show designer tool after fetching website details
        mainContent = <website-wrapper-component key={this.route} route={this.route} selectedWebsite={this.selectedWebsite}></website-wrapper-component>;
      case "/manage-website":
        // Show content editor tool after fetching website details
        mainContent = <website-wrapper-component key={this.selectedWebsite} route={this.route} selectedWebsite={this.selectedWebsite}></website-wrapper-component>;
        break;
      case "/add-website":
        // Show a page for adding a new website
        mainContent = <add-website-component></add-website-component>;
        break;
      default:
        mainContent = <div>An error occurred</div>;
        break;
    }
    return mainContent;
  }
}

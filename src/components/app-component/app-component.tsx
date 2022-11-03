import { Component, h, Listen, State } from '@stencil/core';

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

  /* Selected website */

  @State() selectedWebsite: string;

  /* Manages the current selected website */
  
  @Listen('websiteSelectChange')
  websiteSelectChangeHandler(event: CustomEvent<string>) {
    this.selectedWebsite = event.detail;
    if(this.selectedWebsite) {
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
        mainContent = <dashboard-component></dashboard-component>;
        break;
      case "/design-website":
        mainContent = <website-wrapper-component route={this.route} selectedWebsite={this.selectedWebsite}></website-wrapper-component>;
        break;
      case "/manage-website":
        mainContent = <website-wrapper-component route={this.route} selectedWebsite={this.selectedWebsite}></website-wrapper-component>;
        break;
      case "/add-website":
        mainContent = <add-website-component></add-website-component>;
        break;
      default:
        mainContent = <div>An error occurred</div>;
        break;
    }

    

    return mainContent;
  }
}

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
    console.log("New route", event.detail);
    this.route = "/" + event.detail;
  }

  render() {

    let mainContent;

    switch(this.route) {
      case "/":
        mainContent = <dashboard-component></dashboard-component>;
        break;
      case "/designer":
        mainContent = <designer-component></designer-component>;
        break;
    }
    console.log(mainContent)
    return <div>
      <menu-component></menu-component>
      {mainContent}
    </div>;
  }
}

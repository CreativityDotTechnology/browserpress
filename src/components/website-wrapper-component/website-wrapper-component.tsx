import { Component, h, Prop, State, Watch } from '@stencil/core';
import { liveQuery } from 'dexie';
import { db } from '../../database/db';
import { Website } from '../../interfaces';

@Component({
  tag: 'website-wrapper-component',
  styleUrl: 'website-wrapper-component.css',
  shadow: false,
  scoped: true
})
export class WebsiteWrapperComponent {

  @Prop() route: string;
  @Prop() selectedWebsite: string;

  @State() website: Website;

  websitesObservable = liveQuery (
    () => db.websites.get(this.selectedWebsite)
  );

  subscription = this.websitesObservable.subscribe({
    next: this.nextHandler.bind(this),
    error: error => console.error(error)
  });

  @Watch('selectedWebsite')
  onSelectedWebsiteChanged(newValue: string, oldValue: string) {
    if(newValue !== oldValue) {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }

      this.websitesObservable = liveQuery (
        () => db.websites.get(newValue)
      );
    
      this.subscription = this.websitesObservable.subscribe({
        next: this.nextHandler.bind(this),
        error: error => console.error(error)
      });
    }
  }

  nextHandler(result) {
    this.website = result;
  }

  disconnectedCallback() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    if(this.website) {
      let websiteContent;
      switch(this.route) {
        case "/design-website":
          websiteContent = <designer-component website={this.website}></designer-component>;
          break;
        default:
          websiteContent = <div>An error occurred</div>;
          break;
      }
      return websiteContent;
    }
    else {
      return <div>Website not found</div>;
    }
  }


}

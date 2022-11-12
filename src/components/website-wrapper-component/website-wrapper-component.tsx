import { Component, h, Prop, State, Watch } from '@stencil/core';
import { liveQuery, Subscription } from 'dexie';
import { db } from '../../database/db';
import { Website } from '../../interfaces';

@Component({
  tag: 'website-wrapper-component',
  styleUrl: 'website-wrapper-component.css',
  shadow: false,
  scoped: true
})
export class WebsiteWrapperComponent {

  /* Used to query websites from database */
  @State() websites: Website[] = [];
  
  @Prop() route: string;
  @Prop() selectedWebsite: string;
  @State() website: Website;

  @State() subscription: Subscription;

  @Watch('selectedWebsite')
  onSelectedWebsiteChanged(newValue: string, oldValue: string) {
    if(newValue !== oldValue) {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
      const websitesObservable = liveQuery (
        () => db.websites.get(newValue)
      );
      
      // Subscribe
      this.subscription = websitesObservable.subscribe({
        next: result => this.website = result,
        error: error => console.error(error)
      });
    }
  }

  componentDidLoad() {
    const websitesObservable = liveQuery (
      () => db.websites.get(this.selectedWebsite)
    );
    
    // Subscribe
    this.subscription = websitesObservable.subscribe({
      next: result => this.website = result,
      error: error => console.error(error)
    });
  }

  disconnectedCallback() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    if(this.website) {
      return this.getContent();
    }
    else {
      return <div>Website not found</div>;
    }
  }

  getContent() {
    switch(this.route) {
      case "/design-website":
        return <designer-component website={this.website}></designer-component>;
      case "/manage-website":
        return <editor-component key={this.route} website={this.website} pages={this.website.pages}></editor-component>;
      default:
        return <div>An error occurred</div>;
    }
  }
}

import { Component, h, Prop, State, Watch } from '@stencil/core';
import { StyleConfigSettings, Website } from '../../interfaces';
import {initialSettings} from '../../constants/configSettings';

@Component({
  tag: 'designer-component',
  styleUrl: 'designer-component.css',
  shadow: false,
  scoped: true
})
export class DesignerComponent {

  @State() style: StyleConfigSettings = initialSettings;

  @Prop() website: Website;

  @Watch('website')
  onSelectedWebsiteChanged(newValue: Website, oldValue: Website) {
    if(newValue.id !== oldValue.id) {
        if(newValue.styleConfig) {
          this.style = newValue.styleConfig
        }
        else {
          this.style = initialSettings;
        }
    }
  }

  render() {
    console.log(JSON.stringify(this.style))
    return <div>
        <h2>Designer</h2>
        {this.website?.id}
    </div>;
  }


}

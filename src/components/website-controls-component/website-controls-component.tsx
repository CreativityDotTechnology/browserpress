import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'website-controls-component',
  styleUrl: 'website-controls-component.css',
  shadow: false,
  scoped: true
})
export class WebsiteControlsComponent {

  @Prop() showPreviewSizeToggle: boolean;
  @Prop() disabled: boolean;
  @Prop() saveChangesHandler: ()=> void;
  @Prop() undoChangesHandler: ()=> void;
  @Prop() togglePreviewSizeClick: (mobileView: boolean) => void;

  render() {
    return <Host>
        <div>
            <button disabled={this.disabled} onClick={this.saveChangesHandler}>Save changes</button>
            <button class="cancel" disabled={this.disabled} onClick={this.undoChangesHandler}>Undo changes</button>
        </div>
        {
          this.showPreviewSizeToggle
          ? <div>
                <button onClick={() => this.togglePreviewSizeClick(false)}>Desktop</button>
                <button onClick={() => this.togglePreviewSizeClick(true)}>Mobile</button>
            </div>
          : <div></div>
        }
        
    </Host>
  }


}

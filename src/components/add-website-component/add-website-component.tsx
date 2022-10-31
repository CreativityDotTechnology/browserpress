import { Component, h, State } from '@stencil/core';
import { dbUpdate } from '../../database/dbUpdate';
import { StateUpdateType } from '../../interfaces';
import { Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'add-website-component',
  styleUrl: 'add-website-component.css',
  shadow: false,
  scoped: true
})
export class DashboardComponent {

  @State() websiteName: string = "";
  @Event() routeChange: EventEmitter<string>;

  render() {
    return <div>
            <h2>Add a new website</h2>
            <form>
              <fieldset>
                <label htmlFor="website-name">Website name</label>
                <input type="text" placeholder="Enter a name" value={this.websiteName} id="website-name" onInput={this.handleWebsiteNameChange.bind(this)}></input>
              </fieldset>
              <button onClick={this.handleCancelClick.bind(this)}>Cancel</button>
              <button disabled={this.websiteName.length === 0} onClick={this.handleAddWebsiteClick.bind(this)}>Add website</button>
          </form>
      </div>
  }

  handleWebsiteNameChange(event) {
    this.websiteName = event.target.value;
  }

  handleCancelClick(event) {
    event.preventDefault();
    this.routeChange.emit("");
  }

  handleAddWebsiteClick(event) {
    event.preventDefault();
    dbUpdate({
        type: StateUpdateType.ADD_WEBSITE,
        payload: {
            name: this.websiteName
        }
    });
    this.routeChange.emit("");
  }
}

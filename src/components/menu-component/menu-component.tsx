import { Component, h } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'menu-component',
  styleUrl: 'menu-component.css',
  shadow: false,
  scoped: true
})
export class MenuComponent {

  @Event() routeChange: EventEmitter<string>

  render() {
    return <div>

    </div>;
  }
}

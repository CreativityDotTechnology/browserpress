import { Component, h } from '@stencil/core';

@Component({
  tag: 'dashboard-component',
  styleUrl: 'dashboard-component.css',
  shadow: false,
  scoped: true
})
export class DashboardComponent {
  render() {
    return <div>
      Dashboard
    </div>;
  }
}

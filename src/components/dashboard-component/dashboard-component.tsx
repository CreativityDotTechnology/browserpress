import { Component, h } from '@stencil/core';

@Component({
  tag: 'dashboard-component',
  styleUrl: 'dashboard-component.css',
  shadow: false,
  scoped: true
})
export class DashboardComponent {
  // for now, just some simple welcome text. Later, maybe some links to website projects
  render() {
    return <main>
    <h1>Welcome to BrowserPress</h1>
    <h2 class="tagline">Create websites in your browser</h2>
    <p>You can use BrowserPress to quickly and easily create simple websites right here in your browser, without needing to install any software and at no cost.</p>
    <h2>Privacy</h2>
    <p>This is a front-end only web app, meaning that all data stays in your browser. No data is shared with any backend, and the app doesn't use any tracking cookies.</p>
    <h2>How it works</h2>
    <ul>
        <li>Create a website</li>
        <li>Customise the design</li>
        <li>Create some pages using out-of-the-box components</li>
        <li>Click "Save changes" regularly to store your settings in your browser</li>
        <li>Generate your zipped website files</li>
        <li>Now you can upload your website to a hosting provider of your choice</li>
    </ul>
    <h2>Who created this app?</h2>
    <p>BrowserPress is an open source application created by <a href="https://www.linkedin.com/in/tomswales/" target="_blank">Tom Schneider-Swales</a>.</p>
    <h2>License</h2>
    <p>This application is available on Github with an MIT license: <a href="github.com/tomswales" target="_blank">Find it on Github</a></p>
</main>;
  }
}

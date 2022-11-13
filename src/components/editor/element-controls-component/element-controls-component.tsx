import { Component, EventEmitter, h, Host, Prop, Event, Watch } from '@stencil/core';
import { PageElement, PageElementType } from '../../../interfaces';

@Component({
  tag: 'element-controls-component',
  styleUrl: 'element-controls-component.css',
  shadow: false,
  scoped: true
})
export class ElementControlsComponent {
  @Prop() pageId: string;
  @Prop() element: PageElement;
  @Prop() expandedElement: string;
  @Prop() contentView;
  @Event() expandElement: EventEmitter<string>
  @Event() updateElementInPage;
  @Event() updateContentView;

  render() {
    return <Host>
            <div class={this.isExpanded() ? "title-container selected" : "title-container"}>
              <div>
                {this.element.type}
              </div>
              <div>
                <svg onClick={this.handleExpandClick.bind(this)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
              </div>
            </div>
            {
              this.isExpanded() 
              ? this.renderContent()
              : null
            }
        </Host>
  }

  handleExpandClick() {
    if(!this.isExpanded()) {
      this.expandElement.emit(this.element.id);
    }
    else {
      this.expandElement.emit("");
    }
  }

  renderContent() {
    switch(this.element.type) {
      case PageElementType.BANNER:
        return <div class="element-content-container">
            <label htmlFor="banner-image">Background image (big screen)</label>
          <input id="banner-image" type="file" accept=".png, .svg, .jpg, .jpeg, .gif" value={""} onChange={(event) => this.handleFileUploadChange.bind(this)(event, "bannerBackgroundImage")}></input>
          {
              this.element.bannerBackgroundImage
              ? <div><button onClick={(event) => this.handleDeleteFileClick.bind(this)(event, "bannerBackgroundImage")}>Remove image</button></div>
              : null
          }
          <label htmlFor="banner-image-mobile">Background image (small screen)</label>
          <input id="banner-image-mobile" type="file" accept=".png, .svg, .jpg, .jpeg, .gif" value={""} onChange={(event) => this.handleFileUploadChange.bind(this)(event, "bannerMobileBackgroundImage")}></input>
          {
              this.element.bannerMobileBackgroundImage
              ? <div><button onClick={(event) => this.handleDeleteFileClick.bind(this)(event, "bannerMobileBackgroundImage")}>Remove image</button></div>
              : null
          }
          <label htmlFor="banner-text">Banner text</label>
          <input id="banner-text" type="text" value={this.element.bannerText} onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerText")}></input>
          <label htmlFor="banner-text-color">Text font color</label>
          <input id="banner-text-color" type="color" value={this.element.bannerTextFontColor || "#000000"} onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerTextFontColor")}></input>
          <label htmlFor="banner-text-background">Text background color</label>
          <input id="banner-text-background" type="color" value={this.element.bannerTextBackgroundColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerTextBackgroundColor")}></input>
          <label htmlFor="banner-text-opacity">Opacity</label>
          <input id="banner-text-opacity" type="range" min="0" max="100" step="1" value={this.element.bannerTextBackgroundOpacity} onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerTextBackgroundOpacity")}></input>
          <label htmlFor="banner-height">Banner height</label>
          <input id="banner-height" type="range" min="10" max="50" step="5" value={this.element.bannerHeight} onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerHeight")}></input>
          <label htmlFor="banner-text-position">Text position</label>
          <select id="banner-text-position" onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerTextPosition")}>
              <option selected={this.element.bannerTextPosition === "left"} value="left">Left</option>
              <option selected={this.element.bannerTextPosition === "center"} value="center">Center</option>
              <option selected={this.element.bannerTextPosition === "right"} value="right">Right</option>
          </select>
          <label htmlFor="banner-text-alignment">Text alignment</label>
          <select id="banner-text-alignment" onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerTextAlign")}>
              <option selected={this.element.bannerTextAlign === "left"} value="left">Left</option>
              <option selected={this.element.bannerTextAlign === "center"} value="center">Center</option>
              <option selected={this.element.bannerTextAlign === "right"} value="right">Right</option>
          </select>
          <label htmlFor="banner-text-width">Text width</label>
          <input id="banner-text-width" type="range" min="20" max="100" step="10" value={this.element.bannerTextWidth} onInput={(event) => this.handlePropertyChange.bind(this)(event, "bannerTextWidth")}></input>
        </div>
      case PageElementType.TEXT:
        return <div class="element-content-container">
            {
              this.contentView.view === "preview"
              ? <button onClick={this.handleShowEditorClick.bind(this)}>Show editor</button>
              : <button onClick={this.handleCloseEditorClick.bind(this)} class="cancel">Close editor</button>
            }
            
        </div>
      case PageElementType.ITEM_GRID:
        return <div class="element-content-container">
            {
              this.contentView.view === "preview"
              ? <button onClick={this.handleShowItemsEditorClick.bind(this)}>Show editor</button>
              : <button onClick={this.handleCloseItemsEditorClick.bind(this)} class="cancel">Close editor</button>
            }
            
        </div>
      default:
        return <div class="element-content-container">Something went wrong...</div>
    }
    
  }

  isExpanded() {
    return this.expandedElement === this.element.id;
  }

  handlePropertyChange(event, propertyKey) {
    event.preventDefault();
    const newElement = this.updateElementSettings(propertyKey, event.target.value);
    this.updateElementInPage.emit({pageId: this.pageId, elementId: this.element.id, newElement: newElement})
  }

  handleFileUploadChange(event, propertyKey) {
    event.preventDefault();
    const fileReader = new FileReader();
    const input = event.currentTarget;

    fileReader.onload = () => {
        const result = fileReader.result;
        const newElement = this.updateElementSettings(propertyKey, result);
        this.updateElementInPage.emit({pageId: this.pageId, elementId: this.element.id, newElement: newElement})
        input.value= null;
    }

    const files = event.currentTarget.files;
    if (files && files.length > 0) {
        try {
            fileReader.readAsDataURL(files[0]);
        } catch (e) {
            console.log("Error reading file: ", e.message);
        }
    }
  }

  handleShowEditorClick(event) {
    event.preventDefault();
    this.updateContentView.emit({
      view: "text-editor",
      pageId: this.pageId,
      elementId: this.element.id,
      expandedPage: this.pageId
    });
  }

  handleCloseEditorClick(event) {
    event.preventDefault();
    this.updateContentView.emit({
      view: "preview",
      pageId: "",
      elementId: "",
      expandedPage: this.pageId
    });
  }

  handleShowItemsEditorClick(event) {
    event.preventDefault();
    this.updateContentView.emit({
      view: "item-grid-editor",
      pageId: this.pageId,
      elementId: this.element.id,
      expandedPage: this.pageId
    });
  }

  handleCloseItemsEditorClick(event) {
    event.preventDefault();
    this.updateContentView.emit({
      view: "preview",
      pageId: "",
      elementId: "",
      expandedPage: this.pageId
    });
  }

  handleDeleteFileClick(event, propertyKey) {
    event.preventDefault();
    const newElement = this.updateElementSettings(propertyKey, null);
    this.updateElementInPage.emit({pageId: this.pageId, elementId: this.element.id, newElement: newElement})
  }

  updateElementSettings(propertyKey, newValue) {
    const newElement = {...this.element, [propertyKey]: newValue}
    return newElement;
  }
}

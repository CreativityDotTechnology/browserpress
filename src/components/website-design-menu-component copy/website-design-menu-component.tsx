import { Component, h, Prop, State } from '@stencil/core';
import { StyleConfigSettings, Font } from '../../interfaces';
import {fonts} from '../../constants/fonts';


@Component({
  tag: 'website-design-menu-component',
  styleUrl: 'website-design-menu-component.css',
  shadow: false,
  scoped: true
})
export class WebsiteDesignMenuComponent {

  @Prop() styleSettings: StyleConfigSettings;
  @Prop() updateStyleSettings: (newStyle: StyleConfigSettings) => void;
  @State() selectedDesignSetting: string = null;
  
  render() {
    if(this.styleSettings) {
      return <div>
          <h4>Design settings</h4>
          <label>Choose design settings</label>
          <select onInput={this.handleDesignSettingSelect.bind(this)}>
            <option value="" selected={this.selectedDesignSetting === ""}>Choose what to design</option>
            <option value="branding" selected={this.selectedDesignSetting === "branding"}>Branding</option>
            <option value="header" selected={this.selectedDesignSetting === "header"}>Header</option>
            <option value="footer" selected={this.selectedDesignSetting === "footer"}>Footer</option>
            <option value="menu" selected={this.selectedDesignSetting === "menu"}>Menu</option>
            <option value="font" selected={this.selectedDesignSetting === "font"}>Font</option>
            <option value="background" selected={this.selectedDesignSetting === "background"}>Page background</option>
            <option value="text-block" selected={this.selectedDesignSetting === "text-block"}>Text block</option>
            <option value="item-grid" selected={this.selectedDesignSetting === "item-grid"}>Item grid</option>
            <option value="blog" selected={this.selectedDesignSetting === "blog"}>Blog</option>
          </select>
          {this.renderMenuContent()}
      </div>;
    }
    else {
      return <div>Loading...</div>
    }
  }

  renderMenuContent() {
    switch(this.selectedDesignSetting) {
       case "branding":
          return <div>
              <hr></hr>
              <h4>Branding</h4>
              <label htmlFor="header-background">Logo (png, svg, jpg, gif)</label>
              <input id="header-background" type="file" accept=".png, .svg, .jpg, .jpeg, .gif" onChange={(event) => this.handleFileUploadChange.bind(this)(event, "logoImage")} value={""}></input>
              <div>
              {
                  this.styleSettings.logoImage
                  ? <button onClick={(event) => this.handleDeleteFileClick.bind(this)(event, "logoImage")}>Remove logo</button>
                  : null
              }
              </div>
              <label htmlFor="favicon-image">Favicon (ico, png)</label>
              <input id="favicon-image" type="file" accept=".ico, .png" onChange={(event) => this.handleFileUploadChange.bind(this)(event, "faviconImage")} value={""}></input>
              <div>
              {
                  this.styleSettings.faviconImage
                  ? <div>
                      <div>
                      <img src={this.styleSettings?.faviconImage as string} style={{width: "32px", height: "32px", marginTop: "1rem", marginBottom: "1rem"}}></img>
                      </div>
                      <button onClick={(event) => this.handleDeleteFileClick.bind(this)(event, "faviconImage")}>Remove favicon</button>
                    </div>
                  : null
              }
              </div>
              <label htmlFor="display-name">Website display name</label>
              <input id="display-name" type="text" value={this.styleSettings.displayName} onInput={(event) => this.handlePropertyChange.bind(this)(event, "displayName")}></input>
              <label htmlFor="copyright-name">Copyright name</label>
              <input id="copyright-name" type="text" value={this.styleSettings.copyrightName} onInput={(event) => this.handlePropertyChange.bind(this)(event, "copyrightName")}></input>
              <label htmlFor="tab-text">Browser tab text</label>
              <input id="tab-text" type="text" value={this.styleSettings.browserTabText} onInput={(event) => this.handlePropertyChange.bind(this)(event, "browserTabText")}></input>
          </div>
      case "font":
        return <div>
              <hr></hr>
              <h4>Font</h4>
              {
                  !this.styleSettings.customFont
                  ? <div>
                      <label htmlFor="font-family">Standard font</label>
                      <select id="font-family" onInput={(event) => this.handlePropertyChange.bind(this)(event, "fontFamily")}>
                          {fonts.map((font: Font) => <option key={font.name} selected={this.styleSettings.fontFamily === font.value} value={font.value}>{font.name}</option>)}
                      </select>
                  </div>
                  : null
              }
              <label htmlFor="font-family">Upload Custom font (.ttf, .woff2)</label>
              <input id="header-background" type="file" accept=".ttf, .woff2" onChange={(event) => this.handleFileUploadChange.bind(this)(event, "customFont")} value={""}></input>
              {
                  this.styleSettings.customFont
                  ? <div><button onClick={(event) => this.handleDeleteFileClick.bind(this)(event, "customFont")}>Remove font</button></div>
                  : null
              }
        </div>
      case "header":
        return <div>
              <hr></hr>
              <h4>Header</h4>
              <label htmlFor="header-background">Header background color</label>
              <input id="header-background" type="color" value={this.styleSettings.headerBackgroundColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "headerBackgroundColor")}></input>
              <label htmlFor="header-transparency">Opacity</label>
              <input id="header-transparency" type="range" min="0" max="100" step="1" value={this.styleSettings.headerOpacity} onInput={(event) => this.handlePropertyChange.bind(this)(event, "headerOpacity")}></input>
              <label htmlFor="header-font-color">Header font color</label>
              <input id="header-font-color" type="color" value={this.styleSettings.headerFontColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "headerFontColor")}></input>
              <label htmlFor="header-title-font-size">Header font size</label>
              <input id="header-title-font-size" type="range" min="1" max="2"  step="0.1" value={this.styleSettings.headerTitleFontSize} onInput={(event) => this.handlePropertyChange.bind(this)(event, "headerTitleFontSize")}></input>
              <label htmlFor="header-title-font-weight">Header font weight</label>
              <input id="header-title-font-weight" type="range" min="100" max="700"  step="100" value={this.styleSettings.headerTitleFontWeight} onInput={(event) => this.handlePropertyChange.bind(this)(event, "headerTitleFontWeight")}></input>
        </div>
      case "footer":
        return <div>
              <hr></hr>
              <h4>Footer</h4>
              <label htmlFor="footer-background">Background color</label>
              <input id="footer-background"type="color"  value={this.styleSettings.footerBackgroundColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "footerBackgroundColor")}></input>
              <label htmlFor="footer-font-color">Font color</label>
              <input id="footer-font-color" type="color"  value={this.styleSettings.footerFontColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "footerFontColor")}></input>
              <label htmlFor="footer-border-enabled">Border color</label>
              <select id="footer-border-enabled" onInput={(event) => this.handlePropertyChange.bind(this)(event, "footerBorderEnabled")}>
                  <option selected={this.styleSettings.footerBorderEnabled === "true"} value="true">Show border</option>
                  <option selected={this.styleSettings.footerBorderEnabled === "false"} value="false">Hide border</option>
              </select>
              {
                  this.styleSettings.footerBorderEnabled === "true"
                  ? <div>
                      <label htmlFor="footer-border-color">Footer border color</label>
                      <input id="footer-border-color" type="color"  value={this.styleSettings.footerBorderColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "footerBorderColor")}></input>
                  </div>
                  : null
              }
        </div>
      case "menu":
        return <div>
              <hr></hr>
              <h4>Menu</h4>
              <label htmlFor="enable-separate-menu-background-color">Separate menu colors</label>
                        <select id="enable-separate-menu-background-color" onInput={(event) => this.handlePropertyChange.bind(this)(event, "enableSeparateMenuBackgroundColor")}>
                            <option selected={this.styleSettings.enableSeparateMenuBackgroundColor === "true"} value="true">Yes</option>
                            <option selected={this.styleSettings.enableSeparateMenuBackgroundColor === "false"} value="false">No</option>
                        </select>
                        {
                            this.styleSettings.enableSeparateMenuBackgroundColor === "true"
                            ? <div>
                                <label htmlFor="menu-background">Menu background color</label>
                                <input id="menu-background" type="color" value={this.styleSettings.menuBackgroundColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "menuBackgroundColor")}></input>
                                <label htmlFor="menu-font-color">Font color</label>
                                <input id="menu-font-color" type="color" value={this.styleSettings.menuFontColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "menuFontColor")}></input>
                            </div>
                            : null
                        }
        </div>
      case "background":
        return <div>
            <hr></hr>
            <h4>Page background</h4>
            <label htmlFor="background">Background type</label>
            <select id="background" onInput={(event) => this.handlePropertyChange.bind(this)(event, "backgroundType")}>
                <option selected={this.styleSettings.backgroundType === "COLOR"} value="COLOR">Solid color</option>
                <option selected={this.styleSettings.backgroundType === "COLOR_GRADIENT"} value="COLOR_GRADIENT">Color gradient</option>
                <option selected={this.styleSettings.backgroundType === "BACKGROUND_IMAGE"} value="BACKGROUND_IMAGE">Background image</option>
            </select>
            {
                this.styleSettings.backgroundType === "COLOR"
                ? <div>
                    <label htmlFor="background-color">Background color</label>
                    <input id="background-color" type="color"  value={this.styleSettings.backgroundColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "backgroundColor")} ></input>
                </div>
                : null
            }
            {
                this.styleSettings.backgroundType === "COLOR_GRADIENT"
                ? <div>
                    <label htmlFor="background-gradient-top">Gradient color top</label>
                    <input id="background-gradient-top" type="color"  value={this.styleSettings.backgroundGradientTop} onInput={(event) => this.handlePropertyChange.bind(this)(event, "backgroundGradientTop")} ></input>
                    <label htmlFor="background-gradient-bottom">Gradient color bottom</label>
                    <input id="background-gradient-bottom" type="color"  value={this.styleSettings.backgroundGradientBottom} onInput={(event) => this.handlePropertyChange.bind(this)(event, "backgroundGradientBottom")}  ></input>
                </div>
                : null
            }
            {
                this.styleSettings.backgroundType === "BACKGROUND_IMAGE"
                ? <div>
                    <label htmlFor="header-background">Background image (png, svg, jpg, gif)</label>
                    <input id="header-background" type="file" accept=".png, .svg, .jpg, .jpeg, .gif"  value={""} onChange={(event) => this.handleFileUploadChange.bind(this)(event, "backgroundImage")}></input>
                    <label htmlFor="background-blur">Background blur</label>
                    <input id="background-blur" type="range" min="0" max="10"  step="1" value={this.styleSettings.backgroundBlur} onInput={(event) => this.handlePropertyChange.bind(this)(event, "backgroundBlur")}></input>
                </div>
                : null
            }
            {
                this.styleSettings.backgroundType === "BACKGROUND_IMAGE" && this.styleSettings.backgroundImage
                ? <div><button onClick={(event) => this.handleDeleteFileClick.bind(this)(event, "backgroundImage")}>Remove background image</button></div>
                : null
            }
      </div>
      case "text-block":
        return <div>
              <hr></hr>
              <h4>Page content</h4>
              <label htmlFor="page-content-background">Background color</label>
              <input id="page-content-background" type="color" value={this.styleSettings.pageContentBackgroundColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "pageContentBackgroundColor")}></input>
              <label htmlFor="page-content-transparency">Opacity</label>
              <input id="page-content-transparency" type="range" min="0" max="100" step="1" value={this.styleSettings.pageContentOpacity} onInput={(event) => this.handlePropertyChange.bind(this)(event, "pageContentOpacity")}></input>
              <label htmlFor="page-content-font-color">Font color</label>
              <input id="page-content-font-color" type="color" value={this.styleSettings.pageContentFontColor} onInput={(event) => this.handlePropertyChange.bind(this)(event, "pageContentFontColor")}></input>
              <label htmlFor="top-margin">Top margin</label>
              <input id="top-margin" type="range" min="0" max="10" step="1" value={this.styleSettings.pageContentMarginTop} onInput={(event) => this.handlePropertyChange.bind(this)(event, "pageContentMarginTop")}></input>
              <label htmlFor="page-content-margin">Side margin</label>
              <input id="page-content-margin" type="range" min="0" max="40" step="5" value={this.styleSettings.pageContentMarginSides} onInput={(event) => this.handlePropertyChange.bind(this)(event, "pageContentMarginSides")}></input>
              <label htmlFor="bottom-margin">Bottom margin</label>
              <input id="bottom-margin" type="range" min="0" max="10" step="1" value={this.styleSettings.pageContentMarginBottom} onInput={(event) => this.handlePropertyChange.bind(this)(event, "pageContentMarginBottom")}></input>
              <label htmlFor="page-content-padding">Padding</label>
              <input id="page-content-padding" type="range" min="0" max="5" step="0.5" value={this.styleSettings.pageContentPadding} onInput={(event) => this.handlePropertyChange.bind(this)(event, "pageContentPadding")}></input>
        </div>
      default:
        return null;
    }
  }

  handleDesignSettingSelect(event) {
    this.selectedDesignSetting = event.target.value;
  }

  handlePropertyChange(event, propertyKey) {
    event.preventDefault();
    this.updateStyleSettings({...this.styleSettings, [propertyKey]: event.target.value});
  }

  handleFileUploadChange(event, propertyKey) {
    
    const fileReader = new FileReader();
    const input = event.currentTarget;

    fileReader.onload = () => {
        const result = fileReader.result;
        this.updateStyleSettings({...this.styleSettings, [propertyKey]: result});
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

  handleDeleteFileClick(event, propertyKey) {
    event.preventDefault();
    this.updateStyleSettings({...this.styleSettings, [propertyKey]: null});
  }

}

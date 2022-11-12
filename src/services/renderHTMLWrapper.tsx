import { StyleConfigSettings } from "../interfaces";
import { renderCss } from './renderCss';
import escape from 'escape-html';

export function renderHTMLWrapper (settings: StyleConfigSettings, content: string, menuContent: string) {

    return `
            <!DOCTYPE html>
                <html>

                <head>
                    <title>${escape(settings.displayName)}</title>
                    <link rel="shortcut icon" type="image/x-icon" href=${settings.faviconImage} sizes="16x16 24x24 32x32 48x48 64x64">
                    <meta charset="utf-8"  />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>

                <style>
                    ${renderCss(settings)}
                </style>

                <body id="body">
                    <header>
                        <div class="site-name-container">
                            ${settings.logoImage ? `
                                <div class="site-logo">
                                    <img src=${escape(settings.logoImage)}></img>
                                </div>
                            ` : ""}
                            ${settings.displayName ? `<h1>${escape(settings.displayName)}</h1>` : ``}
                        </div>
                        
                        <div class="menu-container">
                            <div class="mobile-menu"  tabindex="0"><svg height="45px" viewBox="0 0 32 32"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg></div>
                            <ul>
                                ${menuContent}
                            </ul>
                        </div>
                    </header>
                    <main id="content">
                        ${content}
                    </main>
                    <footer>
                        <div class="current-year-container">
                            <span id="current-year">&copy;&nbsp;2022</span>
                        </div>
                        <div class="built-with-container">
                            Built with &nbsp;<a href="https://browserpress.org" target="_blank">BrowserPress</a>
                        </div>
                    </footer>

                </body>

                <script>
                    // Updates the year of the copyright footer automatically if javascript enabled
                    window.onload = function() {
                        var yearElement = document.getElementById("current-year");
                        var year = new Date().getFullYear();
                        yearElement.innerHTML = "&copy; ${escape(settings.copyrightName) + "&nbsp;"}" + year
                    }
                </script>
        </html>
        `
}
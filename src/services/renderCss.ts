import { StyleConfigSettings } from "../interfaces";
import hexRgb from 'hex-rgb';

export function renderCss(settings: StyleConfigSettings) {
    return `
            ${customFont()}
            body {
                margin: 0;
                padding: 0;
                font-family: ${settings.customFont ? "Custom Font" : settings.fontFamily};
                background: ${getBackground()};
                background-size: cover;
                background-attachment: fixed;
                background-position: center;
                width: 100vw;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }

            header {
                min-height: 80px;
                display: flex;
                width: 100%;
                flex-direction: row;
                flex-wrap: wrap;
                position: sticky;
                top: 0px;
                z-index: 100;
                box-shadow: 0 1px 1px rgba(0,0,0,0.05), 
                    0 2px 2px rgba(0,0,0,0.05), 
                    0 4px 4px rgba(0,0,0,0.05), 
                    0 8px 8px rgba(0,0,0,0.05);
            }

            .site-name-container {
                background-color: ${hexRgb(settings.headerBackgroundColor, {
                    alpha: (parseInt(settings.headerOpacity) / 100), 
                    format: "css"
                })};
                /*min-height: 40px;*/
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                min-width: 300px;
                justify-content: flex-start;
                padding-left: 2rem;
                padding-right: 2rem;
            }

            .site-logo {
                padding: 3px;
                margin: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .site-logo img {
                max-height: 40px;
                max-width: 100px;
            }

            .site-logo img[src*="svg"] {
                height: 40px;
            }

            .site-name-container h1 {
                font-size: ${settings.headerTitleFontSize}rem;
                color: ${settings.headerFontColor};
                font-weight: ${settings.headerTitleFontWeight};
                margin: 0.5rem;
            }

            .menu-container {
                color: ${settings.enableSeparateMenuBackgroundColor === "true" ? settings.menuFontColor : settings.headerFontColor};
                background-color: ${ settings.enableSeparateMenuBackgroundColor === "true"
                    ? hexRgb(settings.menuBackgroundColor, {
                        alpha: (parseInt(settings.headerOpacity) / 100), 
                        format: "css"
                    })
                    : hexRgb(settings.headerBackgroundColor, {
                        alpha: (parseInt(settings.headerOpacity) / 100), 
                        format: "css"
                    })
                };
                flex: 3;
                min-width: 300px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding-left: 5%;
                padding-right: 5%;
                text-transform: uppercase;
            }

            .menu-container ul {
                display: flex;
                flex: 1;
                justify-content: flex-end;
                list-style: none;
                margin-top: 0.25rem;
                margin-bottom: 0.25rem;
                padding: 0;
                flex-wrap: wrap;
                margin-left: 1rem;
                margin-right: 1rem;
                box-sizing: border-box;
            }

            .menu-container ul li {
                font-size: 0.9rem;
                margin: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                text-decoration: none;
            }
 
            .menu-container ul li:hover {
                font-weight: 700;
                cursor: pointer;
            }


            .mobile-menu-close {
                display: none !important;
                font-size: 0.9rem;
            }

            .mobile-menu-close b { 
                text-decoration: underline;
            }

            .mobile-menu {
                display: none;
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }

            .mobile-menu svg {
                fill: ${settings.enableSeparateMenuBackgroundColor === "true" ? settings.menuFontColor : settings.headerFontColor};
            }

            .mobile-menu h4 {
                margin: 0;
                text-decoration: underline;
            }
            
            main {
                flex: 1;
                box-sizing: border-box;
            }

            .page-content {
                margin-top: ${settings.pageContentMarginTop}rem;
                margin-bottom: ${settings.pageContentMarginBottom}rem;
                background-color: ${hexRgb(settings.pageContentBackgroundColor, {
                    alpha: (parseInt(settings.pageContentOpacity) / 100), 
                    format: "css"
                })};
                color: ${settings.pageContentFontColor};
                flex: 1;
                height: auto;
                margin-left: ${settings.pageContentMarginSides}%;        
                margin-right: ${settings.pageContentMarginSides}%;
                box-sizing: border-box;
                padding-left: ${settings.pageContentPadding}rem;
                padding-right: ${settings.pageContentPadding}rem;
                padding-top: 2rem;
                padding-bottom: 2rem;
            }

            .page-content p {
                line-height: 1.5;
            }

            .page-content li {
                line-height: 1.5;
            }

            .content-container {
                width: 100%;
                box-sizing: border-box;
            }

            footer {
                padding: 1rem;
                background-color: ${settings.footerBackgroundColor};
                min-height: 35px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                color: ${settings.footerFontColor};
                border-top: 1px solid;
                border-color: ${settings.footerBorderEnabled === "true"
                    ? settings.footerBorderColor 
                    : hexRgb(settings.footerBorderColor, {
                        alpha: 0, 
                        format: "css"
                    })
                }
            }

            .item-grid-container {
                min-height: 60px;
                padding: 2rem;
                box-sizing: border-box;
                margin-top: ${settings.itemGridMarginTop}rem;
                margin-bottom: ${settings.itemGridMarginBottom}rem;
                margin-left: ${settings.itemGridMarginSides}%;
                margin-right: ${settings.itemGridMarginSides}%;
                padding-left: ${settings.itemGridPadding}%;        
                padding-right: ${settings.itemGridPadding}%;
                background-color: ${hexRgb(settings.itemGridBackgroundColor, {
                    alpha: (parseInt(settings.itemGridOpacity) / 100), 
                    format: "css"
                })};
                color: ${settings.itemGridFontColor};
            }

            .item-grid {
                flex-basis: 0;
                flex-grow: 1;
                width: 100%;
                box-sizing: border-box;
                display: grid;
                grid-gap: 25px;
                grid-template-columns: repeat(auto-fit, 250px);
                justify-content: center;
                margin-bottom: 1rem;
            }

            .item-grid-card {
                min-height: 200px;
                background-color: white;
                display: inline-block;
                background-color: ${settings.itemGridCardBackgroundColor};
                border-top: solid 1px;
                border-bottom: solid 1px;
                border-left: solid 1px;
                border-right: solid 1px;
                border-color: ${settings.itemGridCardBorderColor};
                padding: 10px;
                color: ${settings.itemGridCardFontColor};
            }

            .item-grid-card h4 {
                font-weight: bold;
                font-size: 1.1rem;
                margin-top: 0.75rem;
                margin-bottom: 0.75rem;
            }

            .item-grid-card p {
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }

            .item-grid-title {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .category-divider {
                margin-top: 0.5rem;
                margin-bottom: 1rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .item-grid-card-image {
                max-width: 100%;
                height: 180px;
                background-size: cover;
                background-position: center;
            }

            .item-grid-card-image:hover {
                transform: scale(1.02)
            }

            .articles-widget {
                background-color: ${hexRgb(settings.articlesBackgroundColor, {
                    alpha: (parseInt(settings.articlesOpacity) / 100), 
                    format: "css"
                })};
                margin-top: ${settings.articlesMarginTop}rem;
                margin-bottom: ${settings.articlesMarginBottom}rem;
                padding-left: ${settings.articlesPadding}%;
                padding-right: ${settings.articlesPadding}%;
                margin-left: ${settings.articlesMarginSides}%;
                margin-right: ${settings.articlesMarginSides}%;
                padding-top: 2rem;
                padding-bottom: 2rem;
                color: ${settings.articlesFontColor};
            }

            .articles-menu {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding-left: 0;
            }

            .articles-menu li {
                list-style-type: none;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
                border: 1px solid;
                border-color: ${settings.articlesFontColor};
                background-color: none;
                margin: 0.25rem;
                border-radius: 0.5rem;
                color: ${settings.articlesFontColor};
                text-decoration: underline;
            }

            .articles-list article {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                margin-bottom: 1rem;
                border-bottom: 1px solid black;
                padding-top: 1rem;
                padding-bottom: 1rem;
            }

            .article-image-container {
                flex: 1;
                max-width: 33%;
            }

            .article-image-container img {
                width: 100%;
                padding-left: 10%;
                padding-right: 10%;
                box-sizing: border-box;
                margin-bottom: 1rem;
            }

            .article-content-container {
                flex: 1;
            }

            .article-content-container p {
                line-height: 1.75;
            }
            
            .pagination-menu {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding-left: 0;
            }

            .pagination-menu li {
                color: ${settings.articlesFontColor};
                text-decoration: underline;
                margin: 0.5rem;
                list-style-type: none;
            }

            @media (min-width: 1750px) {

                .page-content {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 3}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 3}%;
                }

                .item-grid-container {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 3}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 3}%;
                }

                .articles-widget {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 3}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 3}%;
                }
            }

            @media (min-width: 1250px) {

                .page-content {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 2}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 2}%;
                }

                .item-grid-container {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 2}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 2}%;
                }

                .articles-widget {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 2}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 2}%;
                }
            }

            @media (max-width: 900px) { 

                header {
                    flex-direction: column;
                }

                .site-name-container { 
                    text-align: center;
                    justify-content: center;
                }

                .menu-container ul {
                    justify-content: center;
                }
            }

            @media (max-width: 750px) {
                .articles-list article {
                    flex-direction: column;
                }

                .article-image-container {
                    max-width: 100%;
                }

                .article-image-container img {
                    margin-bottom: 2rem;
                    padding-left: 0%;
                    padding-right: 0%;
                }
            }

            @media (max-width: 500px) { 

                .page-content {
                    margin-left: ${parseInt(settings.pageContentMarginSides)/2}%;
                    margin-right: ${parseInt(settings.pageContentMarginSides)/2}%;
                    margin-top: ${parseInt(settings.pageContentMarginTop)/2}rem;
                    margin-bottom: ${parseInt(settings.pageContentMarginBottom)/2}rem;
                    padding-left: ${parseInt(settings.pageContentPadding)/2}rem;
                    padding-right: ${parseInt(settings.pageContentPadding)/2}rem;
                }

                .site-name-container h1 {
                    transform: scale(0.9);
                }

                .menu-container ul li:not(:last-child) {
                    border-bottom: 1px solid ${settings.enableSeparateMenuBackgroundColor === "true" ? settings.menuFontColor : settings.headerFontColor};
                }

                .mobile-menu {
                    display: flex;
                    align-items: center;
                }

                .menu-container {
                    flex-direction: column;
                    justify-content: flex-start;
                }

                .menu-container ul {
                    display: none;
                    justify-content: flex-start;
                    flex-direction: column;
                }

                .menu-container ul li {
                    width: 100%;
                    height: 2rem;
                }

                .mobile-menu:focus + ul {
                    display: flex;
                }

                .mobile-menu-close {
                    display: flex !important;
                }

                .mobile-menu:hover {
                    cursor: pointer;
                }

                .item-grid-title {
                    justify-content: center;
                }    

                .item-grid-container {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 0.5}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 0.5}%;
                    margin-top: ${parseInt(settings.itemGridMarginTop)/2}rem;
                    margin-bottom: ${parseInt(settings.itemGridMarginBottom)/2}rem;
                    padding-left: ${parseInt(settings.itemGridPadding)/2}rem;
                    padding-right: ${parseInt(settings.itemGridPadding)/2}rem;
                }

                .articles-widget {
                    margin-left: ${parseInt(settings.itemGridMarginSides) * 0.5}%;
                    margin-right: ${parseInt(settings.itemGridMarginSides) * 0.5}%;
                    margin-top: ${parseInt(settings.itemGridMarginTop)/2}rem;
                    margin-bottom: ${parseInt(settings.itemGridMarginBottom)/2}rem;
                    padding-left: ${parseInt(settings.itemGridPadding)/2}rem;
                    padding-right: ${parseInt(settings.itemGridPadding)/2}rem;
                }
                
                .item-grid {
                    grid-template-columns: repeat(auto-fit, 280px);
                }

                .category-divider {
                    justify-content: center;
                }

                footer {
                    font-size: 0.9rem;
                }
                
            }
    `;

    function getBackground() {
        if(settings.backgroundType === "COLOR") {
            return settings.backgroundColor;
        }
        else if (settings.backgroundType === "COLOR_GRADIENT") {
            return `linear-gradient(${settings.backgroundGradientTop}, ${settings.backgroundGradientBottom}) center fixed`
        }
        else if (settings.backgroundType === "BACKGROUND_IMAGE") {
            return `${'url(' + settings.backgroundImage + ')'}`
        }
        else {
            return 'none';
        }
    }

    function customFont() {
        if(settings.customFont) {
            const font = 'url(' + settings.customFont + ') format(\'truetype\')'

            return `
                @font-face {
                    font-family: "Custom Font";
                    src: ${font};
                }`
        }
        else {
            return ""
        }
    }
}
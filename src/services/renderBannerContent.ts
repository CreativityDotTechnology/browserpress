import hexRgb from "hex-rgb";
import { PageElement } from "../interfaces";

export function renderBannerContent(element: PageElement) {
    return `<div>
                    <style>
                        .hero-banner-${element.id} {
                            background-image: url('${element.bannerBackgroundImage}');
                            background-size: cover;
                            background-position: center center;
                            background-repeat: no-repeat;
                            width: 100vw;
                            box-sizing: border-box;
                            min-height: ${element.bannerHeight}rem;
                            padding-left: 2rem;
                            padding-right: 2rem;
                            display: flex;
                            align-items: center;
                            justify-content: ${element.bannerTextPosition};
                        }

                        .hero-banner-${element.id} h1 {
                            background-color: ${hexRgb((element.bannerTextBackgroundColor), {
                                alpha: (parseInt(element.bannerTextBackgroundOpacity) / 100), 
                                format: "css"
                            })};
                            color: ${element.bannerTextFontColor};
                            box-sizing: border-box;
                            text-align: ${element.bannerTextAlign};
                            padding: 0.5rem;
                            max-width: ${element.bannerTextWidth}%;
                        }

                        @media (max-width: 700px) { 

                            .hero-banner-${element.id} {
                                justify-content: center;
                                background-image: url('${element.bannerMobileBackgroundImage ? element.bannerMobileBackgroundImage : element.bannerBackgroundImage}');
                            }

                            .hero-banner-${element.id} h1 {
                                max-width: 90%;
                                text-align: center;
                            }
                        }
                    </style>
                    <div class="hero-banner-${element.id}">
                        ${element.bannerText ? `<h1>${element.bannerText}</h1>` : ""}
                    </div>
            </div>`
}
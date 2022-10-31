import {StyleConfigSettings} from '../interfaces';

// JS Object containing the default styles for the website, used to initialise style config
export const initialSettings: StyleConfigSettings = {
    // Branding
    displayName: "",
    copyrightName: "",
    logoImage: null,
    // Font
    customFont: null,
    fontFamily: "Arial",
    // Header
    headerBackgroundColor: "#C0C0C0",
    headerOpacity: "100",
    headerFontColor: "#000000",
    headerTitleFontWeight: "300",
    headerTitleFontSize: "1.2",
    headerMenuFontColor: "#000000",
    // Menu
    enableSeparateMenuBackgroundColor: "false",
    menuBackgroundColor:  "#FFFFFF",
    menuFontColor: "#000000",
    openMenuLabel: "Menu",
    closeMenuLabel: "Close",
    // Body
    backgroundType: "COLOR",
    backgroundGradientTop: "#F1F1F1",
    backgroundGradientBottom: "#F1F1F1",
    backgroundImage: null,
    backgroundColor: "#F1F1F1",
    // Main
    pageContentBackgroundColor: "#FFFFFF",
    pageContentOpacity: "100",
    pageContentFontColor: "#000000",
    pageContentMarginSides: "10",
    pageContentPadding: "2",
    pageContentMarginTop: "4",
    pageContentMarginBottom: "4",
    // Item Grid
    itemGridBackgroundColor: "#FFFFFF",
    itemGridOpacity: "100",
    itemGridFontColor: "#000000",
    itemGridMarginSides: "10",
    itemGridPadding: "2",
    itemGridMarginTop: "4",
    itemGridMarginBottom: "4",
    itemGridCardFontColor: "#000000",
    itemGridCardBackgroundColor: "#FFFFFF",
    itemGridCardBorderColor: "#FFFFFF",
    // Articles
    articlesBackgroundColor: "#FFFFFF",
    articlesOpacity: "100",
    articlesFontColor: "#000000",
    articlesMarginSides: "10",
    articlesPadding: "2",
    articlesMarginTop: "4",
    articlesMarginBottom: "4",
    // Footer
    footerBackgroundColor: "#C0C0C0",
    footerFontColor: "#000000",
    footerBorderEnabled: "true",
    footerBorderColor: "#a9a9a9"
}
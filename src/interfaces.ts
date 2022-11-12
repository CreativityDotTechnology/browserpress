export interface AppState {
    websites: Website[]
}

export interface Website {
    id: string;
    createdDate: Date;
    name: string;
    styleConfig?: StyleConfigSettings;
    pages: Page[];
}

export interface Page {
    id: string;
    name: string;
    elements: PageElement[];
}

export interface PageElement {
    id: string;
    type: PageElementType;
    // Settings if banner
    bannerBackgroundImage?: null  | string | ArrayBuffer;
    bannerMobileBackgroundImage?: null  | string | ArrayBuffer;
    bannerText?: string;
    bannerTextFontColor?: string;
    bannerTextBackgroundColor?: string;
    bannerTextBackgroundOpacity?: string;
    bannerTextPosition?: string;
    bannerTextAlign?: string;
    bannerHeight?: string;
    bannerTextWidth?: string;
    // Settings if text 
    textHTML?: string;
    // Settings if text 
    articles?: Article[];
    // Settings if item grid
    itemGridTitle?: string;
    itemGridCategories?: ItemGridCategory[]
    itemGridItems?: Item[];
}

export interface ItemGridCategory {
    id: string;
    name: string;
    itemIds: string[];
}


export enum PageElementType {
    BANNER = "Banner",
    TEXT = "Text",
    ITEM_GRID = "Item grid",
    ARTICLES = "Articles"
}

export interface EditorState {
    pageId: string | null;
    elementId: string | null;
    tool: string;
    view: string;
}

export interface StateUpdate {
    type: StateUpdateType;
    payload: AddWebsitePayload | DeleteWebsitePayload | SaveStylePayload | SavePagesPayload;
}

export enum StateUpdateType {
    ADD_WEBSITE = "add_website",
    DELETE_WEBSITE="delete_website",
    SAVE_STYLE="save_style",
    SAVE_PAGES="save_pages"
}

export interface AddWebsitePayload {
    name: string;
}

export interface DeleteWebsitePayload {
    id: string;
}

export interface SaveStylePayload {
    id: string;
    styleConfig: StyleConfigSettings;
}

export interface SavePagesPayload {
    id: string;
    pages: Page[];
}

export interface Font {
    name: string;
    value: string;
}

export interface StyleConfigSettings {
        // Branding
        displayName: string;
        copyrightName: string;
        logoImage: null | string | ArrayBuffer;
        faviconImage: null | string | ArrayBuffer;
        browserTabText: string;
        // Font
        customFont: null | string | ArrayBuffer;
        fontFamily: string;
        // Header
        headerBackgroundColor: string;
        headerOpacity: string;
        headerFontColor: string;
        headerTitleFontWeight: string;
        headerTitleFontSize: string;
        headerMenuFontColor: string;
        // Menu
        enableSeparateMenuBackgroundColor: string;
        menuBackgroundColor: string;
        menuFontColor: string;
        openMenuLabel: string;
        closeMenuLabel: string;
        // Body
        backgroundType: string;
        backgroundGradientTop: string;
        backgroundGradientBottom: string;
        backgroundImage: null  | string | ArrayBuffer,
        backgroundColor: string;
        backgroundBlur: string;
        // Main
        pageContentBackgroundColor: string;
        pageContentOpacity: string;
        pageContentFontColor: string;
        pageContentMarginSides: string;
        pageContentPadding: string;
        pageContentMarginTop: string;
        pageContentMarginBottom: string;
        // Item grid
        itemGridBackgroundColor: string;
        itemGridOpacity: string;
        itemGridFontColor: string;
        itemGridMarginSides: string;
        itemGridPadding: string;
        itemGridMarginTop: string;
        itemGridMarginBottom: string;
        itemGridCardFontColor: string;
        itemGridCardBackgroundColor: string;
        itemGridCardBorderColor: string;
        // Articles
        articlesBackgroundColor: string;
        articlesOpacity: string;
        articlesFontColor: string;
        articlesMarginSides: string;
        articlesPadding: string;
        articlesMarginTop: string;
        articlesMarginBottom: string;
        // Footer
        footerBackgroundColor: string;
        footerFontColor: string;
        footerBorderEnabled: string;
        footerBorderColor: string;
}

export interface Item {
    id: string;
    createdDate: Date;
    name: string;
    code?: string;
    gridImage: null  | string | ArrayBuffer;
    gridSummary: string;
    bannerImage: null  | string | ArrayBuffer;
    imageGallery: Array<string | ArrayBuffer>;
    description: string;
}

export interface Article {
    id: string;
    createdDate: Date;
    publicationDate: Date;
    title: string;
    articleImage: null  | string | ArrayBuffer;
    articleHTML: string;
    tags: ArticleTag[]
}

export interface ArticleTag {
    id: string;
    tag: string;
}
import { Page } from "../interfaces";

export function renderPreviewMenu (pages: Page[]) {
    let menuItems = "";
        pages.forEach(page => {
            menuItems += `<li>${page.name}</li>`;
        });
    return menuItems;
}
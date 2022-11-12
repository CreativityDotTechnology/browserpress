import { Page } from "../interfaces";

export function renderPreviewMenu (pages: Page[]) {
    let menuItems = "";
        pages.forEach(page => {
            menuItems += `<li>${page.name}</li>`;
        });
        menuItems += `<li class="mobile-menu-close"><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M1 1L8.707 1L31 23.293L31 31L23.293 31L1 8.707ZM1 31L1 23.293L23.293 1L31 1L31 8.707L8.707 31Z"/>
    </span></svg></li>`
    return menuItems;
}
import { PageElement, Website } from "../interfaces";

export function renderItemGrid(_site: Website, element: PageElement) {

    const itemGrid = element.itemGridCategories.map(category => {

        const categoryItems = category.itemIds.map(id => {
            const item = element.itemGridItems.find(gridItem => gridItem.id === id);
            return `<div class="item-grid-card">
                <div class="item-grid-card-image" 
                    style="background-image: url('${item?.gridImage}');"></div>
                <h4>${item?.name}</h4>
                <p>${item?.gridSummary}</p>
            </div>`
        });

        return `<div class="item-category-section">
                <div class="category-divider">
                    <h3>${category.name}</h3>
                </div>
                <div class="item-grid">
                    ${categoryItems.join("")}
                </div>
            </div>
        `
    })

    return `
            <div class="item-grid-container">
                <h2 class="item-grid-title">${element.itemGridTitle}</h2>
                <hr>
                ${element.itemGridCategories.length > 0 ? itemGrid.join("<hr>") : "<p>No items found...</p>"}
                <hr>
            </div>`

}
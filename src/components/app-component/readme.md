# my-component



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [menu-component](../menu-component)
- [dashboard-component](../dashboard-component)
- [website-wrapper-component](../website-wrapper-component)
- [add-website-component](../add-website-component)

### Graph
```mermaid
graph TD;
  app-component --> menu-component
  app-component --> dashboard-component
  app-component --> website-wrapper-component
  app-component --> add-website-component
  website-wrapper-component --> designer-component
  website-wrapper-component --> editor-component
  designer-component --> website-controls-component
  designer-component --> website-design-menu-component
  designer-component --> website-preview-component
  editor-component --> website-controls-component
  editor-component --> website-content-management-component
  editor-component --> website-preview-component
  website-content-management-component --> page-content-management-component
  style app-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

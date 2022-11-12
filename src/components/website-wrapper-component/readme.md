# website-wrapper-component



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type     | Default     |
| ----------------- | ------------------ | ----------- | -------- | ----------- |
| `route`           | `route`            |             | `string` | `undefined` |
| `selectedWebsite` | `selected-website` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [app-component](../app-component)

### Depends on

- [designer-component](../designer-component)
- [editor-component](../editor-component)

### Graph
```mermaid
graph TD;
  website-wrapper-component --> designer-component
  website-wrapper-component --> editor-component
  designer-component --> website-controls-component
  designer-component --> website-design-menu-component
  designer-component --> website-preview-component
  editor-component --> website-controls-component
  editor-component --> website-content-management-component
  editor-component --> website-preview-component
  website-content-management-component --> page-content-management-component
  app-component --> website-wrapper-component
  style website-wrapper-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

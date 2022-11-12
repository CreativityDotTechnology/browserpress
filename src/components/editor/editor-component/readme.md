# editor-component



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `website` | --        |             | `Website` | `undefined` |


## Dependencies

### Used by

 - [website-wrapper-component](../website-wrapper-component)

### Depends on

- [website-controls-component](../website-controls-component)
- [website-content-management-component](../website-content-management-component)
- [website-preview-component](../website-preview-component)

### Graph
```mermaid
graph TD;
  editor-component --> website-controls-component
  editor-component --> website-content-management-component
  editor-component --> website-preview-component
  website-content-management-component --> page-content-management-component
  website-wrapper-component --> editor-component
  style editor-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

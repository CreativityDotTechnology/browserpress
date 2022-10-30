/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppComponent {
    }
    interface DashboardComponent {
    }
    interface DesignerComponent {
    }
    interface MenuComponent {
    }
}
export interface MenuComponentCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMenuComponentElement;
}
declare global {
    interface HTMLAppComponentElement extends Components.AppComponent, HTMLStencilElement {
    }
    var HTMLAppComponentElement: {
        prototype: HTMLAppComponentElement;
        new (): HTMLAppComponentElement;
    };
    interface HTMLDashboardComponentElement extends Components.DashboardComponent, HTMLStencilElement {
    }
    var HTMLDashboardComponentElement: {
        prototype: HTMLDashboardComponentElement;
        new (): HTMLDashboardComponentElement;
    };
    interface HTMLDesignerComponentElement extends Components.DesignerComponent, HTMLStencilElement {
    }
    var HTMLDesignerComponentElement: {
        prototype: HTMLDesignerComponentElement;
        new (): HTMLDesignerComponentElement;
    };
    interface HTMLMenuComponentElement extends Components.MenuComponent, HTMLStencilElement {
    }
    var HTMLMenuComponentElement: {
        prototype: HTMLMenuComponentElement;
        new (): HTMLMenuComponentElement;
    };
    interface HTMLElementTagNameMap {
        "app-component": HTMLAppComponentElement;
        "dashboard-component": HTMLDashboardComponentElement;
        "designer-component": HTMLDesignerComponentElement;
        "menu-component": HTMLMenuComponentElement;
    }
}
declare namespace LocalJSX {
    interface AppComponent {
    }
    interface DashboardComponent {
    }
    interface DesignerComponent {
    }
    interface MenuComponent {
        "onRouteChange"?: (event: MenuComponentCustomEvent<string>) => void;
    }
    interface IntrinsicElements {
        "app-component": AppComponent;
        "dashboard-component": DashboardComponent;
        "designer-component": DesignerComponent;
        "menu-component": MenuComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-component": LocalJSX.AppComponent & JSXBase.HTMLAttributes<HTMLAppComponentElement>;
            "dashboard-component": LocalJSX.DashboardComponent & JSXBase.HTMLAttributes<HTMLDashboardComponentElement>;
            "designer-component": LocalJSX.DesignerComponent & JSXBase.HTMLAttributes<HTMLDesignerComponentElement>;
            "menu-component": LocalJSX.MenuComponent & JSXBase.HTMLAttributes<HTMLMenuComponentElement>;
        }
    }
}

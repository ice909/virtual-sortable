declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {};
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    getItemHeight: {
        type: import("vue").PropType<(index: number) => number>;
        required: boolean;
    };
    draggable: {
        type: StringConstructor;
        default: string;
    };
    sortable: {
        type: BooleanConstructor;
        default: boolean;
    };
    handle: {
        type: (StringConstructor | FunctionConstructor)[];
        default: undefined;
    };
    group: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    scroller: {
        type: ({
            new (): Document;
            prototype: Document;
            parseHTMLUnsafe(html: string): Document;
        } | {
            new (): HTMLElement;
            prototype: HTMLElement;
        })[];
        default: undefined;
    };
    lockAxis: {
        type: import("vue").PropType<"x" | "y">;
        default: string;
    };
    direction: {
        type: import("vue").PropType<"vertical" | "horizontal">;
        default: string;
    };
    debounceTime: {
        type: NumberConstructor;
        default: number;
    };
    throttleTime: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: NumberConstructor;
        default: number;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollThreshold: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    fallbackOnBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    delayOnTouchOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    ghostClass: {
        type: StringConstructor;
        default: string;
    };
    ghostStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    chosenClass: {
        type: StringConstructor;
        default: string;
    };
    placeholderClass: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {};
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    getItemHeight: {
        type: import("vue").PropType<(index: number) => number>;
        required: boolean;
    };
    draggable: {
        type: StringConstructor;
        default: string;
    };
    sortable: {
        type: BooleanConstructor;
        default: boolean;
    };
    handle: {
        type: (StringConstructor | FunctionConstructor)[];
        default: undefined;
    };
    group: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    scroller: {
        type: ({
            new (): Document;
            prototype: Document;
            parseHTMLUnsafe(html: string): Document;
        } | {
            new (): HTMLElement;
            prototype: HTMLElement;
        })[];
        default: undefined;
    };
    lockAxis: {
        type: import("vue").PropType<"x" | "y">;
        default: string;
    };
    direction: {
        type: import("vue").PropType<"vertical" | "horizontal">;
        default: string;
    };
    debounceTime: {
        type: NumberConstructor;
        default: number;
    };
    throttleTime: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: NumberConstructor;
        default: number;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollThreshold: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    fallbackOnBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    delayOnTouchOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    ghostClass: {
        type: StringConstructor;
        default: string;
    };
    ghostStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    chosenClass: {
        type: StringConstructor;
        default: string;
    };
    placeholderClass: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    animation: number;
    direction: "vertical" | "horizontal";
    sortable: boolean;
    draggable: string;
    handle: string | Function;
    group: string | Record<string, any>;
    lockAxis: "x" | "y";
    disabled: boolean;
    autoScroll: boolean;
    scrollThreshold: number;
    delay: number;
    delayOnTouchOnly: boolean;
    chosenClass: string;
    placeholderClass: string;
    ghostStyle: Record<string, any>;
    ghostClass: string;
    fallbackOnBody: boolean;
    dataKey: string;
    scroller: HTMLElement | Document;
    debounceTime: number;
    throttleTime: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;

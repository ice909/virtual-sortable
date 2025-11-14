import { Ref } from 'vue';
export type VirtualListExpose = {
    containerProps: {
        ref: Ref<HTMLElement | null>;
        onScroll: () => void;
        style: object;
    };
    scrollToKey: (key: string | number) => void;
    scrollToIndex: (index: number) => void;
    scrollToBottom: () => void;
    scrollToTop: () => void;
    getClientSize: () => {
        width: number;
        height: number;
    };
    getWrapperSize: () => {
        width: number;
        height: number;
    };
    getIndexByKey: (key: string | number) => number;
    getItemByPosition: (y: number) => {
        item: any;
        index: number;
    };
};
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {};
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    scrollbar: {
        type: BooleanConstructor;
        default: boolean;
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
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("bottom" | "top" | "drag" | "drop" | "update:modelValue" | "dragChange" | "rangeChange")[], "bottom" | "top" | "drag" | "drop" | "update:modelValue" | "dragChange" | "rangeChange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {};
    dataKey: {
        type: StringConstructor;
        default: string;
        required: boolean;
    };
    scrollbar: {
        type: BooleanConstructor;
        default: boolean;
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
}>> & Readonly<{
    onDrag?: ((...args: any[]) => any) | undefined;
    onDrop?: ((...args: any[]) => any) | undefined;
    onDragChange?: ((...args: any[]) => any) | undefined;
    onBottom?: ((...args: any[]) => any) | undefined;
    onTop?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onRangeChange?: ((...args: any[]) => any) | undefined;
}>, {
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
    scrollbar: boolean;
    scroller: HTMLElement | Document;
    debounceTime: number;
    throttleTime: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;

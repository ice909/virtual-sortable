import { PropType } from 'vue';
type Direction = 'vertical' | 'horizontal';
type LockAxis = 'x' | 'y';
type GetItemHeightFn = (index: number) => number;
export declare const VirtualProps: {
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
        type: PropType<GetItemHeightFn>;
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
        type: PropType<LockAxis>;
        default: string;
    };
    direction: {
        type: PropType<Direction>;
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
};
export declare const ItemProps: {
    dataKey: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    sizeKey: {
        type: StringConstructor;
        default: string;
    };
};
export {};

import Dnd from '../sortable-dnd';
import { Group, ScrollSpeed, SortableEvent } from '../types';
export type EmitEvents = 'onDrag' | 'onDragChange' | 'onDrop' | 'onChoose' | 'onUnchoose';
export interface DragEvent<T> {
    item: T;
    key: string | number;
    index?: number;
    event: SortableEvent;
}
export interface DragChangeEvent<T> {
    item: T;
    key: string | number;
    oldIndex: number;
    newIndex: number;
    event: SortableEvent;
}
export interface DropEvent<T> {
    key: string | number;
    item: T;
    list: T[];
    event: SortableEvent;
    changed: boolean;
    oldList: T[];
    oldIndex: number;
    newIndex: number;
}
export interface SortableOptions<T> {
    list: T[];
    uniqueKeys: (string | number)[];
    delay?: number;
    group?: string | Group;
    handle?: string;
    lockAxis?: 'x' | 'y';
    disabled?: boolean;
    sortable?: boolean;
    draggable?: string;
    animation?: number;
    autoScroll?: boolean;
    ghostClass?: string;
    ghostStyle?: object;
    chosenClass?: string;
    placeholderClass?: string;
    scrollSpeed?: ScrollSpeed;
    fallbackOnBody?: boolean;
    scrollThreshold?: number;
    delayOnTouchOnly?: boolean;
    onDrag?: (event: DragEvent<T>) => void;
    onDragChange?: (event: SortableEvent) => void;
    onDrop?: (event: DropEvent<T>) => void;
    onChoose?: (event: SortableEvent) => void;
    onUnchoose?: (event: SortableEvent) => void;
}
export declare const SortableAttrs: string[];
export declare class Sortable<T> {
    el: HTMLElement;
    options: SortableOptions<T>;
    sortable: Dnd;
    rangeChanged: boolean;
    constructor(el: HTMLElement, options: SortableOptions<T>);
    destroy(): void;
    option<K extends keyof SortableOptions<T>>(key: K, value: SortableOptions<T>[K]): void;
    private installSortable;
    private onChoose;
    private onUnchoose;
    private onDrag;
    private onDragChange;
    private onDrop;
    private handleDropEvent;
    private getIndex;
    private dispatchEvent;
}

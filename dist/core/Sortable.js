import Dnd from '../sortable-dnd';
import { isSameValue } from './utils';
export const SortableAttrs = [
    'delay',
    'group',
    'handle',
    'lockAxis',
    'disabled',
    'sortable',
    'draggable',
    'animation',
    'autoScroll',
    'ghostClass',
    'ghostStyle',
    'chosenClass',
    'scrollSpeed',
    'fallbackOnBody',
    'scrollThreshold',
    'delayOnTouchOnly',
    'placeholderClass',
];
export class Sortable {
    constructor(el, options) {
        this.el = el;
        this.options = options;
        this.rangeChanged = false;
        this.installSortable();
    }
    destroy() {
        this.sortable.destroy();
        this.rangeChanged = false;
    }
    option(key, value) {
        this.options[key] = value;
        if (SortableAttrs.includes(key)) {
            this.sortable.option(key, value);
        }
    }
    installSortable() {
        const props = SortableAttrs.reduce((res, key) => {
            res[key] = this.options[key];
            return res;
        }, {});
        this.sortable = new Dnd(this.el, {
            ...props,
            emptyInsertThreshold: 0,
            swapOnDrop: (event) => event.from === event.to,
            removeCloneOnDrop: (event) => event.from === event.to,
            onDrag: (event) => this.onDrag(event),
            onDrop: (event) => this.onDrop(event),
            onDragChange: (event) => this.onDragChange(event),
            onChoose: (event) => this.onChoose(event),
            onUnchoose: (event) => this.onUnchoose(event),
        });
    }
    onChoose(event) {
        this.dispatchEvent('onChoose', event);
    }
    onUnchoose(event) {
        this.dispatchEvent('onUnchoose', event);
    }
    onDrag(event) {
        const dataKey = event.node.getAttribute('data-key');
        const index = this.getIndex(dataKey);
        const item = this.options.list[index];
        const key = this.options.uniqueKeys[index];
        // store the dragged item
        this.sortable.option('store', { item, key, index, oldIndex: index });
        this.dispatchEvent('onDrag', { item, key, index, event });
    }
    // 拖拽位置变化
    onDragChange(event) {
        var _a;
        const storedData = (_a = Dnd.get(event.from)) === null || _a === void 0 ? void 0 : _a.option('store');
        const oldIndex = storedData ? storedData.oldIndex : -1;
        const draggedKey = storedData ? storedData.key : null;
        const targetKey = event.target.getAttribute('data-key');
        let newIndex = this.getIndex(targetKey);
        const currentDraggedIndex = this.getIndex(draggedKey);
        // 使用当前拖拽项的实际索引来判断方向
        if ((currentDraggedIndex < newIndex && event.relative === -1) ||
            (currentDraggedIndex > newIndex && event.relative === 1)) {
            newIndex += event.relative;
        }
        if (oldIndex === newIndex) {
            return;
        }
        const params = {
            key: targetKey,
            oldIndex,
            newIndex,
            event,
            item: this.options.list[newIndex],
        };
        this.sortable.option('store').oldIndex = newIndex;
        this.dispatchEvent('onDragChange', params);
    }
    onDrop(event) {
        var _a, _b, _c;
        const { item, key, index } = (_a = Dnd.get(event.from)) === null || _a === void 0 ? void 0 : _a.option('store');
        const list = this.options.list;
        const params = {
            key,
            item,
            list,
            event,
            changed: false,
            oldList: [...list],
            oldIndex: index,
            newIndex: index,
        };
        if (!(event.from === event.to && event.node === event.target)) {
            this.handleDropEvent(event, params, index);
        }
        this.dispatchEvent('onDrop', params);
        if (event.from === this.el && this.rangeChanged) {
            (_b = Dnd.dragged) === null || _b === void 0 ? void 0 : _b.remove();
        }
        if (event.from !== event.to) {
            (_c = Dnd.clone) === null || _c === void 0 ? void 0 : _c.remove();
        }
        this.rangeChanged = false;
    }
    handleDropEvent(event, params, index) {
        const targetKey = event.target.getAttribute('data-key');
        let newIndex = -1;
        let oldIndex = index;
        // changes position in current list
        if (event.from === event.to) {
            // re-get the dragged element's index
            oldIndex = this.getIndex(params.key);
            newIndex = this.getIndex(targetKey);
            if ((oldIndex < newIndex && event.relative === -1) ||
                (oldIndex > newIndex && event.relative === 1)) {
                newIndex += event.relative;
            }
            if (newIndex !== oldIndex) {
                params.list.splice(oldIndex, 1);
                params.list.splice(newIndex, 0, params.item);
            }
        }
        else {
            // remove from
            if (event.from === this.el) {
                oldIndex = this.getIndex(params.key);
                params.list.splice(oldIndex, 1);
            }
            // added to
            if (event.to === this.el) {
                oldIndex = -1;
                newIndex = this.getIndex(targetKey);
                if (event.relative === 0) {
                    // added to last
                    newIndex = params.list.length;
                }
                else if (event.relative === 1) {
                    newIndex += event.relative;
                }
                params.list.splice(newIndex, 0, params.item);
            }
        }
        params.changed = event.from !== event.to || newIndex !== oldIndex;
        params.oldIndex = oldIndex;
        params.newIndex = newIndex;
    }
    getIndex(key) {
        if (key === null || key === undefined) {
            return -1;
        }
        const { uniqueKeys } = this.options;
        for (let i = 0, len = uniqueKeys.length; i < len; i++) {
            if (isSameValue(uniqueKeys[i], key)) {
                return i;
            }
        }
        return -1;
    }
    dispatchEvent(name, params) {
        const cb = this.options[name];
        cb && cb(params);
    }
}

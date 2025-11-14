import { computed, defineComponent, isRef, onBeforeMount, onMounted, ref, watch, } from 'vue';
import { VirtualProps } from './props';
import { useVirtualList } from '@vueuse/core';
import { isSameValue, Sortable, SortableAttrs, } from './core';
import Item from './item';
import { ScrollBar } from '@lazycatcloud/lzc-toolkit';
const getList = (source) => {
    return isRef(source) ? source.value : source;
};
function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey)
        ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
        : dataKey).reduce((o, k) => (o || {})[k], item);
}
export default defineComponent({
    props: VirtualProps,
    emits: [
        'update:modelValue',
        'top',
        'bottom',
        'drag',
        'dragChange',
        'drop',
        'rangeChange',
    ],
    setup(props, { emit, slots, expose }) {
        const data = ref([]);
        const dragging = ref(false);
        const wrapperRef = ref(null);
        let uniqueKeys = [];
        let sortable;
        const chosenKey = ref('');
        const heightMap = ref(new Map());
        const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(data, {
            itemHeight: props.getItemHeight,
            overscan: 30,
        });
        const updateUniqueKeys = () => {
            uniqueKeys = data.value.map((item) => getDataKey(item, props.dataKey));
            sortable === null || sortable === void 0 ? void 0 : sortable.option('uniqueKeys', uniqueKeys);
        };
        function onModelUpdate() {
            const _data = getList(props.modelValue);
            if (!_data)
                return;
            data.value = _data;
            updateUniqueKeys();
            sortable === null || sortable === void 0 ? void 0 : sortable.option('list', _data);
            emit('update:modelValue', _data);
        }
        watch(() => [props.modelValue], () => {
            onModelUpdate();
        }, {
            deep: true,
        });
        const onDrag = (event) => {
            dragging.value = true;
            if (!props.sortable) {
                sortable.option('autoScroll', false);
            }
            emit('drag', event);
        };
        const onDrop = (event) => {
            dragging.value = false;
            sortable.option('autoScroll', props.autoScroll);
            if (event.changed) {
                emit('update:modelValue', event.list);
            }
            emit('drop', event);
        };
        const onDragChange = (event) => {
            emit('dragChange', event);
        };
        const onChoose = (event) => {
            chosenKey.value = event.node.getAttribute('data-key');
        };
        const onUnchoose = () => {
            chosenKey.value = '';
        };
        function onItemResized(size, key) {
            if (isSameValue(key, chosenKey.value)) {
                return;
            }
            heightMap.value.set(key, size);
        }
        const sortableAttributes = computed(() => {
            return SortableAttrs.reduce((res, key) => {
                res[key] = props[key];
                return res;
            }, {});
        });
        watch(sortableAttributes, (newVal, oldVal) => {
            if (!sortable)
                return;
            for (let key in newVal) {
                if (newVal[key] !== oldVal[key]) {
                    sortable.option(key, newVal[key]);
                }
            }
        });
        function installSortable() {
            sortable = new Sortable(containerProps.ref.value, {
                ...sortableAttributes.value,
                list: data.value,
                uniqueKeys: uniqueKeys,
                onDrag,
                onDrop,
                onChoose,
                onUnchoose,
                onDragChange,
            });
        }
        function calcScrollTopByKey(key) {
            var _a;
            let top = 0;
            const listData = data.value;
            for (let i = 0; i < listData.length; i++) {
                const k = getDataKey(listData[i], props.dataKey);
                if (k === key)
                    break;
                top += (_a = heightMap.value.get(k)) !== null && _a !== void 0 ? _a : props.getItemHeight(i);
            }
            return top;
        }
        function scrollToIndex(index) {
            if (scrollTo) {
                scrollTo(index);
            }
        }
        function scrollToKey(key) {
            const index = data.value.findIndex((item) => {
                return isSameValue(getDataKey(item, props.dataKey), key);
            });
            if (index === -1)
                return;
            const container = containerProps.ref.value;
            if (!container)
                return;
            const top = calcScrollTopByKey(key);
            container.scrollTo({
                top,
                behavior: 'smooth',
            });
        }
        function scrollToBottom() {
            scrollToIndex(data.value.length - 1);
        }
        function scrollToTop() {
            scrollToIndex(0);
        }
        function getClientSize() {
            var _a, _b;
            return {
                width: ((_a = containerProps.ref.value) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0,
                height: ((_b = containerProps.ref.value) === null || _b === void 0 ? void 0 : _b.clientHeight) || 0,
            };
        }
        function getWrapperSize() {
            var _a, _b;
            return {
                width: ((_a = wrapperRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0,
                height: ((_b = wrapperRef.value) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0,
            };
        }
        function getIndexByKey(key) {
            return data.value.findIndex((item) => {
                return isSameValue(getDataKey(item, props.dataKey), key);
            });
        }
        onBeforeMount(() => {
            onModelUpdate();
        });
        onMounted(() => {
            installSortable();
        });
        expose({
            containerProps,
            wrapperRef,
            getClientSize,
            getWrapperSize,
            getIndexByKey,
            scrollToKey,
            scrollToBottom,
            scrollToTop,
            scrollToIndex,
        });
        const currentScrollTop = ref(0);
        const handleScroll = (e) => {
            currentScrollTop.value = e.target.scrollTop;
            const el = e.target;
            if (el.scrollHeight - el.scrollTop === el.clientHeight) {
                emit('bottom');
            }
            else if (el.scrollTop === 0) {
                emit('top');
            }
        };
        return () => (<div>
        <div {...containerProps} style={{ position: 'absolute', width: '100%', height: '100%' }} onScroll={handleScroll}>
          <div ref={wrapperRef} {...wrapperProps.value}>
            {list.value.map((item) => {
                const dataKey = getDataKey(item.data, props.dataKey);
                const isHidden = dragging.value && isSameValue(dataKey, chosenKey.value);
                return (<Item key={dataKey} dataKey={dataKey} style={{
                        display: isHidden ? 'none' : 'flex',
                    }} sizeKey="offsetHeight" onResize={onItemResized} v-slots={{
                        default: () => { var _a; return (_a = slots.item) === null || _a === void 0 ? void 0 : _a.call(slots, { item: item.data, index: item.index }); },
                    }}></Item>);
            })}
          </div>
        </div>
        {props.scrollbar && (<ScrollBar scroll-top={currentScrollTop.value} containerEl={containerProps.ref.value}/>)}
      </div>);
    },
});

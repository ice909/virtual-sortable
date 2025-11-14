import {
  computed,
  defineComponent,
  isRef,
  onBeforeMount,
  onMounted,
  Ref,
  ref,
  watch,
} from 'vue';
import { VirtualProps } from './props';
import { useVirtualList } from '@vueuse/core';
import {
  DragEvent,
  DropEvent,
  isSameValue,
  Sortable,
  SortableAttrs,
  SortableOptions,
} from './core';
import { SortableEvent } from './types';
import Item from './item';
import { ScrollBar } from '@lazycatcloud/lzc-toolkit';

const getList = (source: any) => {
  return isRef(source) ? source.value : source;
};

function getDataKey(item, dataKey: string | string[]): string | number {
  return (
    !Array.isArray(dataKey)
      ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.')
      : dataKey
  ).reduce((o, k) => (o || {})[k], item);
}

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
  getClientSize: () => { width: number; height: number };
  getWrapperSize: () => { width: number; height: number };
  getIndexByKey: (key: string | number) => number;
  getItemByPosition: (y: number) => { item: any; index: number };
};

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
    const data = ref<any[]>([]);
    const dragging = ref<boolean>(false);
    const wrapperRef = ref<HTMLElement | null>(null);
    let uniqueKeys: (string | number)[] = [];
    let sortable: Sortable<any>;
    const chosenKey = ref<string>('');
    const heightMap = ref<Map<string | number, number>>(new Map());

    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
      data,
      {
        itemHeight: props.getItemHeight!,
        overscan: 30,
      },
    );

    const updateUniqueKeys = () => {
      uniqueKeys = data.value.map((item) => getDataKey(item, props.dataKey));
      sortable?.option('uniqueKeys', uniqueKeys);
    };

    function onModelUpdate() {
      const _data = getList(props.modelValue);
      if (!_data) return;
      data.value = _data;

      updateUniqueKeys();

      sortable?.option('list', _data);

      emit('update:modelValue', _data);
    }

    watch(
      () => [props.modelValue],
      () => {
        onModelUpdate();
      },
      {
        deep: true,
      },
    );

    const onDrag = (event: DragEvent<any>) => {
      dragging.value = true;
      if (!props.sortable) {
        sortable.option('autoScroll', false);
      }
      emit('drag', event);
    };

    const onDrop = (event: DropEvent<any>) => {
      dragging.value = false;

      sortable.option('autoScroll', props.autoScroll);

      if (event.changed) {
        emit('update:modelValue', event.list);
      }
      emit('drop', event);
    };

    const onDragChange = (event: SortableEvent) => {
      emit('dragChange', event);
    };

    const onChoose = (event: SortableEvent) => {
      chosenKey.value = event.node.getAttribute('data-key') as string;
    };

    const onUnchoose = () => {
      chosenKey.value = '';
    };

    function onItemResized(size: number, key: string | number) {
      if (isSameValue(key, chosenKey.value)) {
        return;
      }
      heightMap.value.set(key, size);
    }

    const sortableAttributes = computed(() => {
      return SortableAttrs.reduce(
        (res, key) => {
          res[key] = props[key as keyof typeof props];
          return res;
        },
        {} as Record<string, any>,
      );
    });

    watch(sortableAttributes, (newVal, oldVal) => {
      if (!sortable) return;
      for (let key in newVal) {
        if (newVal[key] !== oldVal[key]) {
          sortable.option(key as keyof SortableOptions<any>, newVal[key]);
        }
      }
    });
    function installSortable() {
      sortable = new Sortable(containerProps.ref.value!, {
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

    function calcScrollTopByKey(key: string | number) {
      let top = 0;
      const listData = data.value;

      for (let i = 0; i < listData.length; i++) {
        const k = getDataKey(listData[i], props.dataKey);

        if (k === key) break;

        top += heightMap.value.get(k) ?? props.getItemHeight!(i);
      }

      return top;
    }

    function scrollToIndex(index: number) {
      if (scrollTo) {
        scrollTo(index);
      }
    }

    function scrollToKey(key: string | number) {
      const index = data.value.findIndex((item) => {
        return isSameValue(getDataKey(item, props.dataKey), key);
      });

      if (index === -1) return;

      const container = containerProps.ref.value;
      if (!container) return;

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
      return {
        width: containerProps.ref.value?.clientWidth || 0,
        height: containerProps.ref.value?.clientHeight || 0,
      };
    }

    function getWrapperSize() {
      return {
        width: wrapperRef.value?.offsetWidth || 0,
        height: wrapperRef.value?.offsetHeight || 0,
      };
    }

    function getIndexByKey(key: string | number) {
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

    const handleScroll = (e: Event) => {
      currentScrollTop.value = (e.target as HTMLElement).scrollTop;
      const el = e.target as HTMLElement;
      if (el.scrollHeight - el.scrollTop === el.clientHeight) {
        emit('bottom');
      } else if (el.scrollTop === 0) {
        emit('top');
      }
    };

    return () => (
      <div>
        <div
          {...containerProps}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          onScroll={handleScroll}
        >
          <div ref={wrapperRef} {...wrapperProps.value}>
            {list.value.map((item) => {
              const dataKey = getDataKey(item.data, props.dataKey);
              const isHidden =
                dragging.value && isSameValue(dataKey, chosenKey.value);
              return (
                <Item
                  key={dataKey}
                  dataKey={dataKey}
                  style={{
                    display: isHidden ? 'none' : 'flex',
                  }}
                  sizeKey="offsetHeight"
                  onResize={onItemResized}
                  v-slots={{
                    default: () =>
                      slots.item?.({ item: item.data, index: item.index }),
                  }}
                ></Item>
              );
            })}
          </div>
        </div>
        {props.scrollbar && (
          <ScrollBar
            scroll-top={currentScrollTop.value}
            containerEl={containerProps.ref.value}
          />
        )}
      </div>
    );
  },
});

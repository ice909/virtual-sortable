import { defineComponent, ref, watch } from 'vue';
import VirtualList from '../src/VirtualSortable';
import { v4 } from 'uuid';
import { DragChangeEvent } from '../src/core';
import Done from './Done';
import DoneHeader from './DoneHeader';
import Todo from './Todo';

export interface Data {
  id: string;
  key: string;
  index: number;
  title: string;
  type: string;
}

type BaseVirtualListInstance = InstanceType<typeof VirtualList>;

interface VirtualListPublicMethods {
  getClientSize: () => { width: number; height: number };
  getWrapperSize: () => { width: number; height: number };
  scrollToKey: (key: string | number) => void;
  scrollToBottom: () => void;
  scrollToTop: () => void;
  scrollToIndex: (index: number) => void;
}

type VirtualListInstance = BaseVirtualListInstance & VirtualListPublicMethods;

export default defineComponent({
  name: 'App',
  setup() {
    const data = ref<Data[]>([]);
    const isHiddenDone = ref(false);
    const collapsedDone = ref(false);
    const virtualListRef = ref<VirtualListInstance | null>(null);
    const keyToScroll = ref('');
    const indexToScroll = ref<number | string>('');
    const clientSize = ref<{ width: number; height: number }>({
      width: 0,
      height: 0,
    });
    const wrapperSize = ref<{ width: number; height: number }>({
      width: 0,
      height: 0,
    });

    function handleScrollToKey() {
      if (virtualListRef.value && keyToScroll.value) {
        virtualListRef.value.scrollToKey(keyToScroll.value);
        console.log(`Attempting to scroll to key: ${keyToScroll.value}`);
      } else {
        console.warn('VirtualList component not ready or key is empty.');
      }
    }

    function updateSizes() {
      if (virtualListRef.value) {
        clientSize.value = virtualListRef.value.getClientSize();
        wrapperSize.value = virtualListRef.value.getWrapperSize();
      }
    }

    function handleScrollToIndex() {
      const index = Number(indexToScroll.value);
      if (virtualListRef.value && !isNaN(index)) {
        virtualListRef.value.scrollToIndex(index);
      }
    }

    watch(data, updateSizes, { immediate: true });

    function initData() {
      console.time('initData');
      let _data: Data[] = [];
      for (let i = 0; i < 5000; i++) {
        const id = v4().toString();
        _data.push({
          id: id,
          key: `item-${i}`,
          index: i,
          title: id,
          type: 'todo',
        });
      }
      if (!isHiddenDone.value) {
        _data.push({
          id: 'done-header',
          key: 'done-header',
          index: 5000,
          title: '已完成',
          type: 'done-header',
        });
        if (!collapsedDone.value) {
          for (let i = 0; i < 500; i++) {
            const id = v4().toString();
            _data.push({
              id: id,
              key: `item-${i}`,
              index: i,
              title: id,
              type: 'done',
            });
          }
        }
      }
      data.value = _data;
      console.timeEnd('initData');
    }

    initData();

    watch([isHiddenDone, collapsedDone], () => {
      initData();
    });

    function getItemHeight(index: number) {
      const item = data.value[index];
      if (item.type === 'todo') return 48;
      if (item.type === 'done-header') return 32;
      return 30;
    }

    return () => (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* 左侧虚拟拖拽区 */}
        <div
          style={{
            flex: '1 1 0%',
            borderRight: '1px solid #ddd',
            position: 'relative',
          }}
        >
          <VirtualList
            ref={virtualListRef}
            v-model={data.value}
            draggable='div[data-draggable="true"]'
            getItemHeight={getItemHeight}
            dataKey="id"
            v-slots={{
              item: ({
                item,
              }: {
                item: Data;
                index: number;
                dataKey: string;
              }) => {
                if (item.type === 'todo') return <Todo item={item} />;
                if (item.type === 'done-header')
                  return (
                    <DoneHeader
                      item={item}
                      collapsed={collapsedDone.value}
                      onCollapsed={() =>
                        (collapsedDone.value = !collapsedDone.value)
                      }
                    />
                  );

                if (item.type === 'done') {
                  return <Done item={item} />;
                }
              },
            }}
          />
        </div>

        {/* 右侧调试展示区 */}
        <div
          style={{
            width: '560px',
            overflowY: 'auto',
            background: '#fafafa',
          }}
        >
          <div
            style={{
              width: 'auto',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                padding: '10px',
                borderRadius: '4px',
              }}
            >
              <h4>ScrollToKey Test</h4>
              <input
                type="text"
                placeholder="Enter Item ID (dataKey)"
                value={keyToScroll.value}
                onInput={(e) =>
                  (keyToScroll.value = (e!.target! as HTMLInputElement).value)
                }
                style={{
                  padding: '8px',
                  marginRight: '10px',
                  width: '70%',
                  border: '1px solid #ddd',
                }}
              />
              <button
                onClick={handleScrollToKey}
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Scroll
              </button>
            </div>
            <div
              style={{
                padding: '10px',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <h4>Navigation Control</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => virtualListRef.value?.scrollToTop()}>
                  Scroll To Top
                </button>
                <button onClick={() => virtualListRef.value?.scrollToBottom()}>
                  Scroll To Bottom
                </button>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <input
                  type="number"
                  placeholder="Index to Scroll"
                  value={indexToScroll.value}
                  onInput={(e) =>
                    (indexToScroll.value = (
                      e!.target! as HTMLInputElement
                    ).value)
                  }
                  style={{
                    padding: '8px',
                    width: '100px',
                    border: '1px solid #ddd',
                  }}
                />
                <button onClick={handleScrollToIndex}>Scroll To Index</button>
              </div>
            </div>

            <div
              style={{
                padding: '10px',
                borderRadius: '4px',
              }}
            >
              <h4>
                Size/Status Query <button onClick={updateSizes}>Refresh</button>
              </h4>
              <p>
                Client Size (Viewport): width: {clientSize.value.width}px,
                height: {clientSize.value.height} px
              </p>
              <p>
                Wrapper Size (Placeholder): width: {wrapperSize.value.width}px,
                height: {wrapperSize.value.height} px
              </p>
            </div>
            <button
              style={{ marginBottom: '10px' }}
              onClick={() => (isHiddenDone.value = !isHiddenDone.value)}
            >
              {isHiddenDone.value ? 'Show Done' : 'Hidden Done'}
            </button>
            <pre
              style={{
                fontSize: '12px',
                lineHeight: '1.4',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                background: '#fff',
                fontWeight: '500',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #eee',
              }}
            >
              {JSON.stringify(
                data.value.map((item, idx) => ({
                  index: item.index,
                  id: item.id,
                  title: item.title,
                })),
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      </div>
    );
  },
});

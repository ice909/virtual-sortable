import { defineComponent, ref } from 'vue';
import VirrualSortable from '../src/VirtualSortable';
import { v4 } from 'uuid';
import { DragChangeEvent } from '../src/core';

interface Data {
  id: string;
  key: string;
  index: number;
  title: string;
}

export default defineComponent({
  name: 'App',
  setup() {
    const data = ref<Data[]>([]);

    function initData() {
      let _data: Data[] = [];
      for (let i = 0; i < 500; i++) {
        _data.push({
          id: v4().toString(),
          key: `item-${i}`,
          index: i,
          title: `Item ${i}`,
        });
      }
      data.value = _data;
    }

    initData();

    function onDragChange(e: DragChangeEvent<any>) {
      // console.log("onDragChange", e)
    }

    return () => (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          gap: '50px',
        }}
      >
        {/* 左侧虚拟拖拽区 */}
        <div style={{ flex: '1 1 0%', borderRight: '1px solid #ddd' }}>
          <VirrualSortable
            v-model={data.value}
            style={{
              height: "100vh"
            }}
            dataKey="id"
            keeps={50}
            onDragChange={onDragChange}
            placeholderClass="ghost-class"
            v-slots={{
              item: ({
                record,
              }: {
                record: Data;
                index: number;
                dataKey: string;
              }) => {
                return (
                  <div
                    data-key={record.id}
                    data-id={record.id}
                    style={{
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      background: '#fff',
                      borderRadius: '8px',
                      margin: '6px 8px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      border: '1px solid #e5e7eb',
                      cursor: 'grab',
                      transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                  >
                    <span class="content" style={{ userSelect: 'none' }}>
                      {record.title}
                    </span>
                  </div>
                );
              },
            }}
          ></VirrualSortable>
        </div>

        {/* 右侧调试展示区 */}
        <div
          style={{
            width: '560px',
            overflowY: 'auto',
            background: '#fafafa',
          }}
        >

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
    );
  },
});

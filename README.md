# vue3-virtual-sortable-enhanced

A high-performance virtual scrolling list component that supports drag-and-drop sorting for Vue 3.

**Key Enhancement**: The original custom virtualization engine has been replaced with the reliable and performant useVirtualList hook from @vueuse/core.

## Core Technology Stack

This component combines two powerful libraries for its core functionality:

**Virtualization**: Based on useVirtualList from @vueuse/core.

**Drag-and-Drop**: Built upon the robust and configuration-rich features of [mfuu/sortable-dnd](https://github.com/mfuu/sortable-dnd).

## Install

To ensure proper scope, the package name is:

```bash
pnpm i vue3-virtual-sortable-enhanced
```

## Simple Usage

For a complete and runnable example demonstrating dynamic item sizing, custom item components (<Todo>, <Done>), and the exported methods API (scrollToKey, getClientSize, etc.), please refer to the main example file in the repository.

Quick Look (App.tsx Snippet)
This component requires the v-model data array, a unique dataKey, and the mandatory getItemHeight function to correctly calculate scroll positions for variable-sized items.

```TypeScript

import VirtualList from '@ice909/virtual-sortable';
import { ref } from 'vue';

const data = ref(/* Your List Data */);
const virtualListRef = ref<VirtualListInstance>(null);

function getItemHeight(index: number): number {
  const item = data.value[index];
  return item.type === 'todo' ? 48 : 30;
}

return () => (
    <VirtualList
        ref={virtualListRef}
        v-model={data.value}
        dataKey="id"
        getItemHeight={getItemHeight}
        draggable='div[data-draggable="true"]'
        // ... slots for rendering items ...
    />
);

function jumpToKey(key: string) {
    virtualListRef.value?.scrollToKey(key);
}

```

## Full Example

For the full implementation, including:

Usage of exported methods (scrollToKey, getClientSize, etc.).

Integration of custom item components (\<Todo\>, \<DoneHeader\>).

Complete setup for variable item heights.

Please see the complete example file: [example/App.tsx](/example/App.tsx)

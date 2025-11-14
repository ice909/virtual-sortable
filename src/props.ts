import { PropType } from 'vue';

type Direction = 'vertical' | 'horizontal';
type LockAxis = 'x' | 'y';
type GetItemHeightFn = (index: number) => number;

export const VirtualProps = {
  modelValue: {},
  dataKey: {
    type: String,
    default: '',
    required: true,
  },
  scrollbar: {
    type: Boolean,
    default: false,
  },
  getItemHeight: {
    type: Function as PropType<GetItemHeightFn>,
    required: true,
  },
  draggable: {
    type: String,
    default: '[role="item"]',
  },
  sortable: {
    type: Boolean,
    default: true,
  },
  handle: {
    type: [Function, String],
    default: undefined,
  },
  group: {
    type: [Object, String],
    default: undefined,
  },
  scroller: {
    type: [Document, HTMLElement],
    default: undefined,
  },
  lockAxis: {
    type: String as PropType<LockAxis>,
    default: '',
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'vertical',
  },
  debounceTime: {
    type: Number,
    default: 0,
  },
  throttleTime: {
    type: Number,
    default: 0,
  },
  animation: {
    type: Number,
    default: 150,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  scrollThreshold: {
    type: Number,
    default: 55,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fallbackOnBody: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 0,
  },
  delayOnTouchOnly: {
    type: Boolean,
    default: false,
  },
  ghostClass: {
    type: String,
    default: '',
  },
  ghostStyle: {
    type: Object,
    default: () => ({}),
  },
  chosenClass: {
    type: String,
    default: '',
  },
  placeholderClass: {
    type: String,
    default: '',
  },
};

export const ItemProps = {
  dataKey: {
    type: [String, Number],
    default: undefined,
  },
  sizeKey: {
    type: String,
    default: 'offsetHeight',
  },
};

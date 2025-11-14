import { h, defineComponent } from 'vue';
import { ItemProps } from './props';
const createSlot = ({ mounted, updated, unmounted }) => {
    return defineComponent({
        props: ['vnode'],
        mounted() {
            mounted(this.$el);
        },
        onUpdated() {
            updated(this.$el);
        },
        onUnmounted() {
            unmounted(this.$el);
        },
        render(props) {
            return props.vnode;
        },
    });
};
const Item = defineComponent({
    props: ItemProps,
    emits: ['resize'],
    setup(props, { emit, slots }) {
        let observer = null;
        const onSizeChange = (el) => {
            const size = el ? el[props.sizeKey] : 0;
            emit('resize', size, props.dataKey);
        };
        const mounted = (el) => {
            if (typeof ResizeObserver !== 'undefined') {
                observer = new ResizeObserver(() => {
                    onSizeChange(el);
                });
                el && observer.observe(el);
            }
        };
        const updated = (el) => {
            onSizeChange(el);
        };
        const unmounted = () => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
        };
        const customSlot = createSlot({ mounted, updated, unmounted });
        return () => {
            var _a;
            const { dataKey } = props;
            const [defaultSlot] = ((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || [];
            return h(customSlot, {
                key: dataKey,
                role: 'item',
                vnode: defaultSlot,
                'data-key': dataKey,
            }, { default: () => { var _a; return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots); } });
        };
    },
});
export default Item;

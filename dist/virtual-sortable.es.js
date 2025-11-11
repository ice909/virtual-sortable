import { onMounted as wt, nextTick as ne, getCurrentScope as oe, onScopeDispose as ie, getCurrentInstance as Tt, computed as k, shallowRef as tt, ref as j, watch as et, toValue as bt, defineComponent as St, h as re, onBeforeMount as se, createVNode as ht, mergeProps as Ct, isRef as le } from "vue";
const ae = {
  modelValue: {},
  dataKey: {
    type: String,
    default: "",
    required: !0
  },
  getItemHeight: {
    type: Function,
    required: !0
  },
  draggable: {
    type: String,
    default: '[role="item"]'
  },
  sortable: {
    type: Boolean,
    default: !0
  },
  handle: {
    type: [Function, String],
    default: void 0
  },
  group: {
    type: [Object, String],
    default: void 0
  },
  scroller: {
    type: [Document, HTMLElement],
    default: void 0
  },
  lockAxis: {
    type: String,
    default: ""
  },
  direction: {
    type: String,
    default: "vertical"
  },
  debounceTime: {
    type: Number,
    default: 0
  },
  throttleTime: {
    type: Number,
    default: 0
  },
  animation: {
    type: Number,
    default: 150
  },
  autoScroll: {
    type: Boolean,
    default: !0
  },
  scrollThreshold: {
    type: Number,
    default: 55
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  fallbackOnBody: {
    type: Boolean,
    default: !1
  },
  delay: {
    type: Number,
    default: 0
  },
  delayOnTouchOnly: {
    type: Boolean,
    default: !1
  },
  ghostClass: {
    type: String,
    default: ""
  },
  ghostStyle: {
    type: Object,
    default: () => ({})
  },
  chosenClass: {
    type: String,
    default: ""
  },
  placeholderClass: {
    type: String,
    default: ""
  }
}, ce = {
  dataKey: {
    type: [String, Number],
    default: void 0
  },
  sizeKey: {
    type: String,
    default: "offsetHeight"
  }
};
function ue(t, e) {
  return oe() ? (ie(t, e), !0) : !1;
}
const de = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function he(t) {
  return Array.isArray(t) ? t : [t];
}
function fe(t) {
  return Tt();
}
function pe(t, e = !0, n) {
  fe() ? wt(t, n) : e ? t() : ne(t);
}
const Mt = de ? window : void 0;
function q(t) {
  var e;
  const n = bt(t);
  return (e = n?.$el) !== null && e !== void 0 ? e : n;
}
// @__NO_SIDE_EFFECTS__
function ge() {
  const t = tt(!1), e = Tt();
  return e && wt(() => {
    t.value = !0;
  }, e), t;
}
// @__NO_SIDE_EFFECTS__
function me(t) {
  const e = /* @__PURE__ */ ge();
  return k(() => (e.value, !!t()));
}
function ve(t, e, n = {}) {
  const { window: o = Mt, ...i } = n;
  let s;
  const r = /* @__PURE__ */ me(() => o && "ResizeObserver" in o), l = () => {
    s && (s.disconnect(), s = void 0);
  }, c = et(k(() => {
    const d = bt(t);
    return Array.isArray(d) ? d.map((a) => q(a)) : [q(d)];
  }), (d) => {
    if (l(), r.value && o) {
      s = new ResizeObserver(e);
      for (const a of d) a && s.observe(a, i);
    }
  }, {
    immediate: !0,
    flush: "post"
  }), u = () => {
    l(), c();
  };
  return ue(u), {
    isSupported: r,
    stop: u
  };
}
function ye(t, e = {
  width: 0,
  height: 0
}, n = {}) {
  const { window: o = Mt, box: i = "content-box" } = n, s = k(() => {
    var a;
    return (a = q(t)) === null || a === void 0 || (a = a.namespaceURI) === null || a === void 0 ? void 0 : a.includes("svg");
  }), r = tt(e.width), l = tt(e.height), { stop: c } = ve(t, ([a]) => {
    const v = i === "border-box" ? a.borderBoxSize : i === "content-box" ? a.contentBoxSize : a.devicePixelContentBoxSize;
    if (o && s.value) {
      const w = q(t);
      if (w) {
        const b = w.getBoundingClientRect();
        r.value = b.width, l.value = b.height;
      }
    } else if (v) {
      const w = he(v);
      r.value = w.reduce((b, { inlineSize: D }) => b + D, 0), l.value = w.reduce((b, { blockSize: D }) => b + D, 0);
    } else
      r.value = a.contentRect.width, l.value = a.contentRect.height;
  }, n);
  pe(() => {
    const a = q(t);
    a && (r.value = "offsetWidth" in a ? a.offsetWidth : e.width, l.value = "offsetHeight" in a ? a.offsetHeight : e.height);
  });
  const u = et(() => q(t), (a) => {
    r.value = a ? e.width : 0, l.value = a ? e.height : 0;
  });
  function d() {
    c(), u();
  }
  return {
    width: r,
    height: l,
    stop: d
  };
}
function we(t, e) {
  const { containerStyle: n, wrapperProps: o, scrollTo: i, calculateRange: s, currentList: r, containerRef: l } = "itemHeight" in e ? xe(e, t) : Se(e, t);
  return {
    list: r,
    scrollTo: i,
    containerProps: {
      ref: l,
      onScroll: () => {
        s();
      },
      style: n
    },
    wrapperProps: o
  };
}
function Rt(t) {
  const e = tt(null), n = ye(e), o = j([]), i = tt(t);
  return {
    state: j({
      start: 0,
      end: 10
    }),
    source: i,
    currentList: o,
    size: n,
    containerRef: e
  };
}
function Ot(t, e, n) {
  return (o) => {
    if (typeof n == "number") return Math.ceil(o / n);
    const { start: i = 0 } = t.value;
    let s = 0, r = 0;
    for (let l = i; l < e.value.length; l++) {
      const c = n(l);
      if (s += c, r = l, s > o) break;
    }
    return r - i;
  };
}
function Ht(t, e) {
  return (n) => {
    if (typeof e == "number") return Math.floor(n / e) + 1;
    let o = 0, i = 0;
    for (let s = 0; s < t.value.length; s++) {
      const r = e(s);
      if (o += r, o >= n) {
        i = s;
        break;
      }
    }
    return i + 1;
  };
}
function Nt(t, e, n, o, { containerRef: i, state: s, currentList: r, source: l }) {
  return () => {
    const c = i.value;
    if (c) {
      const u = n(t === "vertical" ? c.scrollTop : c.scrollLeft), d = o(t === "vertical" ? c.clientHeight : c.clientWidth), a = u - e, v = u + d + e;
      s.value = {
        start: a < 0 ? 0 : a,
        end: v > l.value.length ? l.value.length : v
      }, r.value = l.value.slice(s.value.start, s.value.end).map((w, b) => ({
        data: w,
        index: b + s.value.start
      }));
    }
  };
}
function Wt(t, e) {
  return (n) => typeof t == "number" ? n * t : e.value.slice(0, n).reduce((o, i, s) => o + t(s), 0);
}
function At(t, e, n, o) {
  et([
    t.width,
    t.height,
    () => bt(e),
    n
  ], () => {
    o();
  });
}
function Lt(t, e) {
  return k(() => typeof t == "number" ? e.value.length * t : e.value.reduce((n, o, i) => n + t(i), 0));
}
const be = {
  horizontal: "scrollLeft",
  vertical: "scrollTop"
};
function Pt(t, e, n, o) {
  return (i) => {
    o.value && (o.value[be[t]] = n(i), e());
  };
}
function Se(t, e) {
  const n = Rt(e), { state: o, source: i, currentList: s, size: r, containerRef: l } = n, c = { overflowX: "auto" }, { itemWidth: u, overscan: d = 5 } = t, a = Ot(o, i, u), v = Nt("horizontal", d, Ht(i, u), a, n), w = Wt(u, i), b = k(() => w(o.value.start)), D = Lt(u, i);
  return At(r, e, l, v), {
    scrollTo: Pt("horizontal", v, w, l),
    calculateRange: v,
    wrapperProps: k(() => ({ style: {
      height: "100%",
      width: `${D.value - b.value}px`,
      marginLeft: `${b.value}px`,
      display: "flex"
    } })),
    containerStyle: c,
    currentList: s,
    containerRef: l
  };
}
function xe(t, e) {
  const n = Rt(e), { state: o, source: i, currentList: s, size: r, containerRef: l } = n, c = { overflowY: "auto" }, { itemHeight: u, overscan: d = 5 } = t, a = Ot(o, i, u), v = Nt("vertical", d, Ht(i, u), a, n), w = Wt(u, i), b = k(() => w(o.value.start)), D = Lt(u, i);
  return At(r, e, l, v), {
    calculateRange: v,
    scrollTo: Pt("vertical", v, w, l),
    containerStyle: c,
    wrapperProps: k(() => ({ style: {
      width: "100%",
      height: `${D.value - b.value}px`,
      marginTop: `${b.value}px`
    } })),
    currentList: s,
    containerRef: l
  };
}
const kt = {
  capture: !1,
  passive: !1
}, Et = /\s+/g;
function Q(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
const at = Q(
  /(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i
), Bt = Q(/Edge/i), ft = Q(/safari/i) && !Q(/chrome/i) && !Q(/android/i), zt = (function() {
  let t = !1;
  return document.addEventListener("checkIfSupportPassive", null, {
    get passive() {
      return t = !0, !0;
    }
  }), t;
})();
function R(t, e, n) {
  window.addEventListener ? t.addEventListener(
    e,
    n,
    zt || !at ? kt : !1
  ) : window.attachEvent ? t.attachEvent("on" + e, n) : t["on" + e] = n;
}
function I(t, e, n) {
  window.removeEventListener ? t.removeEventListener(
    e,
    n,
    zt || !at ? kt : !1
  ) : window.detachEvent ? t.detachEvent("on" + e, n) : t["on" + e] = null;
}
function Ce(t, e) {
  if (!t || !t.getBoundingClientRect)
    return it();
  let n = t;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      let o = m(n);
      if (n.clientWidth < n.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll"))
        return !n.getBoundingClientRect || n === document.body ? it() : n;
    }
  while (n = n.parentNode);
  return it();
}
function it() {
  return document.scrollingElement || document.documentElement;
}
function _(t, e, n) {
  if (!t.getBoundingClientRect && t !== window) return;
  let o, i, s, r, l, c, u;
  if (t !== window && t.parentNode && t !== it() ? (o = t.getBoundingClientRect(), i = o.top, s = o.left, r = o.bottom, l = o.right, c = o.height, u = o.width) : (i = 0, s = 0, r = window.innerHeight, l = window.innerWidth, c = window.innerHeight, u = window.innerWidth), e && t !== window) {
    n = n || t.parentNode;
    do
      if (n && n.getBoundingClientRect) {
        let d = n.getBoundingClientRect();
        i -= d.top + parseInt(m(n, "border-top-width")), s -= d.left + parseInt(m(n, "border-left-width")), r = i + o.height, l = s + o.width;
        break;
      }
    while (n = n.parentNode);
  }
  return {
    top: i,
    left: s,
    bottom: r,
    right: l,
    width: u,
    height: c
  };
}
function Z(t, e, n, o) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && st(t, e) : st(t, e)) || o && t === n)
        return t;
      if (t === n) break;
    } while (t = t.parentNode);
    return null;
  }
}
function pt(t, e) {
  if (!t || !e) return !1;
  if (e.compareDocumentPosition)
    return !!(e.compareDocumentPosition(t) & 16);
  if (e.contains && t.nodeType === 1)
    return e.contains(t) && e !== t;
  for (; t = t.parentNode; ) if (t === e) return !0;
  return !1;
}
function It(t, e) {
  let n = t.lastElementChild;
  for (; n && (n === y.ghost || m(n, "display") === "none" || e); )
    n = n.previousElementSibling;
  return n || null;
}
function V(t, e) {
  if (!t || !t.parentNode)
    return -1;
  let n = 0;
  for (; t = t.previousElementSibling; )
    t !== y.ghost && t.nodeName.toUpperCase() !== "TEMPLATE" && m(t, "display") !== "none" && (!e || st(t, e)) && n++;
  return n;
}
function vt(t, e, n, o) {
  let i = 0, s = 0, r = t.children;
  for (; i < r.length; ) {
    if (r[i] !== y.ghost && m(r[i], "display") !== "none" && Z(r[i], n, t, !1) && r[i] !== y.dragged) {
      if (s === e)
        return r[i];
      s++;
    }
    i++;
  }
  return null;
}
function Kt(t, e) {
  let n = m(t), o = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = vt(t, 0, e), s = vt(t, 1, e), r = i && m(i), l = s && m(s), c = r && parseInt(r.marginLeft) + parseInt(r.marginRight) + _(i).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + _(s).width, d = Bt || at ? "cssFloat" : "float";
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && r.float && r.float !== "none") {
    let a = r.float === "left" ? "left" : "right";
    return s && (l.clear === "both" || l.clear === a) ? "vertical" : "horizontal";
  }
  return i && (r.display === "block" || r.display === "flex" || r.display === "table" || r.display === "grid" || c >= o && n[d] === "none" || s && n[d] === "none" && c + u > o) ? "vertical" : "horizontal";
}
function z(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      const o = (" " + t.className + " ").replace(Et, " ").replace(" " + e + " ", " ");
      t.className = (o + (n ? " " + e : "")).replace(
        Et,
        " "
      );
    }
}
function st(t, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(e);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function m(t, e, n) {
  let o = t && t.style;
  if (o) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function Ee(t, e) {
  let n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      let i = m(t, "transform");
      i && i !== "none" && (n = i + " " + n);
    } while (!1);
  const o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(n);
}
function _t(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
function Ie(t) {
  return t.offsetWidth;
}
function _e(t, e) {
  return t.compareDocumentPosition ? t.compareDocumentPosition(e) : t.contains ? (t != e && t.contains(e) && 16) + (t != e && e.contains(t) && 8) + (t.sourceIndex >= 0 && e.sourceIndex >= 0 ? (t.sourceIndex < e.sourceIndex && 4) + (t.sourceIndex > e.sourceIndex && 2) : 1) : 0;
}
function gt(t, e) {
  const n = _e(t, e);
  return n === 2 ? 1 : n === 4 ? -1 : 0;
}
function nt(t) {
  t.preventDefault !== void 0 && t.cancelable && t.preventDefault();
}
function T({ sortable: t, name: e, evt: n }) {
  const o = t.options[e];
  if (typeof o == "function")
    return o(Object.assign({}, n));
}
function ot(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
const N = "Sortable" + Date.now();
function $t(t) {
  this.options = t, this.scrollEl = null, this.autoScrollInterval = null;
}
$t.prototype = {
  nulling() {
    this.autoScrollInterval && (clearInterval(this.autoScrollInterval), this.autoScrollInterval = null);
  },
  onStarted() {
    this.nulling(), this.autoScrollInterval = setInterval(this.autoScroll.bind(this));
  },
  onMove(t, e, n, o) {
    const i = n ? n[N].options : o;
    if (n && !i.autoScroll) {
      this.scrollEl = null;
      return;
    }
    this.options = i, this.scrollEl = Ce(t), this.moveEvent = e;
  },
  autoScroll() {
    let t = this.options, e = this.moveEvent, n = this.scrollEl, o = t.scrollThreshold, i = t.scrollSpeed;
    if (!n || e.clientX === void 0 || e.clientY === void 0)
      return;
    const s = _(n);
    if (!s) return;
    const { clientX: r, clientY: l } = e, { top: c, right: u, bottom: d, left: a, height: v, width: w } = s;
    if (l < c || r > u || l > d || r < a)
      return;
    const { scrollTop: b, scrollLeft: D, scrollHeight: ct, scrollWidth: ut } = n;
    n.scrollLeft += this.getScrollOffset(
      r,
      a,
      u,
      o,
      i.x,
      D,
      ut,
      w
    ), n.scrollTop += this.getScrollOffset(
      l,
      c,
      d,
      o,
      i.y,
      b,
      ct,
      v
    );
  },
  getScrollOffset(t, e, n, o, i, s, r, l) {
    return s > 0 && t >= e && t <= e + o ? Math.max(-1, (t - e) / o - 1) * i : s + l < r && t <= n && t >= n - o ? Math.min(1, (t - n) / o + 1) * i : 0;
  }
};
function Vt(t) {
  this.options = t, this.animationStack = [], this.animationCallbackId = null;
}
Vt.prototype = {
  collect(t) {
    if (!t) return;
    let e = _(t), n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, i = Math.min(e.right, n), s = Math.min(e.bottom, o), r = Array.prototype.slice.call(t.children), l = [];
    for (let c = 0, u = r.length; c < u; c++) {
      const d = r[c];
      if (d === y.ghost || m(d, "display") === "none") continue;
      const a = _(d);
      if (!(a.bottom < 0 || a.right < 0)) {
        if (l.length === 0 && d.previousElementSibling) {
          let v = d.previousElementSibling;
          do
            if (v && v !== y.ghost && m(v, "display") !== "none")
              break;
          while (v = v.previousElementSibling);
          v && l.push({ el: v, rect: _(v) });
        }
        if (a.top - a.height > s || a.left - a.width > i) {
          l.push({ el: d, rect: a });
          break;
        }
        l.push({ el: d, rect: a });
      }
    }
    this.animationStack.push(l);
  },
  animate(t) {
    let e = this.animationStack.pop(), n = this.options.animation;
    if (!e || !n) {
      clearTimeout(this.animationCallbackId), typeof t == "function" && t();
      return;
    }
    let o = 0;
    e.forEach((i) => {
      let s = 0, r = i.el, l = _(r), c = i.rect, u = r.prevToRect, d = r.prevFromRect;
      if (r.animating && d && u && _t(c, l)) {
        const a = Ee(r);
        if (a) {
          const v = {
            top: l.top - a.f,
            left: l.left - a.e
          }, w = Dt(v, l), b = Dt(d, u);
          s = w / b * n;
        }
      }
      _t(c, l) || (r.prevFromRect = c, r.prevToRect = l, s || (s = n), this.execute(r, c, l, s)), s && (o = Math.max(o, s));
    }), clearTimeout(this.animationCallbackId), o ? this.animationCallbackId = setTimeout(() => {
      typeof t == "function" && t();
    }, o) : typeof t == "function" && t();
  },
  execute(t, e, n, o) {
    let i = this.options.easing || "", s = e.left - n.left, r = e.top - n.top;
    m(t, "transition", ""), m(t, "transform", `translate3d(${s}px, ${r}px, 0)`), this.repaintDummy = Ie(t), m(t, "transition", `transform ${o}ms ${i}`), m(t, "transform", "translate3d(0px, 0px, 0px)"), typeof t.animating == "number" && clearTimeout(t.animating), t.animating = setTimeout(() => {
      m(t, "transition", ""), m(t, "transform", ""), t.prevFromRect = null, t.prevToRect = null, t.animating = null;
    }, o);
  }
};
function Dt(t, e) {
  return Math.sqrt(
    Math.pow(t.left - e.left, 2) + Math.pow(t.top - e.top, 2)
  );
}
let lt = [], K, E, f, p, X, x, h, C, A, S, Y, B, J, G, M, P, U, H, L, $, F;
function Xt(t) {
  let e = {}, n = t.group;
  (!n || typeof n != "object") && (n = {
    name: n,
    pull: !0,
    put: !0,
    revertDrag: !0
  }), e.name = n.name, e.pull = n.pull ?? !0, e.put = n.put ?? !0, e.revertDrag = n.revertDrag ?? !0, t.group = e;
}
function De(t, e) {
  let n;
  return lt.reduce((o, i) => {
    const s = i[N].options.emptyInsertThreshold;
    if (s == null) return;
    const r = _(i), l = t >= r.left - s && t <= r.right + s, c = e >= r.top - s && e <= r.bottom + s;
    return l && c && (!n || n && r.left >= n.left && r.right <= n.right && r.top >= n.top && r.bottom <= n.bottom) && (o = i, n = r), o;
  }, null);
}
function Te(t) {
  const e = P || M;
  return !(t.clientX !== void 0 && t.clientY !== void 0 && Math.abs(t.clientX - e.clientX) <= 0 && Math.abs(t.clientY - e.clientY) <= 0);
}
function y(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw `Sortable-dnd: \`el\` must be an HTMLElement, not ${{}.toString.call(t)}`;
  t[N] = this, this.el = t, this.options = e = Object.assign({}, e);
  const n = {
    store: null,
    group: "",
    handle: null,
    draggable: ">*",
    sortable: !0,
    disabled: !1,
    customGhost: null,
    lockAxis: "",
    direction: "",
    animation: 150,
    easing: "",
    ghostClass: "",
    ghostStyle: {},
    chosenClass: "",
    placeholderClass: "",
    autoScroll: !0,
    scrollThreshold: 55,
    scrollSpeed: { x: 10, y: 10 },
    delay: 0,
    delayOnTouchOnly: !1,
    swapOnDrop: !0,
    removeCloneOnDrop: !0,
    dropOnAnimationEnd: !1,
    appendToBody: !1,
    supportTouch: "ontouchstart" in window,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(
      window.devicePixelRatio,
      10
    ) || 1,
    emptyInsertThreshold: -1
  };
  for (let o in n)
    !(o in e) && (e[o] = n[o]);
  Xt(e);
  for (let o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  R(t, e.supportTouch ? "touchstart" : "mousedown", this._onDrag), this.autoScroller = new $t(e), this.animator = new Vt(e), lt.push(t);
}
y.prototype = {
  constructor: y,
  _onDrag(t) {
    let e = this.el, n = this.options, o = n.handle, i = t.touches && t.touches[0], s = (i || t).target, r = e.ownerDocument;
    if (f || n.disabled || !n.group.pull || /mousedown|pointerdown/.test(t.type) && t.button !== 0 || ft && s && s.tagName.toUpperCase() === "SELECT") return;
    const l = Z(s, n.draggable, e);
    !l || l.animating || (M = {
      event: t,
      clientX: (i || t).clientX,
      clientY: (i || t).clientY
    }, f = l, H = i ? f : document, R(H, "mouseup", this._onDrop), R(H, "touchend", this._onDrop), R(H, "touchcancel", this._onDrop), !(typeof o == "function" && !o(t) || typeof o == "string" && !Z(s, o, f)) && (n.delay && (!n.delayOnTouchOnly || i) && !(Bt || at) ? (R(r, "touchmove", this._delayedMoveHandler), R(r, "mousemove", this._delayedMoveHandler), R(r, "mouseup", this._cancelStart), R(r, "touchend", this._cancelStart), R(r, "touchcancel", this._cancelStart), this._dragStartTimer = setTimeout(
      () => this._onStart(i, t),
      n.delay
    )) : this._onStart(i, t)));
  },
  _delayedMoveHandler(t) {
    const e = t.touches ? t.touches[0] : t;
    Math.max(
      Math.abs(e.clientX - M.clientX),
      Math.abs(e.clientY - M.clientY)
    ) >= Math.floor(
      this.options.touchStartThreshold / (window.devicePixelRatio || 1)
    ) && this._cancelStart();
  },
  _cancelStart() {
    let t = this.el.ownerDocument;
    clearTimeout(this._dragStartTimer), I(t, "touchmove", this._delayedMoveHandler), I(t, "mousemove", this._delayedMoveHandler), I(t, "mouseup", this._cancelStart), I(t, "touchend", this._cancelStart), I(t, "touchcancel", this._cancelStart);
  },
  _onStart(t, e) {
    nt(e);
    let n = this.el, o = this.options, i = V(f);
    B = i, J = i, G = i, K = n, E = n, x = n, A = f, S = f.parentNode, Y = o.group.pull, $ = f, L = {
      to: n,
      target: f,
      newIndex: i,
      relative: 0
    }, h = f.cloneNode(!0), y.dragged = f, y.clone = h, y.active = this, T({
      sortable: this,
      name: "onChoose",
      evt: this._getEventProperties(e)
    }), z(f, o.chosenClass, !0), R(H, t ? "touchmove" : "mousemove", this._nearestSortable);
    try {
      document.selection ? setTimeout(() => document.selection.empty(), 0) : window.getSelection().removeAllRanges();
    } catch {
    }
    R(document, "selectstart", nt), ft && m(document.body, "user-select", "none");
  },
  _onStarted() {
    let t = this.options;
    this.animator.collect(S), this._appendGhost(), z(h, t.chosenClass, !0), z(h, t.placeholderClass, !0), f.parentNode.insertBefore(h, f), m(f, "display", "none"), T({
      sortable: this,
      name: "onDrag",
      evt: this._getEventProperties(M.event)
    }), this.animator.animate(), this.autoScroller.onStarted();
  },
  _appendGhost() {
    if (C) return;
    let t = this.options;
    const e = t.appendToBody ? document.body : this.el;
    C = (ot(t.customGhost, h) || h).cloneNode(!0), z(C, t.ghostClass, !0);
    const o = _(f), i = Object.assign(
      {
        position: "fixed",
        top: o.top,
        left: o.left,
        width: o.width,
        height: o.height,
        margin: 0,
        zIndex: 1e5,
        opacity: "0.8",
        overflow: "hidden",
        boxSizing: "border-box",
        transform: "",
        transition: "",
        pointerEvents: "none"
      },
      t.ghostStyle
    );
    for (let l in i)
      m(C, l, i[l]);
    y.ghost = C, e.appendChild(C);
    const s = (M.clientX - o.left) / parseInt(C.style.width) * 100, r = (M.clientY - o.top) / parseInt(C.style.height) * 100;
    m(C, "transform-origin", `${s}% ${r}%`), m(C, "will-change", "transform");
  },
  _nearestSortable(t) {
    nt(t);
    let e = t.touches && t.touches[0], n = e || t;
    if (!f || !Te(n)) return;
    !P && this._onStarted();
    let o = this.options.lockAxis, i = o === "x" ? M.clientX : n.clientX, s = o === "y" ? M.clientY : n.clientY, r = document.elementFromPoint(i, s), l = i - M.clientX, c = s - M.clientY;
    P = { event: t, clientX: i, clientY: s }, m(C, "transform", `translate3d(${l}px, ${c}px, 0)`);
    const u = De(i, s);
    u && u[N]._onMove(t, r), this.autoScroller.onMove(r, P, u, this.options);
  },
  _allowPut() {
    let t = this.options.group, e = x[N].options.group;
    return this.el === x ? !0 : t.put ? t.put.join && t.put.indexOf(e.name) > -1 || e.name && t.name && e.name === t.name : !1;
  },
  _getDirection() {
    let t = this.options.draggable, e = this.options.direction;
    return e ? ot(e, P.event, h, this) : Kt(S, t);
  },
  _allowSwap() {
    let t = _(p), e = this._getDirection() === "vertical", n = e ? "top" : "left", o = e ? "bottom" : "right", i = p[e ? "offsetHeight" : "offsetWidth"], s = e ? P.clientY : P.clientX, r = s >= t[n] && s < t[o] - i / 2 ? -1 : 1, l = vt(S, 0, this.options.draggable), c = It(S), u = _(l), d = _(c);
    if (p === S || pt(S, p))
      return h === l && s < u[n] ? (X = p, !0) : h === c && s > d[o] ? (X = p.nextSibling, !0) : !1;
    const a = gt(h, p);
    return X = a < 0 ? p.nextSibling : p, U !== p ? (F = r, !0) : F !== r ? (F = r, r < 0 ? a > 0 : a < 0) : !1;
  },
  _onMove(t, e) {
    let n = this.el, o = this.options;
    if (!(o.disabled || !this._allowPut())) {
      if (p = Z(e, o.draggable, n), T({
        sortable: this,
        name: "onMove",
        evt: this._getEventProperties(t, { target: p })
      }), !o.sortable && n === x) {
        E !== x && (p = U = f, F = 0, this._onInsert(t));
        return;
      }
      if (n !== E && (e === n || !It(n))) {
        p = U = null, this._onInsert(t);
        return;
      }
      if (!(!p || p.animating || pt(p, h) || !this._allowSwap())) {
        if (p === h || X === h) {
          U = p;
          return;
        }
        n !== E ? this._onInsert(t) : p !== f && this._onChange(t), U = p;
      }
    }
  },
  _onInsert(t) {
    let e = this.el, n = p || h, o = Y === "clone" && e !== x && E === x, i = Y === "clone" && e === x && E !== x, s = pt(p, document), r = p === f && !s, l = E[N], c = x[N];
    K = e, B = V(h), A = n, S = s ? p.parentNode : e, l.animator.collect(h.parentNode), this.animator.collect(S), o && (L.target = $, L.newIndex = B, L.relative = $ === f ? 0 : gt(h, $), m(f, "display", ""), c.options.group.revertDrag || h.parentNode.insertBefore(f, h)), i && (B = V(f), m(f, "display", "none")), m(h, "display", r ? "none" : ""), p && s ? S.insertBefore(
      h,
      F < 0 ? p : p.nextSibling
    ) : S.appendChild(h), J = r ? G : V(h), o && c.options.group.revertDrag && (L.target = f, L.newIndex = G, L.relative = 0, T({
      sortable: c,
      name: "onChange",
      evt: this._getEventProperties(t, {
        to: x,
        target: f,
        newIndex: G,
        revertDrag: !0
      })
    })), o || T({
      sortable: l,
      name: "onRemove",
      evt: this._getEventProperties(t, { newIndex: -1 })
    }), i && n !== f && ($ = n, T({
      sortable: this,
      name: "onChange",
      evt: this._getEventProperties(t, {
        from: x,
        backToOrigin: !0
      })
    })), i || T({
      sortable: this,
      name: "onAdd",
      evt: this._getEventProperties(t, { oldIndex: -1 })
    }), l.animator.animate(), this.animator.animate(), E = e;
  },
  _onChange(t) {
    let e = this.el;
    this.animator.collect(S), B = V(h), S = p.parentNode, A = p, e === x && ($ = p), S.insertBefore(h, X), J = V(h), T({
      sortable: this,
      name: "onChange",
      evt: this._getEventProperties(t)
    }), T({
      sortable: this,
      name: "onDragChange",
      evt: this._getEventProperties(t)
    }), this.animator.animate(), E = e;
  },
  _onDrop(t) {
    let e = this.options;
    if (this._cancelStart(), I(H, "touchmove", this._nearestSortable), I(H, "mousemove", this._nearestSortable), I(H, "mouseup", this._onDrop), I(H, "touchend", this._onDrop), I(H, "touchcancel", this._onDrop), I(document, "selectstart", nt), ft && m(document.body, "user-select", ""), C && C.parentNode && C.parentNode.removeChild(C), x)
      if (E = x, B = G, A === h && (A = f), z(f, e.chosenClass, !1), T({
        sortable: this,
        name: "onUnchoose",
        evt: this._getEventProperties(t)
      }), P) {
        this.animator.collect(S), z(h, e.chosenClass, !1), z(h, e.placeholderClass, !1);
        const n = this._getEventProperties(t);
        !e.dropOnAnimationEnd && this._onEnd(n), this.animator.animate(() => {
          e.dropOnAnimationEnd && this._onEnd(n);
        });
      } else
        this._nulling();
    else
      this._nulling();
  },
  _onEnd(t) {
    let e = this.options, n = Y === "clone", o = E === K;
    (!n || o) && ot(e.swapOnDrop, t) && S.insertBefore(f, h), (!n || o) && ot(e.removeCloneOnDrop, t) && h && h.parentNode && h.parentNode.removeChild(h), m(f, "display", ""), E !== K && T({
      sortable: E[N],
      name: "onDrop",
      evt: Object.assign({}, t, n ? L : { newIndex: -1 })
    }), T({
      sortable: K[N],
      name: "onDrop",
      evt: Object.assign({}, t, o ? {} : { oldIndex: -1 })
    }), this._nulling();
  },
  _getEventProperties(t, e = {}) {
    let n = {};
    return n.event = t, n.to = K, n.from = E, n.node = f, n.clone = h, n.target = A, n.oldIndex = B, n.newIndex = J, n.pullMode = Y, Object.assign(n, e), n.relative = A === f ? 0 : gt(h, A), n;
  },
  _nulling() {
    K = E = f = p = X = x = h = C = A = S = Y = B = J = G = M = P = U = H = L = $ = F = y.clone = y.ghost = y.active = y.dragged = null, this.autoScroller.nulling();
  },
  destroy() {
    this._cancelStart(), this._nulling(), I(this.el, "touchstart", this._onDrag), I(this.el, "mousedown", this._onDrag);
    const t = lt.indexOf(this.el);
    t > -1 && lt.splice(t, 1), this.el[N] = this.animator = this.autoScroller = null;
  },
  option(t, e) {
    if (e === void 0)
      return this.options[t];
    this.options[t] = e, this.animator.options[t] = e, this.autoScroller.options[t] = e, t === "group" && Xt(this.options);
  }
};
y.utils = {
  on: R,
  off: I,
  css: m,
  index: V,
  matches: st,
  closest: Z,
  getRect: _,
  toggleClass: z,
  detectDirection: Kt
};
y.get = function(t) {
  return t[N];
};
y.create = function(t, e) {
  return new y(t, e);
};
function rt(t, e) {
  return t === 0 ? t === e : t == e;
}
const yt = [
  "delay",
  "group",
  "handle",
  "lockAxis",
  "disabled",
  "sortable",
  "draggable",
  "animation",
  "autoScroll",
  "ghostClass",
  "ghostStyle",
  "chosenClass",
  "scrollSpeed",
  "fallbackOnBody",
  "scrollThreshold",
  "delayOnTouchOnly",
  "placeholderClass"
];
class Me {
  constructor(e, n) {
    this.el = e, this.options = n, this.rangeChanged = !1, this.installSortable();
  }
  destroy() {
    this.sortable.destroy(), this.rangeChanged = !1;
  }
  option(e, n) {
    this.options[e] = n, yt.includes(e) && this.sortable.option(e, n);
  }
  installSortable() {
    const e = yt.reduce(
      (n, o) => (n[o] = this.options[o], n),
      {}
    );
    this.sortable = new y(this.el, {
      ...e,
      emptyInsertThreshold: 0,
      swapOnDrop: (n) => n.from === n.to,
      removeCloneOnDrop: (n) => n.from === n.to,
      onDrag: (n) => this.onDrag(n),
      onDrop: (n) => this.onDrop(n),
      onDragChange: (n) => this.onDragChange(n),
      onChoose: (n) => this.onChoose(n),
      onUnchoose: (n) => this.onUnchoose(n)
    });
  }
  onChoose(e) {
    this.dispatchEvent("onChoose", e);
  }
  onUnchoose(e) {
    this.dispatchEvent("onUnchoose", e);
  }
  onDrag(e) {
    const n = e.node.getAttribute("data-key"), o = this.getIndex(n), i = this.options.list[o], s = this.options.uniqueKeys[o];
    this.sortable.option("store", { item: i, key: s, index: o, oldIndex: o }), this.dispatchEvent("onDrag", { item: i, key: s, index: o, event: e });
  }
  // 拖拽位置变化
  onDragChange(e) {
    const n = y.get(e.from)?.option("store"), o = n ? n.oldIndex : -1, i = n ? n.key : null, s = e.target.getAttribute("data-key");
    let r = this.getIndex(s);
    const l = this.getIndex(i);
    if ((l < r && e.relative === -1 || l > r && e.relative === 1) && (r += e.relative), o === r)
      return;
    const c = {
      key: s,
      oldIndex: o,
      newIndex: r,
      event: e,
      item: this.options.list[r]
    };
    this.sortable.option("store").oldIndex = r, this.dispatchEvent("onDragChange", c);
  }
  onDrop(e) {
    const { item: n, key: o, index: i } = y.get(e.from)?.option("store"), s = this.options.list, r = {
      key: o,
      item: n,
      list: s,
      event: e,
      changed: !1,
      oldList: [...s],
      oldIndex: i,
      newIndex: i
    };
    e.from === e.to && e.node === e.target || this.handleDropEvent(e, r, i), this.dispatchEvent("onDrop", r), e.from === this.el && this.rangeChanged && y.dragged?.remove(), e.from !== e.to && y.clone?.remove(), this.rangeChanged = !1;
  }
  handleDropEvent(e, n, o) {
    const i = e.target.getAttribute("data-key");
    let s = -1, r = o;
    e.from === e.to ? (r = this.getIndex(n.key), s = this.getIndex(i), (r < s && e.relative === -1 || r > s && e.relative === 1) && (s += e.relative), s !== r && (n.list.splice(r, 1), n.list.splice(s, 0, n.item))) : (e.from === this.el && (r = this.getIndex(n.key), n.list.splice(r, 1)), e.to === this.el && (r = -1, s = this.getIndex(i), e.relative === 0 ? s = n.list.length : e.relative === 1 && (s += e.relative), n.list.splice(s, 0, n.item))), n.changed = e.from !== e.to || s !== r, n.oldIndex = r, n.newIndex = s;
  }
  getIndex(e) {
    if (e == null)
      return -1;
    const { uniqueKeys: n } = this.options;
    for (let o = 0, i = n.length; o < i; o++)
      if (rt(n[o], e))
        return o;
    return -1;
  }
  dispatchEvent(e, n) {
    const o = this.options[e];
    o && o(n);
  }
}
const Re = ({
  mounted: t,
  updated: e,
  unmounted: n
}) => /* @__PURE__ */ St({
  props: ["vnode"],
  mounted() {
    t(this.$el);
  },
  onUpdated() {
    e(this.$el);
  },
  onUnmounted() {
    n(this.$el);
  },
  render(o) {
    return o.vnode;
  }
}), Oe = /* @__PURE__ */ St({
  props: ce,
  emits: ["resize"],
  setup(t, {
    emit: e,
    slots: n
  }) {
    let o = null;
    const i = (u) => {
      const d = u ? u[t.sizeKey] : 0;
      e("resize", d, t.dataKey);
    }, c = Re({
      mounted: (u) => {
        typeof ResizeObserver < "u" && (o = new ResizeObserver(() => {
          i(u);
        }), u && o.observe(u));
      },
      updated: (u) => {
        i(u);
      },
      unmounted: () => {
        o && (o.disconnect(), o = null);
      }
    });
    return () => {
      const {
        dataKey: u
      } = t, [d] = n.default?.() || [];
      return re(c, {
        key: u,
        role: "item",
        vnode: d,
        "data-key": u
      }, {
        default: () => n.default?.()
      });
    };
  }
}), He = (t) => le(t) ? t.value : t;
function mt(t, e) {
  return (Array.isArray(e) ? e : e.replace(/\[/g, ".").replace(/\]/g, ".").split(".")).reduce((n, o) => (n || {})[o], t);
}
const We = /* @__PURE__ */ St({
  props: ae,
  setup(t, {
    emit: e,
    slots: n,
    expose: o
  }) {
    const i = j([]), s = j(!1), r = j(null);
    let l = [], c;
    const u = j(""), {
      list: d,
      containerProps: a,
      wrapperProps: v,
      scrollTo: w
    } = we(i, {
      itemHeight: t.getItemHeight,
      overscan: 30
    }), b = () => {
      l = i.value.map((g) => mt(g, t.dataKey)), c?.option("uniqueKeys", l);
    };
    function D() {
      const g = He(t.modelValue);
      g && (i.value = g, b(), c?.option("list", g));
    }
    et(() => [t.modelValue], () => {
      D();
    }, {
      deep: !0
    });
    const ct = (g) => {
      s.value = !0, t.sortable || c.option("autoScroll", !1), e("drag", g);
    }, ut = (g) => {
      s.value = !1, c.option("autoScroll", t.autoScroll), g.changed && e("update:modelValue", g.list), e("drop", g);
    }, Yt = (g) => {
      e("dragChange", g);
    }, Gt = (g) => {
      u.value = g.node.getAttribute("data-key");
    }, Ut = () => {
      u.value = "";
    };
    function Ft(g, O) {
      rt(O, u.value);
    }
    const xt = k(() => yt.reduce((g, O) => (g[O] = t[O], g), {}));
    et(xt, (g, O) => {
      if (c)
        for (let W in g)
          g[W] !== O[W] && c.option(W, g[W]);
    });
    function jt() {
      c = new Me(a.ref.value, {
        ...xt.value,
        list: i.value,
        uniqueKeys: l,
        onDrag: ct,
        onDrop: ut,
        onChoose: Gt,
        onUnchoose: Ut,
        onDragChange: Yt
      });
    }
    function dt(g) {
      w && w(g);
    }
    function qt(g) {
      const O = i.value.findIndex((W) => rt(mt(W, t.dataKey), g));
      O !== -1 && w && w(O);
    }
    function Jt() {
      dt(i.value.length - 1);
    }
    function Qt() {
      dt(0);
    }
    function Zt() {
      return {
        width: a.ref.value?.clientWidth || 0,
        height: a.ref.value?.clientHeight || 0
      };
    }
    function te() {
      return {
        width: r.value?.offsetWidth || 0,
        height: r.value?.offsetHeight || 0
      };
    }
    return se(() => {
      D();
    }), wt(() => {
      jt();
    }), o({
      getClientSize: Zt,
      getWrapperSize: te,
      scrollToKey: qt,
      scrollToBottom: Jt,
      scrollToTop: Qt,
      scrollToIndex: dt
    }), () => ht("div", Ct(a, {
      style: {
        position: "absolute",
        width: "100%",
        height: "100%"
      }
    }), [ht("div", Ct({
      ref: r
    }, v.value), [d.value.map((g, O) => {
      const W = mt(g.data, t.dataKey), ee = s.value && rt(W, u.value);
      return ht(Oe, {
        key: W,
        dataKey: W,
        style: {
          display: ee ? "none" : "flex"
        },
        sizeKey: "offsetHeight",
        onResize: Ft
      }, {
        default: () => n.item?.({
          item: g.data,
          index: O
        })
      });
    })])]);
  }
});
export {
  We as VirtualSortable,
  We as default
};

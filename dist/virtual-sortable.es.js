import { onMounted as re, nextTick as ze, getCurrentScope as Qe, onScopeDispose as Je, getCurrentInstance as _e, computed as E, shallowRef as ge, ref as C, watch as Y, toValue as Ve, defineComponent as Ie, h as wt, useSlots as bt, onUnmounted as St, createBlock as xt, openBlock as Et, Transition as Ct, withCtx as _t, withDirectives as It, createElementVNode as et, normalizeStyle as Tt, unref as Ne, renderSlot as Dt, vShow as Ht, readonly as Mt, pushScopeId as Rt, popScopeId as Ot, onBeforeMount as Bt, createVNode as ue, mergeProps as Xe, isRef as Lt } from "vue";
const At = {
  modelValue: {},
  dataKey: {
    type: String,
    default: "",
    required: !0
  },
  scrollbar: {
    type: Boolean,
    default: !1
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
}, kt = {
  dataKey: {
    type: [String, Number],
    default: void 0
  },
  sizeKey: {
    type: String,
    default: "offsetHeight"
  }
};
function Pt(e, t) {
  return Qe() ? (Je(e, t), !0) : !1;
}
const Nt = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function Wt(e) {
  return Array.isArray(e) ? e : [e];
}
function Kt(e) {
  return _e();
}
function $t(e, t = !0, n) {
  Kt() ? re(e, n) : t ? e() : ze(e);
}
const tt = Nt ? window : void 0;
function ie(e) {
  var t;
  const n = Ve(e);
  return (t = n?.$el) !== null && t !== void 0 ? t : n;
}
// @__NO_SIDE_EFFECTS__
function zt() {
  const e = ge(!1), t = _e();
  return t && re(() => {
    e.value = !0;
  }, t), e;
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
  const t = /* @__PURE__ */ zt();
  return E(() => (t.value, !!e()));
}
function Yt(e, t, n = {}) {
  const { window: o = tt, ...i } = n;
  let l;
  const r = /* @__PURE__ */ Vt(() => o && "ResizeObserver" in o), s = () => {
    l && (l.disconnect(), l = void 0);
  }, u = Y(E(() => {
    const d = Ve(e);
    return Array.isArray(d) ? d.map((a) => ie(a)) : [ie(d)];
  }), (d) => {
    if (s(), r.value && o) {
      l = new ResizeObserver(t);
      for (const a of d) a && l.observe(a, i);
    }
  }, {
    immediate: !0,
    flush: "post"
  }), c = () => {
    s(), u();
  };
  return Pt(c), {
    isSupported: r,
    stop: c
  };
}
function Xt(e, t = {
  width: 0,
  height: 0
}, n = {}) {
  const { window: o = tt, box: i = "content-box" } = n, l = E(() => {
    var a;
    return (a = ie(e)) === null || a === void 0 || (a = a.namespaceURI) === null || a === void 0 ? void 0 : a.includes("svg");
  }), r = ge(t.width), s = ge(t.height), { stop: u } = Yt(e, ([a]) => {
    const h = i === "border-box" ? a.borderBoxSize : i === "content-box" ? a.contentBoxSize : a.devicePixelContentBoxSize;
    if (o && l.value) {
      const b = ie(e);
      if (b) {
        const p = b.getBoundingClientRect();
        r.value = p.width, s.value = p.height;
      }
    } else if (h) {
      const b = Wt(h);
      r.value = b.reduce((p, { inlineSize: _ }) => p + _, 0), s.value = b.reduce((p, { blockSize: _ }) => p + _, 0);
    } else
      r.value = a.contentRect.width, s.value = a.contentRect.height;
  }, n);
  $t(() => {
    const a = ie(e);
    a && (r.value = "offsetWidth" in a ? a.offsetWidth : t.width, s.value = "offsetHeight" in a ? a.offsetHeight : t.height);
  });
  const c = Y(() => ie(e), (a) => {
    r.value = a ? t.width : 0, s.value = a ? t.height : 0;
  });
  function d() {
    u(), c();
  }
  return {
    width: r,
    height: s,
    stop: d
  };
}
function Gt(e, t) {
  const { containerStyle: n, wrapperProps: o, scrollTo: i, calculateRange: l, currentList: r, containerRef: s } = "itemHeight" in t ? Ut(t, e) : jt(t, e);
  return {
    list: r,
    scrollTo: i,
    containerProps: {
      ref: s,
      onScroll: () => {
        l();
      },
      style: n
    },
    wrapperProps: o
  };
}
function nt(e) {
  const t = ge(null), n = Xt(t), o = C([]), i = ge(e);
  return {
    state: C({
      start: 0,
      end: 10
    }),
    source: i,
    currentList: o,
    size: n,
    containerRef: t
  };
}
function ot(e, t, n) {
  return (o) => {
    if (typeof n == "number") return Math.ceil(o / n);
    const { start: i = 0 } = e.value;
    let l = 0, r = 0;
    for (let s = i; s < t.value.length; s++) {
      const u = n(s);
      if (l += u, r = s, l > o) break;
    }
    return r - i;
  };
}
function it(e, t) {
  return (n) => {
    if (typeof t == "number") return Math.floor(n / t) + 1;
    let o = 0, i = 0;
    for (let l = 0; l < e.value.length; l++) {
      const r = t(l);
      if (o += r, o >= n) {
        i = l;
        break;
      }
    }
    return i + 1;
  };
}
function rt(e, t, n, o, { containerRef: i, state: l, currentList: r, source: s }) {
  return () => {
    const u = i.value;
    if (u) {
      const c = n(e === "vertical" ? u.scrollTop : u.scrollLeft), d = o(e === "vertical" ? u.clientHeight : u.clientWidth), a = c - t, h = c + d + t;
      l.value = {
        start: a < 0 ? 0 : a,
        end: h > s.value.length ? s.value.length : h
      }, r.value = s.value.slice(l.value.start, l.value.end).map((b, p) => ({
        data: b,
        index: p + l.value.start
      }));
    }
  };
}
function lt(e, t) {
  return (n) => typeof e == "number" ? n * e : t.value.slice(0, n).reduce((o, i, l) => o + e(l), 0);
}
function st(e, t, n, o) {
  Y([
    e.width,
    e.height,
    () => Ve(t),
    n
  ], () => {
    o();
  });
}
function at(e, t) {
  return E(() => typeof e == "number" ? t.value.length * e : t.value.reduce((n, o, i) => n + e(i), 0));
}
const Ft = {
  horizontal: "scrollLeft",
  vertical: "scrollTop"
};
function ut(e, t, n, o) {
  return (i) => {
    o.value && (o.value[Ft[e]] = n(i), t());
  };
}
function jt(e, t) {
  const n = nt(t), { state: o, source: i, currentList: l, size: r, containerRef: s } = n, u = { overflowX: "auto" }, { itemWidth: c, overscan: d = 5 } = e, a = ot(o, i, c), h = rt("horizontal", d, it(i, c), a, n), b = lt(c, i), p = E(() => b(o.value.start)), _ = at(c, i);
  return st(r, t, s, h), {
    scrollTo: ut("horizontal", h, b, s),
    calculateRange: h,
    wrapperProps: E(() => ({ style: {
      height: "100%",
      width: `${_.value - p.value}px`,
      marginLeft: `${p.value}px`,
      display: "flex"
    } })),
    containerStyle: u,
    currentList: l,
    containerRef: s
  };
}
function Ut(e, t) {
  const n = nt(t), { state: o, source: i, currentList: l, size: r, containerRef: s } = n, u = { overflowY: "auto" }, { itemHeight: c, overscan: d = 5 } = e, a = ot(o, i, c), h = rt("vertical", d, it(i, c), a, n), b = lt(c, i), p = E(() => b(o.value.start)), _ = at(c, i);
  return st(r, t, s, h), {
    calculateRange: h,
    scrollTo: ut("vertical", h, b, s),
    containerStyle: u,
    wrapperProps: E(() => ({ style: {
      width: "100%",
      height: `${_.value - p.value}px`,
      marginTop: `${p.value}px`
    } })),
    currentList: l,
    containerRef: s
  };
}
const ct = {
  capture: !1,
  passive: !1
}, Ge = /\s+/g;
function fe(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
const Te = fe(
  /(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i
), dt = fe(/Edge/i), Ae = fe(/safari/i) && !fe(/chrome/i) && !fe(/android/i), ht = (function() {
  let e = !1;
  return document.addEventListener("checkIfSupportPassive", null, {
    get passive() {
      return e = !0, !0;
    }
  }), e;
})();
function L(e, t, n) {
  window.addEventListener ? e.addEventListener(
    t,
    n,
    ht || !Te ? ct : !1
  ) : window.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n;
}
function M(e, t, n) {
  window.removeEventListener ? e.removeEventListener(
    t,
    n,
    ht || !Te ? ct : !1
  ) : window.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null;
}
function qt(e, t) {
  if (!e || !e.getBoundingClientRect)
    return xe();
  let n = e;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      let o = w(n);
      if (n.clientWidth < n.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll"))
        return !n.getBoundingClientRect || n === document.body ? xe() : n;
    }
  while (n = n.parentNode);
  return xe();
}
function xe() {
  return document.scrollingElement || document.documentElement;
}
function R(e, t, n) {
  if (!e.getBoundingClientRect && e !== window) return;
  let o, i, l, r, s, u, c;
  if (e !== window && e.parentNode && e !== xe() ? (o = e.getBoundingClientRect(), i = o.top, l = o.left, r = o.bottom, s = o.right, u = o.height, c = o.width) : (i = 0, l = 0, r = window.innerHeight, s = window.innerWidth, u = window.innerHeight, c = window.innerWidth), t && e !== window) {
    n = n || e.parentNode;
    do
      if (n && n.getBoundingClientRect) {
        let d = n.getBoundingClientRect();
        i -= d.top + parseInt(w(n, "border-top-width")), l -= d.left + parseInt(w(n, "border-left-width")), r = i + o.height, s = l + o.width;
        break;
      }
    while (n = n.parentNode);
  }
  return {
    top: i,
    left: l,
    bottom: r,
    right: s,
    width: c,
    height: u
  };
}
function pe(e, t, n, o) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Ee(e, t) : Ee(e, t)) || o && e === n)
        return e;
      if (e === n) break;
    } while (e = e.parentNode);
    return null;
  }
}
function ke(e, t) {
  if (!e || !t) return !1;
  if (t.compareDocumentPosition)
    return !!(t.compareDocumentPosition(e) & 16);
  if (t.contains && e.nodeType === 1)
    return t.contains(e) && t !== e;
  for (; e = e.parentNode; ) if (e === t) return !0;
  return !1;
}
function Fe(e, t) {
  let n = e.lastElementChild;
  for (; n && (n === x.ghost || w(n, "display") === "none" || t); )
    n = n.previousElementSibling;
  return n || null;
}
function j(e, t) {
  if (!e || !e.parentNode)
    return -1;
  let n = 0;
  for (; e = e.previousElementSibling; )
    e !== x.ghost && e.nodeName.toUpperCase() !== "TEMPLATE" && w(e, "display") !== "none" && (!t || Ee(e, t)) && n++;
  return n;
}
function We(e, t, n, o) {
  let i = 0, l = 0, r = e.children;
  for (; i < r.length; ) {
    if (r[i] !== x.ghost && w(r[i], "display") !== "none" && pe(r[i], n, e, !1) && r[i] !== x.dragged) {
      if (l === t)
        return r[i];
      l++;
    }
    i++;
  }
  return null;
}
function ft(e, t) {
  let n = w(e), o = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = We(e, 0, t), l = We(e, 1, t), r = i && w(i), s = l && w(l), u = r && parseInt(r.marginLeft) + parseInt(r.marginRight) + R(i).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + R(l).width, d = dt || Te ? "cssFloat" : "float";
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && r.float && r.float !== "none") {
    let a = r.float === "left" ? "left" : "right";
    return l && (s.clear === "both" || s.clear === a) ? "vertical" : "horizontal";
  }
  return i && (r.display === "block" || r.display === "flex" || r.display === "table" || r.display === "grid" || u >= o && n[d] === "none" || l && n[d] === "none" && u + c > o) ? "vertical" : "horizontal";
}
function V(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      const o = (" " + e.className + " ").replace(Ge, " ").replace(" " + t + " ", " ");
      e.className = (o + (n ? " " + t : "")).replace(
        Ge,
        " "
      );
    }
}
function Ee(e, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), e)
      try {
        if (e.matches)
          return e.matches(t);
        if (e.msMatchesSelector)
          return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function w(e, t, n) {
  let o = e && e.style;
  if (o) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in o) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), o[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function Zt(e, t) {
  let n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      let i = w(e, "transform");
      i && i !== "none" && (n = i + " " + n);
    } while (!1);
  const o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(n);
}
function je(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
function Qt(e) {
  return e.offsetWidth;
}
function Jt(e, t) {
  return e.compareDocumentPosition ? e.compareDocumentPosition(t) : e.contains ? (e != t && e.contains(t) && 16) + (e != t && t.contains(e) && 8) + (e.sourceIndex >= 0 && t.sourceIndex >= 0 ? (e.sourceIndex < t.sourceIndex && 4) + (e.sourceIndex > t.sourceIndex && 2) : 1) : 0;
}
function Pe(e, t) {
  const n = Jt(e, t);
  return n === 2 ? 1 : n === 4 ? -1 : 0;
}
function be(e) {
  e.preventDefault !== void 0 && e.cancelable && e.preventDefault();
}
function O({ sortable: e, name: t, evt: n }) {
  const o = e.options[t];
  if (typeof o == "function")
    return o(Object.assign({}, n));
}
function Se(e, ...t) {
  return typeof e == "function" ? e(...t) : e;
}
const P = "Sortable" + Date.now();
function pt(e) {
  this.options = e, this.scrollEl = null, this.autoScrollInterval = null;
}
pt.prototype = {
  nulling() {
    this.autoScrollInterval && (clearInterval(this.autoScrollInterval), this.autoScrollInterval = null);
  },
  onStarted() {
    this.nulling(), this.autoScrollInterval = setInterval(this.autoScroll.bind(this));
  },
  onMove(e, t, n, o) {
    const i = n ? n[P].options : o;
    if (n && !i.autoScroll) {
      this.scrollEl = null;
      return;
    }
    this.options = i, this.scrollEl = qt(e), this.moveEvent = t;
  },
  autoScroll() {
    let e = this.options, t = this.moveEvent, n = this.scrollEl, o = e.scrollThreshold, i = e.scrollSpeed;
    if (!n || t.clientX === void 0 || t.clientY === void 0)
      return;
    const l = R(n);
    if (!l) return;
    const { clientX: r, clientY: s } = t, { top: u, right: c, bottom: d, left: a, height: h, width: b } = l;
    if (s < u || r > c || s > d || r < a)
      return;
    const { scrollTop: p, scrollLeft: _, scrollHeight: A, scrollWidth: U } = n;
    n.scrollLeft += this.getScrollOffset(
      r,
      a,
      c,
      o,
      i.x,
      _,
      U,
      b
    ), n.scrollTop += this.getScrollOffset(
      s,
      u,
      d,
      o,
      i.y,
      p,
      A,
      h
    );
  },
  getScrollOffset(e, t, n, o, i, l, r, s) {
    return l > 0 && e >= t && e <= t + o ? Math.max(-1, (e - t) / o - 1) * i : l + s < r && e <= n && e >= n - o ? Math.min(1, (e - n) / o + 1) * i : 0;
  }
};
function gt(e) {
  this.options = e, this.animationStack = [], this.animationCallbackId = null;
}
gt.prototype = {
  collect(e) {
    if (!e) return;
    let t = R(e), n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, i = Math.min(t.right, n), l = Math.min(t.bottom, o), r = Array.prototype.slice.call(e.children), s = [];
    for (let u = 0, c = r.length; u < c; u++) {
      const d = r[u];
      if (d === x.ghost || w(d, "display") === "none") continue;
      const a = R(d);
      if (!(a.bottom < 0 || a.right < 0)) {
        if (s.length === 0 && d.previousElementSibling) {
          let h = d.previousElementSibling;
          do
            if (h && h !== x.ghost && w(h, "display") !== "none")
              break;
          while (h = h.previousElementSibling);
          h && s.push({ el: h, rect: R(h) });
        }
        if (a.top - a.height > l || a.left - a.width > i) {
          s.push({ el: d, rect: a });
          break;
        }
        s.push({ el: d, rect: a });
      }
    }
    this.animationStack.push(s);
  },
  animate(e) {
    let t = this.animationStack.pop(), n = this.options.animation;
    if (!t || !n) {
      clearTimeout(this.animationCallbackId), typeof e == "function" && e();
      return;
    }
    let o = 0;
    t.forEach((i) => {
      let l = 0, r = i.el, s = R(r), u = i.rect, c = r.prevToRect, d = r.prevFromRect;
      if (r.animating && d && c && je(u, s)) {
        const a = Zt(r);
        if (a) {
          const h = {
            top: s.top - a.f,
            left: s.left - a.e
          }, b = Ue(h, s), p = Ue(d, c);
          l = b / p * n;
        }
      }
      je(u, s) || (r.prevFromRect = u, r.prevToRect = s, l || (l = n), this.execute(r, u, s, l)), l && (o = Math.max(o, l));
    }), clearTimeout(this.animationCallbackId), o ? this.animationCallbackId = setTimeout(() => {
      typeof e == "function" && e();
    }, o) : typeof e == "function" && e();
  },
  execute(e, t, n, o) {
    let i = this.options.easing || "", l = t.left - n.left, r = t.top - n.top;
    w(e, "transition", ""), w(e, "transform", `translate3d(${l}px, ${r}px, 0)`), this.repaintDummy = Qt(e), w(e, "transition", `transform ${o}ms ${i}`), w(e, "transform", "translate3d(0px, 0px, 0px)"), typeof e.animating == "number" && clearTimeout(e.animating), e.animating = setTimeout(() => {
      w(e, "transition", ""), w(e, "transform", ""), e.prevFromRect = null, e.prevToRect = null, e.animating = null;
    }, o);
  }
};
function Ue(e, t) {
  return Math.sqrt(
    Math.pow(e.left - t.left, 2) + Math.pow(e.top - t.top, 2)
  );
}
let Ce = [], G, H, v, y, J, T, g, D, N, I, ee, z, ce, te, B, K, ne, k, W, F, oe;
function mt(e) {
  let t = {}, n = e.group;
  (!n || typeof n != "object") && (n = {
    name: n,
    pull: !0,
    put: !0,
    revertDrag: !0
  }), t.name = n.name, t.pull = n.pull ?? !0, t.put = n.put ?? !0, t.revertDrag = n.revertDrag ?? !0, e.group = t;
}
function en(e, t) {
  let n;
  return Ce.reduce((o, i) => {
    const l = i[P].options.emptyInsertThreshold;
    if (l == null) return;
    const r = R(i), s = e >= r.left - l && e <= r.right + l, u = t >= r.top - l && t <= r.bottom + l;
    return s && u && (!n || n && r.left >= n.left && r.right <= n.right && r.top >= n.top && r.bottom <= n.bottom) && (o = i, n = r), o;
  }, null);
}
function tn(e) {
  const t = K || B;
  return !(e.clientX !== void 0 && e.clientY !== void 0 && Math.abs(e.clientX - t.clientX) <= 0 && Math.abs(e.clientY - t.clientY) <= 0);
}
function x(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw `Sortable-dnd: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
  e[P] = this, this.el = e, this.options = t = Object.assign({}, t);
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
    !(o in t) && (t[o] = n[o]);
  mt(t);
  for (let o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  L(e, t.supportTouch ? "touchstart" : "mousedown", this._onDrag), this.autoScroller = new pt(t), this.animator = new gt(t), Ce.push(e);
}
x.prototype = {
  constructor: x,
  _onDrag(e) {
    let t = this.el, n = this.options, o = n.handle, i = e.touches && e.touches[0], l = (i || e).target, r = t.ownerDocument;
    if (v || n.disabled || !n.group.pull || /mousedown|pointerdown/.test(e.type) && e.button !== 0 || Ae && l && l.tagName.toUpperCase() === "SELECT") return;
    const s = pe(l, n.draggable, t);
    !s || s.animating || (B = {
      event: e,
      clientX: (i || e).clientX,
      clientY: (i || e).clientY
    }, v = s, k = i ? v : document, L(k, "mouseup", this._onDrop), L(k, "touchend", this._onDrop), L(k, "touchcancel", this._onDrop), !(typeof o == "function" && !o(e) || typeof o == "string" && !pe(l, o, v)) && (n.delay && (!n.delayOnTouchOnly || i) && !(dt || Te) ? (L(r, "touchmove", this._delayedMoveHandler), L(r, "mousemove", this._delayedMoveHandler), L(r, "mouseup", this._cancelStart), L(r, "touchend", this._cancelStart), L(r, "touchcancel", this._cancelStart), this._dragStartTimer = setTimeout(
      () => this._onStart(i, e),
      n.delay
    )) : this._onStart(i, e)));
  },
  _delayedMoveHandler(e) {
    const t = e.touches ? e.touches[0] : e;
    Math.max(
      Math.abs(t.clientX - B.clientX),
      Math.abs(t.clientY - B.clientY)
    ) >= Math.floor(
      this.options.touchStartThreshold / (window.devicePixelRatio || 1)
    ) && this._cancelStart();
  },
  _cancelStart() {
    let e = this.el.ownerDocument;
    clearTimeout(this._dragStartTimer), M(e, "touchmove", this._delayedMoveHandler), M(e, "mousemove", this._delayedMoveHandler), M(e, "mouseup", this._cancelStart), M(e, "touchend", this._cancelStart), M(e, "touchcancel", this._cancelStart);
  },
  _onStart(e, t) {
    be(t);
    let n = this.el, o = this.options, i = j(v);
    z = i, ce = i, te = i, G = n, H = n, T = n, N = v, I = v.parentNode, ee = o.group.pull, F = v, W = {
      to: n,
      target: v,
      newIndex: i,
      relative: 0
    }, g = v.cloneNode(!0), x.dragged = v, x.clone = g, x.active = this, O({
      sortable: this,
      name: "onChoose",
      evt: this._getEventProperties(t)
    }), V(v, o.chosenClass, !0), L(k, e ? "touchmove" : "mousemove", this._nearestSortable);
    try {
      document.selection ? setTimeout(() => document.selection.empty(), 0) : window.getSelection().removeAllRanges();
    } catch {
    }
    L(document, "selectstart", be), Ae && w(document.body, "user-select", "none");
  },
  _onStarted() {
    let e = this.options;
    this.animator.collect(I), this._appendGhost(), V(g, e.chosenClass, !0), V(g, e.placeholderClass, !0), v.parentNode.insertBefore(g, v), w(v, "display", "none"), O({
      sortable: this,
      name: "onDrag",
      evt: this._getEventProperties(B.event)
    }), this.animator.animate(), this.autoScroller.onStarted();
  },
  _appendGhost() {
    if (D) return;
    let e = this.options;
    const t = e.appendToBody ? document.body : this.el;
    D = (Se(e.customGhost, g) || g).cloneNode(!0), V(D, e.ghostClass, !0);
    const o = R(v), i = Object.assign(
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
      e.ghostStyle
    );
    for (let s in i)
      w(D, s, i[s]);
    x.ghost = D, t.appendChild(D);
    const l = (B.clientX - o.left) / parseInt(D.style.width) * 100, r = (B.clientY - o.top) / parseInt(D.style.height) * 100;
    w(D, "transform-origin", `${l}% ${r}%`), w(D, "will-change", "transform");
  },
  _nearestSortable(e) {
    be(e);
    let t = e.touches && e.touches[0], n = t || e;
    if (!v || !tn(n)) return;
    !K && this._onStarted();
    let o = this.options.lockAxis, i = o === "x" ? B.clientX : n.clientX, l = o === "y" ? B.clientY : n.clientY, r = document.elementFromPoint(i, l), s = i - B.clientX, u = l - B.clientY;
    K = { event: e, clientX: i, clientY: l }, w(D, "transform", `translate3d(${s}px, ${u}px, 0)`);
    const c = en(i, l);
    c && c[P]._onMove(e, r), this.autoScroller.onMove(r, K, c, this.options);
  },
  _allowPut() {
    let e = this.options.group, t = T[P].options.group;
    return this.el === T ? !0 : e.put ? e.put.join && e.put.indexOf(t.name) > -1 || t.name && e.name && t.name === e.name : !1;
  },
  _getDirection() {
    let e = this.options.draggable, t = this.options.direction;
    return t ? Se(t, K.event, g, this) : ft(I, e);
  },
  _allowSwap() {
    let e = R(y), t = this._getDirection() === "vertical", n = t ? "top" : "left", o = t ? "bottom" : "right", i = y[t ? "offsetHeight" : "offsetWidth"], l = t ? K.clientY : K.clientX, r = l >= e[n] && l < e[o] - i / 2 ? -1 : 1, s = We(I, 0, this.options.draggable), u = Fe(I), c = R(s), d = R(u);
    if (y === I || ke(I, y))
      return g === s && l < c[n] ? (J = y, !0) : g === u && l > d[o] ? (J = y.nextSibling, !0) : !1;
    const a = Pe(g, y);
    return J = a < 0 ? y.nextSibling : y, ne !== y ? (oe = r, !0) : oe !== r ? (oe = r, r < 0 ? a > 0 : a < 0) : !1;
  },
  _onMove(e, t) {
    let n = this.el, o = this.options;
    if (!(o.disabled || !this._allowPut())) {
      if (y = pe(t, o.draggable, n), O({
        sortable: this,
        name: "onMove",
        evt: this._getEventProperties(e, { target: y })
      }), !o.sortable && n === T) {
        H !== T && (y = ne = v, oe = 0, this._onInsert(e));
        return;
      }
      if (n !== H && (t === n || !Fe(n))) {
        y = ne = null, this._onInsert(e);
        return;
      }
      if (!(!y || y.animating || ke(y, g) || !this._allowSwap())) {
        if (y === g || J === g) {
          ne = y;
          return;
        }
        n !== H ? this._onInsert(e) : y !== v && this._onChange(e), ne = y;
      }
    }
  },
  _onInsert(e) {
    let t = this.el, n = y || g, o = ee === "clone" && t !== T && H === T, i = ee === "clone" && t === T && H !== T, l = ke(y, document), r = y === v && !l, s = H[P], u = T[P];
    G = t, z = j(g), N = n, I = l ? y.parentNode : t, s.animator.collect(g.parentNode), this.animator.collect(I), o && (W.target = F, W.newIndex = z, W.relative = F === v ? 0 : Pe(g, F), w(v, "display", ""), u.options.group.revertDrag || g.parentNode.insertBefore(v, g)), i && (z = j(v), w(v, "display", "none")), w(g, "display", r ? "none" : ""), y && l ? I.insertBefore(
      g,
      oe < 0 ? y : y.nextSibling
    ) : I.appendChild(g), ce = r ? te : j(g), o && u.options.group.revertDrag && (W.target = v, W.newIndex = te, W.relative = 0, O({
      sortable: u,
      name: "onChange",
      evt: this._getEventProperties(e, {
        to: T,
        target: v,
        newIndex: te,
        revertDrag: !0
      })
    })), o || O({
      sortable: s,
      name: "onRemove",
      evt: this._getEventProperties(e, { newIndex: -1 })
    }), i && n !== v && (F = n, O({
      sortable: this,
      name: "onChange",
      evt: this._getEventProperties(e, {
        from: T,
        backToOrigin: !0
      })
    })), i || O({
      sortable: this,
      name: "onAdd",
      evt: this._getEventProperties(e, { oldIndex: -1 })
    }), s.animator.animate(), this.animator.animate(), H = t;
  },
  _onChange(e) {
    let t = this.el;
    this.animator.collect(I), z = j(g), I = y.parentNode, N = y, t === T && (F = y), I.insertBefore(g, J), ce = j(g), O({
      sortable: this,
      name: "onChange",
      evt: this._getEventProperties(e)
    }), O({
      sortable: this,
      name: "onDragChange",
      evt: this._getEventProperties(e)
    }), this.animator.animate(), H = t;
  },
  _onDrop(e) {
    let t = this.options;
    if (this._cancelStart(), M(k, "touchmove", this._nearestSortable), M(k, "mousemove", this._nearestSortable), M(k, "mouseup", this._onDrop), M(k, "touchend", this._onDrop), M(k, "touchcancel", this._onDrop), M(document, "selectstart", be), Ae && w(document.body, "user-select", ""), D && D.parentNode && D.parentNode.removeChild(D), T)
      if (H = T, z = te, N === g && (N = v), V(v, t.chosenClass, !1), O({
        sortable: this,
        name: "onUnchoose",
        evt: this._getEventProperties(e)
      }), K) {
        this.animator.collect(I), V(g, t.chosenClass, !1), V(g, t.placeholderClass, !1);
        const n = this._getEventProperties(e);
        !t.dropOnAnimationEnd && this._onEnd(n), this.animator.animate(() => {
          t.dropOnAnimationEnd && this._onEnd(n);
        });
      } else
        this._nulling();
    else
      this._nulling();
  },
  _onEnd(e) {
    let t = this.options, n = ee === "clone", o = H === G;
    (!n || o) && Se(t.swapOnDrop, e) && I.insertBefore(v, g), (!n || o) && Se(t.removeCloneOnDrop, e) && g && g.parentNode && g.parentNode.removeChild(g), w(v, "display", ""), H !== G && O({
      sortable: H[P],
      name: "onDrop",
      evt: Object.assign({}, e, n ? W : { newIndex: -1 })
    }), O({
      sortable: G[P],
      name: "onDrop",
      evt: Object.assign({}, e, o ? {} : { oldIndex: -1 })
    }), this._nulling();
  },
  _getEventProperties(e, t = {}) {
    let n = {};
    return n.event = e, n.to = G, n.from = H, n.node = v, n.clone = g, n.target = N, n.oldIndex = z, n.newIndex = ce, n.pullMode = ee, Object.assign(n, t), n.relative = N === v ? 0 : Pe(g, N), n;
  },
  _nulling() {
    G = H = v = y = J = T = g = D = N = I = ee = z = ce = te = B = K = ne = k = W = F = oe = x.clone = x.ghost = x.active = x.dragged = null, this.autoScroller.nulling();
  },
  destroy() {
    this._cancelStart(), this._nulling(), M(this.el, "touchstart", this._onDrag), M(this.el, "mousedown", this._onDrag);
    const e = Ce.indexOf(this.el);
    e > -1 && Ce.splice(e, 1), this.el[P] = this.animator = this.autoScroller = null;
  },
  option(e, t) {
    if (t === void 0)
      return this.options[e];
    this.options[e] = t, this.animator.options[e] = t, this.autoScroller.options[e] = t, e === "group" && mt(this.options);
  }
};
x.utils = {
  on: L,
  off: M,
  css: w,
  index: j,
  matches: Ee,
  closest: pe,
  getRect: R,
  toggleClass: V,
  detectDirection: ft
};
x.get = function(e) {
  return e[P];
};
x.create = function(e, t) {
  return new x(e, t);
};
function nn(e, t) {
  let n;
  const o = function(...i) {
    n || (t <= 0 ? e.apply(this, i) : n = setTimeout(() => {
      n = null, e.apply(this, i);
    }, t));
  };
  return o.cancel = function() {
    n && (clearTimeout(n), n = null);
  }, o;
}
function Tn(e, t) {
  const n = nn(e, t), o = function(...i) {
    n.cancel(), n.apply(this, i);
  };
  return o.cancel = () => {
    n.cancel();
  }, o;
}
function he(e, t) {
  return e === 0 ? e === t : e == t;
}
function Dn(e, t) {
  return (Array.isArray(t) ? t : t.replace(/\[/g, ".").replace(/\]/g, ".").split(".")).reduce((n, o) => (n || {})[o], e);
}
const Ke = [
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
class on {
  constructor(t, n) {
    this.el = t, this.options = n, this.rangeChanged = !1, this.installSortable();
  }
  destroy() {
    this.sortable.destroy(), this.rangeChanged = !1;
  }
  option(t, n) {
    this.options[t] = n, Ke.includes(t) && this.sortable.option(t, n);
  }
  installSortable() {
    const t = Ke.reduce(
      (n, o) => (n[o] = this.options[o], n),
      {}
    );
    this.sortable = new x(this.el, {
      ...t,
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
  onChoose(t) {
    this.dispatchEvent("onChoose", t);
  }
  onUnchoose(t) {
    this.dispatchEvent("onUnchoose", t);
  }
  onDrag(t) {
    const n = t.node.getAttribute("data-key"), o = this.getIndex(n), i = this.options.list[o], l = this.options.uniqueKeys[o];
    this.sortable.option("store", { item: i, key: l, index: o, oldIndex: o }), this.dispatchEvent("onDrag", { item: i, key: l, index: o, event: t });
  }
  // 拖拽位置变化
  onDragChange(t) {
    const n = x.get(t.from)?.option("store"), o = n ? n.oldIndex : -1, i = n ? n.key : null, l = t.target.getAttribute("data-key");
    let r = this.getIndex(l);
    const s = this.getIndex(i);
    if ((s < r && t.relative === -1 || s > r && t.relative === 1) && (r += t.relative), o === r)
      return;
    const u = {
      key: l,
      oldIndex: o,
      newIndex: r,
      event: t,
      item: this.options.list[r]
    };
    this.sortable.option("store").oldIndex = r, this.dispatchEvent("onDragChange", u);
  }
  onDrop(t) {
    const { item: n, key: o, index: i } = x.get(t.from)?.option("store"), l = this.options.list, r = {
      key: o,
      item: n,
      list: l,
      event: t,
      changed: !1,
      oldList: [...l],
      oldIndex: i,
      newIndex: i
    };
    t.from === t.to && t.node === t.target || this.handleDropEvent(t, r, i), this.dispatchEvent("onDrop", r), t.from === this.el && this.rangeChanged && x.dragged?.remove(), t.from !== t.to && x.clone?.remove(), this.rangeChanged = !1;
  }
  handleDropEvent(t, n, o) {
    const i = t.target.getAttribute("data-key");
    let l = -1, r = o;
    t.from === t.to ? (r = this.getIndex(n.key), l = this.getIndex(i), (r < l && t.relative === -1 || r > l && t.relative === 1) && (l += t.relative), l !== r && (n.list.splice(r, 1), n.list.splice(l, 0, n.item))) : (t.from === this.el && (r = this.getIndex(n.key), n.list.splice(r, 1)), t.to === this.el && (r = -1, l = this.getIndex(i), t.relative === 0 ? l = n.list.length : t.relative === 1 && (l += t.relative), n.list.splice(l, 0, n.item))), n.changed = t.from !== t.to || l !== r, n.oldIndex = r, n.newIndex = l;
  }
  getIndex(t) {
    if (t == null)
      return -1;
    const { uniqueKeys: n } = this.options;
    for (let o = 0, i = n.length; o < i; o++)
      if (he(n[o], t))
        return o;
    return -1;
  }
  dispatchEvent(t, n) {
    const o = this.options[t];
    o && o(n);
  }
}
const rn = ({
  mounted: e,
  updated: t,
  unmounted: n
}) => /* @__PURE__ */ Ie({
  props: ["vnode"],
  mounted() {
    e(this.$el);
  },
  onUpdated() {
    t(this.$el);
  },
  onUnmounted() {
    n(this.$el);
  },
  render(o) {
    return o.vnode;
  }
}), ln = /* @__PURE__ */ Ie({
  props: kt,
  emits: ["resize"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    let o = null;
    const i = (c) => {
      const d = c ? c[e.sizeKey] : 0;
      t("resize", d, e.dataKey);
    }, u = rn({
      mounted: (c) => {
        typeof ResizeObserver < "u" && (o = new ResizeObserver(() => {
          i(c);
        }), c && o.observe(c));
      },
      updated: (c) => {
        i(c);
      },
      unmounted: () => {
        o && (o.disconnect(), o = null);
      }
    });
    return () => {
      const {
        dataKey: c
      } = e, [d] = n.default?.() || [];
      return wt(u, {
        key: c,
        role: "item",
        vnode: d,
        "data-key": c
      }, {
        default: () => n.default?.()
      });
    };
  }
});
function vt(e) {
  return Qe() ? (Je(e), !0) : !1;
}
function $e(e) {
  return typeof e == "function" ? e() : Ne(e);
}
const yt = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const qe = () => {
};
function sn(e, t) {
  function n(...o) {
    return new Promise((i, l) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(i).catch(l);
    });
  }
  return n;
}
function an(e, t = {}) {
  let n, o, i = qe;
  const l = (r) => {
    clearTimeout(r), i(), i = qe;
  };
  return (r) => {
    const s = $e(e), u = $e(t.maxWait);
    return n && l(n), s <= 0 || u !== void 0 && u <= 0 ? (o && (l(o), o = null), Promise.resolve(r())) : new Promise((c, d) => {
      i = t.rejectOnCancel ? d : c, u && !o && (o = setTimeout(() => {
        n && l(n), o = null, c(r());
      }, u)), n = setTimeout(() => {
        o && l(o), o = null, c(r());
      }, s);
    });
  };
}
function un(e) {
  return _e();
}
function cn(e, t = 200, n = {}) {
  return sn(
    an(t, n),
    e
  );
}
function dn(e, t = !0, n) {
  un() ? re(e, n) : t ? e() : ze(e);
}
function Ze(e) {
  var t;
  const n = $e(e);
  return (t = n?.$el) != null ? t : n;
}
const hn = yt ? window : void 0, fn = yt ? window.document : void 0;
function pn() {
  const e = C(!1), t = _e();
  return t && re(() => {
    e.value = !0;
  }, t), e;
}
function gn(e) {
  const t = pn();
  return E(() => (t.value, !!e()));
}
function mn(e, t, n = {}) {
  const { window: o = hn, ...i } = n;
  let l;
  const r = gn(() => o && "ResizeObserver" in o), s = () => {
    l && (l.disconnect(), l = void 0);
  }, u = E(() => Array.isArray(e) ? e.map((a) => Ze(a)) : [Ze(e)]), c = Y(
    u,
    (a) => {
      if (s(), r.value && o) {
        l = new ResizeObserver(t);
        for (const h of a)
          h && l.observe(h, i);
      }
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    s(), c();
  };
  return vt(d), {
    isSupported: r,
    stop: d
  };
}
let vn = 0;
function yn(e, t = {}) {
  const n = C(!1), {
    document: o = fn,
    immediate: i = !0,
    manual: l = !1,
    id: r = `vueuse_styletag_${++vn}`
  } = t, s = C(e);
  let u = () => {
  };
  const c = () => {
    if (!o)
      return;
    const a = o.getElementById(r) || o.createElement("style");
    a.isConnected || (a.id = r, t.media && (a.media = t.media), o.head.appendChild(a)), !n.value && (u = Y(
      s,
      (h) => {
        a.textContent = h;
      },
      { immediate: !0 }
    ), n.value = !0);
  }, d = () => {
    !o || !n.value || (u(), o.head.removeChild(o.getElementById(r)), n.value = !1);
  };
  return i && !l && dn(c), l || vt(d), {
    id: r,
    css: s,
    unload: d,
    load: c,
    isLoaded: Mt(n)
  };
}
const wn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
};
function bn(e) {
  const {
    containerEl: t,
    sliderEl: n,
    autoHeight: o,
    performance: i = {},
    maxHeightRatio: l = 0.9,
    observeMethod: r = "classList"
  } = e, s = C(!0), u = cn(q, 100);
  let c, d = "";
  const a = C(0), h = C(0), b = C(0), p = C({
    top: 0,
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0
  }), _ = C({
    clientHeight: 0
  }), A = E(() => !!h.value), U = E(() => p.value.scrollHeight > p.value.clientHeight), X = E(() => o ? p.value.clientHeight - ve.value : p.value.clientHeight - _.value.clientHeight), me = E(() => p.value.scrollHeight - p.value.clientHeight), le = E(() => !p.value.clientHeight && !p.value.scrollHeight ? 1 : Math.max(
    p.value.clientHeight / p.value.scrollHeight,
    0.05
  )), ve = E(() => le.value > l ? 0 : le.value * p.value.clientHeight), De = E(() => ({
    willChange: "transform",
    transform: `translate3d(0,${b.value}px,0)`,
    height: o ? `${ve.value}px` : void 0
  }));
  mn(t, () => Z());
  function ye(m) {
    se(), h.value = m.clientY - n.value.getBoundingClientRect().top || 1, d = getComputedStyle(t.value).scrollBehavior, d === "smooth" && (t.value.style.scrollBehavior = "unset");
  }
  function He() {
    t.value.style.scrollBehavior = d, h.value = 0, u();
  }
  function se() {
    s.value = !1;
  }
  function q() {
    A.value || (s.value = !0);
  }
  function Me(m) {
    if (!A.value)
      return;
    let S = m.clientY - p.value.top - h.value;
    S < 0 ? b.value = 0 : S >= X.value ? b.value = X.value : b.value = S, t.value.scrollTo({
      top: b.value / X.value * me.value
    });
  }
  function Re() {
    A.value || Oe();
  }
  function Oe() {
    cancelAnimationFrame(c), c = requestAnimationFrame(ae);
  }
  function ae() {
    t.value && (a.value = i.scrollTop?.value ?? t.value.scrollTop, b.value = a.value / me.value * X.value);
  }
  function we(m) {
    let S = "addEventListener";
    m === "add" ? S = "addEventListener" : S = "removeEventListener", n.value?.[S]("pointerdown", ye, {
      passive: !0
    }), window[S]("pointermove", Me, { passive: !0 }), window[S]("pointerup", He, { passive: !0 });
  }
  const Be = new MutationObserver((m) => {
    (r == "classList" || m.map((S) => S.oldValue).join().includes("height")) && Z();
  });
  function Z() {
    p.value.top = t.value?.getBoundingClientRect().top ?? 0;
    const { scrollHeight: m = 0, clientHeight: S = 0 } = t.value || {}, { scrollHeight: $, clientHeight: Q } = p.value;
    m != $ && (p.value.scrollHeight = m, ae()), S != Q && (p.value.clientHeight = S, ae());
    const { clientHeight: Ye = 0 } = n.value || {};
    Ye != _.value.clientHeight && (_.value.clientHeight = Ye);
  }
  function Le() {
    se(), setTimeout(() => {
      _.value.clientHeight = n.value?.clientHeight ?? 0, q();
    }, 150);
  }
  function f() {
    if (t.value && n.value) {
      t.value.classList.add("hide-scrollbar"), t.value.addEventListener("scroll", Re, {
        passive: !0
      }), we("add");
      const m = {};
      r === "classList" ? Object.assign(m, { subtree: !0, childList: !0 }) : Object.assign(m, {
        subtree: !0,
        attributeOldValue: !0,
        attributeFilter: ["style"]
      }), Be.observe(t.value, m), setTimeout(() => {
        Z();
      }, 100), Le();
    } else
      console.error("useScrollBar:", "初始化失败!", { containerEl: t, sliderEl: n });
  }
  return Y(a, () => {
    se(), u();
  }), {
    isScrollEnd: s,
    isDragSlider: A,
    offsetTop: b,
    scrollTop: a,
    scrollable: U,
    sliderPos: De,
    sliderRollableHeight: X,
    init: f,
    modifySliderEventListener: we,
    heightRatio: le
  };
}
const Sn = (e) => (Rt("data-v-7fd39e51"), e = e(), Ot(), e), xn = /* @__PURE__ */ Sn(() => /* @__PURE__ */ et("div", { class: "default-slider" }, null, -1)), En = /* @__PURE__ */ Ie({
  __name: "ScrollBar",
  props: {
    containerEl: null,
    autoHide: { type: Boolean },
    autoHeight: { type: Boolean },
    observeMethod: null,
    performance: null,
    maxHeightRatio: { default: 0.9 }
  },
  setup(e, { expose: t }) {
    const n = e, o = !!bt().default, i = C(null), l = E(() => n.containerEl), r = bn({
      containerEl: l,
      sliderEl: i,
      autoHeight: o ? n.autoHeight : !0,
      performance: n.performance,
      observeMethod: n.observeMethod
    }), { scrollable: s, isScrollEnd: u, sliderPos: c, heightRatio: d } = r, a = C(!1), h = n.autoHide ? E(() => n.maxHeightRatio < d.value ? !1 : a.value || !u.value) : E(() => n.maxHeightRatio < d.value ? !1 : s.value), { load: b } = yn(
      `.hide-scrollbar {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }`,
      { id: "styletag_lzc_scrollbar", manual: !0 }
    );
    re(() => {
      b(), ze(() => {
        r.init();
      });
    }), St(() => {
      r.modifySliderEventListener("remove");
    });
    function p() {
      a.value = !0;
    }
    function _() {
      a.value = !1;
    }
    return t({ uScrollBarReturn: r }), (A, U) => (Et(), xt(Ct, null, {
      default: _t(() => [
        It(et("div", {
          ref_key: "sliderRef",
          ref: i,
          class: "slider-wrapper",
          onMouseenter: p,
          onMouseleave: _,
          style: Tt(Ne(c))
        }, [
          Dt(A.$slots, "default", {}, () => [
            xn
          ], !0)
        ], 36), [
          [Ht, Ne(h)]
        ])
      ]),
      _: 3
    }));
  }
}), Cn = /* @__PURE__ */ wn(En, [["__scopeId", "data-v-7fd39e51"]]), _n = (e) => Lt(e) ? e.value : e;
function de(e, t) {
  return (Array.isArray(t) ? t : t.replace(/\[/g, ".").replace(/\]/g, ".").split(".")).reduce((n, o) => (n || {})[o], e);
}
const Hn = /* @__PURE__ */ Ie({
  props: At,
  emits: ["update:modelValue", "top", "bottom", "drag", "dragChange", "drop", "rangeChange"],
  setup(e, {
    emit: t,
    slots: n,
    expose: o
  }) {
    const i = C([]), l = C(!1), r = C(null);
    let s = [], u;
    const c = C(""), d = C(/* @__PURE__ */ new Map()), {
      list: a,
      containerProps: h,
      wrapperProps: b,
      scrollTo: p
    } = Gt(i, {
      itemHeight: e.getItemHeight,
      overscan: 30
    }), _ = () => {
      s = i.value.map((f) => de(f, e.dataKey)), u?.option("uniqueKeys", s);
    };
    function A() {
      const f = _n(e.modelValue);
      f && (i.value = f, _(), u?.option("list", f), t("update:modelValue", f));
    }
    Y(() => [e.modelValue], () => {
      A();
    }, {
      deep: !0
    });
    const U = (f) => {
      l.value = !0, e.sortable || u.option("autoScroll", !1), t("drag", f);
    }, X = (f) => {
      l.value = !1, u.option("autoScroll", e.autoScroll), f.changed && t("update:modelValue", f.list), t("drop", f);
    }, me = (f) => {
      t("dragChange", f);
    }, le = (f) => {
      c.value = f.node.getAttribute("data-key");
    }, ve = () => {
      c.value = "";
    };
    function De(f, m) {
      he(m, c.value) || d.value.set(m, f);
    }
    const ye = E(() => Ke.reduce((f, m) => (f[m] = e[m], f), {}));
    Y(ye, (f, m) => {
      if (u)
        for (let S in f)
          f[S] !== m[S] && u.option(S, f[S]);
    });
    function He() {
      u = new on(h.ref.value, {
        ...ye.value,
        list: i.value,
        uniqueKeys: s,
        onDrag: U,
        onDrop: X,
        onChoose: le,
        onUnchoose: ve,
        onDragChange: me
      });
    }
    function se(f) {
      let m = 0;
      const S = i.value;
      for (let $ = 0; $ < S.length; $++) {
        const Q = de(S[$], e.dataKey);
        if (Q === f) break;
        m += d.value.get(Q) ?? e.getItemHeight($);
      }
      return m;
    }
    function q(f) {
      p && p(f);
    }
    function Me(f) {
      if (i.value.findIndex((Q) => he(de(Q, e.dataKey), f)) === -1) return;
      const S = h.ref.value;
      if (!S) return;
      const $ = se(f);
      S.scrollTo({
        top: $,
        behavior: "smooth"
      });
    }
    function Re() {
      q(i.value.length - 1);
    }
    function Oe() {
      q(0);
    }
    function ae() {
      return {
        width: h.ref.value?.clientWidth || 0,
        height: h.ref.value?.clientHeight || 0
      };
    }
    function we() {
      return {
        width: r.value?.offsetWidth || 0,
        height: r.value?.offsetHeight || 0
      };
    }
    function Be(f) {
      return i.value.findIndex((m) => he(de(m, e.dataKey), f));
    }
    Bt(() => {
      A();
    }), re(() => {
      He();
    }), o({
      containerProps: h,
      wrapperRef: r,
      getClientSize: ae,
      getWrapperSize: we,
      getIndexByKey: Be,
      scrollToKey: Me,
      scrollToBottom: Re,
      scrollToTop: Oe,
      scrollToIndex: q
    });
    const Z = C(0), Le = (f) => {
      Z.value = f.target.scrollTop;
      const m = f.target;
      m.scrollHeight - m.scrollTop === m.clientHeight ? t("bottom") : m.scrollTop === 0 && t("top");
    };
    return () => ue("div", null, [ue("div", Xe(h, {
      style: {
        position: "absolute",
        width: "100%",
        height: "100%"
      },
      onScroll: Le
    }), [ue("div", Xe({
      ref: r
    }, b.value), [a.value.map((f) => {
      const m = de(f.data, e.dataKey), S = l.value && he(m, c.value);
      return ue(ln, {
        key: m,
        dataKey: m,
        style: {
          display: S ? "none" : "flex"
        },
        sizeKey: "offsetHeight",
        onResize: De
      }, {
        default: () => n.item?.({
          item: f.data,
          index: f.index
        })
      });
    })])]), e.scrollbar && ue(Cn, {
      "scroll-top": Z.value,
      containerEl: h.ref.value
    }, null)]);
  }
});
export {
  on as Sortable,
  Ke as SortableAttrs,
  Tn as debounce,
  Hn as default,
  Dn as getDataKey,
  he as isSameValue,
  nn as throttle
};

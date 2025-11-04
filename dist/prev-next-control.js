const u = (o, e = {}, t = "") => {
  const s = document.createElement(o);
  for (let n in e)
    s.setAttribute(n, e[n]);
  return s.innerHTML = t, s;
}, v = (o, e) => (document.getElementById(o) || document.getElementsByTagName("head")[0].prepend(u("STYLE", { type: "text/css" }, e)), !0), g = function(o) {
  let e = o, t = [];
  return function(n, l = {}) {
    return arguments.length > 0 ? typeof n == "function" ? (l.prepend ? t.unshift(n) : t.push(n), l.dontCallOnRegistration || n(e), () => {
      const i = t.indexOf(n);
      i !== -1 && t.splice(i, 1);
    }) : (e !== n && JSON.stringify(e) !== JSON.stringify(n) && (e = n, t.forEach((i) => i(e))), e) : e;
  };
}, p = function() {
  let o, e, t, s, n;
  this.prev = g(), this.next = g(), v("prev-next-controls", `

    .geocam-nav-button-disabled {
      cursor: auto;
      background-color: rgba(127,127,127,0.5);
    }

    .geocam-prev-button {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 8.793l7 7 7-7v1.414l-7 7-7-7z"/><path fill="none" d="M0 0h24v24H0z"/></svg>');
    }

    .geocam-next-button {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13.793l7-7 7 7v1.414l-7-7-7 7z"/><path fill="none" d="M0 0h24v24H0z"/></svg>');
    }
  `);
  const i = (c) => {
    const r = this.prev();
    r && o.shot(r);
  }, a = (c) => {
    const r = this.next();
    r && o.shot(r);
  };
  this.init = function(c) {
    o = c, e = u("DIV", {
      class: "geocam-nav-button geocam-prev-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to previous shot in sequence"
    }), o.addControl(e, "bottom"), t = u("DIV", {
      class: "geocam-nav-button geocam-next-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to next shot in sequence"
    }), o.addControl(t, "bottom"), e.addEventListener("click", i, !1), t.addEventListener("click", a, !1), s = this.prev((r) => {
      r ? e.classList.remove("geocam-nav-button-disabled") : e.classList.add("geocam-nav-button-disabled");
    }), n = this.next((r) => {
      r ? t.classList.remove("geocam-nav-button-disabled") : t.classList.add("geocam-nav-button-disabled");
    });
  };
  const d = function(c) {
    if (c.target.closest("input,calcite-input")) return;
    const r = c.key === "ArrowUp" || c.key === "w", h = c.key === "ArrowDown" || c.key === "s";
    (r || h) && (r ? a() : i(), c.stopPropagation());
  };
  document.addEventListener("keydown", d), this.destroy = function() {
    document.removeEventListener("keydown", d), s(), n(), o.wrapper.removeChild(t), o.wrapper.removeChild(e);
  };
};
class m extends HTMLElement {
  static get observedAttributes() {
    return ["prev", "next"];
  }
  constructor() {
    super(), this.plugin = null, console.log("prev-next-control init");
  }
  attributeChangedCallback(e, t, s) {
    console.log("attribute changed", e, s);
    const n = function(l, i) {
      console.log("debouceAttrChange", l, i), this.plugin ? (console.log("setting", l, i), (l == "prev" ? this.prev : this.next)(i)) : setTimeout(() => n(l, i), 100);
    };
    n(e, s);
  }
  connectedCallback() {
    console.log("prev-next-control connected");
    const e = this.closest("geocam-viewer");
    if (!e) {
      console.error(
        "GeocamViewerPreVNext must be a child of GeocamViewer"
      );
      return;
    }
    const t = () => {
      const s = e.viewer;
      s && typeof s.plugin == "function" ? (this.viewer = s, this.plugin = new p(), this.viewer.plugin(this.plugin), this.shot = this.viewer.shot, this.prev = this.plugin.prev, this.next = this.plugin.next) : setTimeout(t, 50);
    };
    t();
  }
  disconnectedCallback() {
    this.prev = null, this.next = null, this.plugin = null, this.shot = null, this.viewer = null, console.log("prev-next-control disconnected");
  }
}
window.customElements.define(
  "geocam-viewer-prev-next-control",
  m
);
export {
  m as GeocamViewerPrevNextControl
};

const u = (o, e = {}, n = "") => {
  const r = document.createElement(o);
  for (let t in e)
    r.setAttribute(t, e[t]);
  return r.innerHTML = n, r;
}, v = (o, e) => (document.getElementById(o) || document.getElementsByTagName("head")[0].prepend(u("STYLE", { type: "text/css" }, e)), !0), g = function(o) {
  let e = o, n = [];
  return function(t, l = {}) {
    return arguments.length > 0 ? typeof t == "function" ? (l.prepend ? n.unshift(t) : n.push(t), l.dontCallOnRegistration || t(e), () => {
      const s = n.indexOf(t);
      s !== -1 && n.splice(s, 1);
    }) : (e !== t && JSON.stringify(e) !== JSON.stringify(t) && (e = t, n.forEach((s) => s(e))), e) : e;
  };
}, p = function() {
  let o, e, n, r, t;
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
  const s = (c) => {
    const i = this.prev();
    i && o.shot(i);
  }, a = (c) => {
    const i = this.next();
    i && o.shot(i);
  };
  this.init = function(c) {
    o = c, e = u("DIV", {
      class: "geocam-nav-button geocam-prev-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to previous shot in sequence"
    }), o.addControl(e, "bottom"), n = u("DIV", {
      class: "geocam-nav-button geocam-next-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to next shot in sequence"
    }), o.addControl(n, "bottom"), e.addEventListener("click", s, !1), n.addEventListener("click", a, !1), r = this.prev((i) => {
      i ? e.classList.remove("geocam-nav-button-disabled") : e.classList.add("geocam-nav-button-disabled");
    }), t = this.next((i) => {
      i ? n.classList.remove("geocam-nav-button-disabled") : n.classList.add("geocam-nav-button-disabled");
    });
  };
  const d = function(c) {
    const i = c.key === "ArrowUp" || c.key === "w", h = c.key === "ArrowDown" || c.key === "s";
    (i || h) && (i ? a() : s(), c.stopPropagation());
  };
  document.addEventListener("keydown", d), this.destroy = function() {
    document.removeEventListener("keydown", d), r(), t(), o.wrapper.removeChild(n), o.wrapper.removeChild(e);
  };
};
class m extends HTMLElement {
  static get observedAttributes() {
    return ["prev", "next"];
  }
  constructor() {
    super(), this.plugin = null, console.log("prev-next-control init");
  }
  attributeChangedCallback(e, n, r) {
    console.log("attribute changed", e, r);
    const t = function(l, s) {
      console.log("debouceAttrChange", l, s), this.plugin ? (console.log("setting", l, s), (l == "prev" ? this.prev : this.next)(s)) : setTimeout(() => t(l, s), 100);
    };
    t(e, r);
  }
  connectedCallback() {
    console.log("prev-next-control connected");
    const e = this.parentNode;
    this.viewer = e.viewer, this.viewer && this.viewer.plugin ? (this.plugin = new p(), this.viewer.plugin(this.plugin), this.shot = this.viewer.shot, this.prev = this.plugin.prev, this.next = this.plugin.next) : console.error(
      "GeocamViewerPreVNext must be a child of GeocamViewer"
    );
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

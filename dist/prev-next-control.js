const a = (t, e = {}, n = "") => {
  const r = document.createElement(t);
  for (let o in e)
    r.setAttribute(o, e[o]);
  return r.innerHTML = n, r;
}, m = (t, e) => (document.getElementById(t) || document.getElementsByTagName("head")[0].prepend(a("STYLE", { type: "text/css" }, e)), !0), g = function(t) {
  let e = t, n = [];
  return function(o, l = {}) {
    return arguments.length > 0 ? typeof o == "function" ? (l.prepend ? n.unshift(o) : n.push(o), l.dontCallOnRegistration || o(e), () => {
      const c = n.indexOf(o);
      c !== -1 && n.splice(c, 1);
    }) : (e !== o && JSON.stringify(e) !== JSON.stringify(o) && (e = o, n.forEach((c) => c(e))), e) : e;
  };
}, p = function() {
  let t, e, n, r, o;
  this.prev = g(), this.next = g(), m("prev-next-controls", `

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
  const c = (i) => {
    const s = this.prev();
    s && t.shot(s);
  }, d = (i) => {
    const s = this.next();
    s && t.shot(s);
  };
  this.init = function(i) {
    t = i, e = a("DIV", {
      class: "geocam-nav-button geocam-prev-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to previous shot in sequence"
    }), t.addControl(e, "bottom"), n = a("DIV", {
      class: "geocam-nav-button geocam-next-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to next shot in sequence"
    }), t.addControl(n, "bottom"), e.addEventListener("click", c, !1), n.addEventListener("click", d, !1), r = this.prev((s) => {
      s ? e.classList.remove("geocam-nav-button-disabled") : e.classList.add("geocam-nav-button-disabled");
    }), o = this.next((s) => {
      s ? n.classList.remove("geocam-nav-button-disabled") : n.classList.add("geocam-nav-button-disabled");
    });
  };
  const u = function(i) {
    const s = i.key === "ArrowUp" || i.key === "w", v = i.key === "ArrowDown" || i.key === "s";
    (s || v) && (s ? d() : c(), i.stopPropagation());
  };
  document.addEventListener("keydown", u), this.destroy = function() {
    document.removeEventListener("keydown", u), r(), o(), t.wrapper.removeChild(n), t.wrapper.removeChild(e);
  };
};
class b extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("prev-next-control init");
  }
  connectedCallback() {
    console.log("prev-next-control connected");
    const e = this.parentNode;
    e.viewer && e.viewer.plugin ? (this.plugin = new p(), e.viewer.plugin(this.plugin)) : console.error(
      "GeocamViewerCompassNeedle must be a child of GeocamViewer"
    );
  }
  disconnectedCallback() {
    this.plugin = null, console.log("prev-next-control disconnected");
  }
}
window.customElements.define(
  "geocam-viewer-prev-next-control",
  b
);
export {
  b as GeocamViewerPrevNextControl
};

const c = (l, e = {}, s = "") => {
  const o = document.createElement(l);
  for (let t in e)
    o.setAttribute(t, e[t]);
  return o.innerHTML = s, o;
}, b = (l, e) => (document.getElementById(l) || document.getElementsByTagName("head")[0].prepend(c("STYLE", { type: "text/css" }, e)), !0), x = function(l = null) {
  let e, s, o, t, a, r;
  b("prev-next-controls", `

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
  const i = () => {
    t === null ? (s.classList.add("geocam-nav-button-disabled"), o.classList.add("geocam-nav-button-disabled")) : (t === 0 ? s.classList.add("geocam-nav-button-disabled") : s.classList.remove("geocam-nav-button-disabled"), t === a.length - 1 ? o.classList.add("geocam-nav-button-disabled") : o.classList.remove("geocam-nav-button-disabled"));
  }, u = (n) => {
    t !== null && (t += n, t < 0 ? t = 0 : t > a.length - 1 && (t = a.length - 1), r = a[t], console.log("current is", r), e.capture(r.attributes.capture), e.shot(r.attributes.shot), i());
  }, m = (n) => {
    u(-1);
  }, h = (n) => {
    u(1);
  }, d = (n) => {
    if (console.log("set shots", n), Array.isArray(n) || console.error(
      "Prev-Next-Controls plugin - you must pass an ordered array of shots"
    ), n.length < 1)
      a = [], t = null;
    else {
      a = n;
      const g = a.findIndex(
        (v) => v.attributes.shot === e.shot() && v.attributes.capture === e.capture()
      );
      t = g < 0 ? null : g, r = t !== null ? a[t] : null;
    }
    return i(), this;
  };
  this.shots = d, this.currentShot = () => r, this.init = function(n) {
    e = n, s = c("DIV", {
      class: "geocam-nav-button geocam-prev-button geocam-viewer-control-button",
      title: "go to previous shot in sequence"
    }), e.addControl(s, "bottom"), o = c("DIV", {
      class: "geocam-nav-button geocam-next-button geocam-viewer-control-button",
      title: "go to next shot in sequence"
    }), e.addControl(o, "bottom"), s.addEventListener("click", m, !1), o.addEventListener("click", h, !1), l && d(l);
  }, this.destroy = function() {
    e.wrapper.removeChild(o), e.wrapper.removeChild(s);
  };
};
export {
  x as prevNextControls
};

const node = (name, attrs = {}, content = "") => {
  const node = document.createElement(name);
  for (let i in attrs) {
    node.setAttribute(i, attrs[i]);
  }
  node.innerHTML = content;
  return node;
};

const injectStyle = (id, rules) => {
  if (!document.getElementById(id)) {
  document
    .getElementsByTagName("head")[0]
    .prepend(node("STYLE", { type: "text/css" }, rules));
  }
  return true;
};

const store = function (val) {
  let value = val;
  let subscribers = [];

  const fn = function (v,options = {}) {
    if (arguments.length > 0) {
      if (typeof v === "function") {
        options.prepend ?  subscribers.unshift(v) : subscribers.push(v);
        if (!options.dontCallOnRegistration) v(value);  
        return () => {
          const index = subscribers.indexOf(v);
          if (index !== -1) {
            subscribers.splice(index, 1);
          }
        };
      } else {
        if ((value !== v) && (JSON.stringify(value) !== JSON.stringify(v))) {
          value = v;
          subscribers.forEach((s) => s(value));
        }
        return value;
      }
    } else {
      return value;
    }
  };

  return fn;
};

export const prevNextControl = function () {
  let viewer, prev, next, prevUnsub, nextUnsub;
  this.prev = store();
  this.next = store();

  const STYLES = `

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
  `;

  injectStyle("prev-next-controls", STYLES);

  const prevClick = (e) => {
    const prev = this.prev();
    if (prev) {
      viewer.shot(prev);
    }
  };

  const nextClick = (e) => {
    const next = this.next();
    if (next) {
      viewer.shot(next);
    }
  };

  this.init = function (geocamViewer) {
    viewer = geocamViewer;
    prev = node("DIV", {
      class:
        "geocam-nav-button geocam-prev-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to previous shot in sequence",
    });
    viewer.addControl(prev, "bottom");
    next = node("DIV", {
      class:
        "geocam-nav-button geocam-next-button geocam-viewer-control-button geocam-nav-button-disabled",
      title: "go to next shot in sequence",
    });
    viewer.addControl(next, "bottom");
    prev.addEventListener("click", prevClick, false);
    next.addEventListener("click", nextClick, false);

    prevUnsub = this.prev((val) => {
      if (val) {
        prev.classList.remove("geocam-nav-button-disabled");
      } else {
        prev.classList.add("geocam-nav-button-disabled");
      }
    });

    nextUnsub = this.next((val) => {
      if (val) {
        next.classList.remove("geocam-nav-button-disabled");
      } else {
        next.classList.add("geocam-nav-button-disabled");
      }
    });
  };

  const handleKey = function (e) {
    const forward = e.key === "ArrowUp" || e.key === "w";
    const back = e.key === "ArrowDown" || e.key === "s";
    if (forward || back) {
      forward ?  nextClick() : prevClick();
      e.stopPropagation();
    }
  };
  
  document.addEventListener("keydown", handleKey);

  this.destroy = function () {
    document.removeEventListener("keydown", handleKey);
    prevUnsub();
    nextUnsub();
    viewer.wrapper.removeChild(next);
    viewer.wrapper.removeChild(prev);
  };
};

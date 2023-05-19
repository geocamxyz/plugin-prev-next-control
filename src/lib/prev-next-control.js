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

export const prevNextControls = function (captures = null) {
  let viewer, prev, next, currentIndex, shotGroups, currentShot;

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

  const updateButtons = () => {
    if (currentIndex === null) {
      prev.classList.add("geocam-nav-button-disabled");
      next.classList.add("geocam-nav-button-disabled");
    } else {
      if (currentIndex === 0) {
        prev.classList.add("geocam-nav-button-disabled");
      } else {
        prev.classList.remove("geocam-nav-button-disabled");
      }
      if (currentIndex === shotGroups.length - 1) {
        next.classList.add("geocam-nav-button-disabled");
      } else {
        next.classList.remove("geocam-nav-button-disabled");
      }
    }
  };

  const move = (amt) => {
    if (currentIndex !== null) {
      currentIndex += amt;
      if (currentIndex < 0) {
        currentIndex = 0;
      } else if (currentIndex > shotGroups.length - 1) {
        currentIndex = shotGroups.length - 1;
      }
      currentShot = shotGroups[currentIndex];
      console.log("current is", currentShot);
      viewer.capture(currentShot.attributes.capture);
      viewer.shot(currentShot.attributes.shot);
      updateButtons();
    }
  };

  const prevClick = (e) => {
    move(-1);
  };

  const nextClick = (e) => {
    move(1);
  };

  const setShots = (features) => {
    console.log("set shots", features);
    if (!Array.isArray(features))
      console.error(
        "Prev-Next-Controls plugin - you must pass an ordered array of shots"
      );
    if (features.length < 1) {
      shotGroups = [];
      currentIndex = null;
    } else {
      shotGroups = features;
        // update currentIndex to match if it's there
        // enable or disable buttons accordingly
        const idx = shotGroups.findIndex(
          (el) =>
            el.attributes.shot === viewer.shot() &&
            el.attributes.capture === viewer.capture()
        );
        currentIndex = idx < 0 ? null : idx;
        currentShot =currentIndex !== null ? shotGroups[currentIndex] : null;
    }
    updateButtons();
    return this;
  };

  this.shots = setShots;
  this.currentShot = () => { return currentShot};

  this.init = function (geocamViewer) {
    viewer = geocamViewer;
    prev = node("DIV", {
      class:
        "geocam-nav-button geocam-prev-button geocam-viewer-control-button",
      title: "go to previous shot in sequence",
    });
    viewer.addControl(prev, "bottom");
    next = node("DIV", {
      class:
        "geocam-nav-button geocam-next-button geocam-viewer-control-button",
      title: "go to next shot in sequence",
    });
    viewer.addControl(next, "bottom");
    prev.addEventListener("click", prevClick, false);
    next.addEventListener("click", nextClick, false);
    if (captures) {
      setShots(captures);
    }
  };

  this.destroy = function () {
    viewer.wrapper.removeChild(next);
    viewer.wrapper.removeChild(prev);
  };
};
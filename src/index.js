import { prevNextControl } from "./lib/prev-next-control.js";

export class GeocamViewerPrevNextControl extends HTMLElement {
  static get observedAttributes() {
    return ["prev", "next"];
  }

  constructor() {
    super();
    this.plugin = null;
    // this.yaw = this.getAttribute('yaw') || 0;
    console.log("prev-next-control init");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attribute changed", name, newValue);
    const that = this;

    const debouceAttrChange = function (name, val) {
      console.log("debouceAttrChange", name, val);
      if (this.plugin) { 
          console.log("setting", name, val);
          const store = name == "prev" ? this.prev : this.next;
          store(val)
      } else {
        setTimeout(() => debouceAttrChange(name, val), 100);
      }
    };

    debouceAttrChange(name, newValue);
  }

  connectedCallback() {
    console.log("prev-next-control connected");
    const node = this;
    const parent = this.parentNode;
    this.viewer = parent.viewer;
    if (this.viewer && this.viewer.plugin) {
      // Call a method on the parent
      this.plugin = new prevNextControl();
      this.viewer.plugin(this.plugin);
      this.shot = this.viewer.shot;
      this.prev = this.plugin.prev;
      this.next = this.plugin.next;
    } else {
      console.error(
        "GeocamViewerPreVNext must be a child of GeocamViewer"
      );
    }
  }

  disconnectedCallback() {
    this.prev = null;
    this.next = null;
    this.plugin = null;
    this.shot = null;
    this.viewer = null;
    console.log("prev-next-control disconnected");
    // Clean up the viewer
  }
}

window.customElements.define(
  "geocam-viewer-prev-next-control",
  GeocamViewerPrevNextControl
);

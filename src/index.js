import { prevNextControl } from './lib/prev-next-control.js';

export class GeocamViewerPrevNextControl extends HTMLElement {
  constructor() {
    super();
    this.plugin = null;
    // this.yaw = this.getAttribute('yaw') || 0;
    console.log("prev-next-control init");
  }

  connectedCallback() {
    console.log("prev-next-control connected");
    const node = this;
    const parent = this.parentNode;
    if (parent.viewer && parent.viewer.plugin) {
      // Call a method on the parent
        this.plugin = new prevNextControl();
  parent.viewer.plugin(this.plugin);
    } else {
      console.error(
        "GeocamViewerCompassNeedle must be a child of GeocamViewer"
      );
    }
  }

  disconnectedCallback() {
    this.plugin = null;
    console.log("prev-next-control disconnected");
    // Clean up the viewer
  }
}

window.customElements.define(
  "geocam-viewer-prev-next-control",
  GeocamViewerPrevNextControl
);

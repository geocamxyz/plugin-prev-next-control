# Prev Next Control
A plugin for the geocam-viewer.
### NPM Installation:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-prev-next-control/src?v1.0.0'
```
or for a particual commit version:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-prev-next-controlsrc?ca628f1'
```
### Import Map (External Loading):
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-prev-next-control@v1.0.0/dist/prev-next-control.js
```
or for a particual commit version:
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-prev-next-control@ca628f1/dist/prev-next-control.js
```
### Usage:
The .js file can be imported into your .html file using the below code (This can be ignored if your using the NPM package).
```
<script type="importmap">
  {
    "imports": {
      "prev-next-control": "https://cdn.jsdelivr.net/gh/geocamxyz/plugin-prev-next-control@v1.0.0/dist/prev-next-control.js"
    }
  }
</script>
```
The plugin can be imported via a module script or using the npm package and using the below import statement.
```
import { prevNextControls } from "prev-next-control"
```
### Setup:
The plugin can then be added into the plugins array for the init of the viewer class as seen below
```
const viewer = new geocamViewer(node, {
	plugins: [
        new prevNextControls(),
      ],
});
```
# Prev Next Control
A web component plugin for the [geocamxyz/geocam-viewer](https://github.com/geocamxyz/geocam-viewer) which provides forward and back buttons on top of the viewer to navigate to the next or previous shot.
### NPM Installation:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-prev-next-control/src?v2.0.3'
```
or for a particual commit version:
```
npm install 'https://gitpkg.now.sh/geocamxyz/plugin-prev-next-controlsrc?ca628f1'
```
### Import Map (External Loading):
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-prev-next-control@v2.0.3/dist/prev-next-control.js
```
or for a particual commit version:
```
https://cdn.jsdelivr.net/gh/geocamxyz/plugin-prev-next-control@ca628f1/dist/prev-next-control.js
```
### Usage:
The .js file can be imported into your .html file using the below code (This can be ignored if your using the NPM package).
```
 <script type="module" src="https://cdn.jsdelivr.net/gh/geocamxyz/plugin-prev-next-control@v2.0.3/dist/prev-next-control.js"></script>
 ```

 Or with an importmap
 ```
<script type="importmap">
  {
    "imports": {
      "prev-next-control": "https://cdn.jsdelivr.net/gh/geocamxyz/plugin-prev-next-control@v2.0.3/dist/prev-next-control.js"
    }
  }
</script>
```
The plugin can then be imported via a module script or using the npm package and using the below import statement.
```
import "prev-next-control"
```
### Setup:
The plugin can then be added to the viewer by making the custom element a child of the viewer parent element.  

```
<geocam-viewer>
  <geocam-viewer-prev-next-control></geocam-viewer-prev-next-control>
</geocam-viewer>
```

There are two attributes which are usually set relative to the current shot:
- prev *a representation of the previous shot to the current one - usually an id*
- next *a representation of the next shot to the current one - usually an id*

The prev next controls just create a untility for handling previous and next.  It is up to you to managing the setting of previous and next based on the changing of the current shot or use a plugin that uses the controls such as [geocamxyz/connector-arcgis-map](https://github.com/geocamxyz/connector-arcgis-map).

Under the hood the prev/next plugin creates a prev and a next store.  Setting those stores with a non falsy value will enable the prev and next buttons.  When the user clicks either button the viewer shot store will be updated with the value from the repsective store.  It is up to you to subscribe to the shot store to then take appropriate action to update the shot and the prev and next store values.

Because attributes can only store strings you may find it easier to deal with the stores directly so you can store objects.  For this reason the prev-next-plugin and the viewer both provide direct access to this stores.  For example:
```
  const prevnext = document.getElementsByTagname('geocam-viewer-prev-next-control')[0];
  prevnext.prev({id: 1}); // set the previous store to id 1
  prevnext.shot({id: 2}) // set current shot to id 2 - note this is just a store - the viewer wont be updated
  prevnext.next({id: 3}); // set the next store to id 3
  prevnext.shot((val) => {  // subscribe to changes in the store
     // shot has been updated to val so take some action and reset prev and next
     console.log('Shot update:',val.id) // will output "Shot update:, 3" if the user clicks the next button
     // eg if next was clicked shot would now be {id: 3} so..
    prevnext.prev({id: 2}); // set the previous store to id 1
    prevnext.next({id: 4}); // set the next store to id 3
  }) 
```
You can also use the prev and next attributes.

The [geocamxyz/connector-arcgis-map](https://github.com/geocamxyz/connector-arcgis-map) connector shows advance usage where prev and next are updated from feature layers queries for he current shot click.

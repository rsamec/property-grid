# property-grid

> React property-grid

## Install

```sh
$ npm install --save property-grid
```

## Usage

Please make sure you have a global ```React``` variable pointing to the ReactJS library!

Basic usage:
```jsx

/**
 * The onChange function can expect the following params:
 * @param  {Event} event The React event that triggered the change
 * @param  {Object} prop  The property on which the change was triggered (This is the corresponding object)
 * @param  {String} value The new value
 * @param  {Object[]} path Array with all the parents of the property, including the property itself
 */
function onChange(event, prop, value, path){
    path = path.map(function(prop){
        return prop.name
    })
    console.log(prop.name + ' has a new value: "' + value + '". Full path is ' + path.join('/'))
}

React.renderComponent(
    <PropertyGrid
        properties={properties}
        autoUpdate={true}
        onChange={onChange}
        value={value}
    >
    </PropertyGrid>,
    document.body
)
```

Complete example:

```jsx
var React = require('react')
var PropertyGrid = require('property-grid')

//build your value object
var value = {
    name: 'Property grid',
    style: {
        border: '2px solid red',
        padding: {
            top: 10
        },
        position: {
            type: 'absolute'
        }
    }
}

//build the properties that should be displayed in the property grid
var properties = [
    {
        name: 'name'
    },
    {
        name: 'style',
        items: [
            {
                name: 'border'
            },
            {
                name: 'padding',
                items: [
                    {name: 'top'},
                    {name: 'bottom'}
                ]
            },
            {
                name: 'position',
                items: [
                    {
                        name  : 'type',
                        //you can specify a custom editor to be used
                        editor: function(props){
                            return React.DOM.select(props, [
                                React.DOM.option({key: 'abs', value: 'absolute'}, 'absolute'),
                                React.DOM.option({key: 'rel', value: 'relative'}, 'relative')
                            ])
                        }
                    },
                    {
                        name: 'top'
                    },
                    {
                        name: 'left'
                    }
                ]
            }
        ]
    }
]

React.renderComponent(
    <PropertyGrid
        properties={properties}
        autoUpdate={true}
        value={value}
    >
    </PropertyGrid>,
    document.body
)
```

### Understanding value & valueProvider

You can either use the property grid with a value object, or with a valueProvider.

#### value

Usage with a ```value``` object means you want to exactly map the structure of your property grid to your object. Note that nesting properties should be the same:

Example:

```js
var value = {
    name: '',
    text: 'my label',
    style: {
        top: '10',
        left: '10',
        position: 'relative'
    }
}

var properties = [
    {
        name: 'name'
    },
    {
        name: 'text',
        label: 'inner text'
    },
    {
        name: 'style',
        items: [
            {
                name: 'top'
            },
            {
                name: 'left'
            },
            {
                name: 'position'
            }
        ]
    }
]
```
Notice the structure of the properties exactly matches the structure of the value object. This is the simplest use-case for the property grid. In this case, you can even use ```autoUpdate={true}``` and your value object will be updated with the values from the property grid. In this case when your ```onChange``` function is called, the value object is already up-to-date, and you can use this function just to update other parts of your app.

#### valueProvider

In a more complex scenario, where your property grid structure does not exactly match your value object, you will need to use a ```valueProvider``` function together with the ```onChange``` function.

Here is an example:

```js
var value = {
    name: 'my app',
    style: {
        top: 10,
        left: 20,
        position: 'relative',
        border: '10px solid red'
    }
}
var properties = [
    {
        name: 'name'
    },
    {
        name: 'style',
        items: [
            {
                name: 'position',
                items: [
                    { name: 'type' },
                    { name: 'top'  },
                    { name: 'left' }
                ]
            }
        ]
    }
]

//notice the structure in properties differs from the value object

//the path is an array of properties
//For example when style -> position -> top changes
//the valueProvider function is called with prop being { name: 'top' }
//and path being all parent nodes from root to the prop (including prop)
function valueProvider(prop, path){
    var name = prop.name
    path = path.map(function(p){ return p.name}).join('.')

    //for a quick demo, we just hardcode different property mappings,
    //but in a real example, you will want to optimize this
    if (path == 'style.position.top'){
        return value.style.top
    }
    if (path == 'style.position.left'){
        return value.style.left
    }
    if (path == 'style.position.type'){
        return value.style.position
    }
    if (path == 'style.border'){
        return value.style.border
    }
    return value[path]
}

//when a property changes, the onChange function will be called
//with event, prop, value, path args. prop and path are the same as given to the valueProvider
//while event being the event that triggered the change,
//and value being the new value that should be set for the prop property.
function onChange(event, prop, value, path){
    if (path == 'style.position.top'){
        value.style.top = value
    }
    if (path == 'style.position.left'){
        value.style.left = value
    }
    if (path == 'style.position.type'){
        value.style.position = value
    }
    if (path == 'style.border'){
        value.style.border = value
    }
    value[path] = value

    //you have to manually re-render the property grid
    //so that new values take effect
}
```
In the above scenario, don't forget to re-render the property grid, as it wont update itself with the new values.


## CSS Styles


Please either manually include ```index.css``` in your page or require it in your webpack module. It includes ```normalize.css```

Example with webpack

```js
require('~property-grid/index.css')

//or, if you use stylus, include index.styl
require('~property-grid/index.styl')

var PropertyGrid = require('property-grid')

...
```
Or you can import the stylesheet directly in your css with webpack css loader

```css
@import '~property-grid/index.css'

.your-app .property-grid {
    margin-top: 5px
}

```

If you already include ```normalize.css``` in your project, and don't want to have it included again, just use ```~property-grid/index-no-normalize.css``` or ```~property-grid/index-no-normalize.styl```.

### Changelog

#### 2.0.0

 * update params sent to the onChange listener. The params sent now are:
    * event
    * prop (Object)
    * value (String)
    * path (Object[])

    In order to obtain the full string path from an onChange call, just map path to prop.name:

    ```js
    function onChange(event, prop, value, path){
        path = path.map(function(prop){ return prop.name })
    }
    ```

#### 1.2.1
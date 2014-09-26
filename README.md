# property-grid

> React property-grid

## Install

```sh
$ npm install --save property-grid
```

## Usage

Basic usage:
```jsx

function onChange(event, prop, value, path, parents){
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

## CSS Styles

Please either manually include ```index.css``` in your page or require it in your webpack module.

Example with webpack

```js
require('~property-grid/index.css')

//or, if you use stylus, include index.styl
require('~property-grid/index.styl')

var PropertyGrid = require('property-grid')

...
```

If you use ```webpack``` with ```stylus``` and also include ```normalize.css``` please use ```require('~property-grid/index.styl')``` since webpack will be smart enough to only include ```normalize.css``` only once in your project
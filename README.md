# property-grid

> React property-grid

## Install

```sh
$ npm install --save property-grid
```

## Usage

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
    </PropertyGrid>
)
```
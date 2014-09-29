/** jsx React.DOM */

'use strict'

require('./index.styl')

var React = require('react')
// window.React = React

var PropertyGrid = require('./src/index')
var properties   = require('./test.props')

var value = {
    name: 'test',
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

function onChange(event, prop, value, path){
    path = path.map(function(prop){
        return prop.name
    })
    console.log(prop.name + ' has a new value: "' + value + '". Full path is ' + path.join('/'))
}

var i = 0
function provide(){
    return i++ + ' value'
}

var cmp = React.renderComponent(
    <PropertyGrid
        properties={properties}
        onChange={onChange}
        rowHeight={30}
        autoUpdate={true}
        value={value} />
    , document.body
)
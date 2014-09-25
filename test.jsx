/** jsx React.DOM */

'use strict'

var React    = require('react')
// window.React = React

var PropertyGrid = require('./index.js')
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

function onChange(v, prop, event){
    // console.log(value)
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
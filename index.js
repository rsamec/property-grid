'use strict'

require('property-grid/index.css')
require('./index.css')

var React        = require('react')
var PropertyGrid = require('property-grid')

var properties = require('./props')
var value      = require('./value')

var App = React.createClass({

    displayName: 'App',

    render: function(){
        return (
            React.DOM.div({className: 'app'},
                value.name,
                PropertyGrid({
                    properties: properties,
                    value     : value,
                    onChange  : this.handleChange,
                    autoUpdate: true
                })
            )
        )
    },

    handleChange: function(event, prop, value, path){
        this.setState({})

        console.log(path, value)
    }
})

React.renderComponent(App(), document.getElementById('content'))

console.log('DONE!!')
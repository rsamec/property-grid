/** @jsx React.DOM */

'use strict'

var React    = require('react')
var getLabel = require('./getLabel')

module.exports = React.createClass({

    displayName: 'Property',

    getDefaultProps: function(){
        return {}
    },

    shouldComponentUpdate: function(props){
        return (this.props.value != props.value) ||
               (this.props.label != this.getLabel(props.config))
    },

    getLabel: function(config){
        return getLabel(config || this.props.config)
    },

    render: function() {
        var depth    = this.props.path.length - 1
        var property = this.props.config

        var name  = property.name
        var label = this.props.label = this.getLabel()

        var nameStyle  = {}
        var valueStyle = {}

        if (this.props.labelWidth){
            nameStyle.width = this.props.labelWidth
        }

        if (this.props.rowHeight){
            nameStyle.height = valueStyle.height = this.props.rowHeight
        }

        return (
            <div className={"property depth-" + depth}>
                <div className="name"  style={nameStyle}>{label}</div>
                <div className="value" style={valueStyle}>
                    {this.renderEditor(property)}
                </div>
            </div>
        )
    },

    renderEditor: function(prop){
        var props = {
            onFocus  : this.handleFocus,
            onBlur   : this.handleBlur,
            value    : this.props.value,
            className: 'editor',
            onChange : this.handleChange
        }

        return (prop.editor || React.DOM.input)(props)
    },

    handleChange: function(event){
        event.stopPropagation()
        this.props.onChange(event, this.props.config, event.target.value, this.props.path)
    },

    handleFocus: function(event){

    },

    handleBlur: function(event){

    }
})
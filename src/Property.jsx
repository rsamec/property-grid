/** @jsx React.DOM */

'use strict'

var React    = require('react')
var getLabel = require('./getLabel')

module.exports = React.createClass({

    displayName: 'Property',

    getDefaultProps: function(){
        return {}
    },

    shouldComponentUpdatexxx: function(props){
        return (this.props.value != props.value) ||
                (this.props.label != this.getLabel(props.config))
    },

    getLabel: function(config){
        return getLabel(config || this.props.config)
    },

    render: function() {
        var depth = this.props.parents.length
        var prop  = this.props.config
        var name  = prop.name
        var label = this.props.label = this.getLabel()

        var nameStyle = {}
        var valueStyle = {}

        if (this.props.labelWidth){
            nameStyle.width = this.props.labelWidth
        }

        if (this.props.rowHeight){
            nameStyle.height = valueStyle.height = this.props.rowHeight
        }

        return (
            <div className={"property depth-"+depth}>
                <div className="name" style={nameStyle}>{label}</div>
                <div className="value" style={valueStyle}>
                    {this.renderEditor(prop)}
                </div>
            </div>
        )
    },

    renderEditor: function(prop){
        var props = {
            onFocus  : this.handleFocus,
            onBlur   : this.handleBlur,
            value    : this.props.value,
            key: 'editor',
            className: 'editor',
            onChange : this.props.onChange
        }

        var Editor = prop.editor

        if (typeof Editor == 'function'){
            Editor = Editor(props)
        } else {
            Editor = (Editor || React.DOM.input)(props)
        }

        return Editor //= <input />
    },

    handleFocus: function(event){

    },

    handleBlur: function(event){

    }
})
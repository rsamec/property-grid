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
        var depth = this.props.parents.length
        var prop  = this.props.config
        var name  = prop.name
        var label = this.props.label = this.getLabel()

        var labelStyle = {}

        if (this.props.labelWidth){
            labelStyle.width = this.props.labelWidth
        }



        return (
            <div className={"property depth-"+depth}>
                <div className="name" style={labelStyle}>{label}</div>
                <div className="value">
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
            className: 'editor',
            onChange : this.props.onChange
        }

        var Editor = prop.editor

        if (typeof Editor == 'function'){
            Editor = Editor(props)
        } else {
            Editor = (Editor || React.DOM.input)(props)
        }

        return Editor
    },

    handleFocus: function(event){

    },

    handleBlur: function(event){

    }
})
/** @jsx React.DOM */

'use strict'

var React    = require('react')
var F        = require('functionally')
var getDeep  = require('set-deep').get
var Property = require('./Property')
var getLabel = require('./getLabel')

var valueBuilder = require('./utils/valueBuilder')

var dotName = F.dot('name')

function preventDefault(e){
    e.preventDefault()
}

function emptyFn(){}

var CompositeProperty = React.createClass({

    displayName: 'CompositeProperty',

    getDefaultProps: function(){
        return {}
    },

    getLabel: function(config){
        return getLabel(config)
    },

    render: function(){
        var properties = this.props.properties || []

        this.props._value = valueBuilder(properties, this.props.value || this.props.valueProvider)

        return (
            <div className="property-composite root">
                {properties.map(this.renderProperty.bind(this, []), this)}
            </div>
        )
    },

    renderRoot: function(prop){
        return (
            <div className="property-composite root">
                {prop.items.map(this.renderProperty.bind(this, []), this)}
            </div>
        )
    },

    renderComposite: function(parents, prop){

        var label      = this.getLabel(prop)
        var nameStyle  = {}
        var valueStyle = {}

        if (this.props.labelWidth){
            nameStyle.width = this.props.labelWidth
        }

        if (this.props.rowHeight){
            nameStyle.height = valueStyle.height = this.props.rowHeight
        }

        var classes = ['property-composite']

        classes.push(prop.collapsed?'collapsed':'expanded')
        classes.push('depth-' + parents.length)

        return (
            <div key={prop.name} className={classes.join(' ')}>
                <div className="property">
                    <div className="name" style={nameStyle}>
                        {this.renderExpander(parents, prop)}
                        {label}
                    </div>
                    <div className="value" style={valueStyle}>
                        <input className="editor" readOnly={true} value={this.getCompositePropertyValue(parents, prop)}/>
                    </div>
                </div>
                <div className="children">
                    {prop.items.map(this.renderProperty.bind(this, parents.concat(prop)), this)}
                </div>
            </div>
        )
    },

    renderExpander: function(parents, prop){
        var expanderClasses = ['expander', prop.collapsed? 'collapsed': 'expanded']

        return <span onMouseDown={preventDefault} onClick={this.onExpanderClick.bind(this, parents, prop)} className={expanderClasses.join(' ')} />
    },

    renderProperty: function(parents, prop){

        if (prop.items){
            return this.renderComposite(parents, prop)
        }

        var path  = parents.concat(prop)
        var value = this.getPropertyValue(prop, path)

        return React.createElement(Property,{
            key       : prop.name,
            config    : prop,
            value     : value,
            labelWidth: this.props.labelWidth,
            rowHeight : this.props.rowHeight,
            path      : path,
            onChange  : this.handleChange
        });
    },

    handleChange: function(event, prop, value, path){

        var fn = this.props.onChange || emptyFn

        fn(event, prop, value, path)
    },

    getPropertyValue: function(prop, path){
        path = path.map(dotName).join('.')

        return this.props._value[path] || ''
    },

    getCompositePropertyValue: function(parents, prop){
        var render = prop.render

        if (!render){
            return ''
        }

        var path  = parents.concat(prop)
        var value = this.getPropertyValue(prop, path)

        if (typeof render == 'function'){
            value = render(value, prop, path)
        }

        return typeof value == 'object'?
                    JSON.stringify(value):
                    value
    },

    onExpanderClick: function(parents, prop, event){

        prop.collapsed = !prop.collapsed
        this.setState({})
    }
})

module.exports = CompositeProperty
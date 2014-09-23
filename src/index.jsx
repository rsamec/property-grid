/** @jsx React.DOM */

'use strict'

require('../index.styl')

var React    = require('react')
var F        = require('functionally')
var bindArgs = F.bindArgs
var curry    = F.curry
var dot      = F.dot

// var NumberField = React.DOM.input //require('./NumberField')
// var TextField = React.DOM.input // require('./TextField')
// var CheckBox = React.DOM.input //require('./CheckBox')

var copyKeys = require('copy-utils').copyKeys

var Property = require('./Property')
var CompositeProperty = require('./CompositeProperty')
var setDeep = require('set-deep')
var getDeep  = setDeep.get

var Properties = React.createClass({

    displayName: 'Properties',

    getDefaultProps: function(){
        return {
            labelWidth: '50%'
        }
    },

    getInitialState: function(){
        return {
            title: 'Properties',
            props: []
        }
    },

    render: function(){

        var props = copyKeys(this.props)

        this.prepareClassName(props)

        return React.DOM.div(props, this.renderBody())
    },

    prepareClassName: function(props) {
        if (!Array.isArray(props.className)){
            props.className = [props.className || '']
        }

        props.className.push(this.props.baseCls || 'property-grid')

        props.className = props.className.join('')

        return props
    },

    renderBody: function(){

        var root  = {items: this.props.properties || [], root: true}

        return (
            <div className="body">
                <CompositeProperty
                    config={root}
                    labelWidth={this.props.labelWidth}
                    onChange={this.handleChange}
                    valueProvider={this.props.valueProvider}
                    value={this.props.value}
                >
                </CompositeProperty>
            </div>
        )
    },

    handleChange: function(event, prop, path, parents){
        var fn = this.props.onChange

        if (typeof fn == 'function'){
            fn(event, prop, path, parents)
        }

        if (this.props.autoUpdate){
            this.setPropertyValue(prop, path, event.target.value)
            this.setState({})
        }
    },

    setPropertyValue: function(prop, path, value){
        setDeep(path, this.props.value, value)
    }
})

module.exports = Properties
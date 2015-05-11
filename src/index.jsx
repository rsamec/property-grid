/** @jsx React.DOM */

'use strict'

var React    = require('react')
var copyKeys = require('copy-utils').copyKeys
var F        = require('functionally')

var dotName = F.dot('name')
var Property = require('./Property')
var CompositeProperty = require('./CompositeProperty')
var setDeep = require('set-deep')
var getDeep  = setDeep.get

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'PropertyGrid',

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

        return React.createElement('div',props, this.renderBody());
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

        var root = {items: this.props.properties || [], root: true}

        return (
            <div className="body">
                <CompositeProperty
                    properties={this.props.properties}
                    labelWidth={this.props.labelWidth}
                    rowHeight={this.props.rowHeight}
                    onChange={this.handleChange}
                    valueProvider={this.props.valueProvider}
                    value={this.props.value}
                >
                </CompositeProperty>
            </div>
        )
    },

    handleChange: function(event, prop, value, path){
        var fn = this.props.onChange || emptyFn

        if (this.props.autoUpdate){
            this.setPropertyValue(path.map(dotName), value)
            this.setState({})
        }

        fn(event, prop, value, path)
    },

    setPropertyValue: function(path, value){
        setDeep(path, this.props.value, value)
    }
})
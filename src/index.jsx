/** @jsx React.DOM */

'use strict'

var React    = require('react')
var copyKeys = require('copy-utils').copyKeys

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

        var root = {items: this.props.properties || [], root: true}

        return (
            <div className="body">
                <CompositeProperty
                    config={root}
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

    handleChange: function(event, prop, value, path, parents){
        var fn = this.props.onChange || emptyFn

        if (this.props.autoUpdate){
            this.setPropertyValue(path, value)
            this.setState({})
        }

        fn(event, prop, value, path, parents)
    },

    setPropertyValue: function(path, value){
        setDeep(path, this.props.value, value)
    }
})
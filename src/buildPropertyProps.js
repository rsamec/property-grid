'use strict'

module.exports = function(property){

    var value = this.getPropertyValue(property)

    var props = {
        key     : property.name,
        config  : property,
        onChange: this.onPropertyChange.bind(this, property, index),
        value   : value
    }

    if (index == 0){
        props.labelWidth = this.props.labelWidth
    }

}
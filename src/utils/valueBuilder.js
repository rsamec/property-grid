'use strict'

var F           = require('functionally')
var dotName     = F.dot('name')
var traverser   = require('./traverser')
var getProvider = require('./valueProvider')

var GLUE = '.'

/**
 * Given an array of properties, and a value or valueProvider,
 * return an object with keys being fullpath strings, and values the corresponding values
 * for the properties
 *
 * @param  {Object[]} props
 * @param  {Object/Function} value
 * @return {Object}
 */
module.exports = function builder(props, value){

    var result        = {}
    var valueProvider = getProvider(value)

    traverser(props, function(prop, path){
        var arrayPath = path.map(dotName)
        var childValue

        if (prop.items){
            childValue = {}
            prop.items.forEach(function(child){
                arrayPath.push(child.name)
                childValue[child.name] = result[arrayPath.join(GLUE)]
                arrayPath.pop()

            })
        }

        var value = valueProvider(prop, path, childValue)

        path = arrayPath

        result[path.join(GLUE)] = value
    })

    return result
}
'use strict'

var F         = require('functionally')
var dotName   = F.dot('name')
var getDeep   = require('set-deep').get

module.exports = function getProvider(value){
    return typeof value == 'function'?
            value:
            function(prop, path){
                path = path.map(dotName)

                return getDeep(path, value) || ''
            }
}


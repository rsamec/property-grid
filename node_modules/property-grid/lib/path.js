'use strict'

var namePath = require('./namePath')

module.exports = function(props, indexes){
    return namePath(props, indexes).join('/')
}
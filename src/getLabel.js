'use strict'

var humanize = require('ustring').humanize

module.exports = function(prop){
    var name  = prop.name
    var label = prop.label || humanize(name)

    return label
}
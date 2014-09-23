'use strict'

module.exports = function(props, indexes){
    var root   = props
    var result = []

    indexes.forEach(function(index, i){
        root = root[index]

        result.push(root)

        if (i != indexes.length - 1){
            root = root.items
        }
    })

    return result
}
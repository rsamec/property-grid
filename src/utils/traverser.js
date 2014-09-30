'use strict'


function traverseNode(parents, node, fn, config){
    var path = parents.concat(node)
    var rootFirst = config && config.rootFirst

    rootFirst  && fn(node, path)
    node.items && traverse(path, node.items, fn)
    //it is important that parent nodes get visited after child nodes
    !rootFirst && fn(node, path)

}

function traverse(parents, target, fn, config){

    if (Array.isArray(target)){
        target.forEach(function(node){
            traverseNode(parents, node, fn, config)
        })
    }
}

module.exports = function(target, fn, config){
    return traverse([], target, fn, config)
}
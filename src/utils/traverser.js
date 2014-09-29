'use strict'


function traverseNode(parents, node, fn){
    var path = parents.concat(node)

    node.items && traverse(path, node.items, fn)

    //it is important that parent nodes get visited after child nodes
    fn(node, path)

}

function traverse(parents, target, fn){

    if (Array.isArray(target)){
        target.forEach(function(node){
            traverseNode(parents, node, fn)
        })
    }
}

module.exports = function(target, fn){
    return traverse([], target, fn)
}
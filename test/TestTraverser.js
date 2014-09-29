describe('Traverser', function(){
    var traverse = require('../src/utils/traverser')

    it('should visit all', function(){
        var target = [
            {
                name: 'name'
            },
            {
                name: 'style',
                items: [

                            {
                                name: 'top'
                            },
                            {
                                name: 'bottom'
                            }
                        ]
            }
        ]

        var results = []

        traverse(target, function(node, path){
            results.push([node, path])
        })

        results.should
            .eql([
                [target[0], [target[0]]],
                [target[1].items[0], [target[1],target[1].items[0]]],
                [target[1].items[1], [target[1],target[1].items[1]]],
                [target[1], [target[1]]]
            ])
    })
})
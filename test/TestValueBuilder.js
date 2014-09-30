describe('ValueBuilder', function(){
    var valueBuilder = require('../src/utils/valueBuilder')

    var dotName = require('functionally').dot('name')

    it('should build correct value', function(){
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

        var result = valueBuilder(target, {
            style: {
                top: 10,
                bottom: 'b'
            }
        })

        result.should
            .eql({
                name: undefined,
                'style.top': 10,
                'style.bottom': 'b',
                style: {
                    top: 10,
                    bottom: 'b'
                }
            })
    })

    it('should build correct value with value provider', function(){
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

        var styleChildValue
        var result = valueBuilder(target, function(prop, path, childValue){
            path = path.map(dotName).join('.')

            if (path == 'style.top'){
                return 'top'
            }

            if (path == 'style.bottom'){
                return 'bot'
            }

            if (path == 'style'){
                styleChildValue = childValue
            }
        })

        result.should
            .eql({
                name: undefined,
                'style.top': 'top',
                'style.bottom': 'bot',
                style: {
                    top: 'top',
                    bottom: 'bot'
                }
            })

        styleChildValue.should
            .eql({
                top: 'top',
                bottom: 'bot'
            })
    })
})
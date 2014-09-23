var React = require('react')

module.exports = [
    {
        name: 'name'
    },
    {
        name: 'style',
        items: [
            {
                name: 'border'
            },
            {
                name: 'padding',
                items: [
                    {name: 'top'},
                    {name: 'bottom'}
                ]
            },
            {
                name: 'position',
                items: [
                    {
                        name  : 'type',
                        editor: function(props){
                            return React.DOM.select(props, [
                                React.DOM.option({key: 'abs', value: 'absolute'}, 'absolute'),
                                React.DOM.option({key: 'rel', value: 'relative'}, 'relative')
                            ])
                        }
                    },
                    {
                        name: 'top'
                    },
                    {
                        name: 'left'
                    }
                ]
            }
        ]
    }
]
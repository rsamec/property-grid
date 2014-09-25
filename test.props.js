var React = require('react')

var px = function(v){
    return v || 0
}

module.exports = [
    {
        name: 'name'
    },
    {
        name: 'ellipsis'
    },
    {
        name: 'style',
        readOnly: true,
        items: [
            {
                name: 'zIndex',
                label: 'Z-Index',
                numeric: true
            },
            {
                name: 'margin',
                numeric: true
            },
            {
                name: 'overflow'
            },
            {
                name: 'wrap-text',
                boolean: true,
                mapping: function(){
                    debugger
                }
            },
            {
                name: 'Position',
                readOnly: true,
                render: function(value){

                    return '{top: ' + px(value.top || 0) + ', left: ' + px(value.left || 0) + '}'
                },
                items: [
                    {
                        name: 'top',
                        mapping: 1,
                        numeric: true
                    },
                    {
                        name: 'left',
                        mapping: 1,
                        numeric: true
                    },
                    {
                        name: 'type',
                        mapping: 'position'
                    }
                ]
            },
            {
                name: 'size',
                readOnly: true,
                render: function(value){
                    var width = value.width
                    var height = value.height

                    width = width == null?
                                'auto':
                                px(width)

                    height = height == null?
                                'auto':
                                px(height)

                    return '{ width: ' + width + ', height: ' + height + '}'

                },
                items: [
                    {
                        name: 'width',
                        mapping: 1,
                        numeric: true
                    },
                    {
                        name: 'height',
                        mapping: 1,
                        numeric: true
                    }
                ]
            },
            {
                name: 'color',
                readOnly: true,
                items: [
                    {
                        name: 'textColor',
                        label: 'Text color',
                        mapping: 'color'
                    },
                    {
                        name   : 'bgColor',
                        label  : 'Background color',
                        mapping: 'background'
                    }
                ]
            },
            {
                name : 'border',
                label: 'Border',
                readOnly: true,
                // collapsed: true,
                render: function(value){
                    var width = value.width
                    var style = value.style
                    var color = value.color

                    width = width || ''
                    style = style || ''

                    return width + ' ' + style + (color? ' color: ' + color: '')
                },
                items: [
                    {
                        name  : 'width',
                        numeric: true
                    },
                    {
                        name: 'style'
                    },
                    {
                        name: 'color'
                    },
                    {
                        name: 'top',
                        items: [
                            {
                                name: 'width'
                            },
                            {
                                name: 'color'
                            },
                            {
                                name: 'style'
                            }
                        ]
                    },
                    {
                        name: 'right',
                        items: [
                            {
                                name: 'width'
                            },
                            {
                                name: 'color'
                            },
                            {
                                name: 'style'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
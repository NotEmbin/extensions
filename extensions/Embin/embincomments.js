(function (Scratch) {
    'use strict';

    const embin_comments_version = 'v1.0.0';
    const branch_true = true;
  
    class EmbinComments {
        getInfo() {
            return {
                id: 'embincomments',
                name: 'Embin\'s Comments',
                //color1: '#877e34',
                //color3: '#e4db8c',
                //color2: '#c6be79',
                color1: '#897900',
                color2: '#6B5E00',
                color3: '#EACD00',
                blocks: [
                    {
                        opcode: 'return_version',
                        blockType: Scratch.BlockType.REPORTER,
                        disableMonitor: true,
                        text: '"Embin\'s Comments" version'
                    },
                    {
                        opcode: 'comment_hat',
                        blockType: Scratch.BlockType.HAT,
                        text: '// [comment]',
                        isEdgeActivated: false,
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'cool coment'
                            }
                        }
                    },
                    {
                        opcode: 'comment_block',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '// [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'cool comment'
                            }
                        }
                    },
                    {
                        opcode: 'comment_block_terminal',
                        blockType: Scratch.BlockType.COMMAND,
                        isTerminal: true,
                        text: '// [comment2]',
                        arguments: {
                            comment2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'cool comment'
                            }
                        }
                    },
                    {
                        opcode: 'comment_reporter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[value] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'comment'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'value'
                            }
                        }
                    },
                    {
                        opcode: 'comment_boolean',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[value] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'comment'
                            },
                            value: {
                                type: Scratch.ArgumentType.BOOLEAN
                            }
                        }
                    },
                    {
                        opcode: 'comment_boolean_reporter',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[value2] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'comment'
                            },
                            value2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'value'
                            }
                        }
                    },
                    {
                        opcode: 'comment_color',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[color] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'comment'
                            },
                            color: {
                                type: Scratch.ArgumentType.COLOR,
                                defaultValue: '#ff0000'
                            }
                        }
                    },
                    {
                        opcode: 'comment_matrix',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[matrix] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'comment'
                            },
                            matrix: {
                                type: Scratch.ArgumentType.MATRIX,
                                defaultValue: '0101001010000001000101110'
                            }
                        }
                    },
                    {
                        opcode: 'comment_angle',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'angle [angle] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'comment'
                            },
                            angle: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: '90'
                            }
                        }
                    },
                    {
                        opcode: 'comment_note',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'note [note] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'comment'
                            },
                            note: {
                                type: Scratch.ArgumentType.NOTE,
                                defaultValue: ''
                            }
                        }
                    },
                    /*
                    {
                        opcode: 'comment_conditional',
                        blockType: Scratch.BlockType.CONDITIONAL,
                        branchCount: 1,
                        text: '// [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'cool comment'
                            }
                        }
                    }
                    */
                ]
            };
        }

        return_version () {
            return embin_comments_version;
        }
  
        comment_hat () {
            // no-op
        }
  
        comment_block () {
            // no-op
        }
  
        comment_reporter (args) {
            return args.value;
        }
  
        comment_boolean (args) {
            return args.value || false;
        }

        comment_color (args) {
            return args.color;
        }

        comment_angle (args) {
            return args.angle;
        }

        comment_matrix (args) {
            return args.matrix;
        }

        comment_note (args) {
            return args.note;
        }

        comment_block_terminal () {
            // no-op
        }

        comment_boolean_reporter (args) {
            return args.value2;
        }

        /*
        comment_conditional (args, util) {
            if (branch_true) {
                util.startBranch(1, false);
            }
        }
        */
    }
    Scratch.extensions.register(new EmbinComments());
})(Scratch);
// Name: Embin's Comments
// ID: embincomments
// Description: Comment blocks
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    const embin_comments_version = 'v1.3.0';
    const branch_true = true;
    const default_comment = 'cool comment';
    const for_removal_message = "It is advised you stop using it, or contact the developer of this project to tell them to stop using this script.";
  
    class EmbinComments {
        getInfo() {
            return {
                id: 'embincomments',
                name: 'Embin\'s Comments',
                //color1: '#877e34',
                //color3: '#e4db8c',
                //color2: '#c6be79',
                color1: '#4A4000',
                color2: '#6B5E00',
                color3: '#FFD500',
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
                                defaultValue: default_comment
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
                                defaultValue: default_comment
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
                                defaultValue: default_comment
                            }
                        }
                    },
                    {
                        opcode: 'comment_reporter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[value] // [comment]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_comment
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
                                defaultValue: default_comment
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
                        hideFromPalette: true,
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_comment
                            },
                            value2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'value'
                            }
                        }
                    },
                    {
                        opcode: 'comment_conditional_tw',
                        blockType: Scratch.BlockType.CONDITIONAL,
                        text: '// [COMMENT]',
                        arguments: {
                            COMMENT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_comment
                            },
                        },
                    },
                    {
                        opcode: 'comment_color',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[color] // [comment]',
                        arguments: {
                            comment: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_comment
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
                                defaultValue: default_comment
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
                                defaultValue: default_comment
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
                                defaultValue: default_comment
                            },
                            note: {
                                type: Scratch.ArgumentType.NOTE,
                                defaultValue: ''
                            }
                        }
                    },

                    //'---',

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Placeholders',
                        hideFromPalette: false
                    },
                    {
                        opcode: 'placeholder_hat',
                        blockType: Scratch.BlockType.HAT,
                        text: '...',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'placeholder_block',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '...'
                    },
                    {
                        opcode: 'placeholder_block_terminal',
                        blockType: Scratch.BlockType.COMMAND,
                        isTerminal: true,
                        text: '...'
                    },
                    {
                        opcode: 'placeholder_reporter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '...',
                        allowDropAnywhere: true,
                        disableMonitor: true
                    },
                    {
                        opcode: 'placeholder_boolean',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '...',
                        disableMonitor: true
                    },

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Mark Scripts as Deprecated',
                        hideFromPalette: false
                    },

                    {
                        opcode: 'mark_deprecated',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '!* deprecated *!'
                    },
                    {
                        opcode: 'mark_deprecated_for_removal',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '!* deprecated, to be removed *!'
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

        comment_conditional_tw (args, util) {
            return true;
        }

        placeholder_block () {
            // no-op
        }

        placeholder_reporter () {
            return '';
        }

        placeholder_boolean () {
            return false;
        }

        placeholder_block_terminal () {
            // no-op
        }

        placeholder_hat () {
            // no-op
        }

        mark_deprecated (args, util) {
            let sprite_name = util.target.sprite.name ?? "";
            console.warn("Deprecated script in sprite \"" + sprite_name + "\" was used.");
        }

        mark_deprecated_for_removal (args, util) {
            let sprite_name = util.target.sprite.name ?? "";
            console.error("Deprecated script marked for removal in sprite \"" + sprite_name + "\" was used.\n" + for_removal_message);
        }

    } // end of blocks code
    Scratch.extensions.register(new EmbinComments());
})(Scratch);
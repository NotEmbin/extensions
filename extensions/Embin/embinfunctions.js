// Name: Embin's Functions
// ID: embinfunctions
// Description: idk
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    const embin_functions_version = 'v1.0.0';
    const branch_true = true;
    const default_comment = 'cool comment';
    const default_data = '"data":"Hello World!"';
    const default_func = 'test_func';
    const default_ext = 'ext_embinfunctions';
  
    class EmbinFunctions {
        getInfo() {
            let default_args = {
                func: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_func
                },
                data: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_data
                },
                ext: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_ext
                }

            };
            let default_args_bool = {
                func: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_func
                },
                data: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_data
                },
                bool: {
                    type: Scratch.ArgumentType.BOOLEAN
                },
                ext: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_ext
                }
            };
            return {
                id: 'embinfunctions',
                name: "Embin's Functions",
                color1: '#254a00',
                color2: '#1e3b01',
                color3: '#82eb1a',
                blocks: [
                    {
                        opcode: 'return_version',
                        blockType: Scratch.BlockType.REPORTER,
                        disableMonitor: true,
                        text: '"Embin\'s Functions" version'
                    },
                    {
                        opcode: 'run_block',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'run function [func] in [ext] with data [data]',
                        arguments: default_args
                    },
                    {
                        opcode: 'run_reporter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'run function [func] in [ext] with data [data]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: default_args
                    },
                    {
                        opcode: 'run_block_if',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'if [bool] then run function [func] in [ext] with data [data]',
                        arguments: default_args_bool
                    },
                    {
                        opcode: 'run_reporter_if',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'if [bool] run function [func] in [ext] with data [data]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: default_args_bool
                    },
                    {
                        opcode: 'run_js',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'javascript [code]',
                        arguments: {
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'alert("poop monster!");'
                            }
                        }
                    },
                    {
                        opcode: 'run_js_reporter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'javascript [code]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: {
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Math.random();'
                            }
                        }
                    },
                ]
            };
        }

        return_version (args) {
            return embin_functions_version;
        }
  
        run_block (args) {
            vm.runtime[args.ext][args.func](JSON.parse("{"+args.data+"}"));
        }
  
        run_reporter (args) {
            return vm.runtime[args.ext][args.func](JSON.parse("{"+args.data+"}"));
        }

        run_block_if (args) {
            if (Boolean(args.bool)) {
                vm.runtime[args.ext][args.func](JSON.parse("{"+args.data+"}"));
            }
        }

        run_reporter_if (args) {
            if (Boolean(args.bool)) return vm.runtime[args.ext][args.func](JSON.parse("{"+args.data+"}"));
        }

        test_func(args) {
            return args.data;
        }

        test_func_2(args) {
            return Object.keys(vm.runtime);
        }

        run_js(args) {
            eval(args.code);
        }

        run_js_reporter(args) {
            return eval(args.code);
        }

    } // end of blocks code
    Scratch.extensions.register(new EmbinFunctions());
})(Scratch);
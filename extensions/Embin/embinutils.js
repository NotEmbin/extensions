function scratch_mod(value, mod) {
    var n = value
    let return_value = n % mod;
    if (return_value / mod < 0) return_value += mod;
    return return_value; 
}
(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must* run unsandboxed');
    }

    const version = 'v1.0.0';

    class EmbinUtils {
        getInfo() {
        return {
            id: 'embinutils',
            name: 'Embin\'s Utils',
            color1: '#E62CB1',
            color2: '#C72398',
            blocks: [
            {
                opcode: 'return_version',
                blockType: Scratch.BlockType.REPORTER,
                disableMonitor: true,
                text: '"Embin\'s Utils" version'
            },

            '---',

            {
                opcode: 'return_true',
                blockType: Scratch.BlockType.BOOLEAN,
                disableMonitor: true,
                text: 'true'
            },
            {
                opcode: 'return_false',
                blockType: Scratch.BlockType.BOOLEAN,
                disableMonitor: true,
                text: 'false'
            },
            {
                opcode: 'strictly_equals',
                blockType: Scratch.BlockType.BOOLEAN,
                text: '[one] === [two]',
                arguments: {
                  one: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Hey'
                },
                  two: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'hey'
                }
              }
            },
            {
                opcode: 'return_newline',
                blockType: Scratch.BlockType.REPORTER,
                disableMonitor: true,
                text: 'newline'
            },
            {
                opcode: 'string_split',
                blockType: Scratch.BlockType.REPORTER,
                text: 'item [numof] of [string] split by: [deli]',
                arguments: {
                  numof: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '3'
                },
                  string: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'A#B#C#D'
                },
                  deli: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '#'
                }
              }
            },
            {
                opcode: 'convert_to_string',
                blockType: Scratch.BlockType.REPORTER,
                text: '[thing] to string',
                arguments: {
                  thing: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '007'
                }
              }
            },
            {
                opcode: 'convert_to_number',
                blockType: Scratch.BlockType.REPORTER,
                text: '[thing] to number',
                arguments: {
                  thing: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '007'
                }
              }
            },
            {
                opcode: 'if_else_green_flag_reporter',
                blockType: Scratch.BlockType.REPORTER,
                text: 'if [if] then [then] else run green flag',
                arguments: {
                  if: {
                    type: Scratch.ArgumentType.BOOLEAN
                },
                  then: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: ''
                }
              }
            },

            '---',

            {
                opcode: 'green_flag',
                blockType: Scratch.BlockType.COMMAND,
                text: 'run green flag'
            },

            '---',

            {
                opcode: 'unsigned_8',
                blockType: Scratch.BlockType.REPORTER,
                text: '8-bit unsigned [num]',
                arguments: {
                  num: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '-1'
                }
              }
            },
            {
                opcode: 'unsigned_16',
                blockType: Scratch.BlockType.REPORTER,
                text: '16-bit unsigned [num]',
                arguments: {
                  num: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '-1'
                }
              }
            },
            {
                opcode: 'unsigned_32',
                blockType: Scratch.BlockType.REPORTER,
                text: '32-bit unsigned [num]',
                arguments: {
                  num: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '-1'
                }
              }
            },

            '---',

            {
                opcode: 'signed_8',
                blockType: Scratch.BlockType.REPORTER,
                text: '8-bit signed [num]',
                disableMonitor: true,
                arguments: {
                  num: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '16'
                }
              }
            },
            {
                opcode: 'signed_16',
                blockType: Scratch.BlockType.REPORTER,
                text: '16-bit signed [num]',
                arguments: {
                  num: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '16'
                }
              }
            },
            {
                opcode: 'signed_32',
                blockType: Scratch.BlockType.REPORTER,
                text: '32-bit signed [num]',
                arguments: {
                  num: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '16'
                }
              }
            }
            ]
          };
        }
  
        return_version() {
            return version;
        }

        return_true() {
            return true;
        }

        return_false() {
            return false;
        }

        string_split (args) {
            var input_1 = (args.numof - 1);
            var input_2 = String(args.string);
            var input_3 = args.deli;
            var output = input_2.split(input_3)[input_1] || '';
            return output;
        }

        unsigned_8(args) {
            return Math.round(scratch_mod(args.num, (2 ** 8)));
        }

        unsigned_16(args) {
            return Math.round(scratch_mod(args.num, (2 ** 16)));
        }

        unsigned_32(args) {
            return Math.round(scratch_mod(args.num, (2 ** 32)));
        }

        signed_8(args) {
            var a = args.num - (2 ** 7);
            var b = scratch_mod(a, (2 ** 8));
            let value = b - (2 ** 7);
            return Math.round(value);
        }

        signed_16(args) {
            var a = args.num - (2 ** 15);
            var b = scratch_mod(a, (2 ** 16));
            let value = b - (2 ** 15);
            return Math.round(value);
        }

        signed_32(args) {
            var a = args.num - (2 ** 31);
            var b = scratch_mod(a, (2 ** 32));
            let value = b - (2 ** 31);
            return Math.round(value);
        }

        convert_to_string(args) {
            return String(args.thing);
        }

        convert_to_number(args) {
            return Number(args.thing);
        }

        strictly_equals(args) {
            return args.one === args.two;
        }

        green_flag(args, util) {
            util.runtime.greenFlag();
        }

        return_newline(args) {
            return '\n';
        }

        if_else_green_flag_reporter(args, util) {
            if (args.if) return args.then;
            util.runtime.greenFlag(); 
        }
      }
  
    Scratch.extensions.register(new EmbinUtils());
})(Scratch);
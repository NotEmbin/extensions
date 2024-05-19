// Name: Embin's Utils
// ID: embinutils
// Description: Many utility blocks.
// By: Embin <https://scratch.mit.edu/users/Embin/>

function scratch_modulo(value, mod) {
    var n = value;
    let return_value = n % mod;
    if (return_value / mod < 0) return_value += mod;
    return return_value; 
}
(function(Scratch) {
    'use strict';

    const embin_utils_version = 'v1.14.5';

    if (!Scratch.extensions.unsandboxed) {
      //console.warn('Extension is being run in sandbox mode.');  
      throw new Error('This extension must run unsandboxed');
    }

    const vm = Scratch.vm;
    const Cast = Scratch.Cast;

    let temp_vars = Object.create(null);

    let character_tags = Object.create(null);
    let enemy_tags = Object.create(null);
    let attack_tags = Object.create(null);
    let tile_tags = Object.create(null);
    let entity_tags = Object.create(null);
    let item_tags = Object.create(null);
    let chip_tags = Object.create(null);
    let byte_tags = Object.create(null);
    let area_tags = Object.create(null);

    function reset_temp_vars() {
      temp_vars = Object.create(null);
    }

    function reset_all_tags() {
      character_tags = Object.create(null);
      enemy_tags = Object.create(null);
      attack_tags = Object.create(null);
      tile_tags = Object.create(null);
      entity_tags = Object.create(null);
      item_tags = Object.create(null);
      chip_tags = Object.create(null);
      byte_tags = Object.create(null);
      area_tags = Object.create(null);
    }

    // js sha256 hashing algorithm by geraintluff (minified)
    var sha256=function a(b){function c(a,b){return a>>>b|a<<32-b}for(var d,e,f=Math.pow,g=f(2,32),h="length",i="",j=[],k=8*b[h],l=a.h=a.h||[],m=a.k=a.k||[],n=m[h],o={},p=2;64>n;p++)if(!o[p]){for(d=0;313>d;d+=p)o[d]=p;l[n]=f(p,.5)*g|0,m[n++]=f(p,1/3)*g|0}for(b+="\x80";b[h]%64-56;)b+="\x00";for(d=0;d<b[h];d++){if(e=b.charCodeAt(d),e>>8)return;j[d>>2]|=e<<(3-d)%4*8}for(j[j[h]]=k/g|0,j[j[h]]=k,e=0;e<j[h];){var q=j.slice(e,e+=16),r=l;for(l=l.slice(0,8),d=0;64>d;d++){var s=q[d-15],t=q[d-2],u=l[0],v=l[4],w=l[7]+(c(v,6)^c(v,11)^c(v,25))+(v&l[5]^~v&l[6])+m[d]+(q[d]=16>d?q[d]:q[d-16]+(c(s,7)^c(s,18)^s>>>3)+q[d-7]+(c(t,17)^c(t,19)^t>>>10)|0),x=(c(u,2)^c(u,13)^c(u,22))+(u&l[1]^u&l[2]^l[1]&l[2]);l=[w+x|0].concat(l),l[4]=l[4]+w|0}for(d=0;8>d;d++)l[d]=l[d]+r[d]|0}for(d=0;8>d;d++)for(e=3;e+1;e--){var y=l[d]>>8*e&255;i+=(16>y?0:"")+y.toString(16)}return i};

    function action_reporter(a, utility) {
      if (a == 'run green flag') {utility.runtime.greenFlag();}
      if (a == 'green flag') {utility.runtime.greenFlag();}
      if (a == 'clear console') {console.clear();}
      if (a == 'return true') return true;
      if (a == 'return false') return false;
      if (a == 'return null') return 'null';
      if (a == 'return nothing') return '';
      if (a == 'return yes') return 'Yes';
      if (a == 'return no') return 'No';
      if (a == 'true') return true;
      if (a == 'false') return false;
      if (a == 'null') return 'null';
      if (a == 'literal null') return null;
      if (a == 'return literal null') return null;
      if (a == 'nothing') return '';
      if (a == 'yes') return 'Yes';
      if (a == 'no') return 'No';
      if (a == 'stop project') {utility.stopAll();}
      if (a == 'stop script') {utility.stopThisScript();}
      return;
    }

    //const argbuffer = '#';
    const hide_legacy_blocks = true;
    const is_packaged = Scratch.vm.runtime.isPackaged;
    const inff = (777 ** 777);
    const nnaann = (inff - inff);
    var fallback_costume_name = 'fallback';

    class EmbinUtils {
        getInfo() {
        return {
            id: 'embinutils',
            name: 'Embin\'s Utils',
            color3: '#E62CB1',
            color1: '#4A0031',
            //color2: '#C72398',
            color2: '#1F0215',
            blocks: [
            {
                opcode: 'return_version',
                blockType: Scratch.BlockType.REPORTER,
                disableMonitor: true,
                text: '"Embin\'s Utils" version'
            },

            '---',

            //{
              //func: 'show_old_blocks',
              //blockType: Scratch.BlockType.BUTTON,
              //text: 'Show Old Blcoks'
              //hideFromPalette: !hide_legacy_blocks
            //},
            //{
              //func: 'hide_old_blocks',
              //blockType: Scratch.BlockType.BUTTON,
              //text: 'Hide Old Blocks'
              //hideFromPalette: hide_legacy_blocks
            //},

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
                opcode: 'return_random',
                blockType: Scratch.BlockType.BOOLEAN,
                disableMonitor: true,
                text: 'random'
            },
            {
              opcode: 'return_boolean_from_input',
              blockType: Scratch.BlockType.BOOLEAN,
              disableMonitor: true,
              text: '[opt]',
              arguments: {
                opt: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'true',
                  menu: 'boolean_selection'
                }
              }
            },
            {
              opcode: 'return_is_packaged',
              blockType: Scratch.BlockType.BOOLEAN,
              disableMonitor: false,
              text: 'is project packaged?'
            },
            {
              opcode: 'window_focused',
              blockType: Scratch.BlockType.BOOLEAN,
              disableMonitor: false,
              text: 'is user focused on this window?'
            },
            {
              opcode: "connected_to_internet",
              blockType: Scratch.BlockType.BOOLEAN,
              disableMonitor: false,
              text: "connected to the internet?",
            },

            '---',

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
              opcode: 'not_equals',
              blockType: Scratch.BlockType.BOOLEAN,
              text: '[one] ≠ [two]',
              arguments: {
                one: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'hello'
                },
                two: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'hey'
                }
              }
            },
            {
              opcode: 'return_boolean',
              blockType: Scratch.BlockType.BOOLEAN,
              disableMonitor: true,
              text: '[anything]',
              arguments: {
                anything: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Howdy'
                }
              }
            },
            
            '---',

            {
                opcode: 'return_newline',
                blockType: Scratch.BlockType.REPORTER,
                disableMonitor: true,
                text: 'newline'
            },
            {
              opcode: 'return_tab',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'tab character'
            },
            {
              opcode: 'return_null',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'null'
            },
            {
              opcode: 'return_literal_null',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'literal null'
            },
            {
              opcode: 'return_infinity',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'Infinity'
            },
            {
              opcode: 'return_negative_infinity',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: '-Infinity'
            },
            {
              opcode: 'return_nan',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'NaN'
            },
            {
              opcode: 'get_window_name',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: false,
              text: 'get window title'
            },
            {
              opcode: 'current_url',
              blockType: Scratch.BlockType.REPORTER,
              text: 'current url',
              disableMonitor: false
            },
            {
              opcode: 'get_loaded_extensions',
              blockType: Scratch.BlockType.REPORTER,
              text: 'loaded extensions',
              disableMonitor: false
            },
            {
              opcode: 'get_sprite_name',
              blockType: Scratch.BlockType.REPORTER,
              text: 'sprite name',
              disableMonitor: false
            },
            {
              opcode: 'return_math_random_function',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'js: Math.random()'
            },

            '---',

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
              opcode: 'string_replace_all',
              blockType: Scratch.BlockType.REPORTER,
              text: 'in [base] replace all [r] with [w]',
              arguments: {
                base: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'foo bar foo bar'
                },
                r: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'foo'
                },
                w: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'goop'
                }
              }
            },
            {
              opcode: 'string_replace_first',
              blockType: Scratch.BlockType.REPORTER,
              text: 'in [base] replace first [r] with [w]',
              arguments: {
                base: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'the foo foo bar'
                },
                r: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'foo'
                },
                w: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'goop'
                }
              }
            },
            {
              opcode: 'letters_of',
              blockType: Scratch.BlockType.REPORTER,
              text: 'letters [num1] to [num2] of [string]',
              arguments: {
                num1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1
                },
                num2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 4
                },
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Hello'
                }
              }
            },
            {
              opcode: 'remove_first_character_in_string',
              blockType: Scratch.BlockType.REPORTER,
              text: 'remove first character in [string]',
              arguments: {
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '#stairs'
                }
              }
            },
            {
              opcode: 'remove_last_character_in_string',
              blockType: Scratch.BlockType.REPORTER,
              text: 'remove last character in [string]',
              arguments: {
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Hello!'
                }
              }
            },
            {
              opcode: 'join_newline',
              blockType: Scratch.BlockType.REPORTER,
              text: 'join [thing_1] \\n [thing_2]',
              arguments: {
                thing_1: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'a'
                },
                thing_2: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'b'
                }
              }
            },
            {
              opcode: 'join_three',
              blockType: Scratch.BlockType.REPORTER,
              text: 'join [thing_1] [thing_2] [thing_3]',
              arguments: {
                thing_1: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'a'
                },
                thing_2: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'b'
                },
                thing_3: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'c'
                }
              }
            },
            {
              opcode: 'insert_in_string',
              blockType: Scratch.BlockType.REPORTER,
              text: 'insert [add_string] into [og_string] at [index]', // w/ buffer [buffer]',
              arguments: {
                add_string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: ","
                },
                og_string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "12345"
                },
                index: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 2
                }
                //buffer: {
                //  type: Scratch.ArgumentType.STRING,
                //  defaultValue: '#'
                //}
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
                opcode: 'convert_to_id',
                blockType: Scratch.BlockType.REPORTER,
                text: 'convert [strin] to valid id',
                arguments: {
                  strin: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Why, hello there!'
                    //defaultValue: 'Hello Embin & the World'
                }
              }
            },
            {
              opcode: 'format_json',
              blockType: Scratch.BlockType.REPORTER,
              text: 'minify JSON [jjson]',
              arguments: {
                jjson: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: ''
                }
              }
            },
            {
              opcode: 'hash_sha256',
              blockType: Scratch.BlockType.REPORTER,
              text: 'SHA-256 hash [stringtohash]',
              arguments: {
                stringtohash: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'hello'
                }
              }
            },
            {
              opcode: 'return_uuid',
              blockType: Scratch.BlockType.REPORTER,
              text: 'generate UUID',
              disableMonitor: true
            },
            {
                opcode: 'if_else_green_flag_reporter',
                blockType: Scratch.BlockType.REPORTER,
                text: 'OLD | if [if] then [then] else run green flag',
                hideFromPalette: hide_legacy_blocks,
                arguments: {
                  if: {
                    type: Scratch.ArgumentType.BOOLEAN
                },
                  then: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'abc'
                }
              }
            },
            {
              opcode: 'if_else_action_reporter',
              blockType: Scratch.BlockType.REPORTER,
              text: 'if [if] then [then] else [act]',
              arguments: {
                if: {
                  type: Scratch.ArgumentType.BOOLEAN
              },
                then: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'abc'
              },
                act: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'run green flag',
                  menu: 'if_else_action_menu'
                }
              }
            },
            {
              opcode: 'if_else_double_action_reporter',
              blockType: Scratch.BlockType.REPORTER,
              text: 'if [if] then [actt] else [actf]',
              arguments: {
                if: {
                  type: Scratch.ArgumentType.BOOLEAN
              },
                actt: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'return yes',
                  menu: 'if_else_action_menu'
              },
                actf: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'return no',
                  menu: 'if_else_action_menu'
                }
              }
            },
            {
              opcode: 'if_else_reporter',
              blockType: Scratch.BlockType.REPORTER,
              text: 'if [if] then [then] else [else]',
              arguments: {
                if: {
                  type: Scratch.ArgumentType.BOOLEAN
              },
                then: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'abc'
              },
                else: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'xyz'
                }
              }
            },
            {
              opcode: 'convert_to_negative',
              blockType: Scratch.BlockType.REPORTER,
              text: '- [thing]',
              arguments: {
                thing: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '7'
                }
              }
            },
            {
              opcode: 'to_the_power_of',
              blockType: Scratch.BlockType.REPORTER,
              text: '[p1] ^ [p2]',
              arguments: {
                p1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '2'
                },
                p2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '31'
                }
              }
            },
            {
              opcode: 'to_the_power_of_minus_one',
              blockType: Scratch.BlockType.REPORTER,
              text: '[pm1] ^ [pm2] - 1',
              arguments: {
                pm1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '2'
                },
                pm2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '31'
                }
              }
            },
            {
              opcode: 'return_selected_costume',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: '[costume]',
              arguments: {
                costume: {
                  type: Scratch.ArgumentType.COSTUME
                }
              }
            },
            {
              opcode: 'color_hex',
              blockType: Scratch.BlockType.REPORTER,
              text: 'color [color]',
              arguments: {
                color: {
                  type: Scratch.ArgumentType.COLOR,
                  defaultValue: '#ff0000'
                }
              }
            },

            '---',

            {
                opcode: 'green_flag',
                blockType: Scratch.BlockType.COMMAND,
                text: 'run green flag'
            },
            {
              opcode: 'close_window',
              blockType: Scratch.BlockType.COMMAND,
              isTerminal: true,
              text: 'close window'
            },
            {
              opcode: 'set_window_name',
              blockType: Scratch.BlockType.COMMAND,
              text: 'set window title to [name]',
              disableMonitor: true,
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Awesome Project'
                }
              }
            },
            {
              opcode: 'open_in_new_tab',
              blockType: Scratch.BlockType.COMMAND,
              text: 'open [url] in new tab',
              disableMonitor: true,
              arguments: {
                url: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'https://extensions.turbowarp.org'
                }
              }
            },
            {
              opcode: 'console_log',
              blockType: Scratch.BlockType.COMMAND,
              text: 'console [log_type] [input]',
              disableMonitor: true,
              arguments: {
                log_type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'log',
                  menu: 'console_log_menu'
                },
                input: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'something'
                }
              }
            },
            {
              opcode: 'clear_console',
              blockType: Scratch.BlockType.COMMAND,
              text: 'clear console'
            },
            {
              opcode: 'throw_error',
              blockType: Scratch.BlockType.COMMAND,
              text: 'throw error [error]',
              disableMonitor: true,
              arguments: {
                error: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Oopsie!'
                }
              }
            },
            {
              opcode: 'throw_error_reporter',
              blockType: Scratch.BlockType.REPORTER,
              text: 'throw error [error]',
              disableMonitor: true,
              arguments: {
                error: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Oopsie!'
                }
              }
            },

            '---',

            {
              opcode: 'return_fallback_costume',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'fallback costume'
            },
            {
              opcode: 'costume_attribute',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              hideFromPalette: true,
              text: '[attribute] of [costume]',
              arguments: {
                attribute: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'costume_attribute_menu'
                },
                costume: {
                  type: Scratch.ArgumentType.COSTUME
                }
              }
            },
            {
              opcode: 'set_fallback_costume_to',
              blockType: Scratch.BlockType.COMMAND,
              text: 'set fallback costume to [fcostume]',
              disableMonitor: true,
              arguments: {
                fcostume: {
                  type: Scratch.ArgumentType.COSTUME,
                  defaultValue: 'fallback'
                }
              }
            },
            {
              opcode: 'set_costume_to',
              blockType: Scratch.BlockType.COMMAND,
              text: 'set costume to [new_costume]',
              disableMonitor: true,
              hideFromPalette: true,
              arguments: {
                new_costume: {
                  type: Scratch.ArgumentType.COSTUME
                }
              }
            },

            '---',

            {
              opcode: 'js_stack',
              blockType: Scratch.BlockType.COMMAND,
              text: 'js: [script]',
              disableMonitor: true,
              hideFromPalette: true,
              arguments: {
                script: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'alert(\'Hey\');'
                }
              }
            },
            {
              opcode: 'js_reporter',
              blockType: Scratch.BlockType.REPORTER,
              text: 'js: [script]',
              disableMonitor: true,
              allowDropAnywhere: true,
              hideFromPalette: true,
              arguments: {
                script: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Math.random();'
                }
              }
            },

            '---',

            {
              opcode: 'get_list_as_json',
              blockType: Scratch.BlockType.REPORTER,
              text: 'get contents of list [list] as array',
              hideFromPalette: true,
              arguments: {
                  list: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'select a list',
                      menu: 'lists'
                  }
              }
            },

            '---',

            {
              opcode: 'set_tag',
              blockType: Scratch.BlockType.COMMAND,
              text: 'set [tag_type]/[tag_id] tag to array [tag_contents]',
              arguments: {
                tag_type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'characters',
                  menu: 'tag_types'
                },
                tag_id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:test_tag'
                },
                tag_contents: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '["fwb:freddy","fwb:bonnie"]'
                }
              }
            },
            {
              opcode: 'add_to_tag',
              blockType: Scratch.BlockType.COMMAND,
              text: 'add [tag_addition] to [tag_type]/[tag_id] tag',
              arguments: {
                tag_type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'characters',
                  menu: 'tag_types'
                },
                tag_id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:test_tag'
                },
                tag_addition: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:chica'
                }
              }
            },
            {
              opcode: 'get_tag',
              blockType: Scratch.BlockType.REPORTER,
              text: 'get [tag_type]/[tag_id] tag',
              arguments: {
                tag_type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'characters',
                  menu: 'tag_types'
                },
                tag_id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:test_tag'
                }
              }
            },
            {
              opcode: 'does_tag_exist',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'does [tag_type]/[tag_id] exist?',
              arguments: {
                tag_type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'characters',
                  menu: 'tag_types'
                },
                tag_id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:test_tag'
                }
              }
            },
            {
              opcode: 'does_tag_contain_thing',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'does [tag_type]/[tag_id] have [thing]?',
              arguments: {
                tag_type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'characters',
                  menu: 'tag_types'
                },
                tag_id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:test_tag'
                },
                thing: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:chica'
                }
              }
            },
            {
              opcode: 'delete_specific_tag',
              blockType: Scratch.BlockType.COMMAND,
              text: 'delete [tag_type]/[tag_id] tag',
              arguments: {
                tag_type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'characters',
                  menu: 'tag_types'
                },
                tag_id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'fwb:test_tag'
                }
              }
            },
            {
              opcode: 'delete_all_tags',
              blockType: Scratch.BlockType.COMMAND,
              text: 'delete all tags'
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


            ],
            menus: {
              console_log_menu: {
                acceptReporters: true,
                items: ['log', 'warn', 'error']
              },
              if_else_action_menu: {
                acceptReporters: true,
                items: [
                  'run green flag',
                  'clear console',
                  'return nothing',
                  'return true',
                  'return false',
                  'return null',
                  'return literal null',
                  'return yes',
                  'return no',
                  'stop project',
                  'stop script'
                ]
              },
              costume_attribute_menu: {
                acceptReporters: false,
                items: [
                  {
                    text: 'costume width',
                    value: 'width'
                  },
                  {
                    text: 'costume height',
                    value: 'height'
                  },
                  {
                    text: 'rotation center x',
                    value: 'rotationCenterX'
                  },
                  {
                    text: 'rotation center y',
                    value: 'rotationCenterY'
                  }
                ]
              },
              lists: 'get_lists',
              boolean_selection: {
                acceptReporters: true,
                items: ['true', 'false', 'random']
              },
              tag_types: {
                acceptReporters: true,
                items: [
                  {
                    text: 'characters',
                    value: 'character'
                  },
                  {
                    text: 'enemies',
                    value: 'enemy'
                  },
                  {
                    text: 'attacks',
                    value: 'attack'
                  },
                  {
                    text: 'tiles',
                    value: 'tile'
                  },
                  {
                    text: 'entities',
                    value: 'entity'
                  },
                  {
                    text: 'items',
                    value: 'item'
                  },
                  {
                    text: 'chips',
                    value: 'chip'
                  },
                  {
                    text: 'bytes',
                    value: 'byte'
                  },
                  {
                    text: 'areas',
                    value: 'area'
                  }
                ]
              },
              tag_types_singular: {
                acceptReporters: true,
                items: [
                  'character',
                  'enemy',
                  'attack',
                  'tile',
                  'entity',
                  'item',
                  'chip',
                  'byte',
                  'area'
                ]
              }
            }
          };
        }

        get_lists () {
          const variables = [].concat(
              Object.values(vm.runtime.getTargetForStage().variables),
              Object.values(vm.editingTarget.variables)
          );
          const lists = variables.filter(i => i.type === 'list');
          if (lists.length === 0) {
              return [
                  {
                      text: 'select a list',
                      value: 'select a list'
                  }
              ];
          }
          return lists.map(i => ({
              text: i.name,
              value: JSON.stringify({
                  id: i.id,
                  name: i.name
              })
          }));
        }
  
        return_version() {
          return embin_utils_version;
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
          return Math.round(scratch_modulo(args.num, (2 ** 8)));
        }

        unsigned_16(args) {
          return Math.round(scratch_modulo(args.num, (2 ** 16)));
        }

        unsigned_32(args) {
          return Math.round(scratch_modulo(args.num, (2 ** 32)));
        }

        signed_8(args) {
          var a = args.num - (2 ** 7);
          var b = scratch_modulo(a, (2 ** 8));
          let value = b - (2 ** 7);
          return Math.round(value);
        }

        signed_16(args) {
          var a = args.num - (2 ** 15);
          var b = scratch_modulo(a, (2 ** 16));
          let value = b - (2 ** 15);
          return Math.round(value);
        }

        signed_32(args) {
          var a = args.num - (2 ** 31);
          var b = scratch_modulo(a, (2 ** 32));
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

        if_else_reporter(args) {
          if (args.if) return args.then;
          return args.else; 
        }

        console_log(args) {
          if (args.log_type === 'log') {
            console.log(args.input);
          } else if (args.log_type === 'warn') {
            console.warn(args.input);
          } else if (args.log_type === 'error') {
            console.error(args.input);
          } else {
            console.log(args.input);
          }
        }

        clear_console() {
          console.clear();
        }

        join_newline(args) {
          return String(args.thing_1) + '\n' + String(args.thing_2);
        }

        convert_to_id(args) {
          var new_string = String(args.strin).toLowerCase();
          var new_string = new_string.replaceAll(' ', '_');
          var new_string = new_string.replaceAll('&', 'and');
          var new_string = new_string.replaceAll(',', '');
          var new_string = new_string.replaceAll('!', '');
          var new_string = new_string.replaceAll('?', '');
          var new_string = new_string.replaceAll('"', '');
          var new_string = new_string.replaceAll("'", '');
          return new_string;
        }

        if_else_action_reporter(args, util) {
          if (args.if) return args.then;
          return action_reporter(args.act, util);
          //return null; 
        }

        hide_old_blocks() {
          hide_legacy_blocks = true;
          Scratch.vm.extensionManager.refreshBlocks();
        }

        show_old_blocks() {
          if (confirm('Are you sure you want to show old, hidden, and discontinued blocks?')) {
            hide_legacy_blocks = false;
            Scratch.vm.extensionManager.refreshBlocks();
          } else {
            Scratch.vm.extensionManager.refreshBlocks();
          }
        }

        convert_to_negative(args) {
          return (0 - args.thing);
        }

        color_hex(args) {
          return args.color;
        }

        to_the_power_of(args) {
          return (args.p1 ** args.p2);
        }

        to_the_power_of_minus_one(args) {
          return (args.pm1 ** args.pm2) - 1;
        }

        insert_in_string(args) {
          let og_string_length = String(args.og_string).length;
          let og_string = String(args.og_string);
          let argbuffer = '#'; //String(args.buffer);
          if (args.index > og_string_length) {
            bbuffer = argbuffer.repeat(args.index - og_string.length);
            og_string = og_string + bbuffer;
          } else if (args.index < 0) {
            bbuffer = argbuffer.repeat(args.index * -1);
            og_string = bbuffer + og_string;
            args.index = 0;
          }
          return og_string.substring(0, args.index) + args.add_string + og_string.substring(args.index);
        }

        return_null(args) {
          return "null";
        }
        
        return_tab(args) {
          return '\t';
        }

        return_is_packaged(args) {
          return is_packaged;
        }

        if_else_double_action_reporter(args, util) {
          if (args.if) {
            return action_reporter(args.actt, util);
          } else {
            return action_reporter(args.actf, util);
          }
        }

        return_boolean(args) {
          return args.anything;
        }

        return_nan(args) {
          return nnaann;
          //return ((777 ** 777) - (777 ** 777));
        }

        return_infinity(args) {
          return inff;
          //return (777 ** 777);
        }

        format_json(args) {
          var new_string = args.jjson;
          var new_string = new_string.replaceAll('\n', '');
          var new_string = new_string.replaceAll('\t', '');
          return new_string;
        }

        costume_attribute(args, util) {
          let costume_index = this.getCostumeInput(args.costume, util.target);
          let costume = util.target.sprite.costumes[costume_index];
          if (!costume) {
            console.error('Costume doesn\'t exist');
            return 0;
          }
    
          let attribute = args.attribute;
          if (attribute === 'width') {
            return Math.ceil(Scratch.Cast.toNumber(costume.size[0]));
          } else if (attribute === 'height') {
            return Math.ceil(Scratch.Cast.toNumber(costume.size[1]));
          } else if (attribute === 'rotationCenterX') {
            return costume.rotationCenterX;
          } else if (attribute === 'rotationCenterY') {
            return costume.rotationCenterY;
          } else {
            return '';
          }
        }

        _setCostume (target, requestedCostume, optZeroIndex) { // used by compiler
          if (typeof requestedCostume === 'number') {
              // Numbers should be treated as costume indices, always
              target.setCostume(optZeroIndex ? requestedCostume : requestedCostume - 1);
          } else {
              // Strings should be treated as costume names, where possible
              const costumeIndex = target.getCostumeIndexByName(requestedCostume.toString());
  
              if (costumeIndex !== -1) {
                  target.setCostume(costumeIndex);
              } else if (requestedCostume === 'next costume') {
                  target.setCostume(target.currentCostume + 1);
              } else if (requestedCostume === 'previous costume') {
                  target.setCostume(target.currentCostume - 1);
              // Try to cast the string to a number (and treat it as a costume index)
              // Pure whitespace should not be treated as a number
              // Note: isNaN will cast the string to a number before checking if it's NaN
              } else if (!(isNaN(requestedCostume) || Cast.isWhiteSpace(requestedCostume))) {
                  target.setCostume(optZeroIndex ? Number(requestedCostume) : Number(requestedCostume) - 1);
              }
          }
  
          // Per 2.0, 'switch costume' can't start threads even in the Stage.
          return [];
        } 

        set_costume_to (args, util) {
          let costume_index = this.getCostumeInput(args.costume, util.target);
          let costume = util.target.sprite.costumes[costume_index];
          if (!costume) {
            this._setCostume(util.target, fallback_costume_name);
            return;
          } else {
            this._setCostume(util.target, args.new_costume);
            return;
          }
        }

        return_fallback_costume (args) {
          return fallback_costume_name;
        }

        set_fallback_costume_to (args) {
          fallback_costume_name = args.fcostume;
          return;
        }

        return_selected_costume (args) {
          return args.costume;
        }

        get_list_as_json (args, util) {
          let list;
          try {
            list = JSON.parse(args.list);
          } catch {
            return;
          }
          let content = util.target.lookupOrCreateList(list.id, list.name).value;
  
          return JSON.stringify(content.map(x => stringToEqivalint(x)));
        }

        return_random (args) {
          if (Math.random() < 0.5) {
            return true;
          } else {
            return false;
          }
        }

        return_boolean_from_input (args) {
          if (args.opt == 'true') {
            return true;
          } else if (args.opt == 'false') {
            return false;
          } else if (args.opt == 'random') {
            if (Math.random() < 0.5) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }

        return_math_random_function (args) {
          return Math.random();
        }

        close_window (args) {
          window.close();
        }

        set_window_name (args) {
          const wname = Cast.toString(args.name);
          document.title = wname
        }

        get_window_name (args) {
          return document.title;
        }

        window_focused (args) {
          return document.hasFocus();
        }

        js_stack (args) {
          //let js_stack_dummy = "No longer supported";
          throw new Error("This block is no longer supported");
        }

        js_reporter (args) {
          //return "This block is no longer supported.";
          throw new Error("This block is no longer supported");
        }

        not_equals(args) {
          return args.one != args.two;
        }

        string_replace_all (args) {
          return String(args.base).replaceAll(args.r, args.w);
        }

        string_replace_first (args) {
          return String(args.base).replace(args.r, args.w);
        }

        join_three (args) {
          return String(args.thing_1) + String(args.thing_2) + String(args.thing_3);
        }

        hash_sha256 (args) {
          return sha256(args.stringtohash);
        }

        return_uuid (args) {
          return crypto.randomUUID();
        }

        letters_of (args) {
          let real_string = String(args.string);
          let num1 = Number(args.num1) || 0;
          let num2 = Number(args.num2) || 0;
          return real_string.substring((num1 - 1), num2);
        }

        remove_first_character_in_string (args) {
          let real_string = String(args.string);
          let max = real_string.length;
          return real_string.substring(1, max);
        }

        remove_last_character_in_string (args) {
          let real_string = String(args.string);
          let max = real_string.length;
          return real_string.substring(0, (max - 1));
        }

        throw_error (args) {
          throw new Error(args.error);
        }

        throw_error_reporter (args) {
          throw new Error(args.error);
        }

        is_json_valid (json) {
          try {
            JSON.parse(json);
            return true;
          } catch {
            return false;
          }
        }

        set_tag (args) {
          //if (!this.is_json_valid({ json: args.tag_contents })) throw new Error("Contents not an array");
          try {
            if (!Array.isArray(JSON.parse(args.tag_contents))) throw new Error("Not an array");
          } catch (error) {
            throw new Error("Not an array");
          }

          switch(args.tag_type) {
            // characters
            case "character":
            case "characters":
              character_tags[args.tag_id] = args.tag_contents;
              break;
            
            // enemies
            case "enemy":
            case "enemies":
              enemy_tags[args.tag_id] = args.tag_contents;
              break;
            
            // attacks
            case "attack":
            case "attacks":
              attack_tags[args.tag_id] = args.tag_contents;
              break;

            // tiles
            case "tile":
            case "tiles":
              tile_tags[args.tag_id] = args.tag_contents;
              break;

            // entities
            case "entity":
            case "entities":
              entity_tags[args.tag_id] = args.tag_contents;
              break;

            // items
            case "item":
            case "items":
              item_tags[args.tag_id] = args.tag_contents;
              break;

            // chips
            case "chip":
            case "chips":
              chip_tags[args.tag_id] = args.tag_contents;
              break;

            // bytes
            case "byte":
            case "bytes":
              byte_tags[args.tag_id] = args.tag_contents;
              break;

            // areas
            case "area":
            case "areas":
              area_tags[args.tag_id] = args.tag_contents;
              break;

            default:
              return;
          }
        }

        get_tag (args) {
          switch(args.tag_type) {
            // characters
            case "character":
            case "characters":
              if (!(args.tag_id in character_tags)) return "";
              return character_tags[args.tag_id];
            
            // enemies
            case "enemy":
            case "enemies":
              if (!(args.tag_id in enemy_tags)) return "";
              return enemy_tags[args.tag_id];
            
            // attacks
            case "attack":
            case "attacks":
              if (!(args.tag_id in attack_tags)) return "";
              return attack_tags[args.tag_id];

            // tiles
            case "tile":
            case "tiles":
              if (!(args.tag_id in tile_tags)) return "";
              return tile_tags[args.tag_id];

            // entities
            case "entity":
            case "entities":
              if (!(args.tag_id in entity_tags)) return "";
              return entity_tags[args.tag_id];

            // items
            case "item":
            case "items":
              if (!(args.tag_id in item_tags)) return "";
              return item_tags[args.tag_id];

            // chips
            case "chip":
            case "chips":
              if (!(args.tag_id in chip_tags)) return "";
              return chip_tags[args.tag_id];

            // bytes
            case "byte":
            case "bytes":
              if (!(args.tag_id in byte_tags)) return "";
              return byte_tags[args.tag_id];

            // areas
            case "area":
            case "areas":
              if (!(args.tag_id in area_tags)) return "";
              return area_tags[args.tag_id];

            default:
              return "";
          }
        }

        add_to_tag (args) {
          let new_data;
          switch(args.tag_type) {
            // characters
            case "character":
            case "characters":
              if (!(args.tag_id in character_tags)) return;
              new_data = JSON.parse(character_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              character_tags[args.tag_id] = JSON.stringify(new_data);
              break;
            
            // enemies
            case "enemy":
            case "enemies":
              if (!(args.tag_id in enemy_tags)) return;
              new_data = JSON.parse(enemy_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              enemy_tags[args.tag_id] = JSON.stringify(new_data);
              break;
            
            // attacks
            case "attack":
            case "attacks":
              if (!(args.tag_id in attack_tags)) return;
              new_data = JSON.parse(attack_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              attack_tags[args.tag_id] = JSON.stringify(new_data);
              break;

            // tiles
            case "tile":
            case "tiles":
              if (!(args.tag_id in tile_tags)) return;
              new_data = JSON.parse(tile_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              tile_tags[args.tag_id] = JSON.stringify(new_data);
              break;

            // entities
            case "entity":
            case "entities":
              if (!(args.tag_id in entity_tags)) return;
              new_data = JSON.parse(entity_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              entity_tags[args.tag_id] = JSON.stringify(new_data);
              break;

            // items
            case "item":
            case "items":
              if (!(args.tag_id in item_tags)) return;
              new_data = JSON.parse(item_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              item_tags[args.tag_id] = JSON.stringify(new_data);
              break;

            // chips
            case "chip":
            case "chips":
              if (!(args.tag_id in chip_tags)) return;
              new_data = JSON.parse(chip_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              chip_tags[args.tag_id] = JSON.stringify(new_data);
              break;

            // bytes
            case "byte":
            case "bytes":
              if (!(args.tag_id in byte_tags)) return;
              new_data = JSON.parse(byte_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              byte_tags[args.tag_id] = JSON.stringify(new_data);
              break;

            // areas
            case "area":
            case "areas":
              if (!(args.tag_id in area_tags)) return;
              new_data = JSON.parse(area_tags[args.tag_id]);
              new_data.push(args.tag_addition);
              area_tags[args.tag_id] = JSON.stringify(new_data);
              break;

            default:
              return;
          }
        }

        does_tag_exist (args) {
          switch(args.tag_type) {
            // characters
            case "character":
            case "characters":
              if (!(args.tag_id in character_tags)) return false;
              return true;
            
            // enemies
            case "enemy":
            case "enemies":
              if (!(args.tag_id in enemy_tags)) return false;
              return true;
            
            // attacks
            case "attack":
            case "attacks":
              if (!(args.tag_id in attack_tags)) return false;
              return true;

            // tiles
            case "tile":
            case "tiles":
              if (!(args.tag_id in tile_tags)) return false;
              return true;

            // entities
            case "entity":
            case "entities":
              if (!(args.tag_id in entity_tags)) return false;
              return true;

            // items
            case "item":
            case "items":
              if (!(args.tag_id in item_tags)) return false;
              return true;

            // chips
            case "chip":
            case "chips":
              if (!(args.tag_id in chip_tags)) return false;
              return true;

            // bytes
            case "byte":
            case "bytes":
              if (!(args.tag_id in byte_tags)) return false;
              return true;

            // areas
            case "area":
            case "areas":
              if (!(args.tag_id in area_tags)) return false;
              return true;

            default:
              return false;
          }
        }

        delete_all_tags (args) {
          reset_all_tags();
        }

        delete_specific_tag (args) {
          switch(args.tag_type) {
            // characters
            case "character":
            case "characters":
              Reflect.deleteProperty(character_tags, args.tag_id);
              break;
            
            // enemies
            case "enemy":
            case "enemies":
              Reflect.deleteProperty(enemy_tags, args.tag_id);
              break;
            
            // attacks
            case "attack":
            case "attacks":
              Reflect.deleteProperty(attack_tags, args.tag_id);
              break;

            // tiles
            case "tile":
            case "tiles":
              Reflect.deleteProperty(tile_tags, args.tag_id);
              break;

            // entities
            case "entity":
            case "entities":
              Reflect.deleteProperty(entity_tags, args.tag_id);
              break;

            // items
            case "item":
            case "items":
              Reflect.deleteProperty(item_tags, args.tag_id);
              break;

            // chips
            case "chip":
            case "chips":
              Reflect.deleteProperty(chip_tags, args.tag_id);
              break;

            // bytes
            case "byte":
            case "bytes":
              Reflect.deleteProperty(byte_tags, args.tag_id);
              break;

            // areas
            case "area":
            case "areas":
              Reflect.deleteProperty(area_tags, args.tag_id);
              break;

            default:
              return false;
          }
        }

        open_in_new_tab (args) {
          Scratch.openWindow(args.url);
        }

        connected_to_internet () {
          try {
            return navigator.onLine;
          } catch (err) {
            return false;
          }
        }

        current_url () {
          try {
            return document.URL || "";
          } catch (err) {
            return "";
          }
        }

        json_valid_return (json) {
          if (typeof json != "string") {
            return json;
          } else if (
            (json.slice(0, 1) != "[" || json.slice(-1) != "]") &&
            (json.slice(0, 1) != "{" || json.slice(-1) != "}")
          ) {
            return json;
          } else {
            try {
              return JSON.parse(json);
            } catch {
              return json;
            }
          }
        }

        does_tag_contain_thing (args) {
          let data;
          switch(args.tag_type) {
            // characters
            case "character":
            case "characters":
              data = character_tags[args.tag_id];
              break;
            
            // enemies
            case "enemy":
            case "enemies":
              data = enemy_tags[args.tag_id];
              break;
            
            // attacks
            case "attack":
            case "attacks":
              data = attack_tags[args.tag_id];
              break;

            // tiles
            case "tile":
            case "tiles":
              data = tile_tags[args.tag_id];
              break;

            // entities
            case "entity":
            case "entities":
              data = entity_tags[args.tag_id];
              break;

            // items
            case "item":
            case "items":
              data = item_tags[args.tag_id];
              break;

            // chips
            case "chip":
            case "chips":
              data = chip_tags[args.tag_id];
              break;

            // bytes
            case "byte":
            case "bytes":
              data = byte_tags[args.tag_id];
              break;

            // areas
            case "area":
            case "areas":
              data = area_tags[args.tag_id];
              break;

            default:
              console.error("failed switch case");
              return false;
          }

          try {
            //json = JSON.parse(data);
            //value = this.json_valid_return(args.thing);
            return data.includes('"' + args.thing + '"');
          } catch {
            console.error("failed try statement");
            return false;
          }
        }

        get_loaded_extensions (args) {
          return JSON.stringify(
            Array.from(vm.extensionManager._loadedExtensions.keys())
          );
        }

        return_negative_infinity (args) {
          return (0 - inff);
        }

        return_literal_null (args) {
          return null;
        }

        get_sprite_name(args, util) {
          return util.target.sprite.name ?? "";
        }

      } // end of blocks code
  
    Scratch.extensions.register(new EmbinUtils());
})(Scratch);
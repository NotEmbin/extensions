// Name: Embin's Utils
// ID: embinutils
// Description: Many utility blocks.
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function(Scratch) {
    'use strict';

    const embin_utils_version = 'v1.19.2';

    if (!Scratch.extensions.unsandboxed) {
      //console.warn('Extension is being run in sandbox mode.');  
      throw new Error('This extension must run unsandboxed');
    }

    function scratch_modulo(value, mod) {
      var n = value;
      let return_value = n % mod;
      if (return_value / mod < 0) return_value += mod;
      return return_value; 
    }

    const make_label = (text) => ({
      blockType: "label",
      text: text,
    });

    const vm = Scratch.vm;
    const Cast = Scratch.Cast;

    let id_regex = new RegExp("^[a-z0-9:_./-]+$");
    let path_regex = new RegExp("^[a-z0-9_./-]+$");
    let namespace_regex = new RegExp("^[a-z0-9_.-]+$");

    let temp_vars = Object.create(null);

    let tags = Object.create(null);
    let tag_name_delimeter = "#";
    const v_tag_types = [
      'characters',
      'enemies',
      'attacks',
      'tiles',
      'entities',
      'items',
      'chips',
      'bytes',
      'areas',
      'levels',
      'buildables',
      'menus',
      'settings',
      'controls',
      'categories',
      'level_backgrounds',
      'maps',
      'campaigns',
      'effects',
      'blocks',
      'enchantments',
      'biomes',
      'liquids',
      'stories',
      'unlockables',
      'expansions',
      'secrets',
      'paintings',
      'tracks',
      'upgrades',
      'pieces',
      'monsters',
      'balls',
      'towers',
      'defenders',
      'powerups',
      'consumables',
      'scripts',
      'objects',
      'triggers',
      'keys',
      'genders',
      'cosmetics',
      'seasons',
      'capes',
      'days',
      'nights',
      'planets',
      'solar_systems',
      'galaxies',
      'universes',
      'dimensions',
      'moons',
      'stars',
      'elements',
      'materials',
      'functions',
      'currencies',
      'challenges',
      'variables',
      'cameras',
      'extensions',
      'sounds',
      'sound_groups',
      'dlcs',
      'missions',
      'objectives',
      'animals',
      'experiments',
      'feature_flags',
      'recipes',
      'advancements',
      'instruments',
      'damage_types',
      'loot_tables',
      'jukebox_songs',
      'structures',
      'patterns',
      'banner_patterns',
      'trim_patterns'
    ];

    function reset_temp_vars() {
      temp_vars = Object.create(null);
    }

    function reset_all_tags() {
      tags = Object.create(null);
    }

    // minified js sha256 hashing algorithm by geraintluff
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
      return "";
    }

    //const argbuffer = '#';
    let hide_legacy_blocks = true;
    const is_packaged = Scratch.vm.runtime.isPackaged;
    var fallback_costume_name = 'fallback';
    var namespace = 'engine';

    function add_namespace_to_string(string) {
      if (string == "") return namespace + ":" + fallback_costume_name;
      if (!(string.includes(":"))) {
        if (!path_regex.test(String(string))) throw new Error("Invalid path: \"" + string + "\"");
        return (namespace + ":" + string);
      } else {
        if (!id_regex.test(String(string))) throw new Error("Invalid ID: \"" + string + "\"");
        return string;
      }
    }

    function stringToEqivalint(value) {
      // is the value a valid json? if so convert to one else do nothing
      try {
        if (!(value.startsWith('{') || value.startsWith('['))) throw new Error('not actualy a json!!!!!!!!!!');
        value = JSON.parse(value);
      } catch {
        // well its not a json so what is it?
        if (String(Number(value)) === value) {
          value = Number(value);
        } else if (value.toLowerCase() === 'true') {
          value = true;
        } else if (value.toLowerCase() === 'false') {
          value = false;
        } else if (value === 'undefined') {
          value = undefined;
        } else if (value === 'null') {
          value = null;
        }
      }

      return value;
    }

    class EmbinUtils {
        getInfo() {
        return {
            id: 'embinutils',
            name: 'Embin\'s Utils',
            color3: '#EA1A1A',
            color1: '#4A0000',
            color2: '#3A0101',
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
              opcode: 'is_mouse_down',
              blockType: Scratch.BlockType.BOOLEAN,
              disableMonitor: true,
              text: '[mouse] mouse button down?',
              arguments: {
                mouse: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '(0) primary',
                  menu: 'mouse'
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
              opcode: 'greater_than_equal',
              blockType: Scratch.BlockType.BOOLEAN,
              text: '[one] >= [two]',
              arguments: {
                one: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '3'
                },
                two: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '2'
                }
              }
            },
            {
              opcode: 'less_than_equal',
              blockType: Scratch.BlockType.BOOLEAN,
              text: '[one] <= [two]',
              arguments: {
                one: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '3'
                },
                two: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '2'
                }
              }
            },
            {
              opcode: 'is_number_in_range',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'is [number] in range [min] [max]',
              arguments: {
                number: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '12'
                },
                min: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                },
                max: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '255'
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
              opcode: 'get_user_language',
              blockType: Scratch.BlockType.REPORTER,
              text: 'user language code',
              disableMonitor: false
            },

            '---',
            
            {
              func: 'open_tolocalestring_docs',
              blockType: Scratch.BlockType.BUTTON,
              text: 'locale string documentation'
            },
            {
              opcode: 'convert_number_to_locale_string',
              blockType: Scratch.BlockType.REPORTER,
              text: 'number [number] to locale string',
              arguments: {
                number: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '32767'
                }
              }
            },
            {
              opcode: 'convert_number_to_locale_string_with_data',
              blockType: Scratch.BlockType.REPORTER,
              text: 'number [number] to locale string with lang [lang] and args [localeargs]',
              arguments: {
                number: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '32767.123'
                },
                lang: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'en-US'
                },
                localeargs: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '"maximumSignificantDigits":7'
                }
              }
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
              opcode: 'join_four',
              blockType: Scratch.BlockType.REPORTER,
              text: 'join [thing_1] [thing_2] [thing_3] [thing_4]',
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
                },
                thing_4: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'd'
                }
              }
            },
            {
              opcode: 'join_five',
              blockType: Scratch.BlockType.REPORTER,
              text: 'join [thing_1] [thing_2] [thing_3] [thing_4] [thing_5]',
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
                },
                thing_4: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'd'
                },
                thing_5: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'e'
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
              text: 'OLD | convert [strin] to valid id',
              hideFromPalette: true,
              arguments: {
                strin: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Why, hello there!'
                  //defaultValue: 'Hello Embin & the World'
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
              opcode: 'return_math_random_function',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'js: Math.random()'
            },
            {
              opcode: 'return_max_number',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'js: Number.MAX_SAFE_INTEGER'
            },
            {
              opcode: 'return_min_number',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'js: Number.MIN_SAFE_INTEGER'
            },
            {
              opcode: 'return_max_value',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'js: Number.MAX_VALUE'
            },
            {
              opcode: 'return_min_value',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              text: 'js: Number.MIN_VALUE'
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
              opcode: 'throw_error_if_false',
              blockType: Scratch.BlockType.COMMAND,
              text: 'if [cond] is false, throw error [error]',
              arguments: {
                cond: {
                  type: Scratch.ArgumentType.BOOLEAN
                },
                error: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'something'
                }
              }
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
                    defaultValue: '127'
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
                    defaultValue: '32767'
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
                    defaultValue: '2147483647'
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
              opcode: 'set_json',
              blockType: Scratch.BlockType.REPORTER,
              text: 'set [item] in [json] to [value]',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                item: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'key'
                },
                json: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '{"key":"what"}'
                },
                value: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'water'
                }
              }
            },
            {
              opcode: 'add_to_json_array',
              blockType: Scratch.BlockType.REPORTER,
              text: 'add [item] to array [json]',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                item: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'true'
                },
                json: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '["real","thing"]'
                }
              }
            },
            {
              opcode: 'merge_jsons',
              blockType: Scratch.BlockType.REPORTER,
              text: 'merge json [first] and [second]',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                first: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '{"poo":"real"}'
                },
                second: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '{"poo2":"realest"}'
                }
              }
            },
            {
              opcode: 'remove_array_from_array',
              blockType: Scratch.BlockType.REPORTER,
              text: 'remove array [remove] from [base]',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                remove: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '["loopy1","loopy3"]'
                },
                base: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '["loopy0","loopy1","loopy2","loopy3"]'
                }
              }
            },
            {
              opcode: 'get_json_key_else_key',
              blockType: Scratch.BlockType.REPORTER,
              text: 'get [key] from [json] else return key',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                key: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'sigma'
                },
                json: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '{"sigma":"real","sigma3":"real3"}'
                }
              }
            },
            {
              opcode: 'get_list_as_json',
              blockType: Scratch.BlockType.REPORTER,
              text: 'get list [list] as array',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                list: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'select a list',
                  menu: 'lists'
                }
              }
            },
            {
              opcode: 'format_json',
              blockType: Scratch.BlockType.REPORTER,
              text: 'minify json [jjson]',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                jjson: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '{ "hey": true }'
                }
              }
            },
            {
              opcode: 'beautify_json',
              blockType: Scratch.BlockType.REPORTER,
              text: 'beautify json [json]',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                json: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '{"hey":"wow"}'
                }
              }
            },
            {
              opcode: 'beautify_json_with_menu',
              blockType: Scratch.BlockType.REPORTER,
              text: 'beautify json [json] with [beautify_menu]',
              hideFromPalette: hide_legacy_blocks,
              arguments: {
                json: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '{"hey":"wow"}'
                },
                beautify_menu: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '2 spaces',
                  menu: 'json_beautifier_menu'
                }
              }
            },

            '---',
            make_label("Variables"),

            {
              opcode: 'set_var',
              blockType: Scratch.BlockType.COMMAND,
              text: 'set var [name] to [value]',
              disableMonitor: true,
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'name'
                },
                value: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'value'
                }
              }
            },
            {
              opcode: 'get_var',
              blockType: Scratch.BlockType.REPORTER,
              text: 'get var [name]',
              disableMonitor: true,
              allowDropAnywhere: true,
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'name'
                }
              }
            },
            {
              opcode: 'does_var_exist',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'does var [name] exist?',
              disableMonitor: true,
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'name'
                }
              }
            },
            {
              opcode: 'delete_var',
              blockType: Scratch.BlockType.COMMAND,
              text: 'delete var [name]',
              disableMonitor: true,
              arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'name'
                }
              }
            },
            {
              opcode: 'delete_all_vars',
              blockType: Scratch.BlockType.COMMAND,
              text: 'delete all variables',
              disableMonitor: true
            },
            {
              opcode: 'return_list_of_vars',
              blockType: Scratch.BlockType.REPORTER,
              text: 'all current variables'
            },
            
            '---',
            make_label("Tags"),

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
            {
              opcode: 'return_list_of_tags',
              blockType: Scratch.BlockType.REPORTER,
              text: 'all current tags'
            },
            {
              opcode: 'create_tag_type',
              blockType: Scratch.BlockType.COMMAND,
              text: 'create new tag type with name [tag_type_name]',
              hideFromPalette: true,
              arguments: {
                tag_type_name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'goobers'
                }
              }
            },
            {
              opcode: 'return_all_tag_types',
              blockType: Scratch.BlockType.REPORTER,
              text: 'all current tag types',
              hideFromPalette: true
            },

            '---',
            make_label("IDs"),

            {
              opcode: 'return_namespace',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: false,
              text: 'namespace'
            },
            {
              opcode: 'set_namespace',
              blockType: Scratch.BlockType.COMMAND,
              text: 'set namespace to [new_namespace]',
              disableMonitor: true,
              arguments: {
                new_namespace: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'engine'
                }
              }
            },
            {
              opcode: 'return_id_with_namespace',
              blockType: Scratch.BlockType.REPORTER,
              text: 'return id [string]',
              arguments: {
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'cool_stuff'
                }
              }
            },
            {
              opcode: 'id_has_namespace',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'does id [string] have a namespace?',
              arguments: {
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'project:cool_stuff'
                }
              }
            },
            {
              opcode: 'convert_to_id_with_namespace',
              blockType: Scratch.BlockType.REPORTER,
              text: 'convert [string] to valid id',
              arguments: {
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Crazy stuff, dude'
                }
              }
            },
            {
              opcode: 'get_namespace_from_id',
              blockType: Scratch.BlockType.REPORTER,
              text: 'get [type] from [id]',
              arguments: {
                id: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'project:cool_stuff'
                },
                type: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'namespace',
                  menu: 'namespace_get_types'
                }
              }
            },
            {
              opcode: 'id_to_translation_key',
              blockType: Scratch.BlockType.REPORTER,
              text: 'id [string] to key',
              arguments: {
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'project:cool_stuff/thing'
                }
              }
            },
            {
              opcode: 'id_to_prefixed_translation_key',
              blockType: Scratch.BlockType.REPORTER,
              text: 'id [string] to [prefix] key',
              arguments: {
                string: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'minecraft:planks/oak'
                },
                prefix: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'block'
                }
              }
            },

            '---',
            make_label("Zip Utilities"),

            {
              opcode: 'get_dir_extended',
              blockType: Scratch.BlockType.REPORTER,
              text: 'all files from directory [DIR]',
              disableMonitor: true,
              arguments: {
                DIR: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '.'
                }
              }
            },
            {
              opcode: 'remove_file_extension',
              blockType: Scratch.BlockType.REPORTER,
              text: 'remove extension from file path [path]',
              disableMonitor: true,
              arguments: {
                path: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'folder/image.png'
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
              lists: {
                acceptReporters: true,
                items: 'get_lists'
              },
              boolean_selection: {
                acceptReporters: true,
                items: ['true', 'false', 'random']
              },
              tag_types: {
                acceptReporters: true,
                items: v_tag_types
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
              },
              mouse: {
                acceptReporters: true,
                items: [
                  {
                    text: '(0) primary',
                    value: '0'
                  },
                  {
                    text: '(1) middle',
                    value: '1'
                  },
                  {
                    text: '(2) secondary',
                    value: '2'
                  }
                ]
              },
              json_beautifier_menu: {
                acceptReporters: true,
                items: [
                  '2 spaces',
                  '3 spaces',
                  '4 spaces',
                  'tab character'
                ]
              },
              namespace_get_types: {
                acceptReporters: true,
                items: [
                  'namespace',
                  'id'
                ]
              }
            }
          };
        }

        get_lists () {
          const globalLists = Object.values(
            vm.runtime.getTargetForStage().variables
          ).filter((x) => x.type == "list");
          const localLists = Object.values(vm.editingTarget.variables).filter(
            (x) => x.type == "list"
          );
          const uniqueLists = [...new Set([...globalLists, ...localLists])];
          if (uniqueLists.length === 0) {
            return [
              {
                text: "select a list",
                value: "select a list",
              },
            ];
          }
          return uniqueLists.map((i) => ({
            text: i.name,
            value: i.id,
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
          return Number.NaN;
          //return ((777 ** 777) - (777 ** 777));
        }

        return_infinity(args) {
          return Number.POSITIVE_INFINITY;
          //return (777 ** 777);
        }

        format_json(args) {
          try {
            return JSON.stringify(JSON.parse(args.jjson));
          } catch {
            return "";
          }
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

        lookup_list(list, util) {
          const byId = util.target.lookupVariableById(list);
          if (byId && byId.type === "list") {
            return byId;
          }
          const byName = util.target.lookupVariableByNameAndType(list, "list");
          if (byName) {
            return byName;
          }
          return null;
        }

        get_list_as_json (args, util) {
          try {
            let list_var = this.lookup_list(args.list, util);
            if (list_var) {
              return JSON.stringify(list_var.value.map(x => stringToEqivalint(x)));
            }
          } catch {
            return "[]";
          }
          return "[]";
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
          throw new Error("This block is no longer supported");
        }

        js_reporter (args) {
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

          tags[(args.tag_type + tag_name_delimeter + add_namespace_to_string(args.tag_id))] = args.tag_contents;
        }

        get_tag (args) {
          let tagid = (args.tag_type + tag_name_delimeter + add_namespace_to_string(args.tag_id));
          if (!(tagid in tags)) return "[]";
          return tags[tagid];
        }

        add_to_tag (args) {
          let tagid = (args.tag_type + tag_name_delimeter + add_namespace_to_string(args.tag_id));
          let new_data;

          if (!(tagid in tags)) return;
          new_data = JSON.parse(tags[tagid]);
          new_data.push(args.tag_addition);
          tags[tagid] = JSON.stringify(new_data);
        }

        does_tag_exist (args) {
          let tagid = (args.tag_type + tag_name_delimeter + add_namespace_to_string(args.tag_id));
          if (!(tagid in tags)) return false;
          return true;
        }

        delete_all_tags (args) {
          reset_all_tags();
        }

        delete_specific_tag (args) {
          let tagid = (args.tag_type + tag_name_delimeter + add_namespace_to_string(args.tag_id));
          Reflect.deleteProperty(tags, tagid);
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
          let tagid = (args.tag_type + tag_name_delimeter + add_namespace_to_string(args.tag_id));
          let data = tags[tagid];
          try {
            //json = JSON.parse(data);
            //value = this.json_valid_return(args.thing);
            return data.includes('"' + args.thing + '"');
          } catch {
            return false;
          }
        }

        get_loaded_extensions (args) {
          return JSON.stringify(
            Array.from(vm.extensionManager._loadedExtensions.keys())
          );
        }

        return_negative_infinity (args) {
          return Number.NEGATIVE_INFINITY;
        }

        return_literal_null (args) {
          return null;
        }

        get_sprite_name(args, util) {
          return util.target.sprite.name ?? "";
        }

        set_var(args) {
          temp_vars[add_namespace_to_string(args.name)] = args.value;
        }

        get_var(args) {
          if (!(add_namespace_to_string(args.name) in temp_vars)) return "";
          return temp_vars[add_namespace_to_string(args.name)];
        }

        delete_var(args) {
          Reflect.deleteProperty(temp_vars, add_namespace_to_string(args.name));
        }

        delete_all_vars(args) {
          reset_temp_vars();
        }

        does_var_exist(args) {
          return add_namespace_to_string(args.name) in temp_vars;
        }

        is_mouse_down(args, util) {
          const mbutton = Cast.toNumber(args.mouse);
          return util.ioQuery('mouse', 'getButtonIsDown', [mbutton]);
        }

        create_tag_type(args) {
          v_tag_types.push(args.tag_type_name);
          Scratch.vm.extensionManager.refreshBlocks();
        }

        return_all_tag_types(args) {
          return v_tag_types;
        }

        return_list_of_vars(args) {
          return Object.keys(temp_vars);
        }

        return_list_of_tags(args) {
          return Object.keys(tags);
        }

        convert_to_id_with_namespace(args) {
          let new_string = String(args.string).toLowerCase();
          new_string = new_string.replaceAll(' ', '_');
          new_string = new_string.replaceAll('&', 'and');
          new_string = new_string.replaceAll(',', '');
          new_string = new_string.replaceAll('!', '');
          new_string = new_string.replaceAll('?', '');
          new_string = new_string.replaceAll('"', '');
          new_string = new_string.replaceAll("'", '');
          new_string = add_namespace_to_string(new_string);
          return new_string;
        }

        return_namespace(args) {
          return namespace;
        }

        set_namespace(args) {
          if (!namespace_regex.test(String(args.new_namespace))) throw new Error("Invalid namespace!");
          namespace = args.new_namespace;
        }

        merge_jsons(args) {
          try {
            const first = JSON.parse(args.first);
            const second = JSON.parse(args.second);

            return JSON.stringify(Object.assign(first, second));
          } catch {
            return "{}";
          }
        }

        remove_array_from_array(args) {
          try {
            const base = JSON.parse(args.base);
            const remove = JSON.parse(args.remove);
            const new_array = base;
            for (let i in remove) {
              let pos = new_array.indexOf(remove[i]);
              if (!(pos == -1)) {
                new_array.splice(pos, 1);
              }
            }
            return JSON.stringify(new_array);
          } catch {
            return "[]";
          }
        }

        beautify_json(args) {
          try {
            return JSON.stringify(JSON.parse(args.json), null, "\t");
          } catch {
            return "";
          }
        }

        beautify_json_with_menu(args) {
          try {
            let mvalue = String(args.beautify_menu);
            if (mvalue == "2 spaces") return JSON.stringify(JSON.parse(args.json), null, 2);
            if (mvalue == "3 spaces") return JSON.stringify(JSON.parse(args.json), null, 3);
            if (mvalue == "4 spaces") return JSON.stringify(JSON.parse(args.json), null, 4);
            if (mvalue == "tab character") return JSON.stringify(JSON.parse(args.json), null, "\t");
          } catch {
            return "";
          }
          return JSON.stringify(JSON.parse(args.json), null, "\t");
        }

        json_valid_return(json) {
          if (typeof json != "string") {
            return json;
          } else {
            try {
              return JSON.parse(json);
            } catch {
              return json;
            }
          }
        }

        fix_invalid_json_values(value) {
          if (Number.isNaN(value)) return "NaN";
          if (value === Infinity) return "Infinity";
          if (value === -Infinity) return "-Infinity";
          return value;
        }

        set_json({ item, value, json }) {
          try {
            json = JSON.parse(json);
            value = this.json_valid_return(value);
            value = this.fix_invalid_json_values(value);
            json[item] = value;
            return JSON.stringify(json);
          } catch {
            return "{}";
          }
        }

        add_to_json_array({ item, json }) {
          try {
            json = JSON.parse(json);
            item = this.fix_invalid_json_values(this.json_valid_return(item));
            json.push(item);
            return JSON.stringify(json);
          } catch {
            return "[]";
          }
        }

        get_json_key_else_key({ key, json }) {
          try {
            json = JSON.parse(json);
            if (json.hasOwnProperty(key)) return json[key];
            return key;
          } catch {
            return key;
          }
        }

        return_id_with_namespace (args) {
          return add_namespace_to_string(args.string);
        }

        id_has_namespace (args) {
          return args.string.includes(":");
        }

        convert_number_to_locale_string (args) {
          let number = Number(args.number);
          return (number || 0).toLocaleString();
        }

        convert_number_to_locale_string_with_data (args) {
          let number = Number(args.number);
          let lang = String(args.lang);
          if (lang == "") {
            lang = "en-US"
          }
          let localeargs = JSON.parse("{"+args.localeargs+"}");
          return (number || 0).toLocaleString(lang, localeargs);
        }

        get_user_language (args) {
          return navigator.language || navigator.userLanguage;
        }

        open_tolocalestring_docs () {
          Scratch.openWindow("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#checking_for_support_for_locales_and_options_parameters");
        }

        get_namespace_from_id (args) {
          let type = args.type;
          let namespaced_id = String(args.id);
          let split_id = namespaced_id.split(":") || "";
          if(split_id.length == 1) {
            split_id = add_namespace_to_string(namespaced_id).split(":") || "";
          }
          if(split_id > 2) {
            throw new Error("Invalid ID: \"" + string + "\"");
          }
          switch (type) {
            case "namespace":
              return split_id[0];
            case "id":
              return split_id[1];
            default:
              return namespaced_id;
          }
        }

        data_uri_from_image_url (args) {
          return new Promise(resolve => {
            if (window && !window.FileReader) return resolve("");
            if (window && !window.fetch) return resolve("");
            fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(String(args.url))}`).then(r => {
              r.blob().then(blob => {
                const reader = new FileReader();
                reader.onload = e => {
                  resolve(e.target.result);
                };
                reader.readAsDataURL(blob);
              })
              .catch(() => {
                resolve("");
              });
            })
            .catch(() => {
              resolve("");
            });
          });
        }

        is_number_in_range (args) {
          let number = Number(args.number);
          let max = Number(args.max);
          let min = Number(args.min);
          if (number > max) return false;
          if (number < min) return false;
          return true;
        }

        return_max_number (args) {
          return Number.MAX_SAFE_INTEGER;
        }

        return_min_number (args) {
          return Number.MIN_SAFE_INTEGER;
        }

        throw_error_if_false (args) {
          if (!Boolean(args.cond)) throw new Error(String(args.error));
        }

        greater_than_equal (args) {
          return args.one >= args.two;
        }

        less_than_equal (args) {
          return args.one <= args.two;
        }

        return_max_value (args) {
          return Number.MAX_VALUE;
        }

        return_min_value (args) {
          return Number.MIN_VALUE;
        }

        get_dir_extended ({DIR}) {
            const ZIP = Scratch.vm.runtime.ext_cst1229zip;
            if (!ZIP.zip) return "";
            try {
                DIR = Scratch.Cast.toString(DIR);
                if (!DIR.endsWith("/")) DIR += "/";

                const normalized = ZIP.normalize(ZIP.zipPaths[ZIP.zip], DIR);
                if (!ZIP.getObj(normalized) && normalized !== "/") return "";
                const dir = normalized.substring(1);
                const length = dir.length;

                return JSON.stringify(
                    Object.values(ZIP.zips[ZIP.zip].files)
                        .filter((obj) => {
                            if (!obj.name.startsWith(dir)) return false; // Above the current directory
                            if (obj.name.endsWith("/")) return false;
                            if (obj.name === dir) return false; // Is the current directory

                            return true;
                        })
                        .map((obj) => obj.name.substring(length))
                );
            } catch (e) {
                return "";
            }
        }

        join_four (args) {
          return String(args.thing_1) + String(args.thing_2) + String(args.thing_3) + String(args.thing_4);
        }

        join_five (args) {
          return String(args.thing_1) + String(args.thing_2) + String(args.thing_3) + String(args.thing_4) + String(args.thing_5);
        }

        remove_file_extension (args) {
          let splitted_path = String(args.path).split(".");
          splitted_path.splice(splitted_path.length - 1, 1);
          return splitted_path.join(".");
        }

        id_to_translation_key (args) {
          let id = this.return_id_with_namespace(args);
          return id.replace(":",".").replaceAll("/",".");
        }

        id_to_prefixed_translation_key (args) {
          return String(args.prefix) + "." + this.id_to_translation_key(args);
        }

      } // end of blocks code
  
    Scratch.extensions.register(new EmbinUtils());
})(Scratch);
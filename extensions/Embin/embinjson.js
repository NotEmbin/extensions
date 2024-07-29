// Name: Embin's JSON
// ID: embinjson
// Description: JSON blocks
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    const Cast = Scratch.Cast;

    const embin_json_version = 'v1.0.0';
    const default_json = '{"key":"value"}';
    const default_key = 'key';
    const default_value = 'new value';
    const default_array = '["the","flying"]';
    const default_array_value = 'sigma';
    const default_json_multi = '{"key":"value","key2":"value2"}';
    const default_array_2 = '["the","sigma"]';

    const hasOwn = (obj, property) =>
        Object.prototype.hasOwnProperty.call(obj, property);

    const make_label = (text) => ({
        blockType: "label",
        text: text,
    });

    // i STOLE this function from PENGUINMOD i STOLE IT I STOLE IT!!!!!!! i COPIED and PASTED!!!!!
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

    // stole this too
    function validateJSON(json) {
        let valid = false;
        let object = {};
        try {
            if (!json.startsWith('{')) throw new Error('error lol');
            object = JSON.parse(json);
            valid = true;
        } catch {}

        return {
            object: object,
            json: json,
            isValid: valid
        };
    }

    // and this
    function validateArray(array) {
        let valid = false;
        let allay = [];
        try {
            if (!array.startsWith('[')) throw new Error('error lol');
            allay = JSON.parse(array);
            valid = true;
        } catch {}

        return {
            array: allay,
            json: array,
            isValid: valid
        };
    }

    // now this is just getting ridiculous
    function valueToString(value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        } else {
            value = String(value);
        }

        return value;
    }
  
    class EmbinJSON {
        getInfo() {
            let default_args_object = {
                json: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_json
                },
                key: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_key
                },
                value: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_value
                }

            };
            let default_args_array = {
                json: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_array
                },
                item: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_array_value
                }
            };
            let default_args_object_no_value = {
                json: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_json
                },
                key: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_key
                }
            };
            let default_args_array_num = {
                json: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_array
                },
                item: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '2'
                }
            };
            let default_args_array_pos = {
                json: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: default_array_2
                },
                item: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'flying'
                },
                pos: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '2'
                }
            };

            return {
                id: 'embinjson',
                name: "Embin's JSON",
                color1: '#00074a',
                color2: '#01073b',
                color3: '#1a2feb',
                blocks: [
                    {
                        opcode: 'return_version',
                        blockType: Scratch.BlockType.REPORTER,
                        disableMonitor: true,
                        text: '"Embin\'s JSON" version'
                    },
                    '---',
                    {
                        opcode: 'is_json_valid',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is [json] valid JSON?',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_json
                            }
                        }
                    },
                    {
                        opcode: 'is_object_or_array',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is [json] an [type]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_json
                            },
                            type: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'object',
                                menu: 'type_menu'
                            }
                        }
                    },
                    {
                        opcode: 'does_json_contain_key',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'does [json] have key [key]',
                        disableMonitor: true,
                        arguments: default_args_object_no_value
                    },
                    {
                        opcode: 'does_array_contain_value',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'does [array] have value [value]',
                        disableMonitor: true,
                        arguments: {
                            array: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_array
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_array_value
                            }
                        }
                    },
                    {
                        opcode: 'json_equal',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[json1] = [json2]',
                        disableMonitor: true,
                        arguments: {
                            json1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"a":1,"b":2}'
                            },
                            json2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"b":2,"a":1}'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'minify_json',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'minify json [json]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{ "key": "value"   }'
                            }
                        }
                    },
                    {
                        opcode: 'beautify_json',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'beautify json [json] | [beautify]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_json
                            },
                            beautify: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 2,
                                menu: 'beautify_menu'
                            }
                        }
                    },
                    {
                        opcode: 'json_get_all',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all [Stype] in [json]',
                        disableMonitor: true,
                        arguments: {
                            Stype: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keys',
                                menu: 'stypes'
                            },
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_json_multi
                            }
                        }
                    },
                    {
                        opcode: 'json_length',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'length of json/array [json]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_json_multi
                            }
                        }
                    },
                    '---',
                    make_label("objects"),
                    {
                        opcode: 'set_json',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'set [key] in [json] to [value]',
                        disableMonitor: true,
                        arguments: default_args_object
                    },
                    {
                        opcode: 'get_json',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get [key] in [json]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: default_args_object_no_value
                    },
                    {
                        opcode: 'get_json_else_key',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get [key] in [json] else return key',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: default_args_object_no_value
                    },
                    {
                        opcode: 'get_json_path',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get path [VALUE] in [JSON]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: {
                            JSON: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"hey":{"test":"sigma"},"gay":true}'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hey/test'
                            }
                        }
                    },
                    {
                        opcode: 'merge_jsons',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'merge jsons [first] [second]',
                        disableMonitor: true,
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
                        opcode: 'json_delete_key',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'delete [key] in [json]',
                        disableMonitor: true,
                        arguments: default_args_object_no_value
                    },
                    '---',
                    make_label("arrays"),
                    {
                        opcode: 'add_to_json_array',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'add [item] to [json]',
                        disableMonitor: true,
                        arguments: default_args_array
                    },
                    {
                        opcode: 'json_array_get',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'item [item] of [json]',
                        allowDropAnywhere: true,
                        disableMonitor: true,
                        arguments: default_args_array_num
                    },
                    {
                        opcode: 'json_array_item_h',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'item # of [item] in [json]',
                        disableMonitor: true,
                        arguments: default_args_array
                    },
                    {
                        opcode: 'json_array_from_to',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'items [item] to [item2] in [json]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[1,2,3,4,5]'
                            },
                            item: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '2'
                            },
                            item2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '4'
                            }
                        }
                    },
                    {
                        opcode: 'json_array_set',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'replace item [pos] of [json] with [item]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: default_array
                            },
                            item: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'sigma'
                            },
                            pos: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '2'
                            }
                        }
                    },
                    {
                        opcode: 'json_array_insert',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'insert [item] at [pos] of [json]',
                        disableMonitor: true,
                        arguments: default_args_array_pos
                    },
                    {
                        opcode: 'json_array_delete',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'delete item [item] of [json]',
                        disableMonitor: true,
                        arguments: default_args_array_num
                    },
                    {
                        opcode: 'json_array_remove_all',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'delete all [item] in [json]',
                        disableMonitor: true,
                        arguments: default_args_array
                    },
                    {
                        opcode: 'remove_array_from_array',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'remove array [remove] from [base]',
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
                    '---',
                    {
                        opcode: 'json_array_reverse',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'reverse array [json]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["a","b","c","d"]'
                            }
                        }
                    },
                    {
                        opcode: 'json_array_concat',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'concat arrays [json] [json2]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["a","b"]'
                            },
                            json2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["c","d"]'
                            }
                        }
                    },
                    {
                        opcode: 'json_array_flat',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'flatten [json] by [depth]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[[1],2,[3,4],[5,[6]]]'
                            },
                            depth: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    },
                    {
                        opcode: 'json_array_setlen',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'set length of [json] to [len]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["a","b","c","d"]'
                            },
                            len: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    },
                    '---',
                    make_label("other"),
                    {
                        opcode: 'json_array_filter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get all values with key [key] in [json]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[{"id":12},{"id":24}]'
                            },
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'id'
                            }
                        }
                    },
                    {
                        opcode: 'json_array_from',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'array from text [json]',
                        disableMonitor: true,
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            }
                        }
                    },
                    {
                        opcode: 'json_array_create',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'create array from [text] with delimiter [d]',
                        disableMonitor: true,
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'flying,sigma'
                            },
                            d: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ','
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'get_list_as_json',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get list [list] as array',
                        disableMonitor: true,
                        arguments: {
                            list: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'select a list',
                                menu: 'lists'
                            }
                        }
                    },
                    {
                        opcode: 'set_list_from_json',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set list [list] to [json]',
                        arguments: {
                            list: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'select a list',
                                menu: 'lists'
                            },
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["a","b","c","d"]'
                            }
                        }
                    },
                ],
                menus: {
                    type_menu: {
                        acceptReporters: true,
                        items: ['object','array']
                    },
                    beautify_menu: {
                        acceptReporters: true,
                        items: [
                            {
                                text: '2 spaces',
                                value: 2
                            },
                            {
                                text: '3 spaces',
                                value: 3
                            },
                            {
                                text: '4 spaces',
                                value: 4
                            },
                            {
                                text: 'tab character',
                                value: '\t'
                            }
                        ]
                    },
                    lists: {
                        acceptReporters: true,
                        items: 'get_lists'
                    },
                    stypes: {
                        acceptReporters: true,
                        items: [
                            'keys',
                            'values',
                            'datas'
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

        return_version (args) {
            return embin_json_version;
        }

        json_valid_return (json) {
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

        fix_invalid_json_values (value) {
            if (Number.isNaN(value)) return "NaN";
            if (value === Infinity) return "Infinity";
            if (value === -Infinity) return "-Infinity";
            return value;
        }

        beautify_json (args) {
            let beautify = args.beautify;
            if (String(Number(beautify)) === beautify) {
                beautify = Number(beautify);
            }
            try {
                return JSON.stringify(JSON.parse(args.json), null, beautify);
            } catch {
                return "";
            }
        }

        is_json_valid (args) {
            try {
                JSON.parse(args.json);
                return true;
            } catch {
                return false;
            }
        }

        minify_json (args) {
            try {
                return JSON.stringify(JSON.parse(args.json));
            } catch {
                return "";
            }
        }

        json_equal ({ json1, json2 }) {
            try {
                json1 = JSON.parse(json1);
                json2 = JSON.parse(json2);
                const keys1 = Object.keys(json1);
                const keys2 = Object.keys(json2);
                const result =
                    keys1.length === keys2.length &&
                    Object.keys(json1).every((key) => json1[key] === json2[key]);
                return result;
            } catch {
                // ignore
            }
            return false;
        }

        does_json_contain_key (args) {
            try {
                return (
                    this.fix_invalid_json_values(this.json_valid_return(args.key)) in
                    JSON.parse(args.json)
                );
            } catch {
                return false;
            }
        }

        does_array_contain_value ({ array, value }) {
            try {
                array = JSON.parse(array);
                value = this.json_valid_return(value);
                return array.includes(value);
            } catch {
                return false;
            }
        }

        json_is_valid({ json }) {
            if (typeof json != "string") {
                return false;
            } else {
                try {
                    JSON.parse(json);
                    return true;
                } catch {
                    return false;
                }
            }
        }

        is_object_or_array ({ json, type }) {
            //if (!this.json_is_valid({ json: json })) return false;
            try {
                json = JSON.parse(json);
                if (json == null) return false;
                if (json == true) return false;
                if (json == false) return false;
                switch (type) {
                    case "object":
                        return !Array.isArray(json);
                    case "array":
                        return Array.isArray(json);
                    default:
                        return false;
                }
            } catch {
                return false;
            }
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

        json_get_all({ Stype, json }) {
            try {
                json = JSON.parse(json);
                switch (Stype) {
                    case "keys":
                        return JSON.stringify(Object.keys(json).map((key) => key));
                    case "values":
                        return JSON.stringify(Object.keys(json).map((key) => json[key]));
                    case "datas":
                        return JSON.stringify(Object.keys(json).map((key) => [key, json[key]]));
                    default:
                        return "[]";
                }
            } catch {
                return "[]";
            }
        }

        set_json({ json, key, value }) {
            try {
                json = JSON.parse(json);
                value = this.json_valid_return(value);
                value = this.fix_invalid_json_values(value);
                json[key] = value;
                return JSON.stringify(json);
            } catch {
                return "{}";
            }
        }

        get_json({ json, key }) {
            try {
                json = JSON.parse(json);
                if (json.hasOwnProperty(key)) return json[key];
                return "";
            } catch {
                return "";
            }
        }

        get_json_else_key({ json, key }) {
            try {
                json = JSON.parse(json);
                if (json.hasOwnProperty(key)) return json[key];
                return key;
            } catch {
                return key;
            }
        }

        json_length ({json}) {
            try {
                json = JSON.parse(json);
                return Object.keys(json).length;
            } catch {
                return 0;
            }
        }

        json_delete_key ({json, key}) {
            try {
                json = JSON.parse(json);
                delete json[key];
                return JSON.stringify(json);
            } catch {
                return "{}";
            }
        }

        add_to_json_array ({ item, json }) {
            try {
                json = JSON.parse(json);
                item = this.fix_invalid_json_values(this.json_valid_return(item));
                json.push(item);
                return JSON.stringify(json);
            } catch {
                return "[]";
            }
        }

        json_array_get ({ item, json }) {
            // 1...length : array content, -1...-length : reverse array content, 0 : ERROR
            try {
                item = Scratch.Cast.toNumber(item);
                if (item == 0) return "";
                if (item > 0) {
                    item--;
                }
                json = JSON.parse(json);
                let result;
                if (item >= 0) {
                    result = json[item];
                } else {
                    result = json[json.length + item];
                }
                if (typeof result == "object") {
                    return JSON.stringify(result);
                } else {
                    return result;
                }
            } catch {
                return "";
            }
        }

        json_array_set({ item, pos, json }) {
            try {
                json = JSON.parse(json);
                json[pos - 1] = this.fix_invalid_json_values(this.json_valid_return(item));
                return JSON.stringify(json);
            } catch {
                return "[]";
            }
        }

        json_array_insert({ item, pos, json }) {
            try {
                json = JSON.parse(json);
                item = this.fix_invalid_json_values(this.json_valid_return(item));
                json.splice(pos - 1, 0, item);
                return JSON.stringify(json);
            } catch {
                return "[]";
            }
        }

        json_array_delete({ item, json }) {
            try {
                json = JSON.parse(json);
                json.splice(item - 1, 1);
                return JSON.stringify(json);
            } catch {
                return "[]";
            }
        }

        json_array_remove_all({ item, json }) {
            try {
                json = JSON.parse(json);
                item = this.fix_invalid_json_values(this.json_valid_return(item));
                let i = 0;
                while (i < json.length) {
                    if (json[i] === item) {
                        json.splice(i, 1);
                    } else {
                        ++i;
                    }
                }
                return JSON.stringify(json);
            } catch {
                return "[]";
            }
        }

        json_array_item_h({ item, json }) {
            try {
                json = JSON.parse(json);
                item = this.fix_invalid_json_values(this.json_valid_return(item));
                let result = JSON.stringify(json.indexOf(item) + 1);
                return result;
            } catch {
                return 0;
            }
        }

        json_array_from_to({ json, item, item2 }) {
            try {
                return JSON.stringify(JSON.parse(json).slice(item - 1, item2));
            } catch {
                return "[]";
            }
        }

        // just copying and pasting this out of laziness
        // could def get this working but i cant be asked
        getValueFromJSON (args) {
            const key = args.VALUE;
            const json = validateJSON(args.JSON).object;
    
            return valueToString(json[key]);
        }

        get_json_path (args) {
            const tree = Cast.toString(args.VALUE);
            let _json;
            if (Cast.toString(args.JSON).startsWith('[')) {
                _json = validateArray(args.JSON).array;
            } else {
                _json = validateJSON(args.JSON).object;
            }
            const json = _json;
    
            if (!tree.includes('/')) {
                // if we dont have a slash, treat it like
                // the get value block
                if (Array.isArray(json)) {
                    return this.json_array_get({
                        array: Cast.toString(args.JSON),
                        index: Cast.toNumber(args.VALUE)
                    });
                }
                return this.getValueFromJSON(args);
            }
    
            let value = '';
            let currentObject = json;
            const treeSplit = tree.split('/');
            for (const key of treeSplit) {
                value = '';
                // check for array so we can do "object/array/3/value"
                if (Array.isArray(currentObject)) {
                    currentObject = currentObject[Cast.toNumber(key) - 1];
                    value = currentObject;
                    continue;
                }
    
                if (typeof currentObject === 'object') {
                    currentObject = currentObject[key];
                    value = currentObject;
                } else {
                    value = currentObject;
                }
            }
    
            if (typeof value === "undefined") return '';
    
            return valueToString(value);
        }

        json_array_from ({ json }) {
            try {
                return JSON.stringify(Array.from(String(json)));
            } catch {
                return "[]";
            }
        }

        json_array_concat({ json, json2 }) {
            try {
                json = JSON.parse(json);
                json2 = JSON.parse(json2);
                return JSON.stringify(json.concat(json2));
            } catch {
                return "[]";
            }
        }

        json_array_flat({ json, depth }) {
            try {
                return JSON.stringify(JSON.parse(json).flat(depth));
            } catch {
                return "[]";
            }
        }

        json_array_reverse({ json }) {
            try {
                return JSON.stringify(JSON.parse(json).reverse());
            } catch {
                return "[]";
            }
        }

        json_array_setlen({ json, len }) {
            try {
                json = JSON.parse(json);
                json.length = len;
                return JSON.stringify(json);
            } catch {
                return "[]";
            }
        }

        json_array_create({ text, d }) {
            return JSON.stringify(String(text).split(d));
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

        json_array_filter({ key, json }) {
            try {
                json = JSON.parse(json);
                return JSON.stringify(
                    json.map((x) => {
                        if (hasOwn(x, key)) {
                            return x[key];
                        }
                    return null;
                    })
                );
            } catch (e) {
                return "[]";
            }
        }

        set_list_from_json({ list, json }, util) {
            try {
                let listVariable = this.lookup_list(list, util);
                if (listVariable) {
                    const array = JSON.parse(json);
                    if (Array.isArray(array)) {
                        const safeArray = array.map((i) => {
                            if (typeof i === "object") return JSON.stringify(i);
                            return i;
                        });
                        listVariable.value = safeArray;
                    }
                }
            } catch (e) {
                // ignore
            }
            return "";
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

    } // end of blocks code
    Scratch.extensions.register(new EmbinJSON());
})(Scratch);
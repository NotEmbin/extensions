// Name: Translation Utils
// ID: embintranslation
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('"Translation Utils" must run unsandboxed');
    }

    const embin_translation_utils_version = 'v1.0.0';
    let translations = {};
  
    class EmbinTranslation {
        getInfo() {
            return {
                id: 'embintranslation',
                name: "Translation Utils",
                color3: "#00f4ff",
                color1: "#00565b",
                color2: "#00494d",
                blocks: [
                    {
                        opcode: 'get_user_language',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'user language code',
                        disableMonitor: false
                    },
                    '---',
                    {
                        opcode: 'get_translation_json',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get translations as json',
                        disableMonitor: true
                    },
                    {
                        opcode: 'set_translation_json',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set translations to json [json]',
                        arguments: {
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"block.stone":"Stone","block.air":"Air %s dud"}'
                            }
                        }
                    },
                    {
                        opcode: 'clear_translations',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear all translations'
                    },
                    '---',
                    {
                        opcode: 'get_translation',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get translation [translation_key]',
                        disableMonitor: true,
                        arguments: {
                            translation_key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'block.stone'
                            }
                        }
                    },
                    {
                        opcode: 'get_translation_with_data',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get translation [translation_key] with data [data]',
                        disableMonitor: true,
                        arguments: {
                            translation_key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'block.air'
                            },
                            data: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'soap'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'add_translation',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'add translation key [key] with value [value]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'block.stone'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Stone'
                            }
                        }
                    },
                    {
                        opcode: 'remove_translation',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'remove translation key [key]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'block.stone'
                            }
                        }
                    },
                ]
            };
        }

        return_version (args) {
            return embin_translation_utils_version;
        }

        get_user_language (args) {
            return navigator.language || navigator.userLanguage;
        }

        get_translation (args) {
            let key = String(args.translation_key);
            if (Object.keys(translations).includes(key)) return String(translations[key]);
            if (Object.keys(translations).includes("missingtranslation")) return this.get_translation_with_data({translation_key: "missingtranslation", data: key});
            return key;
        }

        get_translation_with_data (args) {
            let string = this.get_translation(args);
            let datas;
            let is_data_string = false;
            try {
                datas = JSON.parse(args.data);
                if (!Array.isArray(datas)) throw new Error("not array");
            } catch {
                datas = String(args.data);
                is_data_string = true;
            }
            if (is_data_string) {
                //if (datas === "") return string;
                if (string.includes("%1$s")) return string.replaceAll("%1$s", datas);
                return string.replaceAll("%s", datas);
            } else {
                let mutated_string = string;
                for (let i = 0; i < datas.length; i++) {
                    let indexed_replace_key = "%" + String(i + 1) + "$s";
                    let thing = datas[i];
                    if (mutated_string.includes(indexed_replace_key)) {
                        mutated_string = mutated_string.replaceAll(indexed_replace_key, String(thing));
                    } else {
                        mutated_string = mutated_string.replace("%s", String(thing));
                    }
                }
                return mutated_string;
            }
        }

        get_translation_json (args) {
            return JSON.stringify(translations);
        }

        add_translation (args) {
            translations[String(args.key)] = String(args.value);
        }

        set_translation_json (args) {
            let new_json = JSON.parse(args.json);
            if (!Array.isArray(new_json)) translations = new_json;
        }

        serialize () {
            return { embintranslation: translations };
        }

        deserialize (data) {
            translations = data.embintranslation || {};
        }

        remove_translation (args) {
            delete translations[String(args.key)];
        }

        clear_translations (args) {
            translations = {};
        }

    } // end of blocks code
    Scratch.extensions.register(new EmbinTranslation());
})(Scratch);
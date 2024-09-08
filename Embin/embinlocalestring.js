// Name: Number Formatting
// ID: embinlocalestring
// Description: Formats numbers
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    const embin_number_formatting_version = 'v1.0.0';
  
    class EmbinLocaleString {
        getInfo() {
            return {
                id: 'embinlocalestring',
                name: "Number Formatting",
                docsURI: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#checking_for_support_for_locales_and_options_parameters",
                blocks: [
                    {
                        opcode: 'get_user_language',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'user language code',
                        disableMonitor: false
                    },
                    {
                        opcode: 'to_locale_string',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number [number] to locale string',
                        disableMonitor: true,
                        arguments: {
                            number: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '32767'
                            }
                        }
                    },
                    {
                        opcode: 'to_locale_string_with_data',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number [number] to locale string with lang [lang] and args [lsargs]',
                        disableMonitor: true,
                        arguments: {
                            number: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '32767.123'
                            },
                            lang: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'en-US'
                            },
                            lsargs: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '"maximumSignificantDigits":7'
                            }
                        }
                    }
                ]
            };
        }

        return_version (args) {
            return embin_number_formatting_version;
        }

        get_user_language (args) {
            return navigator.language || navigator.userLanguage;
        }

        to_locale_string (args) {
            let number = Number(args.number);
            return (number || 0).toLocaleString();
        }

        to_locale_string_with_data (args) {
            let number = Number(args.number);
            let lang = String(args.lang);
            if (lang == "") {
                lang = "en-US"
            }
            let lsargs = JSON.parse("{"+args.lsargs+"}");
            return (number || 0).toLocaleString(lang, lsargs);
        }

    } // end of blocks code
    Scratch.extensions.register(new EmbinLocaleString());
})(Scratch);
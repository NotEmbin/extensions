// Name: Namespaced Identifiers
// ID: embinidentifiers
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('"Namespaced Identifiers" must be ran unsandboxed');
    }

    const embin_identifiers_version = 'v1.0.0';
    const Cast = Scratch.Cast;

    let default_namespace = "project_name";

    class Identifier {
        customId = "embinidentifier";

        static PATH_REGEX = new RegExp("^[a-z0-9_./-]+$");
        static NAMESPACE_REGEX = new RegExp("^[a-z0-9_.-]+$");
        static IDENTIFIER_REGEX = new RegExp("^[a-z0-9:_./-]+$");

        namespace = "";
        path = "";

        /**
        * @param {string} n Namespace
        * @param {string} p Path
        * @returns {Identifier}
        */
        constructor(n, p) {
            this.namespace = n;
            this.path = p;
            if (!Identifier.NAMESPACE_REGEX.test(n)) throw new Error(Identifier.getInvalidNamespaceError(n));
            if (!Identifier.PATH_REGEX.test(p)) throw new Error(Identifier.getInvalidPathError(p));
        }

        toString() {
            return this.namespace + ":" + this.path;
        }

        toReporterContent() {
            let content = document.createElement("identifier");
            content.style.color = "#077777";
            content.textContent = this.toString();
            return content;
        }

        toMonitorContent() {
            let content = document.createElement("identifier");
            content.style.color = "#dddddd";
            content.textContent = this.toString();
            return content;
        }

        static fromArg(id) {
            if (id === null || id === undefined) return new Identifier("undefined", "undefined");
            return new Identifier(id.namespace, id.path);
        }

        jwArrayHandler() {
            return `Identifier<${this.toString()}>`;
        }

        dogeiscutObjectHandler() {
            return "\""+ this.toString() + "\"";
        }

        getNamespace() {
            return this.namespace;
        }

        getPath() {
            return this.path;
        }

        /**
        * @param {Identifier} id1 First Identifier
        * @param {Identifier} id2 Second Identifier
        * @returns {boolean}
        */
        static equals(id1, id2) {
            const namespaceCheck = id1.getNamespace() == id2.getNamespace();
            const pathCheck = id1.getPath() == id2.getPath();
            return namespaceCheck && pathCheck;
        }

        /**
        * @param {Identifier} v Identifier
        * @returns {string}
        */
        static serialize(v) {
            return v.toString();
        }

        /**
        * @param {string} v Identifier string
        * @returns {Identifier}
        */
        static deserialize(v) {
            if (v.split(":").length > 2) throw new Error(`Invalid identifier "${v}", cannot have more than 1 colon`)
            if (!v.includes(":")) {
                if (!Identifier.PATH_REGEX.test(v)) throw new Error(Identifier.getInvalidPathError(v));
                return new Identifier(default_namespace, v)
            } else {
                const namespace = v.split(":").at(0);
                const path = v.split(":").at(1);
                if (!Identifier.NAMESPACE_REGEX.test(namespace)) throw new Error(Identifier.getInvalidNamespaceError(namespace));
                if (!Identifier.PATH_REGEX.test(path)) throw new Error(Identifier.getInvalidPathError(path));
                return new Identifier(namespace, path);
            }
        }

        static getInvalidNamespaceError(n) {
            return `Invalid characters in namespace "${n}", must only have [a-z0-9_.-] characters`;
        }

        static getInvalidPathError(p) {
            return `Invalid characters in path "${p}", must only have [a-z0-9/._-] characters`;
        }
    }

    const embinIdentifier = {
        Type: Identifier,
        Block: {
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.LEAF,
            forceOutputType: "embin_identifier",
            disableMonitor: true
        },
        Argument: {
            shape: Scratch.BlockShape.LEAF,
            check: ["embin_identifier"]
        }
    }
  
    class EmbinIdentifiers {
        constructor() {
            vm.embinIdentifier = embinIdentifier;
            vm.runtime.registerSerializer(
                "embinidentifier",
                v => Identifier.serialize(v),
                v => Identifier.deserialize(v),
            );
        }
        getInfo() {
            return {
                id: "embinidentifiers",
                name: "Namespaced Identifiers",
                color1: '#4A4000',
                color2: '#6B5E00',
                color3: '#FFD500',
                blocks: [
                    {
                        opcode: 'return_version',
                        blockType: Scratch.BlockType.REPORTER,
                        disableMonitor: true,
                        text: '"Namespaced Identifiers" extension version'
                    },
                    '---',
                    {
                        opcode: 'get_default_namespace',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'default namespace',
                        disableMonitor: false
                    },
                    {
                        opcode: 'set_default_namespace',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set default namespace to [namespace]',
                        arguments: {
                            namespace: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'project_name'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'get_id',
                        text: 'id of [path]',
                        arguments: {
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path_to_asset'
                            }
                        },
                        ...embinIdentifier.Block
                    },
                    {
                        opcode: 'get_vanilla',
                        text: 'id of vanilla [path]',
                        arguments: {
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path_to_asset'
                            }
                        },
                        ...embinIdentifier.Block
                    },
                    {
                        opcode: 'get_id_full',
                        text: 'id of [namespace] [path]',
                        arguments: {
                            namespace: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'namespace'
                            },
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'path'
                            }
                        },
                        ...embinIdentifier.Block
                    },
                    '---',
                    {
                        opcode: 'id_prefixed',
                        text: '[id] prefix with [prefix]',
                        arguments: {
                            id: embinIdentifier.Argument,
                            prefix: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'texture/'
                            }
                        },
                        ...embinIdentifier.Block
                    },
                    {
                        opcode: 'id_suffixed',
                        text: '[id] suffix with [suffix]',
                        arguments: {
                            id: embinIdentifier.Argument,
                            suffix: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '/1'
                            }
                        },
                        ...embinIdentifier.Block
                    },
                    '---',
                    {
                        opcode: 'get_element_of_id',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get [element] of [id]',
                        disableMonitor: true,
                        arguments: {
                            element: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'namespace',
                                menu: 'id_elements'
                            },
                            id: embinIdentifier.Argument
                        }
                    },
                    {
                        opcode: 'to_translation_key',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[id] to key',
                        disableMonitor: true,
                        arguments: {
                            id: embinIdentifier.Argument
                        }
                    },
                    {
                        opcode: 'prefixed_translation_key',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[id] to key with prefix [prefix]',
                        disableMonitor: true,
                        arguments: {
                            prefix: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'type'
                            },
                            id: embinIdentifier.Argument
                        }
                    },
                    '---',
                    {
                        opcode: 'id_equals',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[id1] = [id2]',
                        disableMonitor: true,
                        arguments: {
                            id1: embinIdentifier.Argument,
                            id2: embinIdentifier.Argument
                        }
                    },
                    {
                        opcode: 'is_vanilla',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is [id] vanilla',
                        disableMonitor: true,
                        arguments: {
                            id: embinIdentifier.Argument
                        }
                    },
                    {
                        opcode: 'is_string_valid',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is string [id] a valid id',
                        disableMonitor: true,
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'fw:mic_toss'
                            }
                        }
                    }
                ],
                menus: {
                    id_elements: {
                        acceptReporters: true,
                        items: [
                            "namespace",
                            "path"
                        ]
                    }
                }
            };
        }

        return_version (args) {
            return embin_identifiers_version;
        }

        get_default_namespace (args) {
            return default_namespace;
        }

        set_default_namespace (args) {
            if (!Identifier.NAMESPACE_REGEX.test(args.namespace)) throw new Error(Identifier.getInvalidNamespaceError(args.namespace));
            default_namespace = Cast.toString(args.namespace);
        }

        get_vanilla (args) {
            const casted_path = Cast.toString(args.path);
            if (!Identifier.PATH_REGEX.test(casted_path)) throw new Error(Identifier.getInvalidPathError(casted_path));
            return new Identifier(Cast.toString(default_namespace), casted_path);
        }

        get_id (args) {
            return Identifier.deserialize(Cast.toString(args.path));
        }

        get_element_of_id (args) {
            if (args.id == null) return "";
            switch(Cast.toString(args.element)) {
                case "namespace":
                    return Identifier.fromArg(args.id).getNamespace();
                case "path":
                    return Identifier.fromArg(args.id).getPath();
                default:
                    return "";
            }
        }

        is_vanilla(args) {
            if (args.id == null) return false;
            return Identifier.fromArg(args.id).getNamespace() == Cast.toString(default_namespace);
        }

        get_id_full (args) {
            return new Identifier(Cast.toString(args.namespace), Cast.toString(args.path));
        }

        to_translation_key(args) {
            const id = Identifier.fromArg(args.id);
            const path = id.getPath().replaceAll("/", ".");
            return id.getNamespace() + "." + path;
        }

        prefixed_translation_key(args) {
            const id = this.to_translation_key(args);
            return Cast.toString(args.prefix) + "." + id;
        }

        id_prefixed(args) {
            const id = Identifier.fromArg(args.id);
            return new Identifier(id.getNamespace(), Cast.toString(args.prefix) + id.getPath());
        }

        id_suffixed(args) {
            const id = Identifier.fromArg(args.id);
            return new Identifier(id.getNamespace(), id.getPath() + Cast.toString(args.suffix));
        }

        id_equals(args) {
            const id1 = Identifier.fromArg(args.id1);
            const id2 = Identifier.fromArg(args.id2);
            return Identifier.equals(id1, id2);
        }

        is_string_valid(args) {
            try {
                Identifier.deserialize(Cast.toString(args.id));
                return true;
            } catch {
                return false;
            }
        }

    } // end of blocks code
    Scratch.extensions.register(new EmbinIdentifiers());
})(Scratch);
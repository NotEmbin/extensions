// Name: Registry
// ID: embinregistry
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('Zip Utils must be ran unsandboxed');
    }

    if (!Scratch.vm.runtime.extensionManager.isExtensionLoaded("embinidentifiers")) {
        alert('"Namespaced Identifiers" extension is required first!');
        throw new Error('"Namespaced Identifiers" extension is required first!');
    }

    if (!Scratch.vm.runtime.extensionManager.isExtensionLoaded("dogeiscutObject")) {
        alert('"Objects" extension is required first!');
        throw new Error('"Objects" extension is required first!');
    }

    const embin_registry_version = 'v1.0.0-beta.1';
    const embinId = Scratch.vm.embinIdentifier;
    const jwArray = Scratch.vm.jwArray;
    const dogeiscutObject = Scratch.vm.dogeiscutObject;
    const Cast = Scratch.Cast;

    let registries = {};
    let contents = new dogeiscutObject.Type();

    class Registry {
        customId = "embinregistry";
        registryId;

        /**
        * @param {embinId.Type} id Identifier string
        * @returns {Registry}
        */
        constructor(id) {
            this.registryId = id;
            contents.object[id.toString()] = new dogeiscutObject.Type();
            registries[id.toString()] = this;
        }

        /**
        * @param {Registry} registry Registry to register object to
        * @param {embinId.Type} id Identifier of object
        * @param {dogeiscutObject.Type} object Object to register
        */
        static register(registry, id, object) {
            let stringId = id.toString();
            contents.object[registry.getRegistryIdAsString()].object[stringId] = object;
            return object;
        }

        getKeys() {
            const badKeys = Object.keys(contents.object[this.getRegistryIdAsString()].object);
            let karray = new jwArray.Type();
            for (let i = 0; i < badKeys.length; i++) {
                karray.array.push(embinId.Type.deserialize(badKeys[i]));
            }
            return karray;
        }

        getRegistryId() {
            return this.registryId;
        }

        jwArrayHandler() {
            return `Registry<${Object.keys(contents.object[this.getRegistryIdAsString()].object).length}>`;
        }

        getRegistryIdAsString() {
            return this.registryId.toString();
        }

        toString() {
            return `${this.getRegistryIdAsString()}<${Object.keys(contents.object[this.getRegistryIdAsString()].object).length}>`;
        }

        getContents() {
            return contents.object[this.getRegistryIdAsString()];
        }


        /**
        * @param {embinId.Type} id Identifier of object
        * @returns {dogeiscutObject.Type} Object returned
        */
        getObject(id) {
            return contents.object[this.getRegistryIdAsString()].object[id.toString()];
        }

        toReporterContent() {
            let content = document.createElement("registry");
            content.style.color = "#770777";
            content.textContent = this.toString();
            return content;
        }

        static fromArg(reg) {
            if (Object.hasOwn(registries, reg.id)) return registries[reg.id];
            return undefined;
        }
    }

    const embinRegistry = {
        Type: Registry,
        Block: {
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.OCTAGONAL,
            forceOutputType: "embin_registry",
            disableMonitor: true
        },
        Argument: {
            shape: Scratch.BlockShape.OCTAGONAL,
            check: ["embin_registry"]
        }
    }
  
    class EmbinRegistry {
        constructor() {
            vm.embinRegistry = embinRegistry;
            vm.runtime.registerSerializer(
                "embinregistry",
                v => v.getRegistryIdAsString(),
                v => new Registry(embinId.Type.deserialize(v)),
            );

            if (!vm.jwArray) vm.extensionManager.loadExtensionIdSync('jwArray');
        }
        getInfo() {
            return {
                id: 'embinregistry',
                name: "Registry",
                blocks: [
                    {
                        opcode: 'return_version',
                        blockType: Scratch.BlockType.REPORTER,
                        disableMonitor: true,
                        text: '"Registry" extension version'
                    },
                    '---',
                    {
                        opcode: 'create_registry',
                        text: 'create registry with id [id]',
                        arguments: {
                            id: embinId.Argument
                        },
                        ...embinRegistry.Block
                    },
                    {
                        opcode: 'register_object',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'register [object] to [registry] as [id]',
                        disableMonitor: true,
                        arguments: {
                            object: dogeiscutObject.Argument,
                            registry: embinRegistry.Argument,
                            id: embinId.Argument
                        }
                    },
                    {
                        opcode: 'get_object',
                        text: 'get [id] from [registry]',
                        arguments: {
                            registry: embinRegistry.Argument,
                            id: embinId.Argument
                        },
                        ...dogeiscutObject.Block
                    },
                    {
                        opcode: 'contents_of_registry',
                        text: 'contents of [registry]',
                        arguments: {
                            registry: embinRegistry.Argument
                        },
                        ...dogeiscutObject.Block
                    },
                    {
                        opcode: 'keys_of_registry',
                        text: 'keys of [registry]',
                        arguments: {
                            registry: embinRegistry.Argument
                        },
                        ...jwArray.Block
                    }
                ]
            };
        }

        return_version (args) {
            return embin_registry_version;
        }

        create_registry(args) {
            if (Object.hasOwn(registries, args.id)) return registries[embinId.Type.fromArg(args.id).toString()];
            return new Registry(embinId.Type.fromArg(args.id));
        }

        contents_of_registry(args) {
            return args.registry.getContents();
        }

        keys_of_registry(args) {
            return args.registry.getKeys();
        }

        register_object(args) {
            Registry.register(args.registry, args.id, args.object);
        }

        get_object(args) {
            return args.registry.getObject(args.id);
        }

    } // end of blocks code
    Scratch.extensions.register(new EmbinRegistry());
})(Scratch);
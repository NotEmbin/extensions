// Name: Zip Utils
// ID: embinziputils
// Description: Extra utilities for the Zip extension
// By: Embin <https://scratch.mit.edu/users/Embin/>

(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
      throw new Error('Zip Utils must be ran unsandboxed');
    }
    if (!Scratch.vm.extensionManager.isExtensionLoaded("cst1229zip")) {
        Scratch.vm.runtime.extensionManager.loadExtensionURL("https://extensions.turbowarp.org/CST1229/zip.js");
    }

    const embin_zip_utils_version = 'v1.0.0';
    var ZIP = Scratch.vm.runtime.ext_cst1229zip;

    Scratch.vm.runtime.on("EXTENSION_ADDED", () => {
        ZIP = Scratch.vm.runtime.ext_cst1229zip;
    });
  
    class EmbinZipUtils {
        getInfo() {
            return {
                id: 'embinziputils',
                name: "Zip Utils",
                blocks: [
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
                    }
                ]
            };
        }

        return_version (args) {
            return embin_zip_utils_version;
        }

        get_dir_extended ({DIR}) {
            if (ZIP == undefined) ZIP = Scratch.vm.runtime.ext_cst1229zip;
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
                //console.error(`Zip extension: Could not get directory ${DIR}:`, e);
                return "";
            }
        }

    } // end of blocks code
    Scratch.extensions.register(new EmbinZipUtils());
})(Scratch);
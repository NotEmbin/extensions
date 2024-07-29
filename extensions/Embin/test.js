const vm = Scratch.vm;

function add_namespace_to_string(string) {
    if (!(string.includes(":"))) return ("_script:" + string);
    return string;
}

function set_var(variable, data) {
    let var_name = add_namespace_to_string(String(variable));
    vm.runtime.ext_embinutils.set_var({"name":var_name,"value":data});
}

function get_var(variable) {
    return vm.runtime.ext_embinutils.get_var({"name":add_namespace_to_string(String(variable))});
}
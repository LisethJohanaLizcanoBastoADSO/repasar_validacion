const SoloNumeros = function(event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
    }
};

export default SoloNumeros;

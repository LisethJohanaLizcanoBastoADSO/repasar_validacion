const SoloLetras = (event, elemento) => {
    let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (letras.test(event.key)) {
        console.log("Sí");
    } else {
        console.log("No");
        event.preventDefault(); // Previene que caracteres no permitidos sean ingresados
    }
};

export default SoloLetras;





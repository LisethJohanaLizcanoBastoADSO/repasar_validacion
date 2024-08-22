// Función que agrega o quita la clase correcto dependiendo de si el campo tiene un valor
const remover = (input) => {
    if (input.value !== "") {
        input.classList.add("correcto"); // Añade la clase correcto
        input.classList.remove("error"); // Quita la clase error
        
    } else {
        input.classList.remove("correcto");
        input.classList.add("error");
    }
};

export default remover;

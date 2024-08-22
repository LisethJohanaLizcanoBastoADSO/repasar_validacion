import  isEmail  from "./module.js";

const is_valid = (event, form) => {
  event.preventDefault(); // Evita el envío automático del formulario
  const elementos = document.querySelectorAll(form);
  let todosLlenos = true;

  elementos.forEach(elemento => {
    if (elemento.type === "email") {
      // Validar el campo de correo electrónico
      isEmail(event, elemento);
      
      // Comprobar si el campo tiene la clase 'error'
      if (elemento.classList.contains("error")) {
        todosLlenos = false; // Marca el formulario como no válido
      } else {
        elemento.classList.add("correcto"); // Añade la clase 'correcto' si el correo es válido
      }
    } else {
      // Validación general para otros campos de entrada
      if (elemento.value.trim() === "") {
        elemento.classList.add("error");
        todosLlenos = false;
      } else {
        elemento.classList.remove("error");
        elemento.classList.add("correcto");
      }
    }
  });

  if (todosLlenos) {
    alert("Correcto, todos los campos están llenos y validados");
  } else {
    alert("Incorrecto, algunos campos están vacíos o no son válidos");
  }

  return todosLlenos;
};

export default is_valid;

// Nota: Asegúrate de definir la función 'correoelectronico' en otro lugar del código.
// La función 'correoelectronico' debe manejar la validación específica del campo de correo electrónico.

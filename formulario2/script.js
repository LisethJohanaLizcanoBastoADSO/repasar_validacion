import SoloLetras from "../Crud/module3.js";
import is_valid from "../Crud/isvalid.js";
import remover from "../Crud/remover.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const boton = document.querySelector("#boton");


// Validación del nombre 
nombre.addEventListener("keypress", (event) => {
  SoloLetras(event, nombre);
});

$formulario.addEventListener("submit", (event) => {
  let response = is_valid(event, "form [required]");
  const data = {
    nombre: nombre.value,
  }
  if (response) {
    boton.setAttribute("disabled", "");

    fetch('http://localhost:3000/documentos', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
    })
      
    .then((response) => response.json())
    .then((json) => {
      nombre.value = "";
      nombre.classList.remove("correcto");
      boton.removeAttribute("disabled");
    })
  }
});

// Se añade un listener para el evento keyup en cada uno de los campos. Cuando se suelta una tecla, se llama a la función remover para verificar el estado del campo.
[nombre].forEach(input => {
  input.addEventListener("keyup", () => {
      remover(input);
  });
});





















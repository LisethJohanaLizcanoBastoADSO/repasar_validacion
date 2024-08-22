// Importaciones
import isEmail from "./module.js";
import SoloLetras from "./module3.js";
import SoloNumeros from "./module2.js";
import is_valid from "./isvalid.js";
import remover from "./remover.js";
import solicitud, { enviar } from "../";
import { URL } from "./config.js";

// Variables
const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const email = document.querySelector("#email");
const button = document.querySelector("button");
const tbusers = document.querySelector("#tp_users").content;
const fragmento = document.createDocumentFragment();
const tbody = document.querySelector("tbody");
const users = document.querySelector("#users");

// Funciones
const documentos = () => {
    const fragment = document.createDocumentFragment();
    fetch('http://localhost:3000/documentos')
        .then(response => response.json())
        .then(data => {
            let option = document.createElement("option");
            option.value = "";
            option.textContent = "Seleccionar...";
            fragment.appendChild(option);
            data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                fragment.appendChild(option);
            });
            tipo.appendChild(fragment);
        });
};

const listar = async (page) => {
    const _page = page ? page : 1;
    const data = await solicitud(`users?_page=${_page}&_per_page=8`);
    const documentos = await solicitud('documents');

    const nav = document.querySelector(".navigation");
    const first = data.first;
    const prev = data.prev;
    const next = data.next;
    const last = data.last;

    console.log("first", first);
    console.log("prev", prev);
    console.log("next", next);
    console.log("last", last);

    nav.querySelector(".first").disabled = first ? false : true;
    nav.querySelector(".prev").disabled = prev ? false : true;
    nav.querySelector(".next").disabled = next ? false : true;
    nav.querySelector(".last").disabled = last ? false : true;


    nav.querySelector(".first").setAttribute("data-first", first);
    nav.querySelector(".prev").setAttribute("data-prev", prev);
    nav.querySelector(".next").setAttribute("data-next", next);
    nav.querySelector(".last").setAttribute("data-last", last);

    data.forEach(element => {
        let nombre = documentos.find(doc => doc.id === element.tipo).nombre;
        tbusers.querySelector("tr").id = `user_${element.id}`;
        tbusers.querySelector(".nombre").textContent = element.nombre;
        tbusers.querySelector(".apellido").textContent = element.apellido;
        tbusers.querySelector(".telefono").textContent = element.telefono;
        tbusers.querySelector(".direccion").textContent = element.direccion; // Corregido aquí
        tbusers.querySelector(".tipo").textContent = nombre;
        tbusers.querySelector(".documento").textContent = element.documento;
        tbusers.querySelector(".email").textContent = element.email;
        tbusers.querySelector(".modificar").setAttribute("data-id", element.id);
        tbusers.querySelector(".eliminar").setAttribute("data-id", element.id);
        const clone = document.importNode(tbusers, true);
        fragmento.appendChild(clone);
    });
    tbody.appendChild(fragmento);
};

const CreateRow = (data) => {
    const tr = tbody.insertRow(-1);
    const cells = ['nombre', 'apellidos', 'telefono', 'direccion', 'tipo', 'documento', 'email'];
    cells.forEach((cell, index) => {
        const td = tr.insertCell(index);
        td.textContent = data[cell];
    });
};

const buscar = async (element) => {
    let data = await enviar(`users/${element.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    loadForm(data);
};

const save = (event) => {
    event.preventDefault();
    let response = is_valid(event, "form[required]");
    const data = {
        nombre: nombre.value,
        apellidos: apellido.value,
        telefono: telefono.value,
        direccion: direccion.value,
        tipo: tipo.value,
        documento: documento.value,
        email: email.value
    };
    if (response) {
        if (users.value === "") {
            guardar(data);
        } else {
            actualiza(data);
        }
    }
};

const guardar = (data) => {
    fetch(`${URL}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(json => {
        nombre.value = "";
        limpiarForm();
        CreateRow(json);
    });
};

const actualiza = async (data) => {
    const response = await enviar(`users/${users.value}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    limpiarForm();
    editRow(response);
};

const editRow = (data) => {
    const tr = document.querySelector(`#user_${data.id}`);
    const cells = ['nombre', 'apellidos', 'telefono', 'direccion', 'tipo', 'documento', 'email'];
    cells.forEach((cell, index) => {
        tr.querySelector(`.${cell}`).textContent = data[cell];
    });
};

const deleteFormUsuario = async (element) => {
    let id = element.dataset.id;
    const tr = document.querySelector(`#user_${id}`);
    const username = tr.querySelector(".nombre").textContent;
    const confirmDelete = confirm(`¿Desea eliminar a: ${username}?`);
    if (confirmDelete) {
        await enviar(`users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        tr.remove();
    }
};

const limpiarForm = () => {
    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    direccion.value = "";
    tipo.value = "";
    documento.value = "";
    email.value = "";
    politicas.checked = false;
    ['nombre', 'apellido', 'telefono', 'direccion', 'tipo', 'documento', 'email'].forEach(id => {
        document.querySelector(`#${id}`).classList.remove("correcto");
    });
};

const loadForm = (data) => {
    const {
        id,
        nombre: name,
        apellidos: last_name,
        telefono: phone,
        direccion: address,
        tipo: type,
        documento: document,
        email: e_mail,
    } = data;
    users.value = id;
    nombre.value = name;
    apellido.value = last_name;
    telefono.value = phone;
    direccion.value = address;
    tipo.value = type;
    documento.value = document;
    email.value = e_mail;
    politicas.checked = true;
    button.removeAttribute("disabled");
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    documentos();
    listar();
    if (!politicas.checked) {
        button.setAttribute("disabled", "");
    }
});

$formulario.addEventListener("submit", save);

document.addEventListener("click", (e) => {
    if (e.target.matches(".modificar")) {
        buscar(e.target);
    }
    if (e.target.matches(".eliminar")) {
        deleteFormUsuario(e.target);
    }
    if (e.target.matches(".prev")) {
        listar();
    }
    if (e.target.matches(".next")) {
        const nodos = tbody;
        const last = e.target.dataset.last;

        while(nodos.firstChild){
            nodos.removeChild(nodos.firstChild);
        }

        listar();
    }
    if (e.target.matches(".last")) {
        const nodos = tbody;
        const last = e.target.dataset.last;

        while(nodos.firstChild){
            nodos.removeChild(nodos.firstChild);
        }

        listar();
    }
});

politicas.addEventListener("change", (e) => {
    if (e.target.checked) {
        button.removeAttribute("disabled");
    }
});

// Validaciones
documento.addEventListener("keypress", SoloNumeros);
telefono.addEventListener("keypress", SoloNumeros);
nombre.addEventListener("keypress", (event) => {
    SoloLetras(event, nombre);
});
apellido.addEventListener("keypress", (event) => {
    SoloLetras(event, apellido);
});
tipo.addEventListener("change", (event) => {
    remover(event, tipo);
});
email.addEventListener("blur", (event) => {
    isEmail(event, email);
});

const isEmail = (event, elemento) => {
    let expresion = /^[\w-._]+@[\w-._]+(\.[a-zA-Z]{2,4}){1,2}$/;
    
    console.log(expresion, elemento.value);
    console.log(expresion.test(elemento.value));
    if (expresion.test(elemento.value)) {
        console.log("si");
        elemento.classList.remove("error");
        elemento.classList.add("correcto");
    } else {
        console.log("no");
        elemento.classList.remove("correcto");
        elemento.classList.add("error");
    }
};

export default isEmail;





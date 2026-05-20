//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
    console.log("Estado del carrito antes de guardar:", carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumarAlCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let tarjeta = elementoClickeado.closest("li");
    let nombre = tarjeta.querySelector(".nombre-producto").innerText.trim();
    
    let precioTexto = tarjeta.querySelector(".precio-producto").innerText;

    let precioLimpio = "";
    for (let i = 0; i < precioTexto.length; i++) {
        let caracter = precioTexto[i];
        if (caracter >= '0' && caracter <= '9') {
            precioLimpio += caracter;
        }
    }
    let precio = parseFloat(precioLimpio);

    let carrito = obtenerCarrito();
    let productoExistente = carrito.find(item => item.nombre === nombre);    

    if (productoExistente) {
        productoExistente.cantidad++; 
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    guardarCarrito(carrito);
    alert(`Un/una: ${nombre} fue agregado al carrito`);
}

function restarDelCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let tarjeta = elementoClickeado.closest("li");
    let nombre = tarjeta.querySelector(".nombre-producto").innerText.trim();

    let carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("No hay ningún producto guardado en el carrito");
        return;
    }

    let index = carrito.findIndex(item => item.nombre === nombre);

    if (index === -1) {
        alert(`No hay más ${nombre} en el carrito`);
        return;
    }

    carrito[index].cantidad--;

    if (carrito[index].cantidad <= 0) {
        carrito = carrito.filter(item => item.nombre !== nombre);
        guardarCarrito(carrito);
        alert(`Se eliminó por completo ${nombre} del carrito`); 
    } else {
        guardarCarrito(carrito);
        alert(`Un/una: ${nombre} fue eliminado del carrito`); 
    }
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
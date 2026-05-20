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

    /* Sumar al carrito: Primero agarro la tarjeta con el closest, le saco el nombre y limpio 
     el precio con un for para volarle el signo $ y pasarlo a número con parseFloat. 
     Después busco con un .find() si ese producto ya estaba en el carrito. Si ya estaba, 
     le sumo 1 a la cantidad. Si es nuevo, lo meto al array con cantidad 1 usando un push. 
     Al final lo guardo en el storage y tiro el alert.*/
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

    /*Restar del carrito: Hago lo mismo para saber qué producto es. Si el carrito está vacío, 
     freno ahí. Si no, busco la posición del producto con .findIndex() y le resto 1 a la cantidad. 
     Si la cantidad llega a 0, uso un .filter() para borrarlo del todo del carrito. Si todavía 
     quedan unidades, actualizo el storage y muestro el aviso. */
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
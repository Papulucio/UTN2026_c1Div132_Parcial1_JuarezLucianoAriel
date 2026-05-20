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

    /* - Captura el botón clickeado y encuentra su tarjeta contenedora usando .closest("li").
      - Extrae el texto del nombre y el precio de ese producto
      - Limpio el precio mediante un bucle, aislando solo los caracteres numéricos para quitar el '$' 
        y convertirlo de texto a número con parseFloat()
      - Trae el carrito actual del LocalStorage y usa .find() para chequear si el producto ya está guardado.
      - Si ya existe, le incrementa la propiedad .cantidad en 1
      - Si es nuevo, introduce un objeto con nombre, precio y cantidad inicial en 1 usando .push().
      - Sincroniza el array actualizando el LocalStorage y muestra la alerta requerida */
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

    /*- Identifica el producto de la misma forma usando el selector .closest("li")
      - Valida si el carrito está completamente vacío en LocalStorage para frenar la operación
      - Utiliza .findIndex() para ubicar en que posición del array se encuentra el producto
      - Resta una unidad en su propiedad .cantidad
      - Evalua: Si la cantidad llega a 0, aplica un .filter() para generar un nuevo array donde 
        se excluye por completo ese producto . Si la cantidad es mayor a 0, 
        simplemente actualiza el almacenamiento local con el nuevo valor */
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
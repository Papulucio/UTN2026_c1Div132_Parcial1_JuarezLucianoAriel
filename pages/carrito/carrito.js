function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let valorFinalTxt = document.getElementById("valor-final");
    let carrito = obtenerCarrito();
    
    tabla.innerHTML = `
        <tr class="fila-header-carrito">
            <td class="celda-header-tabla-carrito">Nombre del producto</td>
            <td class="celda-header-tabla-carrito">Cantidad</td>
            <td class="celda-header-tabla-carrito">Precio unitario</td>
        </tr>
    `;

    let totalAcumulado = 0;

    if (carrito.length === 0) {
        valorFinalTxt.innerText = "El valor final a pagar es de: $0";
        return;
    }

    carrito.forEach(producto => {
        let filaHTML = `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio}</td>
            </tr>
        `;
        tabla.innerHTML += filaHTML;
        
        totalAcumulado += producto.precio * producto.cantidad;
    });

    valorFinalTxt.innerText = `El valor final a pagar es de: $${totalAcumulado}`;

    /*  - Se ejecuta al abrir la página. Reinicia la tabla dejando solo los encabezados
      - Si el carrito está vacío, corta la ejecución (return) y muestra el total en $0
      - Si hay productos, los recorre con un '.forEach()' e inyecta las filas dinámicamente
      - Multiplica el precio por la cantidad de cada producto y lo suma al 'totalAcumulado'
      - Al final, muestra el monto total acumulado en el contenedor #valor-final */
}


function limpiarCarrito() 
{
    localStorage.removeItem("carrito"); 
    cargarProductosCarrito();           
    alert("Carrito limpiado correctamente"); 
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => 
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);

    /* - Se activa al hacer clic en el botón de vaciar.
      - Borra la clave del carrito usando localStorage.removeItem("carrito")
      - Llama de nuevo a 'cargarProductosCarrito()' para vaciar la tabla y poner el total 
        en $0 de forma automática y reactiva, sin necesidad de recargar la página entera
      - Lanza el cartel de confirmación 'alert()' pedido en la consigna */
});
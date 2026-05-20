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
});
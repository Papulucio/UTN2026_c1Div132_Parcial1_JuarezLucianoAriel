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

    /* Cargar los productos: Esta función arranca sola apenas se abre el carrito. Limpia la tabla 
     para dejar solo los títulos de arriba. Si el carrito está vacío en el storage, pone 
     el total en $0 y corta ahí con un return. Si tiene cosas, hace un .forEach() para recorrer 
     el array e ir armando las filas de la tabla una por una con el HTML. En cada vuelta multiplica 
     el precio por la cantidad y lo va sumando a una variable para mostrar al final el total real a pagar. */

function limpiarCarrito() 
{
    localStorage.removeItem("carrito"); 
    cargarProductosCarrito();           
    alert("Carrito limpiado correctamente"); 

    /*Limpiar el carrito: Cuando tocan el botón de vaciar, borro la clave "carrito" del storage. 
     Después llamo ahí mismo a la función de cargar productos para que la tabla se limpie sola 
     y el total vuelva a $0 al toque sin tener que andar recargando toda la página. 
     Al final muestro el alert que pide el enunciado. */
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => 
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);

    /* - Se activa al hacer clic en el botón de vaciar.
      - Borra la clave del carrito usando localStorage.removeItem("carrito")
      - Llama de nuevo a cargarProductosCarrito() para vaciar la tabla y poner el total 
        en $0 de forma automática y reactiva, sin necesidad de recargar la página entera
      - Lanza el cartel de confirmación alert() pedido en la consigna */
});
}
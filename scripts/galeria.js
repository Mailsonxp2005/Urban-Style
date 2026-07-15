
document.addEventListener("DOMContentLoaded", () => {
    
  
    const filtros = document.querySelectorAll(".filtro-btn");
    const items = document.querySelectorAll(".galeria-item");

    if (filtros.length > 0 && items.length > 0) {
        filtros.forEach(filtro => {
            filtro.addEventListener("click", () => {
                
                // Limpiar estilos en línea de los botones de filtro
                filtros.forEach(f => {
                    f.style.color = "#777";
                    f.style.borderBottom = "none";
                    f.style.fontWeight = "normal";
                });

                // Activar visualmente el botón clickeado
                filtro.style.color = "#000";
                filtro.style.borderBottom = "2px solid #000";
                filtro.style.fontWeight = "bold";

                const categoriaSeleccionada = filtro.getAttribute("data-filter");

                // Filtrar las prendas con animaciones
                items.forEach(item => {
                    const categoriaItem = item.getAttribute("data-categoria");

                    if (categoriaSeleccionada === "todos" || categoriaItem === categoriaSeleccionada) {
                        // Mostrar elemento de forma fluida
                        item.style.display = "flex";
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        // Ocultar elemento
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.95)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 300); 
                    }
                });
            });
        });
    }


    const carrito = document.getElementById("carrito");
    const listaCarrito = document.querySelector("#lista-carrito tbody");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const imgCarrito = document.getElementById("img-carrito");

    if (imgCarrito && carrito) {
        imgCarrito.addEventListener("click", (e) => {
            e.stopPropagation();
            carrito.classList.toggle("mostrar-carrito"); 
        });

        // Cerrar el carrito si se hace click fuera de él
        document.addEventListener("click", (e) => {
            if (!carrito.contains(e.target) && e.target !== imgCarrito) {
                carrito.classList.remove("mostrar-carrito");
            }
        });
    }

    // Botón para vaciar la tabla del carrito
    if (vaciarCarritoBtn && listaCarrito) {
        vaciarCarritoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            while(listaCarrito.firstChild) {
                listaCarrito.removeChild(listaCarrito.firstChild);
            }
            alert("Carrito vaciado");
        });
    }

});
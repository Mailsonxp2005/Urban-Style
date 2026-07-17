document.addEventListener('DOMContentLoaded', () => {
    
    // Funcionalidad de Carrito de Compras
    const carrito = document.getElementById('carrito');
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const imgCarrito = document.getElementById('img-carrito');

    cargarCarritoDesdeStorage();

    if (imgCarrito && carrito) {
        imgCarrito.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = window.getComputedStyle(carrito).display === 'block';
            carrito.style.display = isVisible ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!carrito.contains(e.target) && e.target !== imgCarrito) {
                carrito.style.display = 'none';
            }
        });
    }

    if (listaCarrito) {
        listaCarrito.addEventListener('click', (e) => {
            if (e.target.classList.contains('borrar-producto') || e.target.parentElement.classList.contains('borrar-producto')) {
                e.preventDefault();
                const boton = e.target.classList.contains('borrar-producto') ? e.target : e.target.parentElement;
                const productoId = boton.getAttribute('data-id');
                
                boton.parentElement.parentElement.remove();
                eliminarProductoStorage(productoId);
            }
        });
    }

    if (vaciarCarritoBtn && listaCarrito) {
        vaciarCarritoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            while (listaCarrito.firstChild) {
                listaCarrito.removeChild(listaCarrito.firstChild);
            }
            
            localStorage.removeItem('carrito');
            alert('¡El carrito ha sido vaciado!');
        });
    }

    function cargarCarritoDesdeStorage() {
        if (!listaCarrito) return;
        
        let productosLS = obtenerProductosStorage();
        
        productosLS.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width="50" style="border-radius: 4px;" alt="${producto.titulo}">
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}" style="color: red; font-size: 1.2rem;">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </td>
            `;
            listaCarrito.appendChild(row);
        });
    }

    function obtenerProductosStorage() {
        let productosLS;
        if (localStorage.getItem('carrito') === null) {
            productosLS = [];
        } else {
            productosLS = JSON.parse(localStorage.getItem('carrito'));
        }
        return productosLS;
    }

    function eliminarProductoStorage(id) {
        let productosLS = obtenerProductosStorage();
        productosLS = productosLS.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(productosLS));
    }

    // Comportamiento del menú móvil (Cerrar al hacer clic en un link)
    const menuCheckbox = document.getElementById('menu');
    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox && menuCheckbox.checked) {
                menuCheckbox.checked = false; 
            }
        });
    });

    // Acordeón de FAQs de selección única (Cierra los otros al abrir uno)
    const detalles = document.querySelectorAll('details');

    detalles.forEach((targetDetail) => {
        targetDetail.addEventListener('click', () => {
            detalles.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });

});
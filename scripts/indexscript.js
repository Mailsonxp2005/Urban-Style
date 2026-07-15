
document.addEventListener('DOMContentLoaded', () => {
    

    const carrito = document.getElementById('carrito');
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const imgCarrito = document.getElementById('img-carrito');
    const contenedorProductos = document.getElementById('lista-1') || document.getElementById('lista-catalogo');

    // Cargar productos guardados en LocalStorage al iniciar la página
    cargarCarritoDesdeStorage();

    if (imgCarrito && carrito) {
        imgCarrito.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = window.getComputedStyle(carrito).display === 'block';
            carrito.style.display = isVisible ? 'none' : 'block';
        });

        // Cerrar el carrito si se hace clic en cualquier otra parte de la pantalla
        document.addEventListener('click', (e) => {
            if (!carrito.contains(e.target) && e.target !== imgCarrito) {
                carrito.style.display = 'none';
            }
        });
    }

    if (listaCarrito) {
        listaCarrito.addEventListener('click', (e) => {
            // Soporta clicks en el icono de basura o en el enlace
            const boton = e.target.closest('.borrar-producto');
            if (boton) {
                e.preventDefault();
                const productoId = boton.getAttribute('data-id');
                boton.parentElement.parentElement.remove();
                eliminarProductoStorage(productoId);
            }
        });
    }

    // Vaciar todo el carrito
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

    if (contenedorProductos) {
        contenedorProductos.addEventListener('click', (e) => {
            if (e.target.classList.contains('agregar-carrito')) {
                e.preventDefault();
                const boton = e.target;
                const infoProducto = buscarInformacionProducto(boton);
                if (infoProducto) {
                    agregarAlCarrito(infoProducto);
                }
            }
        });
    }

    function buscarInformacionProducto(boton) {
        // Estructura para index.html (.product)
        let contenedor = boton.closest('.product');
        if (contenedor) {
            return {
                id: boton.getAttribute('data-id'),
                imagen: contenedor.querySelector('img').src,
                titulo: contenedor.querySelector('h3').textContent,
                precio: contenedor.querySelector('.precio').textContent
            };
        }
        
        // Estructura para productos.html (.product-item)
        contenedor = boton.closest('.product-item');
        if (contenedor) {
            return {
                id: boton.getAttribute('data-id'),
                imagen: contenedor.querySelector('.product-img-box img').src,
                titulo: contenedor.querySelector('.product-title').textContent,
                precio: contenedor.querySelector('.product-price').textContent
            };
        }
        return null;
    }

    function agregarAlCarrito(producto) {
        let productosLS = obtenerProductosStorage();
        
        if (productosLS.some(item => item.id === producto.id)) {
            alert('Esta prenda ya está en tu carrito.');
            return;
        }

        productosLS.push(producto);
        localStorage.setItem('carrito', JSON.stringify(productosLS));

        if (listaCarrito) {
            insertarHTMLCarrito(producto);
        }
        alert('¡Producto añadido al carrito!');
    }

    function insertarHTMLCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="50" style="border-radius: 4px; object-fit: cover;" alt="${producto.titulo}">
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}" style="color: red; font-size: 1.2rem;">
                    🗑️
                </a>
            </td>
        `;
        listaCarrito.appendChild(row);
    }

    function cargarCarritoDesdeStorage() {
        if (!listaCarrito) return;
        listaCarrito.innerHTML = ''; // Limpiar previo para evitar duplicaciones de render
        
        let productosLS = obtenerProductosStorage();
        productosLS.forEach(producto => {
            insertarHTMLCarrito(producto);
        });
    }

    // Obtener productos de LocalStorage
    function obtenerProductosStorage() {
        return localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    }

    // Eliminar producto individual de LocalStorage
    function eliminarProductoStorage(id) {
        let productosLS = obtenerProductosStorage();
        productosLS = productosLS.filter(producto => producto.id !== id);
        localStorage.setItem('carrito', JSON.stringify(productosLS));
    }

 
    const menuCheckbox = document.getElementById('menu');
    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox && menuCheckbox.checked) {
                menuCheckbox.checked = false; 
            }
        });
    });

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
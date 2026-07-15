document.addEventListener('DOMContentLoaded', () => {
    
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');

    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                
                const tarjeta = e.target.closest('.product') || e.target.closest('.product-item');
                if (!tarjeta) return;

                const infoProducto = {
                    imagen: tarjeta.querySelector('img').src,
                    titulo: (tarjeta.querySelector('h3') || tarjeta.querySelector('.product-title')).textContent.trim(),
                    precio: (tarjeta.querySelector('.precio') || tarjeta.querySelector('.product-price')).textContent.trim(),
                    id: e.target.getAttribute('data-id')
                };
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <img src="${infoProducto.imagen}" width="50" style="object-fit: cover; height: 50px; border-radius: 4px;">
                    </td>
                    <td style="color: #111111; font-size: 14px; font-weight: 600; padding: 8px;">
                        ${infoProducto.titulo}
                    </td>
                    <td style="color: #ff2a2a; font-size: 14px; font-weight: 700; padding: 8px;">
                        ${infoProducto.precio}
                    </td>
                    <td style="text-align: center;">
                        <a href="#" class="borrar-producto" data-id="${infoProducto.id}" style="color: #ff2a2a; text-decoration: none; font-weight: bold; font-size: 18px;">&times;</a>
                    </td>
                `;
                
                if (listaCarrito) {
                    listaCarrito.appendChild(row);
                }
                
                alert(`"${infoProducto.titulo}" se agregó a tu Drop actual.`);
            });
        });
    }

    if (listaCarrito) {
        listaCarrito.addEventListener('click', (e) => {
            if (e.target.classList.contains('borrar-producto')) {
                e.preventDefault();
                e.target.closest('tr').remove();
            }
        });
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (listaCarrito) {
                listaCarrito.innerHTML = '';
            }
        });
    }

    // 4. FILTROS DE LA PÁGINA DE PRODUCTOS
    const enlacesFiltro = document.querySelectorAll('.filter-list a');
    const itemsProductos = document.querySelectorAll('.product-item');

    if (enlacesFiltro.length > 0 && itemsProductos.length > 0) {
        enlacesFiltro.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();

                enlacesFiltro.forEach(link => link.classList.remove('active-filter'));
                enlace.classList.add('active-filter');

                const categoriaSeleccionada = enlace.getAttribute('data-filter');

                itemsProductos.forEach(producto => {
                    const categoriaProducto = producto.getAttribute('data-category');

                    if (categoriaSeleccionada === 'todos' || categoriaProducto === categoriaSeleccionada) {
                        producto.style.display = 'flex';
                    } else {
                        producto.style.display = 'none';
                    }
                });
            });
        });
    }
});
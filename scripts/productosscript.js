document.addEventListener('DOMContentLoaded', () => {
    
    const enlacesFiltro = document.querySelectorAll('.filter-list a');
    const itemsProductos = document.querySelectorAll('.product-item');
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const catalogoGrid = document.getElementById('lista-catalogo');

    const selectOrden = document.getElementById('ordenar-precio'); 
    
    // === CAPTURAR LOS CHECKBOXES DE STOCK ===
    const chkEnStock = document.getElementById('chk-en-stock');
    const chkDropsPasados = document.getElementById('chk-drops-pasados');

    // === VARIABLES PARA LA PAGINACIÓN ===
    const productosPorPagina = 8;
    let paginaActual = 1;
    const paginasLinks = document.querySelectorAll('.shop-pagination .page-num');
    const btnSiguiente = document.querySelector('.shop-pagination .page-next');

    let categoriaActiva = 'todos';

    function filtrarYPaginarCatalogo() {
        const mostrarEnStock = chkEnStock ? chkEnStock.checked : true;
        const mostrarDropsPasados = chkDropsPasados ? chkDropsPasados.checked : false;

        const productosFiltrados = [];

        itemsProductos.forEach(producto => {
            const categoriaProducto = producto.getAttribute('data-category');
            
           
            const valorStockAttr = producto.getAttribute('data-stock');
            const tieneStockAttr = valorStockAttr ? valorStockAttr.toLowerCase().trim() !== 'false' : true;
            
            const tieneClaseSinStock = producto.classList.contains('sin-stock') || producto.classList.contains('agotado');
            
            const tieneStock = tieneStockAttr && !tieneClaseSinStock;

            let cumpleCategoria = (categoriaActiva === 'todos' || categoriaProducto === categoriaActiva);
            let cumpleDisponibilidad = false;

            if (mostrarEnStock && tieneStock) {
                cumpleDisponibilidad = true;
            }
            if (mostrarDropsPasados && !tieneStock) {
                cumpleDisponibilidad = true;
            }
            if (!mostrarEnStock && !mostrarDropsPasados) {
                cumpleDisponibilidad = true;
            }

            if (cumpleCategoria && cumpleDisponibilidad) {
                productosFiltrados.push(producto);
            } else {
                producto.style.display = 'none'; 
            }
        });

        const totalProductosFiltrados = productosFiltrados.length;
        const totalPaginas = Math.ceil(totalProductosFiltrados / productosPorPagina) || 1;

        if (paginaActual > totalPaginas) {
            paginaActual = 1;
        }

        const inicio = (paginaActual - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;

        productosFiltrados.forEach((producto, index) => {
            if (index >= inicio && index < fin) {
                producto.style.display = 'flex';
            } else {
                producto.style.display = 'none';
            }
        });

        actualizarPaginacionUI(totalPaginas);
    }

    // Función auxiliar para actualizar los botones de las páginas en el HTML
    function actualizarPaginacionUI(totalPaginas) {
        paginasLinks.forEach(pag => {
            const numPag = parseInt(pag.textContent);
            if (numPag > totalPaginas) {
                pag.style.display = 'none';
            } else {
                pag.style.display = 'inline-block';
            }

            if (numPag === paginaActual) {
                pag.classList.add('current-page');
            } else {
                pag.classList.remove('current-page');
            }
        });

        if (btnSiguiente) {
            if (paginaActual >= totalPaginas) {
                btnSiguiente.style.display = 'none';
            } else {
                btnSiguiente.style.display = 'inline-block';
            }
        }
    }

    // === ESCUCHAR CAMBIOS EN LOS CHECKBOXES ===
    if (chkEnStock) {
        chkEnStock.addEventListener('change', () => {
            paginaActual = 1; // Reinicia a la pág 1 al cambiar filtro
            filtrarYPaginarCatalogo();
        });
    }

    if (chkDropsPasados) {
        chkDropsPasados.addEventListener('change', () => {
            paginaActual = 1; // Reinicia a la pág 1 al cambiar filtro
            filtrarYPaginarCatalogo();
        });
    }

    // === MANEJADORES DE EVENTOS PARA PAGINACIÓN ===
    paginasLinks.forEach(pag => {
        pag.addEventListener('click', (e) => {
            e.preventDefault();
            paginaActual = parseInt(pag.textContent);
            filtrarYPaginarCatalogo();
            document.querySelector('.shop-hero').scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', (e) => {
            e.preventDefault();
            
            const mostrarEnStock = chkEnStock ? chkEnStock.checked : true;
            const mostrarDropsPasados = chkDropsPasados ? chkDropsPasados.checked : false;

            const itemsFiltradosCount = Array.from(itemsProductos).filter(producto => {
                const categoriaProducto = producto.getAttribute('data-category');
                
                const valorStockAttr = producto.getAttribute('data-stock');
                const tieneStockAttr = valorStockAttr ? valorStockAttr.toLowerCase().trim() !== 'false' : true;
                const tieneClaseSinStock = producto.classList.contains('sin-stock') || producto.classList.contains('agotado');
                const tieneStock = tieneStockAttr && !tieneClaseSinStock;
                
                let cumpleCategoria = (categoriaActiva === 'todos' || categoriaProducto === categoriaActiva);
                let cumpleDisponibilidad = (mostrarEnStock && tieneStock) || (mostrarDropsPasados && !tieneStock) || (!mostrarEnStock && !mostrarDropsPasados);

                return cumpleCategoria && cumpleDisponibilidad;
            }).length;

            const totalPaginas = Math.ceil(itemsFiltradosCount / productosPorPagina) || 1;

            if (paginaActual < totalPaginas) {
                paginaActual++;
                filtrarYPaginarCatalogo();
                document.querySelector('.shop-hero').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // === FILTROS POR CATEGORÍA ===
    if (enlacesFiltro.length > 0) {
        enlacesFiltro.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();

                enlacesFiltro.forEach(link => link.classList.remove('active-filter'));
                enlace.classList.add('active-filter');

                categoriaActiva = enlace.getAttribute('data-filter');
                paginaActual = 1; 
                filtrarYPaginarCatalogo();
                
                if (selectOrden && selectOrden.value !== 'defecto') {
                    ordenarProductos(selectOrden.value);
                }
            });
        });
    }

    // === ORDENAR PRODUCTOS POR PRECIO ===
    function ordenarProductos(criterio) {
        if (!catalogoGrid) return;

        const productosArray = Array.from(itemsProductos);

        productosArray.sort((a, b) => {
            const precioA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
            const precioB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));

            if (criterio === 'barato-caro') {
                return precioA - precioB; 
            } else if (criterio === 'caro-barato') {
                return precioB - precioA; 
            }
            return 0;
        });

        productosArray.forEach(producto => {
            catalogoGrid.appendChild(producto);
        });

        filtrarYPaginarCatalogo();
    }

    if (selectOrden) {
        selectOrden.addEventListener('change', (e) => {
            if (e.target.value !== 'defecto') {
                ordenarProductos(e.target.value);
            } else {
                const productosArray = Array.from(itemsProductos);
                productosArray.sort((a, b) => {
                    const idA = parseInt(a.querySelector('.agregar-carrito').getAttribute('data-id'));
                    const idB = parseInt(b.querySelector('.agregar-carrito').getAttribute('data-id'));
                    return idA - idB;
                });
                productosArray.forEach(producto => catalogoGrid.appendChild(producto));
                filtrarYPaginarCatalogo();
            }
        });
    }

    // === FUNCIONES DEL CARRITO DE COMPRAS ===
    if (catalogoGrid) {
        catalogoGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('agregar-carrito')) {
                e.preventDefault();

                const productoCard = e.target.closest('.product-item');
                if (!productoCard) return;
                
                const infoProducto = {
                    imagen: productoCard.querySelector('img').src,
                    titulo: productoCard.querySelector('.product-title').textContent.trim(),
                    precio: productoCard.querySelector('.product-price').textContent.trim(),
                    id: e.target.getAttribute('data-id')
                };
                
                insertarAlCarrito(infoProducto);
            }
        });
    }

    function insertarAlCarrito(producto) {
        const productoYaExiste = listaCarrito.querySelector(`a[data-id="${producto.id}"]`);
        if (productoYaExiste) {
            alert(`"${producto.titulo}" ya está agregado a tu carrito.`);
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50" style="object-fit: cover; height: 50px; border-radius: 4px;"></td>
            <td style="color: #111111; font-size: 14px; font-weight: 600; padding: 10px;">${producto.titulo}</td>
            <td style="color: #ff2a2a; font-size: 14px; font-weight: 700; padding: 10px;">${producto.precio}</td>
            <td style="text-align: center;">
                <a href="#" class="borrar-producto" data-id="${producto.id}" style="color: #ff2a2a; text-decoration: none; font-weight: bold; font-size: 16px;">&times;</a>
            </td>
        `;
        
        if (listaCarrito) {
            listaCarrito.appendChild(row);
        }
        alert(`"${producto.titulo}" se agregó a tu Drop actual.`);
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

    // Inicializar filtros y paginación
    filtrarYPaginarCatalogo();
});
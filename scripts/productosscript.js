document.addEventListener('DOMContentLoaded', () => {
    
    // === SELECTORES DEL CATÁLOGO ===
    const enlacesFiltro = document.querySelectorAll('.filter-list a');
    const itemsProductos = Array.from(document.querySelectorAll('.product-item'));
    const selectOrden = document.getElementById('ordenar-precio'); 
    const chkEnStock = document.getElementById('chk-en-stock');
    const chkDropsPasados = document.getElementById('chk-drops-pasados');
    const catalogoGrid = document.getElementById('lista-catalogo');
    const productCountSpan = document.querySelector('.product-count');

    // === SELECTORES DEL CARRITO ===
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const btnIrPagar = document.getElementById('ir-pagar');

    // === VARIABLES DE CONTROL ===
    const productosPorPagina = 8;
    let paginaActual = 1;
    let categoriaActiva = 'todos';
    let articulosCarrito = [];

    // === 1. LÓGICA PRINCIPAL: FILTRAR, ORDENAR Y PAGINAR ===
    function actualizarCatalogo() {
        // A. FILTRAR
        let productosFiltrados = itemsProductos.filter(producto => {
            // Filtro por Categoría
            const categoriaProd = producto.getAttribute('data-category');
            const coincideCategoria = (categoriaActiva === 'todos' || categoriaProd === categoriaActiva);

            // Filtro por Disponibilidad (Stock)
            // Si data-stock es "false" significa Agotado. Si no tiene el atributo, se asume En Stock (true).
            const tieneStock = producto.getAttribute('data-stock') !== 'false';
            
            let coincideDisponibilidad = false;
            if (chkEnStock.checked && tieneStock) coincideDisponibilidad = true;
            if (chkDropsPasados.checked && !tieneStock) coincideDisponibilidad = true;

            return coincideCategoria && coincideDisponibilidad;
        });

        // B. ORDENAR
        const criterioOrden = selectOrden.value;
        if (criterioOrden !== 'defecto') {
            productosFiltrados.sort((a, b) => {
                const precioA = parseFloat(a.querySelector('.product-price').textContent.replace('S/.', '').trim());
                const precioB = parseFloat(b.querySelector('.product-price').textContent.replace('S/.', '').trim());
                
                if (criterioOrden === 'barato-caro') {
                    return precioA - precioB;
                } else if (criterioOrden === 'caro-barato') {
                    return precioB - precioA;
                }
                return 0;
            });
        }

        // C. PAGINACIÓN
        const totalProductos = productosFiltrados.length;
        if (productCountSpan) {
            productCountSpan.textContent = `Mostrando ${totalProductos} productos`;
        }

        const totalPaginas = Math.ceil(totalProductos / productosPorPagina) || 1;
        
        // Ajustar la página actual si excede el nuevo total tras aplicar un filtro
        if (paginaActual > totalPaginas) {
            paginaActual = totalPaginas;
        }

        const indiceInicio = (paginaActual - 1) * productosPorPagina;
        const indiceFin = indiceInicio + productosPorPagina;

        // Ocultar todos los productos del DOM primero
        itemsProductos.forEach(p => p.style.display = 'none');

        // Mostrar solo los productos correspondientes a la página actual
        const productosVisibles = productosFiltrados.slice(indiceInicio, indiceFin);
        productosVisibles.forEach(producto => {
            producto.style.display = 'flex';
        });

        // Renderizar dinámicamente los botones de paginación
        generarPaginacion(totalPaginas);
    }

    // === 2. GENERADOR DINÁMICO DE PAGINACIÓN ===
    function generarPaginacion(totalPaginas) {
        const contenedorPaginacion = document.querySelector('.shop-pagination');
        if (!contenedorPaginacion) return;

        contenedorPaginacion.innerHTML = '';

        // Botón Anterior (&laquo;)
        if (paginaActual > 1) {
            const btnPrev = document.createElement('a');
            btnPrev.href = '#';
            btnPrev.className = 'page-next';
            btnPrev.innerHTML = '&laquo;';
            btnPrev.addEventListener('click', (e) => {
                e.preventDefault();
                paginaActual--;
                actualizarCatalogo();
                window.scrollTo({ top: 200, behavior: 'smooth' });
            });
            contenedorPaginacion.appendChild(btnPrev);
        }

        // Páginas Numeradas
        for (let i = 1; i <= totalPaginas; i++) {
            const linkPagina = document.createElement('a');
            linkPagina.href = '#';
            linkPagina.className = `page-num ${i === paginaActual ? 'current-page' : ''}`;
            linkPagina.textContent = i;
            
            linkPagina.addEventListener('click', (e) => {
                e.preventDefault();
                paginaActual = i;
                actualizarCatalogo();
                window.scrollTo({ top: 200, behavior: 'smooth' });
            });
            contenedorPaginacion.appendChild(linkPagina);
        }

        // Botón Siguiente (&raquo;)
        if (paginaActual < totalPaginas) {
            const btnNext = document.createElement('a');
            btnNext.href = '#';
            btnNext.className = 'page-next';
            btnNext.innerHTML = '&raquo;';
            btnNext.addEventListener('click', (e) => {
                e.preventDefault();
                paginaActual++;
                actualizarCatalogo();
                window.scrollTo({ top: 200, behavior: 'smooth' });
            });
            contenedorPaginacion.appendChild(btnNext);
        }
    }

    // === 3. LISTENERS PARA FILTROS Y ORDENAMIENTO ===
    
    // Filtro por Categoría
    enlacesFiltro.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Alternar clase activa visual
            enlacesFiltro.forEach(link => link.classList.remove('active-filter'));
            enlace.classList.add('active-filter');

            categoriaActiva = enlace.getAttribute('data-filter');
            paginaActual = 1; // Reiniciar a la primera página al cambiar categoría
            actualizarCatalogo();
        });
    });

    // Filtros de Disponibilidad (Checkboxes)
    if (chkEnStock) {
        chkEnStock.addEventListener('change', () => {
            paginaActual = 1;
            actualizarCatalogo();
        });
    }

    if (chkDropsPasados) {
        chkDropsPasados.addEventListener('change', () => {
            paginaActual = 1;
            actualizarCatalogo();
        });
    }

    // Selector de Ordenar por precio
    if (selectOrden) {
        selectOrden.addEventListener('change', () => {
            paginaActual = 1;
            actualizarCatalogo();
        });
    }


    // === 4. FUNCIONALIDAD COMPLETA DEL CARRITO ===

    // Cargar Carrito desde LocalStorage al iniciar la página
    if (localStorage.getItem('carrito')) {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'));
        carritoHTML();
    }

    // Evento Añadir al Carrito (Delegación de eventos en el catálogo)
    if (catalogoGrid) {
        catalogoGrid.addEventListener('click', agregarProducto);
    }

    function agregarProducto(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
            leerDatosProducto(productoSeleccionado);
        }
    }

    // Extraer datos del HTML del producto seleccionado
    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('.product-title').textContent,
            precio: producto.querySelector('.product-price').textContent,
            id: producto.querySelector('.agregar-carrito').getAttribute('data-id'),
            cantidad: 1
        };

        // Comprobar si el producto ya existe en el carrito para sumar cantidad
        const existe = articulosCarrito.some(prod => prod.id === infoProducto.id);
        if (existe) {
            articulosCarrito = articulosCarrito.map(prod => {
                if (prod.id === infoProducto.id) {
                    prod.cantidad++;
                    return prod;
                } else {
                    return prod;
                }
            });
        } else {
            articulosCarrito = [...articulosCarrito, infoProducto];
        }

        carritoHTML();
    }

    // Renderizar la tabla del carrito en el HTML
    function carritoHTML() {
        if (!listaCarrito) return;

        // Limpiar HTML anterior
        listaCarrito.innerHTML = '';

        articulosCarrito.forEach(producto => {
            const { imagen, titulo, precio, cantidad, id } = producto;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${imagen}" width="50" style="border-radius: 4px; object-fit: cover; display: block;"></td>
                <td>${titulo} <span style="color: var(--text-muted); font-size: 11px; font-weight: 600;">(x${cantidad})</span></td>
                <td>${precio}</td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${id}" style="color: var(--accent-red); text-decoration: none; font-weight: bold; font-size: 18px;">&times;</a>
                </td>
            `;
            listaCarrito.appendChild(row);
        });

        // Guardar el estado actualizado en LocalStorage
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }

    // Eliminar un producto individual del carrito
    const carritoDiv = document.getElementById('carrito');
    if (carritoDiv) {
        carritoDiv.addEventListener('click', eliminarProducto);
    }

    function eliminarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar-producto')) {
            const productoId = e.target.getAttribute('data-id');
            articulosCarrito = articulosCarrito.filter(prod => prod.id !== productoId);
            carritoHTML();
        }
    }

    // Vaciar todo el carrito de compras
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            articulosCarrito = [];
            carritoHTML();
        });
    }


    // === 5. VALIDACIÓN Y REDIRECCIÓN DEL PAGO ===
    if (btnIrPagar) {
        btnIrPagar.addEventListener('click', (e) => {
            e.preventDefault(); // Evitamos que salte instantáneamente al '#'

            // Verificamos si realmente hay productos en el carrito
            if (articulosCarrito.length === 0) {
                alert('Tu carrito está vacío. Añade algunos productos urbanos antes de pagar.');
            } else {
                // Redirección controlada y segura por JS
                window.location.href = 'pago.html';
            }
        });
    }

    // === INICIALIZACIÓN DE LA TIENDA ===
    actualizarCatalogo();
});
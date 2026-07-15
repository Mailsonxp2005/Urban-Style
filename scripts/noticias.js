document.addEventListener("DOMContentLoaded", () => {
    // 1. BASE DE DATOS DE LAS NOTICIAS (Contenido extendido para el Modal)
    const noticiasData = {
        0: {
            tag: "ALERTA DE DROP SECRETO",
            titulo: "ELISYUM X VOID: El drop clandestino de 100 piezas reflectantes que se agotará en segundos",
            fecha: "14 de Julio, 2026",
            img: "images/noticias/drop.jpg",
            cuerpo: `
                <p>La espera ha terminado. <strong>Elisyum</strong> se une con el colectivo artístico underground <strong>VOID</strong> para lanzar una colección ultra-limitada que desafía los límites del diseño urbano y la tecnología textil. Esta cápsula consta únicamente de 100 piezas seriadas a mano.</p>
                
                <p>La característica principal de esta entrega es el uso de tecnología <em>Retro-Reflective 3M</em> de alta intensidad. Bajo luz natural, las prendas muestran un tono gris mate y sobrio, pero al exponerse al flash de una cámara o a las luces de la ciudad por la noche, reaccionan revelando patrones geométricos inspirados en la arquitectura brutalista.</p>
                
                <h4 style="margin: 20px 0 10px 0; text-transform: uppercase; font-weight: 800;">Especificaciones del Drop</h4>
                <table class="tabla-noticia">
                    <thead>
                        <tr>
                            <th>Prenda</th>
                            <th>Material</th>
                            <th>Precio estimado</th>
                            <th>Unidades</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Anorak Reflectante VOID</td>
                            <td>Nylon Ripstop + Membrana 3M</td>
                            <td>$120 USD</td>
                            <td>40 pcs</td>
                        </tr>
                        <tr>
                            <td>Sudadera Oversize Flash</td>
                            <td>Algodón pesado 450 GSM</td>
                            <td>$95 USD</td>
                            <td>60 pcs</td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>¿Cómo acceder?</strong> El drop se habilitará exclusivamente a través de un enlace cifrado que se enviará por nuestra newsletter de forma aleatoria durante la madrugada. No habrá preventa ni reposiciones.</p>
            `
        },
        1: {
            tag: "ALERTA DE ESTILO",
            titulo: "La muerte del pitillo: Por qué el oversize definitivo ha conquistado los distritos de moda",
            fecha: "09 de Julio, 2026",
            img: "images/noticias/moda.jpg",
            cuerpo: `
                <p>La silueta del streetwear ha cambiado drásticamente en los últimos años, consolidando lo que muchos denominan "la era del volumen extremo". Los vaqueros skinny o pitillos han desaparecido por completo de los escaparates y de las calles más influyentes del mundo.</p>
                
                <p>Expertos en moda apuntan a que esta transición no es solo estética, sino un retorno a la comodidad, la funcionalidad y una clara influencia de la cultura skate y hip-hop de los años 90. Las marcas de alta costura y las firmas independientes coinciden en el corte holgado.</p>

                <h4 style="margin: 20px 0 10px 0; text-transform: uppercase; font-weight: 800;">Comparativa de Siluetas</h4>
                <table class="tabla-noticia">
                    <thead>
                        <tr>
                            <th>Corte</th>
                            <th>Ancho de Bota</th>
                            <th>Nivel de Confort</th>
                            <th>Presencia en Pasarela</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Oversize / Baggy</td>
                            <td>26 - 32 cm</td>
                            <td>Máximo (Libertad de movimiento)</td>
                            <td>85% (Tendencia Líder)</td>
                        </tr>
                        <tr>
                            <td>Straight Fit</td>
                            <td>20 - 22 cm</td>
                            <td>Medio-Alto</td>
                            <td>12% (Básico de armario)</td>
                        </tr>
                        <tr>
                            <td>Skinny Fit (Pitillo)</td>
                            <td>14 - 16 cm</td>
                            <td>Bajo (Restringido)</td>
                            <td>< 3% (Fuera de tendencia)</td>
                        </tr>
                    </tbody>
                </table>

                <p>La tendencia actual dicta llevar prendas de tiro bajo combinadas con calzado robusto de suela ancha para equilibrar las proporciones exageradas del cuerpo.</p>
            `
        },
        2: {
            tag: "HYPE SNEAKERS",
            titulo: "Sneakers Prohibidas: El calzado deportivo que las marcas intentaron censurar",
            fecha: "28 de Junio, 2026",
            img: "images/noticias/snekers.jpg",
            cuerpo: `
                <p>El mercado de las zapatillas deportivas está viviendo una revolución basada en la rebeldía del diseño y la descentralización del hype. Últimamente han surgido colectivos de diseño que crean "zapatillas pirata" o modificadas sin el consentimiento de los gigantes de la industria.</p>
                
                <p>Estas siluetas experimentales utilizan materiales poco convencionales como plástico reciclado no regulado, suelas inyectadas de gran tamaño y detalles metálicos industriales que sobrepasan las normativas comerciales estándar de calzado deportivo.</p>

                <h4 style="margin: 20px 0 10px 0; text-transform: uppercase; font-weight: 800;">Modelos más Polémicos</h4>
                <table class="tabla-noticia">
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Motivo de Disputa</th>
                            <th>Precio Reventa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vandal X-100</td>
                            <td>Uso de suela con clavos de aleación de titanio</td>
                            <td>$450 USD</td>
                        </tr>
                        <tr>
                            <td>Bio-Melt Runner</td>
                            <td>Media suela biodegradable de hongo micelio</td>
                            <td>$380 USD</td>
                        </tr>
                    </tbody>
                </table>

                <p>A pesar de las demandas legales y los intentos de censurar su distribución, estas sneakers se han convertido en auténticos objetos de culto, alcanzando cifras astronómicas en plataformas de reventa digital de confianza.</p>
            `
        },
        3: {
            tag: "UNDERGROUND VIP",
            titulo: "Detrás del telón: Lo que pasó en el desfile clandestino de Elisyum",
            fecha: "15 de Junio, 2026",
            img: "images/noticias/elisium.jpg",
            cuerpo: `
                <p>Sin prensa oficial, sin fotógrafos acreditados y sin las clásicas e incómodas sillas en primera fila. <strong>Elisyum</strong> citó a un selecto grupo de 80 personas a través de coordenadas GPS enviadas apenas dos horas antes de la cita en la zona industrial abandonada de la ciudad.</p>
                
                <p>Bajo la tenue luz de tubos de neón parpadeantes y al ritmo de un set híbrido de techno industrial oscuro, los modelos caminaron por una pasarela improvisada sobre hormigón agrietado y charcos de agua, vistiendo la nueva colección de estética Cyber-Punk.</p>

                <h4 style="margin: 20px 0 10px 0; text-transform: uppercase; font-weight: 800;">Detalles de la Colección Presentada</h4>
                <table class="tabla-noticia">
                    <thead>
                        <tr>
                            <th>Línea</th>
                            <th>Estilo dominante</th>
                            <th>Detalle Técnico destacado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Neo-Industrial</td>
                            <td>Cyberpunk / Techwear</td>
                            <td>Arneses tácticos integrados</td>
                        </tr>
                        <tr>
                            <td>Anarchist Core</td>
                            <td>Punk Desestructurado</td>
                            <td>Costuras expuestas y desgastados con láser</td>
                        </tr>
                    </tbody>
                </table>

                <p>Este evento consolida el posicionamiento de Elisyum como una marca que no busca la aprobación del sistema tradicional de la moda, sino la conexión directa con la cultura de la calle.</p>
            `
        }
    };

    // 2. SELECCIÓN DE ELEMENTOS DEL DOM
    const modal = document.getElementById("modalNoticia");
    const modalTag = document.getElementById("modalTag");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalFecha = document.getElementById("modalFecha");
    const modalImg = document.getElementById("modalImg");
    const modalCuerpo = document.getElementById("modalCuerpo");
    const closeBtn = document.querySelector(".close-btn");

    // 3. EVENTO PARA ABRIR EL MODAL AL DAR CLIC EN "LEER MÁS"
    document.addEventListener("click", (e) => {
        // Buscamos si el clic fue en un botón con la clase "btn-leer"
        if (e.target.classList.contains("btn-leer")) {
            e.preventDefault(); // Evitamos que refresque o mueva la pantalla al usar href="#"
            
            // Obtenemos el id de la noticia desde el atributo "data-id"
            const noticiaId = e.target.getAttribute("data-id");
            const noticia = noticiasData[noticiaId];

            if (noticia) {
                // Rellenamos el modal con los datos correspondientes
                modalTag.textContent = noticia.tag;
                modalTitulo.textContent = noticia.titulo;
                modalFecha.textContent = noticia.fecha;
                modalImg.src = noticia.img;
                modalImg.alt = noticia.titulo;
                modalCuerpo.innerHTML = noticia.cuerpo;

                // Mostramos el modal aplicando un estilo flexible o block
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Desactivamos scroll de fondo
            }
        }
    });

    // 4. FUNCION PARA CERRAR EL MODAL
    const cerrarModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Reestablecemos scroll
    };

    // Cerrar al pulsar el botón de 'X'
    if (closeBtn) {
        closeBtn.addEventListener("click", cerrarModal);
    }

    // Cerrar al hacer clic fuera de la caja blanca del modal (en el fondo oscuro)
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // Cerrar presionando la tecla Escape (teclado)
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "block") {
            cerrarModal();
        }
    });
});
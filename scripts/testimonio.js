document.addEventListener("DOMContentLoaded", () => {
    const estrellas = document.querySelectorAll(".star");
    const ratingValue = document.getElementById("ratingValue");
    const formTestimonio = document.getElementById("formTestimonio");
    const testimoniosGrid = document.getElementById("testimoniosGrid");
    const fotoInput = document.getElementById("fotoInput");

   
    function destacarEstrellas(maxValor) {
        estrellas.forEach(st => {
            const valorEstrella = parseInt(st.getAttribute("data-value"));
            if (valorEstrella <= maxValor) {
                st.classList.add("active");
            } else {
                st.classList.remove("active");
            }
        });
    }

    // Inicializar con 5 estrellas por defecto
    if (estrellas.length > 0) {
        destacarEstrellas(5);

        estrellas.forEach(estrella => {
            // Efecto Hover visual al pasar por encima
            estrella.addEventListener("mouseover", () => {
                const valorHover = parseInt(estrella.getAttribute("data-value"));
                destacarEstrellas(valorHover);
            });

            // Volver al valor real seleccionado cuando el mouse sale
            estrella.addEventListener("mouseout", () => {
                const valorSeleccionado = parseInt(ratingValue.value);
                destacarEstrellas(valorSeleccionado);
            });

            // Al hacer clic, se bloquea el valor en el input hidden
            estrella.addEventListener("click", () => {
                const valorClicado = estrella.getAttribute("data-value");
                ratingValue.value = valorClicado;
                destacarEstrellas(parseInt(valorClicado));
            });
        });
    }


    if (formTestimonio && testimoniosGrid) {
        formTestimonio.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombreInput").value.trim();
            const mensaje = document.getElementById("mensajeInput").value.trim();
            const calificacion = parseInt(ratingValue.value);

            // Generar los caracteres de estrella según la puntuación (ej: ★★★★☆)
            let estrellasTexto = "";
            for (let i = 1; i <= 5; i++) {
                estrellasTexto += (i <= calificacion) ? "★" : "☆";
            }

            // Función interna para renderizar y estructurar la nueva tarjeta
            const renderizarNuevaCard = (avatarSrc) => {
                const nuevaCard = document.createElement("article");
                nuevaCard.classList.add("testimonio-card");
                
                // Estilos de transición inicial para efecto de fade-in
                nuevaCard.style.opacity = "0";
                nuevaCard.style.transform = "translateY(25px)";
                nuevaCard.style.transition = "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)";

                nuevaCard.innerHTML = `
                    <div class="card-top">
                        <div class="user-meta">
                            <img src="${avatarSrc}" alt="${nombre}" class="user-avatar">
                            <div class="user-info">
                                <h4>${nombre}</h4>
                                <span class="user-tag">Verificado</span>
                            </div>
                        </div>
                        <div class="stars">${estrellasTexto}</div>
                    </div>
                    <p class="testimonio-text">"${mensaje}"</p>
                    <span class="date-tag">Ahora mismo</span>
                `;

                // Insertar al inicio de la grilla (efecto Drop)
                testimoniosGrid.prepend(nuevaCard);

                // Disparar la transición suave
                setTimeout(() => {
                    nuevaCard.style.opacity = "1";
                    nuevaCard.style.transform = "translateY(0)";
                }, 50);

                // Resetear el formulario e inicializar a 5 estrellas
                formTestimonio.reset();
                ratingValue.value = "5";
                destacarEstrellas(5);
            };

            // Verificar si el usuario ha subido un archivo de foto
            if (fotoInput && fotoInput.files && fotoInput.files[0]) {
                const lector = new FileReader();
                lector.onload = function(event) {
                    // Renderiza usando la imagen local subida mediante Base64
                    renderizarNuevaCard(event.target.result);
                };
                lector.readAsDataURL(fotoInput.files[0]);
            } else {
                // Si no subió foto, generamos un avatar aleatorio estético de internet
                const randomId = Math.floor(Math.random() * 70) + 10;
                const avatarAleatorio = `https://picsum.photos/id/${randomId}/150/150`;
                renderizarNuevaCard(avatarAleatorio);
            }
        });
    }
});
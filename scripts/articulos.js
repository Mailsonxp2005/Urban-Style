document.addEventListener("DOMContentLoaded", () => {
    
    const formNewsletter = document.getElementById("form-newsletter");
    const successMessage = document.getElementById("newsletter-success");

    // Lógica del Formulario de Suscripción
    if (formNewsletter && successMessage) {
        formNewsletter.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            formNewsletter.style.display = "none";
            successMessage.classList.add("show");
            
            formNewsletter.reset();
        });
    }

    // Cerrar modales haciendo clic en la capa de fondo (Overlay)
    const modalOverlays = document.querySelectorAll(".modal-overlay");

    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                window.location.hash = "#";
            }
        });
    });

    // Cerrar modales presionando la tecla Escape (Esc)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (window.location.hash && window.location.hash !== "#") {
                window.location.hash = "#";
            }
        }
    });

});
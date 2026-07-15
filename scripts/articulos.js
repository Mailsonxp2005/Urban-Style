document.addEventListener("DOMContentLoaded", () => {
    
    
    const formNewsletter = document.getElementById("form-newsletter");
    const successMessage = document.getElementById("newsletter-success");

    if (formNewsletter && successMessage) {
        formNewsletter.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            formNewsletter.style.display = "none";
            
            successMessage.classList.add("show");
            
            formNewsletter.reset();
        });
    }

    const modalOverlays = document.querySelectorAll(".modal-overlay");

    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                window.location.hash = "#";
            }
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (window.location.hash && window.location.hash !== "#") {
                window.location.hash = "#";
            }
        }
    });

});
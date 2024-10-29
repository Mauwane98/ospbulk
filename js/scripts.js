document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");

    // Check for existing dismissal status and its expiration
    const popupDismissed = localStorage.getItem("popupDismissed");
    const dismissDate = localStorage.getItem("dismissDate");
    const today = new Date().getTime();

    // Show the popup if it hasn't been dismissed or the dismissal period has expired
    if (!popupDismissed || (dismissDate && today > dismissDate)) {
        setTimeout(() => {
            popup.style.display = "flex"; // Show popup
        }, 3000); // Adjust delay as needed
    }

    // Close popup and store dismissal in localStorage with an expiration date (e.g., 7 days)
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
        localStorage.setItem("popupDismissed", "true");
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // Set to expire in 7 days
        localStorage.setItem("dismissDate", expiryDate.getTime());
    });
});

    // JavaScript for toggling the menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close navigation when clicking on a link (for small screens)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }

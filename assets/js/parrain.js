document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTION DU MENU MOBILE ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animation simple du bouton (optionnel)
            menuToggle.classList.toggle('open');
        });
    }

    // --- 2. GESTION DU SÉLECTEUR DE LANGUE ---
    const langSelect = document.getElementById('langSelect');
    
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            console.log("Langue choisie : " + selectedLang);
            
            // Ici, tu pourras ajouter la logique de traduction plus tard
            // Pour l'instant, on enregistre le choix pour s'en souvenir
            localStorage.setItem('hubisoccer_lang', selectedLang);
        });

        // Charger la langue sauvegardée au démarrage
        const savedLang = localStorage.getItem('hubisoccer_lang');
        if (savedLang) {
            langSelect.value = savedLang;
        }
    }

    // --- 3. EFFET DE NAVIGATION AU SCROLL ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
            nav.style.padding = "10px 5%"; // Rétrécit un peu la barre au scroll
        } else {
            nav.style.boxShadow = "none";
            nav.style.padding = "20px 5%";
        }
    });

});

// Afficher/Masquer le mot de passe
function togglePass(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// Sélection du profil (Rôle)
function setRole(element) {
    document.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
}

// Menu Hamburger Mobile
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

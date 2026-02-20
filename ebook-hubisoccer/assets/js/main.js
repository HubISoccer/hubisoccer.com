// Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

/**
 * Générateur d'ID HubISoccer
 * phone: string, birthDate: string (YYYY-MM-DD), countryCode: string (ex: "BJ")
 */
function generateHubID(phone, birthDate, countryCode) {
    const lastThreePhone = phone.slice(-3);
    
    // Calcul de l'âge
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    const formattedAge = age.toString().padStart(3, '0');

    // Date du jour
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();

    // Format final : 266HU028BIBJ16022026
    return `${lastThreePhone}HU${formattedAge}BI${countryCode.toUpperCase()}${day}${month}${year}`;
}

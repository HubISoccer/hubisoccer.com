/**
 * Logique spécifique à la page de Vérification de Statut
 */

function triggerMedicalUpload() {
    const input = document.getElementById('medicalUpload');
    if (input) input.click();
}

function triggerInscripUpload() {
    const input = document.getElementById('inscripUpload');
    if (input) input.click();
}

// Fonction pour copier l'ID du joueur au clic sur le QR Code (exemple d'interaction)
function copyPlayerID() {
    const playerID = document.getElementById('playerID').innerText;
    navigator.clipboard.writeText(playerID).then(() => {
        alert("ID Joueur copié : " + playerID);
    }).catch(err => {
        console.error('Erreur lors de la copie : ', err);
    });
}

// Listener pour détecter quand un fichier est choisi (Médical)
document.getElementById('medicalUpload')?.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        alert("Certificat Médical reçu : " + this.files[0].name + ". Analyse en cours par HubISoccer.");
    }
});

// Listener pour détecter quand un fichier est choisi (Inscription)
document.getElementById('inscripUpload')?.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        alert("Preuve d'inscription reçue : " + this.files[0].name + ". Votre kit sera bientôt disponible.");
    }
});

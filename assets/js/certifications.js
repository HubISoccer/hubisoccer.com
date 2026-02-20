function addCert() {
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const type = document.getElementById('type').value;
    const file = document.getElementById('certFile').files[0];

    if(!title || !year || !file) {
        alert("Attention Ozawa, veuillez remplir tous les champs et sélectionner un fichier.");
        return;
    }
    
    // Animation de succès
    const btn = document.querySelector('.btn-gold-full');
    btn.innerText = "Transmission en cours...";
    btn.disabled = true;

    setTimeout(() => {
        alert("Merci Ozawa ! Le document '" + title + "' (" + type + ") a été transmis à la Fédération HubISoccer pour validation.");
        btn.innerText = "Soumettre pour vérification";
        btn.disabled = false;
        document.getElementById('certForm').reset();
    }, 1500);
}

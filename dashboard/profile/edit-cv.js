/**
 * HUBISOCCER ELITE CV ENGINE
 * Client: Ozawa
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTION DU MENU LATÉRAL ---
    const menuBtn = document.getElementById('dashboardMenuTrigger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeSidebar');
    
    if (menuBtn) menuBtn.onclick = () => sidebar.classList.add('open');
    if (closeBtn) closeBtn.onclick = () => sidebar.classList.remove('open');
    
    // --- 2. SYNCHRONISATION EN TEMPS RÉEL ---
    // Cette fonction est globale (window.) pour être appelée par oninput dans le HTML
    window.syncCV = () => {
        // Identité & Poste
        const posInput = document.getElementById('in-position');
        if (posInput) {
            document.getElementById('out-position').textContent = posInput.value.toUpperCase();
        }
        
        // Mensurations
        document.getElementById('out-height').textContent = (document.getElementById('in-height').value || '--') + ' cm';
        document.getElementById('out-weight').textContent = (document.getElementById('in-weight').value || '--') + ' kg';
        document.getElementById('out-foot').textContent = document.getElementById('in-foot').value;
        
        // Statistiques
        document.getElementById('out-goals').textContent = document.getElementById('in-goals').value || '0';
        document.getElementById('out-apps').textContent = document.getElementById('in-apps').value || '0';
        
        // Biographie
        document.getElementById('out-bio').textContent = document.getElementById('in-bio').value || 'En attente de saisie...';
        
        // Historique des Clubs (Dynamique)
        const container = document.getElementById('experience-container');
        const rows = container.querySelectorAll('.experience-row');
        const listOutput = document.getElementById('out-experience-list');
        
        listOutput.innerHTML = ''; // Reset de la liste sur le A4
        
        rows.forEach(row => {
            const club = row.querySelector('.exp-club').value;
            const date = row.querySelector('.exp-date').value;
            if (club.trim() !== "") {
                const li = document.createElement('li');
                li.style.marginBottom = "5px";
                li.innerHTML = `<strong>${club}</strong> <span style="float:right">${date}</span>`;
                listOutput.appendChild(li);
            }
        });
    };
    
    // --- 3. AJOUT DYNAMIQUE DE CLUBS ---
    window.addExpRow = () => {
        const container = document.getElementById('experience-container');
        const newRow = document.createElement('div');
        newRow.className = 'experience-row';
        newRow.style.marginTop = '10px';
        newRow.innerHTML = `
            <input type="text" placeholder="Nom du Club" class="exp-club" oninput="syncCV()">
            <input type="text" placeholder="Ex: 2024 - 2026" class="exp-date" oninput="syncCV()">
        `;
        container.appendChild(newRow);
    };
    
    // --- 4. SAUVEGARDE LOCALE ---
    window.saveData = () => {
        const data = {
            position: document.getElementById('in-position').value,
            height: document.getElementById('in-height').value,
            weight: document.getElementById('in-weight').value,
            bio: document.getElementById('in-bio').value,
            apps: document.getElementById('in-apps').value,
            goals: document.getElementById('in-goals').value
        };
        localStorage.setItem('hub_cv_ozawa_data', JSON.stringify(data));
        alert("✅ Ozawa, ton profil a été mis à jour avec succès dans la base HubISoccer.");
    };
    
    // --- 5. EXPORT PDF HD ---
    window.exportToPDF = () => {
        // On s'assure que la modale est fermée pour ne pas gêner l'impression
        closePreview();
        // Lancement de l'impression (Le CSS @media print fera le reste)
        window.print();
    };
});

// --- 6. GESTION DE LA MODALE D'APERÇU (Hors DOMContentLoaded pour accès direct) ---
function openPreview() {
    window.syncCV(); // Toujours synchroniser avant d'ouvrir
    document.getElementById('previewModal').style.display = "flex";
    document.body.style.overflow = "hidden"; // Empêche le scroll derrière
}

function closePreview() {
    document.getElementById('previewModal').style.display = "none";
    document.body.style.overflow = "auto"; // Réactive le scroll
}

// Fermeture au clic à l'extérieur
window.addEventListener('click', (event) => {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closePreview();
    }
});
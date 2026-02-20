const ProfilApp = {
    // Base de données (à synchroniser avec scouting.js)
    players: [
        { 
            id: "0001", name: "Koffi B.", country: "Bénin", age: "16 ans", 
            pos: "Attaquant", img: "maillot_koffi.jpg", cert: "CAP Mécanique", 
            pied: "Droit", club: "Académie Calavi", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
        },
        { 
            id: "0004", name: "Carlos M.", country: "Brésil", age: "21 ans", 
            pos: "Milieu", img: "maillot_carlos.jpg", cert: "Soudure", 
            pied: "Gauche", club: "Santos FC", video: "" 
        }
    ],

    init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        this.render(id);
    },

    render(id) {
        const player = this.players.find(p => p.id === id);
        const container = document.getElementById('profilContent');

        if (!player) {
            container.innerHTML = "<div class='error'>Joueur introuvable</div>";
            return;
        }

        container.innerHTML = `
            <div class="player-card-hero">
                <div class="hero-img">
                    <img src="../assets/img/${player.img}" alt="${player.name}">
                </div>
                <div class="hero-details">
                    <span class="hub-id">HUBI-ID: ${player.id}</span>
                    <h1>${player.name}</h1>
                    <p style="font-size: 1.2rem; color: #64748b;">📍 ${player.country}</p>

                    <div class="stats-grid">
                        <div class="stat-box"><span class="stat-label">Âge</span><span class="stat-value">${player.age}</span></div>
                        <div class="stat-box"><span class="stat-label">Poste</span><span class="stat-value">${player.pos}</span></div>
                        <div class="stat-box"><span class="stat-label">Pied</span><span class="stat-value">${player.pied}</span></div>
                        <div class="stat-box"><span class="stat-label">Club</span><span class="stat-value">${player.club}</span></div>
                    </div>
                </div>
            </div>

            ${player.video ? `
            <div class="video-section">
                <iframe src="${player.video}" allowfullscreen></iframe>
            </div>` : ''}

            <div class="cert-section">
                <h2 style="color: var(--primary); margin-bottom: 20px;">Certification HubISoccer</h2>
                <div class="cert-item">
                    <span style="font-size: 2rem;">🎓</span>
                    <div>
                        <strong>Diplôme Professionnel Certifié</strong><br>
                        <span style="color: var(--gold)">Spécialité : ${player.cert}</span>
                    </div>
                </div>
                
                <a href="mailto:recrutement@hubisoccer.com?subject=Recrutement ID ${player.id}" class="btn-contact-pro">
                    OUVRIR LES NÉGOCIATIONS
                </a>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => ProfilApp.init());
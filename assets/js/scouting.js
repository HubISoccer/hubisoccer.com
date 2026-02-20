/**
 * HubISoccer Scouting System
 * Logic for 10,000+ Players Database
 */

const ScoutingApp = {
    // 1. Données de traduction
    langData: {
        "fr": { "title": "Base de Données Mondiale HubISoccer", "subtitle": "10 000 talents détectés.", "btn-search": "Rechercher", "recent-talents": "Talents Récents", "diploma": "🎓 CERTIFICATION", "access": "Voir Profil" },
        "en": { "title": "HubISoccer World Database", "subtitle": "10,000 talents detected.", "btn-search": "Search", "recent-talents": "Recent Talents", "diploma": "🎓 CERTIFICATION", "access": "View Profile" },
        "fon": { "title": "HubISoccer Azɔ̌watɛn gangan", "subtitle": "Mɛ 10 000 wɛ ɖò bǐ tɛntin.", "btn-search": "Ba kpɔ́n", "recent-talents": "Mɛ yɔyɔ́ lɛ́", "diploma": "🎓 WĚMA VƐ́NƐ́", "access": "Kpɔ́n tɛn ɔ" }
    },

    // 2. Mock Data (À remplacer par un appel API plus tard)
    players: [
        { id: "0001", name: "Koffi B.", country: "Bénin", img: "joueur1.jpg", cat: "mineur", cert: "CAP Mécanique" },
        { id: "0002", name: "Moussa D.", country: "Sénégal", img: "joueur2.jpg", cat: "adulte", cert: "BAC G2" },
        { id: "0003", name: "Lucas R.", country: "France", img: "joueur3.jpg", cat: "mineur", cert: "Brevet Pro" },
        { id: "0004", name: "Carlos M.", country: "Brésil", img: "joueur4.jpg", cat: "adulte", cert: "Soudure" }
    ],

    init() {
        this.bindEvents();
        this.loadLanguage();
    },

    bindEvents() {
        document.getElementById('langSelect').addEventListener('change', (e) => this.translate(e.target.value));
        document.getElementById('btnSearch').addEventListener('click', () => this.handleSearch());
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('navLinks').classList.toggle('active');
        });
    },

    loadLanguage() {
        const saved = localStorage.getItem('hubiLang') || 'fr';
        document.getElementById('langSelect').value = saved;
        this.translate(saved);
    },

    translate(lang) {
        localStorage.setItem('hubiLang', lang);
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (this.langData[lang] && this.langData[lang][key]) {
                el.innerText = this.langData[lang][key];
            }
        });
        this.renderPlayers();
    },

    renderPlayers(filter = "") {
        const grid = document.getElementById('playerGrid');
        const lang = localStorage.getItem('hubiLang') || 'fr';
        grid.innerHTML = "";

        const filtered = this.players.filter(p => 
            p.country.toLowerCase().includes(filter.toLowerCase()) || 
            p.name.toLowerCase().includes(filter.toLowerCase())
        );

        filtered.forEach(p => {
            grid.innerHTML += `
                <div class="card">
                    <span class="badge-status ${p.cat}">${p.cat === 'mineur' ? 'U17 Mineur' : '18+ Adulte'}</span>
                    <img src="../assets/img/${p.img}" class="player-img" onerror="this.src='../assets/img/player-placeholder.png'">
                    <div class="card-body">
                        <h3>${p.name}</h3>
                        <p>📍 ${p.country} (ID: ${p.id})</p>
                        <div class="academic-badge">${this.langData[lang].diploma} : ${p.cert}</div>
                        <a href="profil-joueur.html?id=${p.id}" class="btn-social">${this.langData[lang].access}</a>
                    </div>
                </div>`;
        });
    },

    handleSearch() {
        const val = document.getElementById('countrySearch').value;
        this.renderPlayers(val);
    }
};

document.addEventListener('DOMContentLoaded', () => ScoutingApp.init());
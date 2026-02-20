/**
 * HubISoccer - Tournament Logic
 * Author: Ozawa / The Hub of Inspiration of Soccer
 * Version: 1.1.0
 */

const HubApp = {
    // 1. Configuration des traductions
    translations: {
        fr: {
            title: "HubISoccer Tournament",
            nextEvent: "PROCHAIN ÉVÉNEMENT",
            limitText: "Places limitées : plus que {n} places disponibles."
        },
        en: {
            title: "HubISoccer Tournament",
            nextEvent: "NEXT EVENT",
            limitText: "Limited spots: only {n} remaining."
        },
        fon: {
            title: "HubISoccer Tournament",
            nextEvent: "NǓ Ě JǍ É",
            limitText: "Mɛ {n} kɛɖɛ wɛ na mɔ tɛn."
        }
    },

    // 2. Initialisation
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadUserPreferences();
        console.log("HubISoccer Engine Started...");
    },

    // 3. Mise en cache des éléments (Performance)
    cacheDOM() {
        this.langSelect = document.getElementById('langSelect');
        this.navLinks = document.getElementById('navLinks');
        this.menuBtn = document.querySelector('.menu-toggle');
        this.limitDisplay = document.querySelector('.limit-text');
    },

    // 4. Écouteurs d'événements
    bindEvents() {
        if (this.langSelect) {
            this.langSelect.addEventListener('change', (e) => this.setLanguage(e.target.value));
        }

        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleNavigation());
        }

        // Fermeture automatique du menu au clic sur un lien (UX Mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => this.closeNavigation());
        });
    },

    // 5. Logique de Navigation
    toggleNavigation() {
        this.navLinks.classList.toggle('active');
        this.menuBtn.classList.toggle('is-active'); // Pour une animation burger pro
    },

    closeNavigation() {
        if (this.navLinks.classList.contains('active')) {
            this.navLinks.classList.remove('active');
            this.menuBtn.classList.remove('is-active');
        }
    },

    // 6. Internationalisation (i18n)
    setLanguage(lang) {
        localStorage.setItem('hub_pref_lang', lang);
        document.documentElement.lang = lang;
        
        // Gestion de la direction (Arabe/Hebreu)
        document.body.dir = (['ar', 'fa', 'he'].includes(lang)) ? 'rtl' : 'ltr';

        this.applyTranslations(lang);
    },

    applyTranslations(lang) {
        const dictionary = this.translations[lang] || this.translations['fr'];
        
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (dictionary[key]) {
                el.textContent = dictionary[key];
            }
        });
    },

    loadUserPreferences() {
        const lang = localStorage.getItem('hub_pref_lang') || 'fr';
        if (this.langSelect) this.langSelect.value = lang;
        this.setLanguage(lang);
    }
};

// Lancement propre
document.addEventListener('DOMContentLoaded', () => HubApp.init());
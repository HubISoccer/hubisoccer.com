/**
 * HUBISOCCER - LIVE TOURNAMENT ENGINE
 * Client: Ozawa
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTION DU MENU LATÉRAL (SIDEBAR) ---
    const menuBtn = document.getElementById('dashboardMenuTrigger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeSidebar');

    if (menuBtn && sidebar) {
        menuBtn.onclick = () => {
            sidebar.classList.add('open');
        };
    }

    if (closeBtn && sidebar) {
        closeBtn.onclick = () => {
            sidebar.classList.remove('open');
        };
    }

    // Fermer la sidebar si on clique en dehors (sur le reste de la page)
    document.addEventListener('click', (event) => {
        if (sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(event.target) && event.target !== menuBtn) {
                sidebar.classList.remove('open');
            }
        }
    });

    // --- 2. SYSTÈME DE CHAT LIVE ---
    const chatInput = document.getElementById('chatIn');
    const chatMsgs = document.getElementById('chatMsgs');

    window.sendMsg = () => {
        const messageText = chatInput.value.trim();

        if (messageText !== "") {
            // Création de l'élément message
            const newMsg = document.createElement('div');
            newMsg.className = 'msg';
            // On utilise ton nom "Ozawa" par défaut pour tes messages
            newMsg.innerHTML = `<b>Ozawa :</b> ${messageText}`;
            
            // Ajout au container
            chatMsgs.appendChild(newMsg);
            
            // Scroll automatique vers le bas pour voir le dernier message
            chatMsgs.scrollTop = chatMsgs.scrollHeight;
            
            // On vide l'input
            chatInput.value = "";
        }
    };

    // Permettre l'envoi avec la touche "Entrée"
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMsg();
            }
        });
    }

    // --- 3. SÉLECTEUR DE LANGUE (Logique de base) ---
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.onchange = () => {
            const lang = langSelect.value;
            console.log("Langue changée en : " + lang);
            // Ici tu pourras ajouter ta logique de traduction plus tard
        };
    }
});

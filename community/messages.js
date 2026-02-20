/* --- CONFIGURATION & DONNÉES --- */
const STORAGE_KEY = "hubisoccer_messages_v2";

const contacts = [
  { id: "agent-fifa", name: "Agent FIFA", avatar: "../assets/img/agent-fifa.jpg", online: true, last: "Le contrat est prêt..." },
  { id: "coach-mensah", name: "Coach Mensah", avatar: "../assets/img/coach.jpg", online: false, last: "Bien joué !" },
  { id: "manager", name: "Manager Club", avatar: "../assets/img/user1.jpg", online: true, last: "RDV demain." }
];

// Chargement des messages depuis le stockage local
let threads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  "agent-fifa": [{ from: "them", text: "Bonjour Ozawa, as-tu reçu les documents ?", time: Date.now() - 3600000 }],
  "coach-mensah": [], 
  "manager": []
};

let currentId = "agent-fifa";

/* --- FONCTIONS DE RENDU --- */

// Affiche la liste des contacts à gauche
function renderContacts() {
  const list = document.getElementById("contactsList");
  if (!list) return;
  list.innerHTML = "";
  
  contacts.forEach(c => {
    const li = document.createElement("li");
    li.className = `contact-item ${c.id === currentId ? 'active' : ''}`;
    li.onclick = () => loadChat(c.id);
    li.innerHTML = `
      <div class="avatar">
        <img src="${c.avatar}" alt="${c.name}">
        <span class="status-dot" style="background:${c.online ? '#44b700' : '#ccc'}"></span>
      </div>
      <div>
        <div style="font-weight:600">${c.name}</div>
        <small style="color:#666">${c.last}</small>
      </div>`;
    list.appendChild(li);
  });
}

// Charge la discussion sélectionnée
function loadChat(id) {
  currentId = id;
  const c = contacts.find(x => x.id === id);
  
  document.getElementById("chatWith").innerText = c.name;
  document.getElementById("headerAvatar").src = c.avatar;
  document.getElementById("chatStatus").innerText = c.online ? "En ligne" : "Hors ligne";
  
  renderMessages();
  renderContacts();
}

// Affiche les messages dans la fenêtre de tchat
function renderMessages() {
  const body = document.getElementById("chatBody");
  if (!body) return;
  body.innerHTML = "";
  
  (threads[currentId] || []).forEach(m => {
    const div = document.createElement("div");
    div.className = `msg ${m.from === "me" ? "sent" : "received"}`;
    div.innerHTML = `
      <div class="bubble">${m.text}</div>
      <div class="meta">Maintenant</div>
    `;
    body.appendChild(div);
  });
  body.scrollTop = body.scrollHeight;
}

// Envoie un nouveau message
function sendMessage() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();
  if (!text) return;

  if(!threads[currentId]) threads[currentId] = [];
  threads[currentId].push({ from: "me", text, time: Date.now() });
  
  // Sauvegarde locale
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  
  input.value = "";
  renderMessages();
}

/* --- INITIALISATION & ÉVÉNEMENTS --- */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Lancement du tchat
  renderContacts();
  loadChat(currentId);

  // 2. Gestion des messages
  document.getElementById("sendBtn").onclick = sendMessage;
  document.getElementById("msgInput").onkeypress = (e) => { 
    if(e.key === "Enter") sendMessage(); 
  };
  
  // 3. Gestion de la Sidebar (Menu) et de l'Overlay
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const menuToggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("closeSidebar");

  if (menuToggle && sidebar && overlay) {
    // Ouvrir le menu
    menuToggle.onclick = () => {
      sidebar.classList.add("open");
      overlay.style.display = "block";
    };

    // Fermer le menu (Bouton X)
    closeBtn.onclick = () => {
      sidebar.classList.remove("open");
      overlay.style.display = "none";
    };

    // Fermer le menu en cliquant sur le fond sombre
    overlay.onclick = () => {
      sidebar.classList.remove("open");
      overlay.style.display = "none";
    };
  }
});

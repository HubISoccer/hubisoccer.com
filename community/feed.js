document.addEventListener('DOMContentLoaded', () => {
    // --- SÉLECTEURS ---
    const postsContainer = document.getElementById('postsContainer');
    const postTemplate = document.getElementById('postTemplate');
    const postInput = document.getElementById('postInput');
    const publishBtn = document.getElementById('publishBtn');
    const previewBtn = document.getElementById('previewBtn');
    const fileInput = document.getElementById('fileInput');
    const addPhotoBtn = document.getElementById('addPhotoBtn');
    const mediaPreview = document.getElementById('mediaPreview');
    const modalOverlay = document.getElementById('modalOverlay');

    // --- ÉTAT DES DONNÉES (Chargement depuis la mémoire du navigateur) ---
    // --- ÉTAT DES DONNÉES (Grande Mémoire IndexedDB) ---
    let posts = [];
    let db;
    const request = indexedDB.open("HubISoccerDB", 1);

    request.onupgradeneeded = (e) => {
        db = e.target.result;
        if (!db.objectStoreNames.contains("posts")) {
            db.createObjectStore("posts", { keyPath: "id" });
        }
    };

    request.onsuccess = (e) => {
        db = e.target.result;
        loadPostsFromDB(); // Charge les posts enregistrés
    };

    function loadPostsFromDB() {
        const transaction = db.transaction(["posts"], "readonly");
        const store = transaction.objectStore("posts");
        const getAll = store.getAll();
        getAll.onsuccess = () => {
            posts = getAll.result.length > 0 ? getAll.result : [];
            renderPosts();
        };
    }


    let selectedFiles = [];

    // --- FONCTIONS DE GESTION DES MÉDIAS ---
    addPhotoBtn.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                selectedFiles.push({ type: file.type, data: event.target.result });
                updateMediaPreview();
            };
            reader.readAsDataURL(file);
        });
    };

    function updateMediaPreview() {
        mediaPreview.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.className = 'media-thumb';
            if (file.type.startsWith('video/')) {
                div.innerHTML = `<video src="${file.data}" style="width:100px;height:100px;object-fit:cover;"></video>`;
            } else {
                div.innerHTML = `<img src="${file.data}" style="width:100px;height:100px;object-fit:cover;">`;
            }
            // Bouton supprimer l'image de l'aperçu
            div.onclick = () => { selectedFiles.splice(index, 1); updateMediaPreview(); };
            mediaPreview.appendChild(div);
        });
    }

    // --- LE MOTEUR DE RENDU (L'AFFICHAGE) ---
    function renderPosts() {
        postsContainer.innerHTML = '';
        
        // Tri : Les posts épinglés (pinned) passent en premier
        const sortedPosts = [...posts].sort((a, b) => (b.pinned - a.pinned));

        sortedPosts.forEach(post => {
            const clone = postTemplate.content.cloneNode(true);
            const card = clone.querySelector('.post-card');
            
            // Si épinglé, on ajoute un style visuel
            if(post.pinned) card.style.borderLeft = "5px solid var(--accent-gold)";

            // Remplissage texte
            clone.querySelector('.user-avatar').src = "../assets/img/user1.jpg";
            clone.querySelector('.user-name').textContent = post.author;
            clone.querySelector('.user-sub').innerHTML = (post.pinned ? "📌 Épinglé • " : "") + `Il y a ${post.time}`;
            clone.querySelector('.post-content').textContent = post.content;
            clone.querySelector('.likes-count').textContent = post.likes;
            clone.querySelector('.dislikes-count').textContent = post.dislikes;

            // Remplissage Médias
            const mediaBox = clone.querySelector('.post-media');
            mediaBox.innerHTML = '';
            post.media.forEach(m => {
                let el = m.type.startsWith('video/') ? document.createElement('video') : document.createElement('img');
                el.src = m.data;
                el.controls = true;
                el.style.maxWidth = "100%";
                mediaBox.appendChild(el);
            });

            // --- ACTIONS DU MENU (LES BOUTONS QUI NE MARCHAIENT PAS) ---
            const menu = clone.querySelector('.post-action-menu');
            clone.querySelector('.more-btn').onclick = () => menu.hidden = !menu.hidden;

            // 6. Épingler
            clone.querySelector('.pin-post').onclick = () => {
                post.pinned = !post.pinned;
                saveAndRender();
            };

            // 7. Modifier
            clone.querySelector('.edit-post-btn').onclick = () => {
                const newText = prompt("Modifier votre publication :", post.content);
                if(newText) { post.content = newText; saveAndRender(); }
            };

            // 4. Supprimer
            clone.querySelector('.delete-post').onclick = () => {
                if(confirm("Supprimer ?")) {
                    posts = posts.filter(p => p.id !== post.id);
                    saveAndRender();
                }
            };

            // 9. Bloquer commentaires
            clone.querySelector('.block-user-btn').onclick = () => {
                post.commentsBlocked = !post.commentsBlocked;
                alert(post.commentsBlocked ? "Commentaires bloqués" : "Commentaires autorisés");
                saveAndRender();
            };

            // 11. Analytics
            clone.querySelector('.view-analytics-btn').onclick = () => {
                openModal("Analytics - " + post.author, `
                    <p>📈 Portée : ${Math.floor(post.likes * 1.5 + 10)} vues</p>
                    <p>❤️ Engagement : ${post.likes} likes / ${post.dislikes} dislikes</p>
                    <p>💬 Discussions : ${post.comments.length} commentaires</p>
                `);
            };

            // 10. Signaler
            clone.querySelector('.report-post-btn').onclick = () => alert("Signalement envoyé aux modérateurs.");

            // 8. Masquer
            clone.querySelector('.mute-user-btn').onclick = () => {
                card.style.opacity = "0.3";
                alert("Cette publication a été masquée pour vous.");
            };

            // --- INTERACTIONS BAS DE POST ---
            // Like / Dislike
            clone.querySelector('.like-btn').onclick = () => { post.likes++; saveAndRender(); };
            clone.querySelector('.dislike-btn').onclick = () => { post.dislikes++; saveAndRender(); };

            // 5. Partager
            clone.querySelector('.share-btn').onclick = () => {
                const link = window.location.href + "?post=" + post.id;
                navigator.clipboard.writeText(link);
                alert("Lien de la publication copié ! Partagez-le avec vos recruteurs.");
            };

            // --- GESTION COMMENTAIRES & RÉPONSES (🔝) ---
            const commSection = clone.querySelector('.comments-section');
            const commList = clone.querySelector('.existing-comments');
            clone.querySelector('.comment-trigger').onclick = () => commSection.hidden = !commSection.hidden;

            if(post.commentsBlocked) {
                clone.querySelector('.comment-input').disabled = true;
                clone.querySelector('.comment-input').placeholder = "Commentaires désactivés";
            }

            post.comments.forEach(c => {
                const div = document.createElement('div');
                div.style.padding = "5px";
                div.style.borderBottom = "1px solid #eee";
                div.innerHTML = `<strong>Visiteur :</strong> ${c} <br> <button style="font-size:0.7rem; border:none; background:none; color:blue; cursor:pointer;">🔝 Répondre</button>`;
                commList.appendChild(div);
            });

            clone.querySelector('.post-comment').onclick = () => {
                const val = card.querySelector('.comment-input').value;
                if(val) { post.comments.push(val); saveAndRender(); }
            };

            postsContainer.appendChild(clone);
        });
        
        document.getElementById('postsCount').textContent = posts.length;
    }

    // --- PUBLIER & APERÇU ---
        function publish(isDraft = false) {
        const content = postInput.value.trim();
        
        // On vérifie si on a au moins du texte OU un média
        if(!content && selectedFiles.length === 0) {
            alert("Remplissez votre post, Ozawa !");
            return;
        }

        // Création de l'objet avec une copie réelle des fichiers
        const newPost = {
            id: Date.now(),
            author: "Koffi B. SOGLO",
            time: "À l'instant",
            content: content,
            likes: 0,
            dislikes: 0,
            media: Array.from(selectedFiles), // On force la copie
            comments: [],
            pinned: false,
            commentsBlocked: false
        };

        if(isDraft) {
            // Logique de l'aperçu
            let mediaHtml = newPost.media.map(m => 
                m.type.startsWith('video/') 
                ? `<video src="${m.data}" width="100"></video>` 
                : `<img src="${m.data}" width="100">`
            ).join('');

            openModal("Aperçu Ozawa", `
                <div style="padding:10px;">
                    <p><strong>Texte :</strong> ${newPost.content}</p>
                    <div style="display:flex; gap:5px; margin-top:10px;">${mediaHtml}</div>
                </div>
            `, `<button class="btn btn-primary" id="confirmPub">Confirmer la publication</button>`);
            
            document.getElementById('confirmPub').onclick = () => {
                posts.unshift(newPost);
                finalize();
                closeModal();
            };
        } else {
            // Publication directe
            posts.unshift(newPost);
            finalize();
        }
    }


    function finalize() {
        postInput.value = '';
        selectedFiles = [];
        updateMediaPreview();
        saveAndRender();
    }

    publishBtn.onclick = () => publish(false);
    previewBtn.onclick = () => publish(true); // 2. Activer l'Aperçu

function saveAndRender() {
    if (!db) return renderPosts();
    
    const transaction = db.transaction(["posts"], "readwrite");
    const store = transaction.objectStore("posts");
    
    // On vide la base et on remet les posts à jour
    store.clear().onsuccess = () => {
        posts.forEach(post => store.add(post));
    };

    transaction.oncomplete = () => {
        renderPosts();
        console.log("Sauvegarde réussie dans la grande mémoire !");
    };
}

    // --- MODALES & AUTRES ---
    window.openModal = (title, body, footer = "") => {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = body;
        document.getElementById('modalFooter').innerHTML = footer;
        modalOverlay.classList.add('open');
    };
    window.closeModal = () => modalOverlay.classList.remove('open');
    document.getElementById('modalClose').onclick = closeModal;

    // --- BOUTONS ADMINS ---
    document.getElementById('moderationQueueBtn').onclick = () => openModal("Modération", "Aucun contenu suspect pour le moment.");
    document.getElementById('bulkActionsBtn').onclick = () => openModal("Actions en masse", "Fonctionnalité réservée aux administrateurs.");
    document.getElementById('dashboardMenuTrigger').onclick = () => document.getElementById('sidebar').classList.add('open');
    document.getElementById('closeSidebar').onclick = () => document.getElementById('sidebar').classList.remove('open');

    renderPosts();
});
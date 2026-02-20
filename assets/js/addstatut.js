function updateCard() {
    const nom = document.getElementById('in-nom').value.toUpperCase();
    const prenom = document.getElementById('in-prenom').value.toUpperCase();
    const date = document.getElementById('in-date').value;
    const poste = document.getElementById('in-poste').value;

    document.getElementById('card-name').innerText = (nom || prenom) ? `${nom} ${prenom}` : "NOM PRÉNOM";
    document.getElementById('card-date').innerText = date || "--/--/----";
    document.getElementById('card-poste').innerText = poste || "---";
}

function previewFile(input) {
    const preview = document.getElementById('preview-img');
    const noImgText = document.getElementById('no-img');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        preview.style.display = "block";
        noImgText.style.display = "none";
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
        preview.style.display = "none";
        noImgText.style.display = "block";
    }
}

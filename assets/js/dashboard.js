document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('dashboardMenuTrigger');
    const closeBtn = document.getElementById('closeSidebar');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
});

function triggerUpload() { 
    const input = document.getElementById('medicalUpload');
    if(input) input.click(); 
}

function copyID(text) {
    navigator.clipboard.writeText(text).then(() => {
        const span = document.getElementById('playerID');
        if (span) {
            const oldText = span.innerText;
            span.innerText = "Copié ! ✅";
            setTimeout(() => span.innerText = oldText, 2000);
        }
    });
}

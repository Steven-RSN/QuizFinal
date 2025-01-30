const navigation = document.querySelectorAll('.navHeader');
const navTableau = Array.from(navigation)
console.log(navigation)


const urlPage = window.location.href;

// Boucle à travers tous les liens
navTableau.forEach(lien => {
    // Vérifie si le href du lien contient l'URL actuelle
   

        lien.classList.add('active');
    
})
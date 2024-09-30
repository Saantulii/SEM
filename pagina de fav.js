// Función para el botón "name-empresa"
document.querySelector('.name-empresa').addEventListener('click', function() {
    // Intenta volver a la página anterior en el historial
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Si no hay historial anterior, abre una nueva página
        window.open('pagina de empresa.html', '_blank');
    }
});

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const container = document.getElementById('favorites-container');

    if (favorites.length === 0) {
        container.innerHTML = '<p>No tienes productos en favoritos.</p>';
    } else {
        favorites.forEach(product => {
            let productElement = document.createElement('div');
            productElement.classList.add('favorite-product');
            productElement.textContent = product;
            container.appendChild(productElement);
        });
    }
}

// Cargar favoritos al cargar la página
window.onload = loadFavorites;


//CATEGORIAS
function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}
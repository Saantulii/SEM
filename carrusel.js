let index = 0;
const slides = document.querySelector('.carousel-images');
const totalSlides = document.querySelectorAll('.carousel-images img').length;
let interval;

// Función para mover el carrusel
function moveSlide(step) {
    index = (index + step + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Inicia la animación automática
function startCarousel() {
    interval = setInterval(() => moveSlide(1), 3000); // Mueve cada 3 segundos
}

// Detiene la animación automática
function stopCarousel() {
    clearInterval(interval);
}

// Configura los eventos de los botones
document.querySelector('.prev').addEventListener('click', () => {
    stopCarousel();
    moveSlide(-1);
    startCarousel();
});

document.querySelector('.next').addEventListener('click', () => {
    stopCarousel();
    moveSlide(1);
    startCarousel();
});

// Configura los eventos del ratón
document.querySelector('.carousel').addEventListener('mouseover', stopCarousel);
document.querySelector('.carousel').addEventListener('mouseout', startCarousel);

// Inicia el carrusel al cargar la página
window.addEventListener('DOMContentLoaded', startCarousel);

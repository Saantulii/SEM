// Función para el botón "Inicio"
document.querySelector('.inicio').addEventListener('click', function() {
  window.open('pagina de empresa.html', '_blank'); 
});

// Función para el botón "Registrarse"
document.querySelector('.button-registrarse').addEventListener('click', function(event) {
  event.preventDefault(); // Evita el envío del formulario
  window.open('pagina de empresa.html', '_blank');
});

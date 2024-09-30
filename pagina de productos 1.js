function buscar() {
    const buscador = document.getElementById('buscador').value.toLowerCase();
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        const nombreProducto = producto.getAttribute('data-nombre').toLowerCase();
        if (nombreProducto.includes(buscador)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

document.getElementById('buscador').addEventListener('input', buscar);


//CORAZONCITO
document.addEventListener('DOMContentLoaded', function() {
    const favoriteButton = document.querySelector('.btn-favorite');
    const notification = document.getElementById('favorite-notification');
  
    favoriteButton.addEventListener('click', function() {
      // Añadir el producto a favoritos (aquí puedes implementar la lógica para almacenar favoritos)
      notification.textContent = 'Añadido a Favoritos';
      notification.classList.remove('hidden');
      notification.style.display = 'block';
  
      // Ocultar la notificación después de 2 segundos
      setTimeout(function() {
        notification.style.display = 'none';
      }, 2000);
    });
  });
  
  
  
  let carrito = []; // Array para almacenar los productos en el carrito
  
  function addToCart(nombre, precio) {
      // Busca si el producto ya está en el carrito
      const productInCart = carrito.find(producto => producto.nombre === nombre);
      if (productInCart) {
          // Si el producto ya está en el carrito, incrementa la cantidad
          productInCart.cantidad++;
      } else {
          // Si el producto no está en el carrito, agrégalo con cantidad 1
          carrito.push({ nombre, precio, cantidad: 1 });
      }
  
      // Actualiza la visualización del carrito
      updateCart();
  }
  
  function removeProduct(nombre) {
      // Busca el producto en el carrito
      const productInCart = carrito.find(producto => producto.nombre === nombre);
      if (productInCart && productInCart.cantidad > 1) {
          // Si la cantidad es mayor a 1, disminuye la cantidad
          productInCart.cantidad--;
      } else if (productInCart && productInCart.cantidad === 1) {
          // Si la cantidad es 1, elimina el producto del carrito
          carrito = carrito.filter(producto => producto.nombre !== nombre);
      }
  
      // Actualiza la visualización del carrito
      updateCart();
  }
  
  function emptyCart() {
      carrito = []; // Vacía el carrito
      updateCart(); // Actualiza la visualización del carrito
  }
  
  function updateCart() {
      // Obtiene el contenedor del carrito en el DOM
      const carritoContainer = document.getElementById('carrito');
      carritoContainer.innerHTML = ''; // Limpia el contenido actual
  
      let total = 0; // Variable para almacenar el total del carrito
      let totalCantidad = 0; // Variable para almacenar la cantidad total de productos
  
      // Itera sobre los productos en el carrito para crear los elementos HTML correspondientes
      carrito.forEach(producto => {
          const productoElement = document.createElement('div');
          productoElement.className = 'producto-carrito';
          productoElement.innerHTML = `
              <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio * producto.cantidad}</p>
              <button class="btn-ir-producto" onclick="goToProduct('${producto.nombre}')">Ir al producto</button>
              <button class="btn-eliminar" onclick="removeProduct('${producto.nombre}')">-</button>
          `;
          carritoContainer.appendChild(productoElement);
  
          // Suma el precio total del producto al total del carrito
          total += producto.precio * producto.cantidad;
          // Suma la cantidad de productos al total de cantidad
          totalCantidad += producto.cantidad;
      });
  
      // Actualiza el total del carrito en el DOM
      const cartTotalElement = document.getElementById('cart-total');
      if (cartTotalElement) {
          cartTotalElement.innerText = `$${total}`;
      }
  
      // Actualiza la cantidad total en el logo del carrito
      const carritoCantidadElement = document.getElementById('carritoCantidad');
      if (carritoCantidadElement) {
          carritoCantidadElement.innerText = totalCantidad;
      }
  
      // Actualiza el estado de los botones de quitar producto
      document.querySelectorAll('.producto').forEach(producto => {
          const nombreProducto = producto.getAttribute('data-nombre');
          const productInCart = carrito.find(product => product.nombre === nombreProducto);
          const removeButton = producto.querySelector('.btn-eliminar');
          if (productInCart && productInCart.cantidad > 0) {
              removeButton.style.display = 'inline-block';
          } else {
              removeButton.style.display = 'none';
          }
      });
  }
  
  function copyTotal() {
      const cartTotalElement = document.getElementById('cart-total');
      if (cartTotalElement) {
          navigator.clipboard.writeText(cartTotalElement.innerText).then(() => {
              alert('Total copiado al portapapeles');
          }, (err) => {
              alert('Error al copiar el total: ', err);
          });
      }
  }
  
  function openModal() {
      document.getElementById('carritoModal').style.display = 'block';
  }
  
  function closeModal() {
      document.getElementById('carritoModal').style.display = 'none';
  }
  
  function goToProduct(nombre) {
      const productos = document.querySelectorAll('.producto');
      productos.forEach(producto => {
          if (producto.getAttribute('data-nombre') === nombre) {
              producto.scrollIntoView({ behavior: 'smooth' });
              producto.classList.add('resaltar-palabra');
              setTimeout(() => {
                  producto.classList.remove('resaltar-palabra');
              }, 2000);
          }
      });
  }
  
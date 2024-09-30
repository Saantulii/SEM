// Función para el botón "name-empresa"
document.querySelector('.name-feria').addEventListener('click', function() {
    window.open('pagina de empresa.html', '_blank');
});

function input() {
    const buscador = document.querySelector('.input').value.toLowerCase();
    const productos = document.querySelectorAll('.producto');

    // Filtra productos
    productos.forEach(producto => {
        const nombreProducto = producto.getAttribute('data-nombre').toLowerCase();
        if (nombreProducto.includes(buscador)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });

    // Si el input no está vacío, desplázate a la sección "titulo-categorias"
    if (buscador.length > 0) {
        const titulocategorias = document.getElementById('titulo-categorias');
        titulocategorias.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Agrega un evento de escucha para cuando el usuario escribe en el input de búsqueda
document.querySelector('.input').addEventListener('input', input);


//INPUT DE BUSQUEDA
document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input');
    const icon = document.querySelector('.icon');
    
    icon.addEventListener('click', () => {
        input.focus();
    });
});


//CARRUSEL
// Selecciona todos los enlaces dentro de los elementos con la clase 'flechasCarrusel'
document.querySelectorAll('.flechasCarrusel a').forEach(link => {

    // Agrega un evento de clic a cada enlace
    link.addEventListener('click', function(event) {

        // Evita el comportamiento predeterminado del enlace (que normalmente haría que la página se desplazara verticalmente)
        event.preventDefault();

        // Obtiene el ID del elemento al que apunta el enlace, quitando el símbolo '#' al principio
        const targetId = this.getAttribute('href').substring(1);

        // Busca el elemento en la página que tiene el ID obtenido
        const targetElement = document.getElementById(targetId);

        // Desplaza suavemente el contenedor del carrusel para que el elemento objetivo sea visible
        // El desplazamiento se realiza horizontalmente, no verticalmente (debido a 'inline: start')
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
});


//CATEGORIAS
function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}


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
            <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${(producto.precio * producto.cantidad).toLocaleString()}</p>
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
        cartTotalElement.innerText = `$${total.toLocaleString()}`;
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
        const removeButton = producto.querySelector('.btn-eliminar-universeio');
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



//ABRIR MODAL DEL PRODUCTO
function openModalProducto () {
    document.getElementById('ProductoModal').style.display = 'block';
}
function claseModalProducto () {
    document.getElementById('ProductoModal').style.display = 'none';
}

//BOTON DE COPIAR EL TOTAL DEL PRODUCTO
function copyTotalproducto() {
    const cartTotalElement = document.getElementById('producto-total');
    if (cartTotalElement) {
        navigator.clipboard.writeText(cartTotalElement.innerText).then(() => {
            alert('Total copiado al portapapeles');
        }, (err) => {
            alert('Error al copiar el total: ', err);
        });
    }
}

//MENU DE LA CATEGORIAS DEL CAMBIO DEL COLOR DE FONDO DEL BODY
function toggleMenuProducto() {
    var menu = document.getElementById('menu-producto');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}


// BOTON DEL CORAZON DEL PRODUCTO
function toggleFavorite(element, productName) {
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        alert(productName + ' añadido a favoritos.');
        addToFavoritesPage(productName);
    } else {
        alert(productName + ' eliminado de favoritos.');
        removeFromFavoritesPage(productName);
    }
}

function addToFavoritesPage(productName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (!favorites.includes(productName)) {
        favorites.push(productName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function removeFromFavoritesPage(productName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites = favorites.filter(item => item !== productName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

import { getCart, removeFromCart } from '../scripts/cart.js';

// Obteniendo el codigo del carrito
function actualizarCarrito() {
    let cart = getCart();
    let content = '';

    if(Object.keys(cart).length === 0){
        content += `
            <div class='carrito-vacio'>
                <p>No tienes ningun producto en el carrito</p>
                <a class='boton-regresar' href='./productos.html'>Regresa a nuestras ofertas</a>
            </div>
        `
    }else {
        for (let [productId, item] of Object.entries(cart)) {
            content += `
            <div class="product">
                <img src="${item.product.image}" alt="${item.product.title}">
                <h3>${item.product.title}</h3>
                <p class="product-precio">Precio: $${item.product.price}</p>
                <p>Cantidad: <span>${item.count}</span></p>
                <button class="boton-eliminar" data-id="${productId}">Eliminar</button>
            </div>
            `;
        }
    }
    
    document.querySelector('.compras-productos').innerHTML = content;

    let total = 0;
    for (let [productId, item] of Object.entries(cart)){
        total += item.product.price * item.count;
    }
    total = parseFloat(total.toFixed(2))
    total = +total.toFixed(2)
    let totalElement = document.querySelector('#total');
    if (totalElement) {
        // Si el contenedor total ya existe, actualiza su contenido
        totalElement.textContent = `$${total}`;
    } else {
        // Si el contenedor total no existe, crea uno nuevo
        let totalContent = `
            <div class='contenedor-total'>
                <p>Total: <span id="total">$${total}</span></p>
                <div class='total-botones'>
                    <button class='boton-pagar'>
                        Pagar
                    </button>
                    <button class='boton-cancelar'>
                        Cancelar
                    </button>
                </div>
            </div>
        `
        document.querySelector('.contenedor-compras').insertAdjacentHTML('beforeend', totalContent);
    }

        const botonesEliminar = document.querySelectorAll('.boton-eliminar');
        for (let botonEliminar of botonesEliminar) {
            botonEliminar.addEventListener('click', (event) => {
                event.preventDefault();
                let productId = event.target.dataset.id;
                removeFromCart(productId);
                actualizarCarrito();
            });
        }

        const botonPagar = document.querySelector('.boton-pagar');
        botonPagar.addEventListener('click', (event) => {
            event.preventDefault();

        });
        const botonCancelar = document.querySelector('.boton-cancelar');
        botonCancelar.addEventListener('click', (event) =>{
            event.preventDefault();
            localStorage.setItem('cart', JSON.stringify({}));
            let content = `
            <div class='contenedor-cancelado'>
                <p>Haz cancelado tu compra</p>
                <a class='boton-regresar' href='./productos.html'>
                    Regresa a ver las ofertas
                </a>
            </div>
            `;
            document.querySelector('.contenedor-compras').innerHTML = content;
        })
    
}

// Llamar a la función actualizarCarrito para generar el contenido inicial del carrito
actualizarCarrito();
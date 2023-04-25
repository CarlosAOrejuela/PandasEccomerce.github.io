import { addToCart } from '../scripts/cart.js';

function agregarProducto(){
    const verProductoBtns = document.querySelectorAll('.ver-producto-btn');
    verProductoBtns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        // Obtener la información del producto seleccionado de la API
        const productoId = event.target.dataset.productoId;
        fetch(`https://fakestoreapi.com/products/${productoId}`)
          .then(response => response.json())
          .then(producto => {
            // Redirigir al usuario a la página del producto con la información del producto
            window.location.href = `/AluraProyectos/Eccomerce/PaginasAnexas/detalles.html?id=${producto.id}`;
          });
      });
    });
  }
  
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');
  
  // Obtener la información del producto de la API
fetch(`https://fakestoreapi.com/products/${productoId}`)
    .then(response => response.json())
    .then(producto => {
      // Mostrar los detalles del producto en la página
      const pruebaEl = document.querySelector('#prueba');
      pruebaEl.innerHTML = `
        <h2>${producto.title}</h2>
        <img src="${producto.image}" alt="${producto.title}" class="producto-image">
        <section class='producto-subcontenedor'>
        <p class='producto-descripcion'>Descripción: ${producto.description}</p>
        <p class='producto-precio'>Precio: ${producto.price}</p>
        <a href='javascript:void(0)' class='producto-button boton-add' data-id="${producto.id}">Añadir</a>
        </section>
      `;
      
      const botonAdd = document.querySelector('.boton-add')
      const contador = document.querySelector('.contador')
      botonAdd.addEventListener('click', (event) =>{
        event.preventDefault();
        addToCart(producto)
        let count = parseInt(contador.textContent);
        count++;
        contador.textContent = count;
      })
      
    });
  
fetch('https://fakestoreapi.com/products?limit=5')
      .then(res => res.json())
      .then(data => {
  
          let dataPrimera = data
          let content = '';
          for (let item of dataPrimera){
              content += `
                  <figure class='contenedor-cards'>
                  <section class='imagenes-contenedor'>
                      <img class='imagenes-cards' src="${item.image}" title="${item.title}">
                      <figcaption class='title-cards'> ${item.title
                      }</figcaption>
                  </section>
                  <section class='contenedor-descripcion'>
                      <p class='description-cards'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel tincidunt nisl, sit amet posuere felis. </p>
                      <p class='descripcion-precio'>$${item.price}</p>
                      <a href = 'javascript:void(0)' class='button-cards boton-add' data-id="${item.id}">Añadir</a>
                  </section>
                  </figure>
              `;
          }
          document.querySelector('.contenedor-recomendaciones').innerHTML = content;
          const botonesAdd = document.querySelectorAll('.boton-add');
        const contador = document.querySelector('.contador');

        for (let botonAdd of botonesAdd) {
            botonAdd.addEventListener('click', (event) => {
                event.preventDefault();
                let productId = event.target.dataset.id;
                let product = data.find(item => item.id == productId);
                addToCart(product);
                let count = parseInt(contador.textContent);
                count++;
                contador.textContent = count;
            });
        }  
      });
  


  
  
  
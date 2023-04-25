const botonSearch = document.getElementById('boton-search')
let modalContenedor = document.querySelector('.principal-nav')


//Obteniendo datos de la api y asignando cada categoria a un contenedor

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {   
    // Filtrar los datos por categoría
    const category1 = data.filter(item => item.category === "men's clothing");
    const category2 = data.filter(item => item.category === "women's clothing");
    const category3 = data.filter(item => item.category === "jewelery")
    const category4 = data.filter(item => item.category === "electronics")
    // ...
    // Mostrar cada categoría en su contenedor correspondiente
        displayCategory(category1, 'ropa-catalogo_hombres');
        displayCategory(category2, 'ropa-catalogo_mujeres');
        displayCategory(category3, 'catalogo-joyeria');
        displayCategory(category4, 'catalogo-electronico')
    // ...
});

function displayCategory(data, containerId) {
  // Obteniendo el contenedor
    const container = document.getElementById(containerId);
  // Creamdo el contenido del contenedor
let content = '';
    data.slice(0, 4).forEach(item => {
      content += ` 
      <div class='products-cards'>
          <img src="${item.image}" alt="${item.title}" class="cards-img">
          <p class='cards-title'>${item.title}</p>
          <p class='cards-price'>$ ${item.price}</p>
          <button type='button' class='ver-producto-btn' data-producto-id="${item.id}">Ver producto</button>
      </div>
      `;
    });
  // Actualizar el contenido del contenedor
    container.innerHTML = content;

    agregarProducto();
}

//Codigo para al dar click a un producto se abre la informacion 


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
          window.location.href = `./PaginasAnexas/detalles.html?id=${producto.id}`;
        });
    });
  });
}



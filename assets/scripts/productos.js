import { addToCart } from "../scripts/cart.js";

fetch('https://fakestoreapi.com/products')
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
                    <a href = '#' class='button-cards' data-id='${item.id}'>Añadir</a>
                </section>
                </figure>
            `;
        }
        document.querySelector('.productos').innerHTML = content;

        const botonesAdd = document.querySelectorAll('.button-cards')
        const contador = document.querySelector('.contador')

        for (let botonAdd of botonesAdd){
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



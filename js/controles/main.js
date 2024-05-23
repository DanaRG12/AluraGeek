import { servicesProducts } from "../services/products-service.js";

const productContainer = document.querySelector("[data-product]");

function createCard (name, price, image, id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML= `
    <div class="img-container">
    <img class="img-productos" src="${image}" alt="${name}"> </div>

    <div class="card-container--info">
      <p>${name}</p> </div>
      <div class="card-container--value">            
        <p>${price}</p></div>
     <div class="card-container--delete"> 
        <button class="delete-button" data-id="${id}" >
        <img class="trash" src="./imagenes/trash.png" alt="Eliminar"></button></div>
    `;

    productContainer.appendChild(card);
    return card;

}

const render = async () => {
    try{
        const listProducts = await servicesProducts.productList();

        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                 )
            )
        })


     
    }catch (error) {
        console.log(error);
    }
};
render()


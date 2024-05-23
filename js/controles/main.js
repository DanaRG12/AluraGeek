import { servicesProducts } from "../services/products-service.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    //console.log(name);
   // console.log(price);
    //console.log(image);
    servicesProducts
    .createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

});


productContainer.addEventListener("click", async (event) => {
    event.preventDefault();
    const removeButton = event.target.closest(".delete-button");
    if (removeButton) {
        const itemId = removeButton.dataset.id;
        try {
            await servicesProducts
            .deleteProducts(itemId); 
            console.log('Producto eliminado con éxito');
            // Encuentra y elimina el elemento padre ".card"
            const cardToRemove = removeButton.closest(".card");
            if (cardToRemove) {
                cardToRemove.remove(); // Elimina el producto del DOM
            } else {
                console.error('No se pudo encontrar el elemento padre .card');
            }
        } catch (err) {
            console.error('Error al eliminar el producto:', err);
        }
    }
    });

form.addEventListener(".delete-button", (event) => {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
    servicesProducts
    .deleteProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

});

render()


//$('.limpiar').click(funtion()
//{
 // $('.nombre').val('');
 // $('.precio').val('');
 // $('.imagen').val('');
//});

//form.addEventListener(".limpiar", (event) => {
   // event.preventDefault();
   // const name = document.querySelector("[data-name]").value;
 //  const price = document.querySelector("[data-price]").value;
 //   const image = document.querySelector("[data-image]").value;
